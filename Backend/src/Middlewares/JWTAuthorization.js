export const jwtAuthorization = (roles = []) => {
    if (typeof roles === "string") {
        roles = [roles];
    }

    const checkRole = (req, res, next) => {
        if (roles.some(x => x === req.user.role)) {
            return next();
        }
        return res.status(403).json({message: "You Don't Have Authority To Access"});
    }

    return checkRole;
}