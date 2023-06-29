import Joi from "joi-oid"

const schema = Joi.object({
    name: Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages(
            {
                'string.min': 'The song title must be at least 2 characters',
                'string.max': 'The song title must be 30 characters long max',
                'string.empty': 'The song title cannot be empty',
                'any.required': 'A title is required',
            }
        ),
    original_name: Joi
        .string()
        .min(2)
        .max(30)
        .messages(
            {
                'string.min': 'The original name must be at least 2 characters',
                'string.max': 'The original name must be 30 characters long max',
            }
        ),
    author: Joi
        .string()
        .min(2)
        .max(30)
        .messages(
            {
                'string.min': 'The author name must be at least 2 characters',
                'string.max': 'The author name must be 30 characters long max',
            }
        ),
    biblic_reference: Joi
        .string()
        .min(7)
        .max(25)
        .pattern(/^[a-zA-Z]+\s[a-zA-Z]+(:\d+)?|\d+\s[a-zA-Z]+\s\d+:\d+$/)
        .messages(
            {
                'string.min': 'The reference must be at least 7 characters long, e.g. job 1:1',
                'string.max': 'The reference name cannot exceed 25 characters long',
                'string.pattern.base': 'The reference must have at least 2 parts e.g. job 1:1 (name and verse separated by :)'
            }
        ),
    lyrics: Joi
        .string()
        .required()
        .messages(
            {
                'any.required': 'Your song must have lyrics',
            }
        )
})

export default schema
