import joi from 'joi';
import { db } from '../db.js';

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirm: joi.string().required()
});

async function signupValidation(req, res, next) {
    try {
        const body = req.body;

        const joiValidation = signupSchema.validate(req.body);
        if (joiValidation.error) {
            return res.status(422).send('Fill the fields correctly!');
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
