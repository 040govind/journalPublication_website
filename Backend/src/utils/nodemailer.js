import nodemailer from  'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.ijesacbt.com',  // replace with your SMTP server
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'ijesadjv',
    pass: 'Dq$NYYbo(FE!'
  }
  });

  const sendEmail = async (to,htmlData,subData) => {
    try {
      // Send mail with defined transport object
      const info = await transporter.sendMail({
        from: 'info@ijesacbt.com',
        to:to,
        replyTo: 'support@ijesacbt.com',
        subject: subData,
        html:htmlData
      });
  
      console.log('Email sent: %s', info.messageId);
      return info.messageId;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  export {sendEmail}
  