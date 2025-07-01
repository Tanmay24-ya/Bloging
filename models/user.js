const { createHmac, randomBytes } = require('crypto');
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require('../services/authentication');

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: { type: String },
    password: { type: String, required: true },
    profileImage: { type: String, default: "./images/default.png" },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(this.password)
        .digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
    next();
});

userSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User Not Found');

    const hash = createHmac('sha256', user.salt)
        .update(password)
        .digest('hex');

    if (hash !== user.password) throw new Error('Incorrect Password');

    return createTokenForUser(user);
});

module.exports = model('user', userSchema);
