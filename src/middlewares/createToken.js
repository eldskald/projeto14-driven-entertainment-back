import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

async function createToken(_req, res, next) {
    try {
        const user = res.locals.user;
        await db.sessions.deleteMany({ userId: user._id });
        await db.sessions.insertOne({ userId: user._id });
        const session = await db.sessions.findOne({ userId: user._id });
        const token = jwt.sign(
            { sessionId: session._id },
            JWT_SECRET,
            { expiresIn: 60 * 60 * 24 * 30 }
        );
        
        res.locals.token = token;
        next();
        
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export default createToken;
