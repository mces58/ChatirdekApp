import nodeMailer from 'nodemailer';

import dotEnvConfig from 'src/configs/dotEnv.config';
import mailConfig from 'src/configs/mail.config';
import logger from 'src/utils/logger.util';

export const generateVerificationCode = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

const sendMail = async (email) => {
  try {
    const transporter = nodeMailer.createTransport(mailConfig);
    const verificationCode = generateVerificationCode();

    const mailOptions = {
      from: `Admin <${dotEnvConfig.SMTP.EMAIL}>`,
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
    logger.info(`Email sent: ${info.response}`);
    return verificationCode;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export default sendMail;
