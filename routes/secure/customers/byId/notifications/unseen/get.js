const Notifications = require('../../../../../models/Notifications')

const get = async (req, res) => {
    const id = req.params.id
    try {
        const unseenNotifications = await Notifications.countDocuments({ toUser: id, seen: false })
        return res.status(200).send(unseenNotifications) 
    } catch(err) {
        return res.status(500).send({ error: err.message }) 
    }
}

module.exports = get
