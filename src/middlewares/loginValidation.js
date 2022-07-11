import joi from 'joi';
import bcrypt from 'bcrypt';
import { db } from '../db.js';
import { stripHtml } from "string-strip-html";

const loginSchema = joi.object({
    email: joi.required(),
    password: joi.required(),
});

async function loginValidation(req, res, next) {
    try {
        const body = req.body;

        for(const key of Object.keys(body) ){
            body[key]= stripHtml(body[key]).result.trim();
        };

        

        const {error} = loginSchema.validate(body);
        if (error) {
            const errorMessages=error.details.map(item=>item.message);
            let message='';
            errorMessages.forEach(err=>{
                if((/\"email\" is required/).test(err)){
                    return message+='Email field is required!\n';
                }
                if((/\"password\" is required/).test(err)){
                    return message+='Password field is required!\n';
                }
            });
            return res.status(422).send(message);
        }
        

        const user = await db.users.findOne({ email: body.email });
        if (!user) {
            return res.status(401).send('Invalid email or password.');
        }

        const hashCheck = await bcrypt.compare(body.password, user.passwordHash);
        if (!hashCheck) {
            return res.status(401).send('Invalid email or password.');
        }

        res.locals.user = user;
        next();

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export default loginValidation;
