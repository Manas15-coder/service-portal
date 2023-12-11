const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

//register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        //validation

        if (!username || !email || !password || !phone) {
            return res.status(400).send({ success: 'false', message: "Please fill all the fields" });
        }
        //existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status({ success: 'false', message: 'user already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        //save user
        const user = new userModel({ username, email, password: hashedPassword, phone });
        await user.save();
        return res.status(201).send({ success: 'true', message: 'New user created', user })
    } catch (error) {
        console.log(error);
        return res.status(501).send({ success: 'false', message: 'Error in register user' })
    }
}

//get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.findOne({});
        return res.status(200).send({ userCount: users.length, success: 'true', message: 'all users data', users });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: 'false',
            message: 'Error in get all users',
            error,
        });
    }
}

//login 
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email or password"
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'email is not registered',
            });
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid username or password'
            });
        }
        return res.status(200).send({ success: true, message: 'login successfully', user })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login callback',
            error,
        });
    }
}