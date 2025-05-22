import dotenv from 'dotenv';
dotenv.config(); // ✅ Load .env before anything else

import axios from 'axios';

/*
console.log("miroApi.js");
console.log('Env vars:', {
  MIRO_TOKEN: process.env.MIRO_TOKEN,
  MIRO_BOARD_ID: process.env.MIRO_BOARD_ID
});
*/

const MIRO_TOKEN = process.env.MIRO_TOKEN;
const MIRO_BOARD_ID = process.env.MIRO_BOARD_ID;

export async function createMiroTable(tableData) {
    console.log('createMiroTable started.');
  const cellWidth = 150;
  const cellHeight = 50;
  const startX = -((tableData[0].length / 2) * cellWidth);
  const startY = -((tableData.length / 2) * cellHeight);

  const promises = [];

  tableData.forEach((row, rowIndex) => {
    row.forEach((text, colIndex) => {
      promises.push(
        axios.post(`https://api.miro.com/v2/boards/${MIRO_BOARD_ID}/shapes`, {
          data: { content: text },
          position: {
            origin: 'center',
            x: startX + colIndex * cellWidth,
            y: startY + rowIndex * cellHeight,
          },
          geometry: { width: cellWidth, height: cellHeight }
        }, {
          headers: {
            Authorization: `Bearer ${MIRO_TOKEN}`,
            'Content-Type': 'application/json'
          }
        })
      );
    });
  });

  await Promise.all(promises);
  console.log('createMiroTable completed.');
}

export async function uploadChartToMiro(chartConfig) {
  //  console.log('uploadChartToMiro started.');
  const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;

  const res = await axios.post(`https://api.miro.com/v2/boards/${MIRO_BOARD_ID}/images`, {
    data: { url: chartUrl },
    position: { origin: 'center', x: 1000, y: 0 }
  }, {
    headers: {
      Authorization: `Bearer ${MIRO_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  //console.log('uploadChartToMiro completed.');
  console.log('Chart uploaded to Miro:', res.data.id);
}

export async function createStickyNote(summary) {
  const randomX = Math.floor(Math.random() * 1000) - 500; // random between -500 and +499
  const randomY = 1000+(Math.floor(Math.random() * 1000) - 500); // random between -500 and +499

  const res = await axios.post(`https://api.miro.com/v2/boards/${MIRO_BOARD_ID}/sticky_notes`, {
    data: { content: summary },
    position: {
      origin: 'center',
      x: randomX,
      y: randomY
    }
  }, {
    headers: {
      Authorization: `Bearer ${MIRO_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  // optional: return response or note ID
  return res.data;
}
