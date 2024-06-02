import multer from "multer";
import path from "path";
import express from "express";
import {
  GET_REGISTER,
  GET_LOGIN,
  POST_REGISTER,
  POST_LOGIN,
  GET_ALLUSERS,
} from "../controller/controller.js";
import { User } from "../models/user.js";

export const router = express();

// multer
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/register", GET_REGISTER);
router.get("/login", GET_LOGIN);

// register post
router.post("/register", upload.single("file"), POST_REGISTER);

// post login
router.post("/LOGIN", POST_LOGIN);

// get allusers
router.get("/allusers", GET_ALLUSERS);
