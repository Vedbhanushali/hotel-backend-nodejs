const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true,
    }
})

personSchema.pre('save', async function (next) {
    const person = this
    //hash the password only if it has been modified (or it is new)
    if (!person.isModified('password')) return next()
    try {
        /* hash password generation */
        // salt generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt)

        //override the plain passowrd with the hashed one
        person.password = hashedPassword
        next()
    } catch (error) {
        console.log(error)
        return next(error)
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = bcrypt.compare(candidatePassword, this.password);
        return isMatch
        /* process of mathcing 
            ved --> asdfajdfhkahdshfkahdfahdkfjhadkshf
            login --> test

            first extracting salt from saved password
            asdfajdfhkahdshfkahdfahdkfjhadkshf --> extract salt
            salt + test --> hash --> wedasfasdfjakjsdhfkjahdshaksjdfhkadh
            and comapring both hashes
        */
    } catch (error) {
        throw error;
    }
}

//create person model
const Person = mongoose.model('Person', personSchema)
module.exports = Person