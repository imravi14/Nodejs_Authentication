import express from "express";
import mongoose from "mongoose";
import { router } from "./router/routes.js";
import path from "path";
const app = express();
const PORT = 5000;

//cloudinary
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dyesnjpv0",
  api_key: "527387678521449",
  api_secret: "sZhyc8UvVhznP844cupj2GZ77hE",
});

// middelware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// mongoose connect

mongoose
  .connect(
    "mongodb+srv://prajapatravi331:admin_ravi@cluster0.ujjwmfw.mongodb.net/",
    {
      dbname: "nodejs_express_api_servies",
    }
  )
  .then(() => {
    console.log("cotect to db");
    app.listen(PORT, () => {
      console.log(`server start on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

//   router
app.use(router);
