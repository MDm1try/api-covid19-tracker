const Notifications = require('../../../../../models/Notifications')

const get = async (req, res) => {
    const id = req.params.id
    try {
        const notifications = await Notifications.find({ toUser: id })
        if (!notifications) {
            return res.status(404).send({ error: 'Notifications not found' }) 
        }
        const unseenNotifications = await Notifications.countDocuments({ toUser: id, seen: false })

        return res.status(200).send({ notifications, unseenNotifications }) 
    } catch(err) {
        return res.status(500).send({ error: err.message }) 
    }
}

module.exports = get
