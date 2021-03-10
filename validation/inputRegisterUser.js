const inputRegisterUser = (data) => {
    const errors = {}

    if (!data.fistName) {
        errors.fistName = 'is required'
    }
    if (!data.lastName) {
        errors.lastName = 'is required'
    } 
    if (!data.email) {
        errors.email = 'is required'
    }
    if (!data.dob) {
        errors.dob = 'is required'
    }
    if (!data.password) {
        errors.password = 'is required'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

module.exports = inputRegisterUser