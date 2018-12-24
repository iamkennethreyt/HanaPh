const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const key = require("../../config/key").secretOrkey;

//load validation
const ValidateRegisterInput = require("../../validations/register");
const ValidateLoginInput = require("../../validations/login");
const validateAccountSettingsPasswordInput = require("../../validations/accountSettingsPassword");

//load User model
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ name: "hello world" }));

//@route    POST api/users/register/applicant
//@desc     register new user
//@access   public
router.post("/register/applicant", (req, res) => {
  const { errors, isValid } = ValidateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    errors.email = "Email already exists";
    if (user) {
      return res.status(400).json(errors);
    } else {
      const newUSer = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contactInfo: req.body.contactInfo,
        cityProvince: req.body.cityProvince,
        type: "applicant"
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUSer.password, salt, (err, hash) => {
          if (err) throw err;
          newUSer.password = hash;
          newUSer
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    POST api/users/register/employer
//@desc     register new user
//@access   public
router.post("/register/employer", (req, res) => {
  const { errors, isValid } = ValidateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    errors.email = "Email already exists";
    if (user) {
      return res.status(400).json(errors);
    } else {
      const newUSer = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contactInfo: req.body.contactInfo,
        cityProvince: req.body.cityProvince,
        details: req.body.details,
        completeAddress: req.body.completeAddress,
        type: "employer"
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUSer.password, salt, (err, hash) => {
          if (err) throw err;
          newUSer.password = hash;
          newUSer
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    POST api/users/login
//@desc     login user and returning  JWT web token
//@access   public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = ValidateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find User by Email
  User.findOne({ email }).then(user => {
    //chech user
    if (!user) {
      errors.email = "Email not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user  matched

        //create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.type
        };

        //sign token
        jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
          res.json({
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    PUT api/users/accountsettings
//@desc     account settings change password
//@access   private
router.put(
  "/accountsettings/password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAccountSettingsPasswordInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //check password
    bcrypt.compare(req.body.password, req.user.password).then(isMatch => {
      if (isMatch) {
        User.findById(req.user.id, (err, user) => {
          if (err) throw err;

          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;

            bcrypt.hash(req.body.password3, salt, (err, hash) => {
              if (err) throw err;

              user.password = hash;
              user
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        });
      } else {
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }
    });
  }
);

router.put(
  "/accountsettings",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = ValidateRegisterInput(req.body);

    // //check validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const userFields = {};

    if (req.body.name) userFields.name = req.body.name;
    if (req.body.email) userFields.email = req.body.email;
    if (req.body.details) userFields.details = req.body.details;
    if (req.body.contactInfo) userFields.contactInfo = req.body.contactInfo;
    if (req.body.cityProvince) userFields.cityProvince = req.body.cityProvince;

    User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: userFields },
      { new: true }
    ).then(user => res.json(user));
  }
);

//@route    GET api/users/current
//@desc     return current user
//@access   private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
