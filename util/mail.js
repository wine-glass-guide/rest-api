import nodemailer from 'nodemailer';

const sendMail = async (from, to, subject, text) => {
  const testAccount = await nodemailer.createTestAccount();

  const {
    NODE_ENV, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD,
  } = process.env;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: +SMTP_PORT === 465,
    auth: {
      user: NODE_ENV === 'development' ? testAccount.user : SMTP_USER,
      pass: NODE_ENV === 'development' ? testAccount.pass : SMTP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Message send: %s', info.messageId);
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

export default sendMail;
