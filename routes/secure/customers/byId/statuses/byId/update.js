const UserStatuses = require('../../../../../../models/UserStatuses')
const inputUpdateUserStatus = require('../../../../../../validation/inputUpdateUserStatus')

const update = async (req, res) => {
    const statusId = req.params.statusId
    try {
        const {
            isValid,
            error
        } = inputUpdateUserStatus(req.body)
        if (!isValid) {
            return res.status(400).send({ error }) 
        }
        
        const {
            infected,
            health,
            vaccinated,
            recovered,
            risk,
        } = req.body
        const userStatus = await UserStatuses.findById(statusId)

        if (!userStatus) {
            return res.status(404).send({ error: 'User Status is not found' }) 
        }
    
        await userStatus.updateOne({
            infected,
            health,
            vaccinated,
            recovered,
            risk,
        })

        return res.status(200).send({ success: true }) 
    } catch (err) {
        return res.status(500).send({ error: err.message }) 

    }
}

module.exports = update
