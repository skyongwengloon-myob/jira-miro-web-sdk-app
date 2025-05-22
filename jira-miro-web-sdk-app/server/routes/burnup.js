import express from 'express';
import { generateBurnupChart, generateStickyNote } from '../services/burnupService.js';  // note the .js extension

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Burn-up chart button clicked');
    await generateBurnupChart();
    res.status(200).json({ message: 'Burn-up chart created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate burn-up chart' });
  }
});

router.post('/sticky-note', async (req, res) => {
  try {
    await generateStickyNote();
    res.status(200).json({ message: 'Sticky note created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create sticky note' });
  }
});

export default router;