import {nodemailer} from  'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_email_password'
    }
  });

  const sendEmail = async (to, Usersubject, textMessage, htmlMessage) => {
    try {
      // Send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'your_email@gmail.com',
        to,
        subject: "Journal Publication"+Usersubject,
        text:textMessage,
        html
      });
  
      console.log('Email sent: %s', info.messageId);
      return info.messageId;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  export {sendEmail}
  