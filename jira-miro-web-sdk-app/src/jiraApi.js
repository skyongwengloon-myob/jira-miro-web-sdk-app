import dotenv from 'dotenv';
dotenv.config(); // ✅ Load .env before anything else

import axios from 'axios';

/*
console.log("jiraApi.js");
console.log('Env vars:', {
  JIRA_EMAIL: process.env.JIRA_EMAIL,
  JIRA_TOKEN: process.env.JIRA_TOKEN,
  JIRA_BOARD_ID: process.env.JIRA_BOARD_ID,
  JIRA_BASE_URL: process.env.JIRA_BASE_URL,
});
*/

const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_TOKEN = process.env.JIRA_TOKEN;
const JIRA_BOARD_ID = process.env.JIRA_BOARD_ID;
const JIRA_BASE_URL = process.env.JIRA_BASE_URL;

const JIRA_AUTH = `Basic ${btoa(`${JIRA_EMAIL}:${JIRA_TOKEN}`)}`;

export async function getSprints() {
    //console.log('getSprints started.');
  const res = await axios.get(`${JIRA_BASE_URL}/rest/agile/1.0/board/${JIRA_BOARD_ID}/sprint?state=active,closed`, {
    headers: { Authorization: JIRA_AUTH }
  });
  const sprints = res.data.values;
  const closed = sprints.filter(s => s.state === 'closed').sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
  const active = sprints.find(s => s.state === 'active');

  //console.log('getSprints completed.');
  return [...closed.slice(0, 4).reverse(), active];
}

export async function getSprintStats(sprintId) {
    //console.log(`getSprintStats started for sprintId: ${sprintId}`);
  const res = await axios.get(`${JIRA_BASE_URL}/rest/agile/1.0/sprint/${sprintId}/issue`, {
    headers: { Authorization: JIRA_AUTH }
  });
  const issues = res.data.issues;
  const total = issues.length;
  const done = issues.filter(i => i.fields.status.statusCategory.key === 'done').length;
    console.log(`getSprintStats completed for sprintId: ${sprintId}`);
  return { total, done };
}