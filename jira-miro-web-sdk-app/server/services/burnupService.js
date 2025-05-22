import { getActiveSprintIssues, getSprints, getSprintStats } from '../../src/jiraApi.js';
import { createMiroTable, uploadChartToMiro, createStickyNote } from '../../src/miroApi.js';
import { buildBurnupChartConfig } from '../../src/chartBuilder.js';

export async function generateBurnupChart() {
  try {
    const sprints = await getSprints();
    const table = [['Sprint', 'Total', 'Done', 'Cumulative Done']];
    let cumulativeDone = 0;

    for (const sprint of sprints) {
      const { total, done } = await getSprintStats(sprint.id);
      cumulativeDone += done;
      table.push([sprint.name, total.toString(), done.toString(), cumulativeDone.toString()]);
    }

    await createMiroTable(table);

    const chartConfig = buildBurnupChartConfig(table);
    await uploadChartToMiro(chartConfig);

    console.log('All tasks completed successfully.');
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

export async function generateStickyNote() {
  try {
      const { issues } = await getActiveSprintIssues();
      for (const issue of issues) {
        const summary = `${issue.key}: ${issue.fields.summary}`;
        await createStickyNote(summary);
      }

    console.log('All tasks completed successfully.');
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}
