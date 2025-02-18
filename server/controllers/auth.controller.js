const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { name, email, password, role } = req.body; 
    try {
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role === 'admin' ? 'admin' : 'user'
        });
        const { password: userPassword, ...userInfo } = newUser._doc;
        console.log("New user created:", newUser);
        res.status(201).json({ userInfo });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Failed to register user" });
    }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    const {password:userPassword, ...userInfo} = user._doc;
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    }).status(200).json(userInfo);
    }catch(err){
        console.error("Error in login:", err);
        res.status(500).json({message: "Failed to login"});

    }
};




const logout = async (req, res) => {
    try {
        res.clearCookie('token').status(200).json({message: "Logged out"});
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({message: "Failed to logout"});
    }
}

module.exports = { register, login, logout };
