const Notifications = require('../../../../../models/Notifications')

const update = async (req, res) => {
    const notificationId = req.params.notificationId
    const id = req.params.id
    try {
        const notification = await Notifications.findById(notificationId)
        if (!notification) {
            return res.status(404).send({ error: 'Notification not found' }) 
        }
        await notification.updateOne({ seen: true })

        const unseenNotifications = await Notifications.countDocuments({ toUser: id, seen: false })

        return res.status(200).send({ unseenNotifications }) 
    } catch(err) {
        return res.status(500).send({ error: err.message }) 
    }
}

module.exports = update
