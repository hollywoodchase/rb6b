const bcrypt = require("bcryptjs");
const Accounts = require("../models/Accounts");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeAccount((account, done) => {
    done(null, account.id);
});

passport.deserializeAccount((id, done) => {
    Account.findById(id, (err, account) => {
        done(err, account);
    });
});

// Local Strategy
passport.use(
    new LocalStrategy({ accountnameField: "email" }, (email, password, done) => {
        // Match Account
        Account.findOne({ email: email })
            .then(account => {
                // Create new Account
                if (!account) {
                    const newAccount = new Account({ email, password });
                    // Hash password before saving in database
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newAccount.password, salt, (err, hash) => {
                            if (err) throw err;
                            newAccount.password = hash;
                            newAccount
                                .save()
                                .then(account => {
                                    return done(null, account);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });
                    // Return other account
                } else {
                    // Match password
                    bcrypt.compare(password, account.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, account);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

module.exports = passport;