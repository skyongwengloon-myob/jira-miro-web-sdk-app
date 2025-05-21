import express from 'express';
import { generateBurnupChart } from '../services/burnupService.js';  // note the .js extension

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await generateBurnupChart();
    res.status(200).json({ message: 'Burn-up chart created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate burn-up chart' });
  }
});

export default router;
