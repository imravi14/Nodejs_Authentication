import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { User } from "../models/user.js";

export const GET_REGISTER = (req, res) => {
  res.render("register");
};
export const GET_LOGIN = (req, res) => {
  res.render("login");
};

// post register
export const POST_REGISTER = async (req, res) => {
  const file = req.file.path;
  const { name, email, password } = req.body;

  try {
    const cloudinaryRes = await cloudinary.uploader.upload(file, {
      folder: "nodejs_authentication_app",
    });

    let user = await User.create({
      profileImg: cloudinaryRes.secure_url,
      name,
      email,
      password,
    });

    res.redirect("/login");

    console.log(cloudinaryRes, name, email, password);
  } catch (error) {
    res.send("Error Accure");
    console.log(error);
  }
};

// post login

export const POST_LOGIN = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      res.render("login.ejs", { msg: "user not found" });
    } else if (user.password != password) {
      res.render("login.ejs", { msg: "invalid password" });
    } else {
      res.render("profile.ejs", { user });
    }
  } catch (error) {
    res.send("error acoure");
    console.log(error);
  }
};

// get allusers
export const GET_ALLUSERS = async (req, res) => {
  let users = await User.find().sort({ createdAt: -1 });
  res.render("allusers.ejs", { users });
};
