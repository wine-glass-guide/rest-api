import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto, { randomUUID } from 'crypto';
import User from '../model/User.js';
import validate from '../middleware/validate.js';
import {
  userRules,
  userStatisticsLookupsRules,
} from './validations/users.js';

const router = Router();

router.get('/me/statistics/:statistic', async (req, res) => {
  const { statistic } = req.params;

  if (statistic === 'lookups') {
    const user = await User.findOne({ uuid: req.id }).exec();

    const { lookups } = user.statistics;
    res.json({ data: { lookups } });
  }
});

router.put('/me', validate(userRules), async (req, res) => {
  const { name } = req.body;

  const user = await User.findOneAndUpdate(
    { uuid: req.id },
    { name },
    { new: true },
  ).exec();

  res.json({ data: { name: user.name } });
});

router.put('/me/statistics/:statistic', validate(userStatisticsLookupsRules), async (req, res) => {
  if (req.params.statistic === 'lookups') {
    const { lookups } = req.body;

    if (lookups) {
      const user = await User.findOneAndUpdate(
        { uuid: req.id },
        { $inc: { 'statistics.lookups': 1 } },
        { new: true },
      ).exec();

      res.json({ data: { lookups: user.statistics.lookups } });
    }
  }
});

router.put('/me/settings/:setting', async (req, res) => {
  if (req.params.setting === 'language') {
    const { language } = req.body;

    const user = await User.findOneAndUpdate(
      { uuid: req.id },
      { 'settings.language': language },
      { new: true },
    ).exec();

    res.json({ data: { language: user.settings.language } });
  }

  if (req.params.setting === 'wine-glasses') {
    const { wineGlasses } = req.body;

    const user = await User.findOneAndUpdate(
      { uuid: req.id },
      { 'settings.wineGlasses': wineGlasses },
      { new: true },
    ).exec();

    res.json({ data: { wineGlasses: user.settings.wineGlasses } });
  }
});

router.delete('/me', async (req, res) => {
  const salt = await bcrypt.genSalt(+process.env.BCRYPT_SALT_ROUNDS);
  const password = crypto.randomBytes(20).toString('hex');
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.findOneAndUpdate(
    { uuid: req.id },
    {
      name: 'Anonymous',
      email: `${randomUUID()}@anonymous.com`,
      password: hashedPassword,
    },
    { new: true },
  ).exec();

  res.json({ data: {} });
});

router.delete('/me/statistics/:statistic', async (req, res) => {
  const { statistic } = req.params;

  if (statistic === 'lookups') {
    const user = await User.findOneAndUpdate(
      { uuid: req.id },
      { 'statistics.lookups': 0 },
      { new: true },
    ).exec();

    res.json({ data: { lookups: user.statistics.lookups } });
  }
});

export default router;
