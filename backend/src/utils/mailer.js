const nd = require('node-mailer')



const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });


    const info = await transporter.sendMail({
      from: 'Inngest  TMS',
      to,
      subject,
      text, // plain‑text body
      html  // HTML body
    });
    console.log("MESSAGE SENT")
    return info
  } catch (error) {
    console.log("mail error error sending mail check credentials>>>")
  }
}
module.exports=sendMail