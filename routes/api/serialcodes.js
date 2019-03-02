const express = require("express");

const router = express.Router();
//load validation
const ValidateSerialCodeInput = require("../../validations/ValidateSerialCodeInput");

//load User model
const SerialCode = require("../../models/SerialCode");

//@route    POST /api/workertypes
//@desc     Register new worker type
//@access   public
router.post(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateSerialCodeInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    SerialCode.findOne({ serialcode: req.body.serialcode }).then(wt => {
      errors.serialcode = "Serial Code type is already exists";
      if (wt) {
        return res.status(400).json(errors);
      } else {
        const newSC = new SerialCode({
          serialcode: req.body.serialcode
        });

        newSC.save().then(wt => res.json(wt));
      }
    });
  }
);

//@route    GET api/workertypes/
//@desc     Show all worker types
//@access   private
router.get("/", (req, res) => {
  const errors = {};
  errors.noprofile = "There are no Serial code available";
  SerialCode.find()
    .then(wt => {
      if (!wt) {
        return res.status(404).json(errors);
      }

      res.json(wt);
    })
    .catch(err => res.status(404).json(errors));
});

//@route    DELETE api/workertypes/:id
//@desc     Remove single worker types based on the params id
//@access   private
router.delete("/:id", (req, res) => {
  const errors = {};

  SerialCode.findOneAndDelete({ _id: req.params.id })
    .then(rmv => res.json(rmv))
    .catch(err => {
      res.status(400).json(err);
    });
  // res.json({ id: req.params.id });
});

module.exports = router;
