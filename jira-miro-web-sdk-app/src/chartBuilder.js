export function buildBurnupChartConfig(table) {
  const labels = table.slice(1).map(row => row[0]);
  const totalScope = table.slice(1).map(row => Number(row[1]));
  const doneData = table.slice(1).map(row => Number(row[2]));
  const cumulativeDone = table.slice(1).map(row => Number(row[3]));

  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Done (per sprint)',
          data: doneData,
          borderColor: 'green',
          fill: false,
          tension: 0.3
        },
        {
          label: 'Cumulative Done',
          data: cumulativeDone,
          borderColor: 'blue',
          fill: false,
          tension: 0.3
        },
        {
          label: 'Scope (Total)',
          data: totalScope,
          borderColor: 'red',
          borderDash: [5, 5],
          fill: false,
          tension: 0.3
        }
      ]
    },
    options: {
      plugins: {
        backgroundColor: 'white',
        title: {
          display: true,
          text: 'Jira Sprint Burn-Up Chart'
        }
      },
      scales: {
        y: { beginAtZero: true }
      }
    },
    backgroundColor: 'white'
  };
}