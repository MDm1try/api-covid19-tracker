const sendEmail = require('./sendEmail')


const sendInvitation = async(email, name, url) => {
    const options = {
        from: '"Example Team" <from@example.com>',
        to: email,
        subject: 'Invitation',
        text: `Hi ${name},\nPlease confirm your invitation by this URL: ${url}`
    }

    await sendEmail(options)
}

module.exports = sendInvitation