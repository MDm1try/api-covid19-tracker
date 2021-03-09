const sendEmail = require('./sendEmail')


const sendInvitation = async(email, name, url) => {
    const options = {
        from: '"Example Team" <from@example.com>',
        to: email,
        subject: 'Invitation',
        text: `Hi ${name}, it’s our first message sent with Nodemailer`
    }

    await sendEmail(options)
}

module.exports = sendInvitation