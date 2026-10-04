export const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: [result.error.flatten()],
            });
        }

        req.validatedBody = result.data;
        next();
    };
};

export const validateParams = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: [result.error.flatten()],
            });
        }

        req.validatedParams = result.data;
        next();
    };
};

export const validateQuery = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: [result.error.flatten()],
            });
        }

        req.validatedQuery = result.data;
        next();
    };
};
