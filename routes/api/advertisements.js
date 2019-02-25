const express = require("express");
const router = express.Router();
const passport = require("passport");
const nodemailer = require("nodemailer");

const transporter = require("../../config/key").transporter;
// Advertisement model
const Advertisement = require("../../models/Advertisement");

// Validation
const validateAdvertisementInput = require("../../validations/advertisement");

// @route   GET api/advertisements
// @desc    Show all advertisements which the status is true
// @access  Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Advertisement.find()
      .populate("user")
      .sort({ date: -1 })
      .then(ads => res.json(ads))
      .catch(err =>
        res
          .status(404)
          .json({ noadvertisementsfound: "No advertisements found" })
      );
  }
);

// @route   GET api/advertisements
// @desc    Show all advertisemtns where the advertisment user is equals to the login user
// @access  Public
router.get(
  "/owner",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Advertisement.find({ user: req.user.id })
      .populate("user")
      .populate("applicants.user")
      .sort({ date: -1 })
      .then(ads => res.json(ads))
      .catch(err =>
        res
          .status(404)
          .json({ noadvertisementsfound: "No advertisements found" })
      );
  }
);

// @route   GET api/advertisements/:id
// @desc    Get Advertisement by id
// @access  Public
router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Advertisement.findById(req.params.id)
      .populate("user")
      .populate("applicants.user")
      .then(adv => {
        if (adv) {
          res.json(adv);
        } else {
          res
            .status(404)
            .json({ noadvfound: "No Advertisement found with that ID" });
        }
      })
      .catch(err =>
        res
          .status(404)
          .json({ noadvfound: "No Advertisement found with that ID" })
      );
  }
);

// @route   POST /api/advertisements
// @desc    Create advertisement
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAdvertisementInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newAdv = new Advertisement({
      title: req.body.title,
      details: req.body.details,
      category: req.body.category,
      user: req.user.id
    });

    newAdv.save().then(adv => res.json(adv));
  }
);

// @route   PUT api/advertisements/:id
// @desc    Edit advertisement
// @access  Private
router.put(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAdvertisementInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const advFields = {};

    if (req.body.title) advFields.title = req.body.title;
    if (req.body.details) advFields.details = req.body.details;
    if (req.body.status) advFields.status = req.body.status;
    if (req.body.category) advFields.category = req.body.category;

    Advertisement.findOneAndUpdate(
      { user: req.user.id },
      { $set: advFields },
      { new: true }
    ).then(adv => res.json(adv));
  }
);

// @route   PUT api/advertisements/:id
// @desc    submit application in current advertisement based on the params id
// @access  Private
router.put(
  "/apply/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Advertisement.findOne({ _id: req.params.id }).then(ads => {
      const newApplicant = {
        user: req.user.id,
        message: req.body.message
      };
      ads.applicants.unshift(newApplicant);
      ads.save().then(ads => res.json(ads));
    });
  }
);

//@route    DELETE api/section/:id
//@desc     Remove single section based on the params id
//@access   private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Advertisement.findOneAndDelete({ _id: req.params.id }).then(rmv =>
      res.json(rmv)
    );
  }
);

// @route POST /upload
// @desc  send email
router.post(
  "/sendemail",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      applicantName,
      applicantEmail,
      companyname,
      message,
      companyemail
    } = req.body;

    const mailOptions = {
      from: applicantEmail,
      to: companyemail,
      subject: `Message from ${applicantName}`,
      text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json(error);
      } else {
        res.json({ success: info.response });
      }
    });
  }
);

// @route POST /upload
// @desc  send email to admin
router.post(
  "/sendemailtoadmin",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email, message } = req.body;
    const mailOptions = {
      from: email,
      to: "iamkennethreyt@gmail.com",
      subject: "Message from your Hanaph App",
      text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json(error);
      } else {
        res.json({ success: info.response });
      }
    });
  }
);
module.exports = router;
