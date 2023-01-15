import { Router } from 'express';
import User from '../model/User.js';
import WineGlass from '../model/WineGlass.js';

const router = Router();
router.post('/', async (req, res) => {
  const { grape } = req.body;

  const user = await User.findOne({ uuid: req.id });

  const wineGlass = await WineGlass.find({ grapes: grape }).exec();
  if (!wineGlass) {
    return;
  }

  const message = `${user.name} looked up the ${grape} grape`;

  req.io.emit('message:create', { data: message });

  res.json({
    data: {},
  });
});

export default router;
