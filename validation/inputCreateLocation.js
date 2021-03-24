const inputCreateLocation = (data) => {
    let error = ''

    if (!data.name) {
        error = 'name is required'
    } else if (!data.diameter) {
        error = 'diameter is required'
    } else if (!(data.diameter > 0 && data.diameter <= 500)) {
        error = 'diameter should be greater than 0 and less than 500 m'
    } else if (!data.latitude) {
        error = 'latitude is required'
    } else if (!data.longitude) {
        error = 'longitude is required'
    }

    return {
        isValid: error.length === 0,
        error
    }
}

module.exports = inputCreateLocation