import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import { db } from '../db.js';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

async function tokenValidation (req, res, next) {
    try {

        const { authorization } = req.headers;
        if (authorization === undefined) {
            res.locals.user = {};
            return next();
        }

        const token = authorization?.replace('Bearer ', '');
        const { sessionId } = jwt.verify(token, JWT_SECRET);
        const session = await db.sessions.findOne({ _id: ObjectId(sessionId) });
        if (!session) {
            return res.sendStatus(401);
        }

        const user = await db.users.findOne({ _id: session.userId });
        if (!user) {
            return res.sendStatus(401);
        }

        res.locals.user = user;
        next();

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export default tokenValidation;
