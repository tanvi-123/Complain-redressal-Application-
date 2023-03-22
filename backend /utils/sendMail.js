const nodeMailer = require('nodemailer')

const sendMail = async (options) => {
    const transport = nodeMailer.createTransport({
        // service:process.env.SMTP_SERVICE,
        // auth:{
        //     user:process.env.SMTP_MAIL,
        //     pass:process.env.SMTP_PASSWORD
        // }
        // host: "smtp.gmail.com",
        // port:465,

        host: "smtp.mailtrap.io",
        port: 2525,

        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transport.sendMail(mailOptions)
}

module.exports = sendMail