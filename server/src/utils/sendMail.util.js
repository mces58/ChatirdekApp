import nodeMailer from 'nodemailer';

import mailConfig from 'src/configs/mail.config';

export const generateVerificationCode = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Math.floor(1000 + Math.random() * 9000).toString();

const sendMail = async (email) => {
  try {
    const transporter = nodeMailer.createTransport(mailConfig);
    const verificationCode = generateVerificationCode();

    const mailOptions = {
      from: `Admin <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: 'Password Recovery',
      html: `
          <h1>Reset Password</h1>
          <p>
            ${verificationCode}
          </p>
        `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return verificationCode;
  } catch (error) {
    console.error('sendMail error: ', error);
  }
};

export default sendMail;
