import { getSprints, getSprintStats } from '../../src/jiraApi.js';
import { createMiroTable, uploadChartToMiro } from '../../src/miroApi.js';
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

    console.log('service. All tasks completed successfully.');
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}
