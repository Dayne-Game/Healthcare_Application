const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Resthome = require('../../models/Resthome');

// @route   POST api/resthomes
// @desc    Register resthome
// @access  Public
router.post(
  '/',
  [
    check('company', 'Company/Resthome name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, email, password } = req.body;

    try {
      let resthome = await Resthome.findOne({ email });

      if (resthome) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Resthome already exists' }] });
      }

      resthome = new Resthome({
        company,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      resthome.password = await bcrypt.hash(password, salt);

      await resthome.save();

      const payload = {
        resthome: {
          id: resthome.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
