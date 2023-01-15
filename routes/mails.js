import { Router } from 'express';
import sendMail from '../util/mail.js';
import validate from '../middleware/validate.js';
import { mailRules } from './validations/mails.js';

const router = Router();

router.post('/', validate(mailRules), async (req, res) => {
  const { mail, message } = req.body;

  await sendMail(mail, 'contact@demo.com', 'Question', message);

  res.json({ data: {} });
});

export default router;
