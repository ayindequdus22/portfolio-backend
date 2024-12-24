import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { client } from "./utils/connectDb";
import logger from "./utils/logger";


passport.use(new LocalStrategy(
    // options
    { usernameField: 'email', passwordField: 'password' },
    // verify fn
    async (email, password, done) => {
        try {
            const result = await client.query("Select * from users where email=$1", [email],);
            if (result.rows.length === 0) {
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (error) {
            return done(error, null);
        }

    }));
passport.serializeUser((user, done) => {
    done(null, user.id);  // (user as { id: number }).id Use type assertion to say that 'user' has an 'id'
});
passport.deserializeUser(async (id, done) => {
    try {
        const result = await client.query("Select * from users where id=$1", [id],);
        if (result.rows.length === 0) {
            return done(null, false);
        }
        const user = result.rows[0];
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
export default passport;