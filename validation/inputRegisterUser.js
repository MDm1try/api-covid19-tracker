const validator = require('validator')

const inputRegisterUser = (data) => {
    let error = ''

    if (!data.firstName) {
        error = 'firstName is required'
    } else if (!data.lastName) {
        error = 'lastName is required'
    }  else if (!validator.isEmail(data.email)) {
        error = 'email is required'
    } else if (!data.dob) {
        error = 'dob is required'
    } else if (!data.password) {
        error = 'password is required'
    } else if (!data.confirmLicense) {
        error = 'it is required to confirm the license'
    }

    return {
        isValid: error.length === 0,
        error
    }
}

module.exports = inputRegisterUser