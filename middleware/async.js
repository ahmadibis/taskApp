//trying to avoid try catch block everywhere
//so we set it in the wrapper 

const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req,res,next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrapper