import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import { client } from "./connectDb";
passport.use(new LocalStrategy(
    // options
    {usernameField:'email',passwordField:'password'},
    // verify fn
    async function verify(email:string,password:string,done:any){
        client.query("Select * from users where email=$1",[email],).then((err,user)=>{
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Incorrect username or password.' }); }
            
        })
    }));
    // C:\Users\abdul\Documents\portfolio\portfolio-backend\node_modules\passport-local\lib\strategy.js