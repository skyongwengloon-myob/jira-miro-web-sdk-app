import dotenv from 'dotenv';
dotenv.config();

/*
console.log("sercer/index.js");
console.log('Env vars:', {
  JIRA_EMAIL: process.env.JIRA_EMAIL,
  JIRA_TOKEN: process.env.JIRA_TOKEN,
  JIRA_BOARD_ID: process.env.JIRA_BOARD_ID,
  JIRA_BASE_URL: process.env.JIRA_BASE_URL,
  MIRO_TOKEN: process.env.MIRO_TOKEN,
  MIRO_BOARD_ID: process.env.MIRO_BOARD_ID
});
*/

import express from 'express';
import cors from 'cors';

import burnupRoute from './routes/burnup.js';  // Note the `.js` extension

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend is working' });
});

app.use('/api/burnup', burnupRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
