const passport = require('passport')
const localStrategy = require('passport-local') //passport local localstrategy is username password based authentication
const Person = require('./models/Person')

passport.use(new localStrategy(async (username, password, done) => {
    //authentication logic here
    try {
        // console.log(`Received crenditals ${username} ${password}`)
        const user = await Person.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username' }); // is callback function which signal complettion of of authentication process @params (error,user,info)
        }

        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            return done(null, false, { message: 'Password not matched' });
        }
        return done(null, user);
    } catch (err) {
        console.log(err)
        return done(err)
    }
}))

module.exports = passport