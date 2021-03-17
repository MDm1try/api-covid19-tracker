
const inputUpdateUserStatus = (data) => {
    let error = ''

    if (typeof data.isInfected !== 'boolean') {
        error = '"infected" status is invalid'
    } else if (typeof data.isHealthy !== 'boolean') {
        error = '"healthy" status is invalid'
    } else if (typeof data.isVaccinated !== 'boolean') {
        error = '"vaccinated" status is invalid'
    } else if (typeof data.isRecovered !== 'boolean') {
        error = '"recovered" status is invalid'
    } else if (typeof data.isPossiblyInfected !== 'boolean') {
        error = '"possibly infected" status is invalid'
    }

    return {
        isValid: error.length === 0,
        error
    }
}

module.exports = inputUpdateUserStatus