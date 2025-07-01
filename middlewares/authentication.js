const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) return next();

        const userPayload = validateToken(tokenCookieValue);
        if (userPayload) {
            req.user = userPayload;
            req.user_id = userPayload._id;
        }

        return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
