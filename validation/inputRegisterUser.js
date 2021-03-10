const inputRegisterUser = (data) => {
    let error = ''

    if (!data.fistName) {
        error = 'fistName is required'
    } else if (!data.lastName) {
        error = 'lastName is required'
    }  else if (!data.email) {
        error = 'email is required'
    } else if (!data.dob) {
        error = 'dob is required'
    } else if (!data.password) {
        error = 'password is required'
    }

    return {
        isValid: error.length === 0,
        error
    }
}

module.exports = inputRegisterUser