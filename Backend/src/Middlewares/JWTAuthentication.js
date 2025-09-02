import jwt from "jsonwebtoken";

export const jwtAuthentication = (req, res, next) => {
    try {
        const passList = ["login", "register"];
        const path = req.originalUrl.split("/").at(-1);

        if (passList.some(x => x === path)) {
            return next();
        }

        const header = req.headers.authorization ?? "";

        if (header) {
            const token = header.split(" ")[1];
            
            jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
                if (error) {
                    return res.status(401).json({message: "Need Valid Authentication Credentials"})
                }
                req.user = user;
            });
            return next();
        }

        return res.status(401).json({message: "Need Token"})
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}