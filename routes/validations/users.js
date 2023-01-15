import { body } from 'express-validator';

export const userRules = [
  body('name').isLength({ min: 4, max: 255 }),
];

export const userStatisticsLookupsRules = [
  body('lookups').isBoolean(),
];

export const userSettingsLanguageRules = [
  body('language').isLength({ min: 2, max: 2 }),
];
