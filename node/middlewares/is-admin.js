const { ForbiddenError } = require('#errors');

const IsAdminMiddleware = async (req, res, next) => {

    const user = JSON.parse(req.state.user);
    
    if(user.role !== 'admin') {
        return next(new ForbiddenError({
            code: 'forbidden',
            text: 'У вас недостаточно прав',
            data: {}
        }));
    }
    
    next();
}

module.exports = IsAdminMiddleware;