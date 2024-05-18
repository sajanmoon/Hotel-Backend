const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    // authentication logic start here
    try {
      console.log("Received credentials", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorrect username" });
      const isPasswordMatch = user.passport === password ? true : false;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect message" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;