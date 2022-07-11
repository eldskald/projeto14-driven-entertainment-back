import { db } from '../db.js';

export function getLibrary(_req, res) {
    const user = res.locals.user;
    if (Object.keys(user).length === 0) {
        return res.sendStatus(403);
    }

    const library = user.library;
    if (!library) {
        return res.status(200).send([]);
    }

    return res.status(200).send(library);
}

export async function updateCart(_req, res) {
    try {
        const user = res.locals.user;
        if (Object.keys(user).length === 0) {
            return res.sendStatus(200);
        }

        const cart = res.locals.cart;
        await db.users.updateOne(
            {
                _id: user._id
            },
            { $set: {
                ...user,
                cart
            }}
        );

        return res.sendStatus(200);

    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function checkout(_req, res) {
    try {
        const user = res.locals.user;
        if (Object.keys(user).length === 0) {
            return res.sendStatus(403);
        }

        const cart = user.cart;
        if (!user.library) {
            await db.users.updateOne(
                {
                    _id: user._id
                },
                { $set: {
                    ...user,
                    cart: [],
                    library: [...cart]
                }}
            );
        } else {
            await db.users.updateOne(
                {
                    _id: user._id
                },
                { $set: {
                    ...user,
                    cart: [],
                    library: [...user.library, ...cart]
                }}
            );
        }

        return res.sendStatus(200);

    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
}
