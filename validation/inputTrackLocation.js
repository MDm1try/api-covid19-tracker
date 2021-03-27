const inputRegisterUser = (data) => {
    let error = ''

    if (!data.latitude) {
        error = 'latitude is required'
    } else if (!data.longitude) {
        error = 'longitude is required'
    }  else if (!data.timestamp) {
        error = 'timestamp is required'
    } else if (!data.accuracy) {
        error = 'accuracy is required'
    } else if (typeof data.latitude !== 'number') {
        error = 'latitude should be number'
    } if (typeof data.longitude !== 'number') {
        error = 'longitude should be number'
    } if (typeof data.timestamp !== 'number') {
        error = 'timestamp should be number'
    } if (typeof data.accuracy !== 'number') {
        error = 'accuracy should be number'
    }

    return {
        isValid: error.length === 0,
        error
    }
}

module.exports = inputRegisterUser