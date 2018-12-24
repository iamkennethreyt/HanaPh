const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Advertisement model
const Advertisement = require("../../models/Advertisement");

// Validation
const validateAdvertisementInput = require("../../validations/advertisement");

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Advertisement.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/advertisements/:id
// @desc    Get Advertisement by id
// @access  Public
router.get("/:id", (req, res) => {
  Advertisement.findById(req.params.id)
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
});

// @route   POST api/posts
// @desc    Create post
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
      user: req.user.id
    });

    newAdv.save().then(adv => res.json(adv));
  }
);

// @route   PUT api/advertisements/:id
// @desc    Edit advertisment
// @access  Private
router.put(
  "/:id",
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

    Advertisement.findOneAndUpdate(
      { user: req.user.id },
      { $set: advFields },
      { new: true }
    ).then(adv => res.json(adv));
  }
);

// @route   DELETE api/advertisements/:id
// @desc    Delete advertisment
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Advertisement.find({ user: req.user.id })
      .deleteOne({
        _id: req.params.id
      })
      .then(() => res.json({ success: "Succesfully Deleted" }))
      .catch(err =>
        res
          .status(404)
          .json({ unabletodelete: "deleting the data not successfully" })
      );
  }
);

module.exports = router;
