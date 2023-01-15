import { Router } from 'express';
import WineGlass from '../model/WineGlass.js';

const router = Router();

router.get('/', async (req, res) => {
  const wineGlasses = await WineGlass.find().exec();

  const grapes = wineGlasses.map((wineGlass) => wineGlass.grapes).flat().sort();

  res.json({ data: grapes });
});

export default router;
