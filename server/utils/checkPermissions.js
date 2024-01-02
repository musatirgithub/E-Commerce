const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId)=>{
    if(requestUser.role === 'admin') return;
    if(requestUser.userId === resourceUserId.toString()) return;
    throw new CustomError.UnauthorizedError('You are not authorized');
}

module.exports = checkPermissions;