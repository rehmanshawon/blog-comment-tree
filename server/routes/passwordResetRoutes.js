const express = require("express");
const dotenv = require("dotenv");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sgMail = require("@sendgrid/mail");

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.post(
  "/password/forgot",
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      user.passwordResetToken = crypto.randomBytes(20).toString("hex");
      user.passwordResetExpires = Date.now() + 3600000;
      await user.save();
      res.json({
        message:
          "I just sent a message to the email you provided with a link to reset your password. Please check your inbox and follow the instructions in the email.",
      });
      const passwordResetUrl = `http://${req.headers.host}/password/reset/${user.passwordResetToken}`;
      const msg = {
        to: user.email,
        from: "kopotronicblues@gmail.com",
        subject: "Reset your password",
        html: `<h1>Password Reset Instructions</h1>
        <p>Click on the link below to reset your password for your account.</p>
        <a style="font-weight:bold; font-size: 1rem" href=${passwordResetUrl}>Change my password</a>
        <p>The link will expire in an hour.</p>
        <p>Rehman Shawon</p>`,
      };
      (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);
          if (error.response) {
            console.error(error.response.body);
          }
        }
      })();
    } else {
      const err = new Error("No account with that email exists");
      err.status = 404;
      next(err);
    }
  })
);

router.post(
  "/password/reset/:token",
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (user) {
      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      const updatedUser = await user.save();
      //(updatedUser);
      res.json(updatedUser);
    } else {
      const err = new Error("Password reset token is invalid or has expired");
      err.status = 404;
      next(err);
    }
  })
);
module.exports = router;
