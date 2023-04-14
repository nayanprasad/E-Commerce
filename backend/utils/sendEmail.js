const nodemailer = require("nodemailer");

const SendEmail = async (option) => {

    const {email, subject, message} = option;

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject,
        text: message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = SendEmail;

