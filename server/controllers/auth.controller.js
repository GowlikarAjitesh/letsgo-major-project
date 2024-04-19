import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    // next(errorHandler(500, "something went wrong.."));
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "No user found!"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials!"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const username = req.body.email.split("@")[0]; // Extract username from email
      const newUser = new User({
        username: username,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Logout success!");
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "No user found!"));
    }
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m", // Token expires in 1 hour
    });
    const resetLink = `http://localhost:5173/reset-password/${user._id}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ajiteshgowlikar@gmail.com", // Replace with your Gmail email
        pass: "gltm olxf ndpz eibh", // Replace with your Gmail password
      },
    });

    const mailOptions = {
      from: "ajiteshgowlikar@gmail.com", // Replace with your Gmail email
      to: email,
      subject: "Reset Password",
      html: `<p>Dear user,</p><p>You have requested to reset your password. Click the link below to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p><p>If you did not request this, please ignore this email.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return next(errorHandler(500, "Error sending email"));
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ status: true, message: "Email sent" });
      }
    });
    console.log(resetLink);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return next(errorHandler(401, 'User not found!'));
    }
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    const userId = decoded.id;
    if (userId !== id) {
      return next(errorHandler(401, 'Invalid token!'));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};