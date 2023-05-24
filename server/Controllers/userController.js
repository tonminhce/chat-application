const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey, {expiresIn: '1h'})
};

const registerUser = async (req, res) => {
    try{
        const {email, password, name} = req.body;
        let user = await userModel.findOne({email});
        if (user) return res.status(400).send("User already registered"); 
        if (!email || !password || !name) return res.status(400).send("Please fill all fields");
        if (!validator.isEmail(email)) return res.status(400).send("Please enter a valid email");
        if (!validator.isStrongPassword(password)) return res.status(400).send("Please enter a strong password");

        user = new userModel({name, email, password});

        const salt = bcrypt.genSaltSync(10);
        const token = createToken(user._id);
        res.status(200).json({_id: user._id, name, email, token});
        } catch (error) {
            res.status(500).json(error);
    }
};

module.exports = {registerUser};