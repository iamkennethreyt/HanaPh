const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Advertisement model
const Application = require("../../models/Application");

// @route   GET api/applications
// @desc    Get applications
// @access  Public
router.get("/", (req, res) => {
  Application.find()
    .sort({ date: -1 })
    .then(apps => res.json(apps))
    .catch(err =>
      res.status(404).json({ Application: "No applications found" })
    );
});

// @route   GET api/advertisements/:id
// @desc    Get Advertisement by id
// @access  Public
router.get("/:id", (req, res) => {
  Application.findById(req.params.id)
    .then(aps => {
      if (aps) {
        res.json(aps);
      } else {
        res
          .status(404)
          .json({ Application: "No Application found with that ID" });
      }
    })
    .catch(err =>
      res
        .status(404)
        .json({ noadvfound: "No Advertisement found with that ID" })
    );
});

// @route   POST api/applications
// @desc    submit applications to the advertisement
// @access  Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newAdv = new Application({
      advertisement: req.params.id,
      user: req.user.id
    });

    newAdv.save().then(adv => res.json(adv));
  }
);

module.exports = router;
