
const inputUpdateUserStatus = (data) => {
    let error = ''

    if (typeof data.infected !== 'boolean') {
        error = 'infected is invalid'
    } else if (typeof data.health !== 'boolean') {
        error = 'health is invalid'
    } else if (typeof data.vaccinated !== 'boolean') {
        error = 'vaccinated is invalid'
    } else if (typeof data.recovered !== 'boolean') {
        error = 'recovered is invalid'
    } else if (typeof data.risk !== 'boolean') {
        error = 'risk is invalid'
    }

    return {
        isValid: error.length === 0,
        error
    }
}

module.exports = inputUpdateUserStatus