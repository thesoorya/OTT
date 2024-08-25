const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const { generateTokenAndCookie } = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ status: false, message: "Invalid email" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Password must be at least 6 characters",
        });
    }

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ status: false, message: "Email already exists" });
    }

    // Check if username already exists
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ status: false, message: "Username already exists" });
    }

    // Set random profile picture
    const profilePictures = ["/profile1.png", "/profile2.png", "/profile3.png"];
    const image =
      profilePictures[Math.floor(Math.random() * profilePictures.length)];

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10); // 10 is the salt rounds

    // Create the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password
      image,
    });

    // Save the user and generate token/cookie
    await newUser.save();
    generateTokenAndCookie(newUser._id, res);

    // Respond with user data (without the password)
    res.status(200).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "", // Remove password from the response
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    // Generate token and set cookie
    generateTokenAndCookie(user._id, res);

    // Respond with user data (without the password)
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "", // Remove password from the response
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt-store");
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};