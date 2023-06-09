module.exports.validateRegisterInput = (
    username, email, password, confirmPassword
) => {
    const errors = {}
    if(username.trim() === ''){
        errors.username = 'Username must not be empty'
    }
    if(email.trim() === ''){
        errors.email = 'Email must not be empty'
    }

    if(!email.match(/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)){
        errors.email = "Email must be valid"
    }

    if(password === ''){
        errors.password = "Password must not be empty";
    }

    if(password !== confirmPassword){
        errors.confirmPassword = "Passwords doesn't match"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (
    username, password
) => {
    const errors = {}
    if(username.trim() === ''){
        errors.username = 'Username must not be empty'
    }

    if(password === ''){
        errors.password = "Password must not be empty";
    }


    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}