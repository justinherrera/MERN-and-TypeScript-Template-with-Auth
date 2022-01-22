import { createTransport} from 'nodemailer';
import config from '../config/index'


interface Options {
    email: string
    subject: string
    message: string
}

interface MailtrapTransporter {
    host: string;
}

export const sendEmail = async (options: Options) => {
  // Create Transporter
  const transporter = createTransport({
    host: config.mailtrap.host,
    port: config.mailtrap.port,
    auth: {
      user: config.mailtrap.userName,
      pass: config.mailtrap.password,
    },
  } as MailtrapTransporter);

  // Define the email options
  const mailOptions = {
    from: 'Tester Name <tester@name.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };

  console.log(options.email)

  // Actually send the email
  await transporter.sendMail(mailOptions);
};
