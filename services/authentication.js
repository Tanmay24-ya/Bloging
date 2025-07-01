const JWT = require("jsonwebtoken");

const secret = "$uperman@123";

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImage,
        role: user.role,
    };
    return JWT.sign(payload, secret, { expiresIn: "1d" });
}

function validateToken(token) {
    try {
        return JWT.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
};
