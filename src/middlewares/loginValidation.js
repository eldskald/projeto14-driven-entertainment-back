import joi from 'joi';
import bcrypt from 'bcrypt';
import { db } from '../db.js';

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

async function loginValidation(req, res, next) {
    try {
        const body = req.body;

        const joiValidation = loginSchema.validate(body);
        if (joiValidation.error) {
            return res.status(422).send('Fill the fields correctly!');
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
