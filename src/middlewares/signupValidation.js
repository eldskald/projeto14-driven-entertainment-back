import joi from 'joi';
import { db } from '../db.js';

const signupSchema = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().email().required(),
    password:joi.string().pattern(/(?=.*?[A-Z])/).pattern(/(?=.*?[a-z])/).pattern(/(?=.*?[0-9])/).pattern(/(?=.*?[#?!@$%^&*-])/).min(8).required(),
    passwordConfirm: joi.string().required().valid(joi.ref('password'))
});

async function signupValidation(req, res, next) {
    try {
        const body = req.body;

        const {error} = signupSchema.validate(req.body,{abortEarly:false});
        if (error) {
            const errorMessages=error.details.map(item=>item.message);
            let message='';
            errorMessages.forEach(err=>{
                if((/\"name\" is required/).test(err)){
                    return message+='Name field is required!\n';
                }
                if(err.includes('"name" is not allowed to be empty')){
                    return message+='Name field is not allowed to be empty!\n';
                }
                if(err.includes('"name" length must be at least 3 characters long')){
                    return message+='Name length must be at least 3 characters long!\n';
                }
                if((/\"email\" is required/).test(err)){
                    return message+='Email field is required!\n';
                }
                if(err.includes('"email" is not allowed to be empty')){
                    return message+='Email field is not allowed to be empty\n';
                }
                if((/\"password\" is required/).test(err)){
                    return message+='Password field is required!\n';
                }
                if(err.includes('"password" is not allowed to be empty')){
                    return message+='Password field is not allowed to be empty!\n';
                }
                if((/\"passwordConfirm\" is required/).test(err)){
                    return message+='Confirm your password!\n';
                }
                if((/\"email" must be a valid email/).test(err)){
                    return message+='Email must be a valid email!\n';
                }
                if((/"passwordConfirm" must be/).test(err)){
                    return message+='Passwords must match!\n';
                }
                if(err.includes('"passwordConfirm" is not allowed to be empty')){
                    return message+='Confirm password is not allowed to be empty!'
                }
                if(err.includes("/(?=.*?[A-Z])/")){
                    return message+='Password must contains at least 1 capital character!\n';
                }
                if(err.includes("/(?=.*?[a-z])/")){
                    return message+='Password must contains at least 1 lower case character!\n';
                }
                if(err.includes("/(?=.*?[0-9])/")){
                    return message+='Password must contains at least 1 number!\n';
                }if(err.includes('/(?=.*?[#?!@$%^&*-])/')){
                    return message+='Password must contains at least 1 special character!\n';
                }if(err.includes('"password" length must be at least 8 characters long')){
                    return message+='Password must contains at least 8 characters long\n';
                }else{
                    return message+=err+'\n';
                }
            });
            return res.status(422).send(message);
        }

        const searchEmail = await db.users.findOne({ email: body.email });
        if (searchEmail) {
            return res.status(409).send('Email already registered!');
        }

        if (body.password !== body.passwordConfirm) {
            return res.status(401).send('Confirm the password!');
        }

        next();

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export default signupValidation;
