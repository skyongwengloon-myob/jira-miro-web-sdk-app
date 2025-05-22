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


export async function getActiveSprintIssues() {
    //console.log('getActiveSprint started.');
  const res = await axios.get(`${JIRA_BASE_URL}/rest/agile/1.0/board/${JIRA_BOARD_ID}/sprint?state=active`, {
    headers: { Authorization: JIRA_AUTH }
  });
   const sprints = res.data.values;
    if (!sprints.length) return res.status(404).send('No active sprints found.');

    const activeSprint = sprints.sort((a, b) =>
      new Date(b.endDate || b.startDate) - new Date(a.endDate || a.startDate)
    )[0];

    console.log('Latest active sprint:', activeSprint.name);

    const issuesRes = await axios.get(
      `${JIRA_BASE_URL}/rest/agile/1.0/sprint/${activeSprint.id}/issue`,
      {
        headers: {
          Authorization: JIRA_AUTH,
          Accept: 'application/json',
        },
      }
    );
    const issues = issuesRes.data.issues;
    return { issues };
}