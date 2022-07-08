import joi from 'joi';

const cartSchema = joi.array().items(
    joi.object({
        prodId: joi.string().required(),
        name: joi.string().required(),
        coverUrl: joi.string().required(),
        category: joi.string().valid('Movie', 'Video Game').required(),
        price: joi.number().required()
}))

function cartValidation(req, res, next) {
    try {
        const body = req.body;
        const { error } = cartSchema.validate(body);
        if (error) {
            return res.sendStatus(422);
        }

        res.locals.cart = body;
        next();

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export default cartValidation;
