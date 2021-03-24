const inputCreateLocation = (data) => {
    let error = ''

    if (!data.name) {
        error = 'name is required'
    } else if (!data.radius) {
        error = 'radius is required'
    } else if (!(data.radius > 0 && data.radius <= 500)) {
        error = 'radius should be greater than 0 and less than 500 m'
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