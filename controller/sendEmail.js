import nodemailer from "nodemailer"
async function sendEmail(to, subject, text) {
    // create a nodemailer transporter with your email service provider configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  
    // set up the email message
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };
  
    // send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.messageId}`);
  }
  export default sendEmail