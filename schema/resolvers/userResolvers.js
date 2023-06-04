const User = require('../../models/User')
const {validateRegisterInput, validateLoginInput} = require('../../utils/validators')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.JWT_SECRET, {expiresIn: '1h'})
}

module.exports = {
    Mutation: {
        async login(_, {username, password}){
            const {valid, errors} = validateLoginInput(username, password)
            if(!valid){
                throw new UserInputError('Errors', {errors})  
            }

            const user = await User.findOne({username})
            if(!user){
                throw new UserInputError('Username is doesn\'t exists', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            } 

            const matchPassword = await bcrypt.compare(password, user.password)
            if(!matchPassword){
                throw new UserInputError('Wrong Credentials', {errors})
            }

            const token = generateToken(user)
            
            return {
                ...user._doc,
                id: user._id,
                token
            } 
        },
        async register(_, {registerInput: {username, email, password, confirmPassword}}, context, info){
            
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors', {errors})  
            }

            const userExists = await User.findOne({username})
            if(userExists){
                throw new UserInputError('Username is already taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }    
            
            password = await bcrypt.hash(password, 12);
            const user = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await user.save()

            const token = generateToken(res) 
            
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}