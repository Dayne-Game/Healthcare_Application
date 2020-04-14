const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// Get Resthome Model
const Resthome = require('../../models/Resthome');

// Get Resident Model
const Resident = require('../../models/Resident');

// @route   GET api/residents
// @desc    Get all residents associated to the logged in resthome
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const residents = await Resident.find({ resthomeid: req.resthome.id });
    res.json(residents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Get api/residents/:id
// @desc    Get a specific resident by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);

    // Check for ObjectId format and Resident
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !resident) {
      return res.status(404).json({ msg: 'Resident not found' });
    }

    // Check Resthome
    if (resident.resthomeid.toString() !== req.resthome.id) {
      return res.status(401).json({ msg: 'Resthome not authorized' });
    }

    res.json(resident);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/residents
// @desc    Add a Resident
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Resident name is required').not().isEmpty(),
      check('dob', 'Enter the Residents date of birth').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, dob, nhi, height, weight, bloodtype, gender } = req.body;

    try {
      const resthome = await Resthome.findById(req.resthome.id);

      const newResident = new Resident({
        name,
        dob,
        nhi,
        gender,
        resthomeid: req.resthome.id,
        height,
        weight,
        bloodtype,
      });

      const resident = await newResident.save();

      res.json(resident);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /api/residents/:id
// @desc    Update Selected Resident
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const resident = await Resident.findById(req.params.id);

  // Check for ObjectId format and Resident
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !resident) {
    return res.status(404).json({ msg: 'Resident not found' });
  } else {
    if (resident.resthomeid.toString() === req.resthome.id) {
      const { name, dob, nhi, gender, height, weight, bloodtype } = req.body;

      const residentFields = {
        name,
        dob,
        nhi,
        gender,
        resthomeid: req.resthome.id,
        height,
        weight,
        bloodtype,
      };

      Resident.findByIdAndUpdate({ _id: req.params.id }, residentFields, {
        new: true,
        useFindAndModify: false,
      })
        .then(() => {
          res.json({ msg: 'Resident Updated' });
        })
        .catch((err) => {
          res.status(404).json({ error: err });
        });
    } else {
      return res.status(401).json({ msg: 'You cannot access this data' });
    }
  }
});

// @route   DELETE api/residents/:id
// @desc    Delete Selected Resident
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);

    // Check if ObjectId format and resident
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !resident) {
      return res.status(404).json({ msg: 'Resident not found' });
    }

    // Check Resthome
    if (resident.resthomeid.toString() !== req.resthome.id) {
      return res.status(401).json({ msg: 'Resthome not authorized' });
    }

    await resident.remove();

    res.json({ msg: 'Resident has been removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/* ============================================================================== */
/* ============================================================================== */

// CONDITIONS

// @route   GET api/residents/conditions/:id
// @desc    Get all Conditions, asscoiated to a Resident
// @access  Private
router.get('/conditions/:id', auth, async (req, res) => {
  try {
    const resthome = await Resthome.findById(req.resthome.id);
    const resident = await Resident.findById(req.params.id);

    // Check for ObjectId format and Resident
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !resident.conditions) {
      return res.status(404).json({ msg: 'Condition not found' });
    } else {
      if (resident.resthomeid == req.resthome.id) {
        res.json(resident.conditions);
      } else {
        return res.status(401).json({ msg: 'You cannot access this data' });
      }
    }
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route   POST api/residents/conditions/:id
// @desc    Record Resident Conditons
// @access  Private
router.post(
  '/conditions/:id',
  [
    auth,
    [
      check('name', 'Please enter name of condition').not().isEmpty(),
      check('treatment', 'Please add the treatment for the condition')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const resthome = await Resthome.findById(req.resthome.id);
      const resident = await Resident.findById(req.params.id);

      const newCondition = {
        name: req.body.name,
        treatment: req.body.treatment,
        resthomeid: req.resthome.id,
      };

      if (resident.resthomeid.toString() === req.resthome.id) {
        resident.conditions.unshift(newCondition);

        await resident.save();
      } else {
        return res.status(401).json({ msg: 'You cannot access this data' });
      }

      res.json(resident.conditions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/residents/conditions/:id/:condition_id
// @desc    Delete specific condition from the Resident
// @access  Private
router.delete('/conditions/:id/:condition_id', auth, async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);

    // Pull out condition
    const condition = resident.conditions.find(
      (condition) => condition.id === req.params.condition_id
    );

    // Make sure condition exists
    if (!condition) {
      return res.status(404).json({ msg: 'Condition does not exist' });
    }

    // Check Resthome
    if (condition.resthomeid.toString() !== req.resthome.id) {
      return res.status(401).json({ msg: 'Resthome not authorized' });
    }

    resident.conditions = resident.conditions.filter(
      ({ id }) => id !== req.params.condition_id
    );

    await resident.save();

    return res.json(resident.conditions);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

/* ============================================================================== */
/* ============================================================================== */

// VITALS

// @route   GET api/residents/vitals/:id
// @desc    Get resident vitals
// @access  Private
router.get('/vitals/:id', auth, async (req, res) => {
  try {
    const resthome = await Resthome.findById(req.resthome.id);
    const resident = await Resident.findById(req.params.id);

    // Check for ObjectId format and Resident
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !resident.vitals) {
      return res.status(404).json({ msg: 'Resident Vitals not found' });
    } else {
      if (resident.resthomeid.toString() === req.resthome.id) {
        res.json(resident.vitals);
      } else {
        return res.status(401).json({ msg: 'You cannot access this data' });
      }
    }
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/residents/vitals/:id/:vital_id
// @desc    Delete specific vital from the Resident
// @access  Private
router.delete('/vitals/:id/:vital_id', auth, async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);

    // Pull out condition
    const vital = resident.vitals.find(
      (vital) => vital.id === req.params.vital_id
    );

    // Make sure condition exists
    if (!vital) {
      return res.status(404).json({ msg: 'Vital does not exist' });
    }

    // Check Resthome
    if (vital.resthomeid.toString() !== req.resthome.id) {
      return res.status(401).json({ msg: 'Resthome not authorized' });
    }

    resident.vitals = resident.vitals.filter(
      ({ id }) => id !== req.params.vital_id
    );

    await resident.save();

    return res.json(resident.vitals);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

/* ============================================================================== */
/* ============================================================================== */

// NOTES

// @route   GET api/residents/notes/:id
// @desc    Get all notes, asscociated to a Resident
// @access  Private
router.get('/notes/:id', auth, async (req, res) => {
  try {
    const resthome = await Resthome.findById(req.resthome.id);
    const resident = await Resident.findById(req.params.id);

    // Check for ObjectID format and Resident
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !resident.notes) {
      return res.status(404).json({ msg: 'Note not found' });
    } else {
      if (resident.resthomeid.toString() === req.resthome.id) {
        res.json(resident.notes);
      } else {
        return res.status(401).json({ msg: 'You cannot access this data' });
      }
    }
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// POST     api/residents/notes/:id
// @desc    Record Notes about the resident
// @access  Private
router.post(
  '/notes/:id',
  [
    auth,
    [
      check('text', 'Text is required').not().isEmpty(),
      check('name', 'Enter your name (not the resident)').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const resthome = await Resthome.findById(req.resthome.id);
      const resident = await Resident.findById(req.params.id);

      const newNote = {
        text: req.body.text,
        name: req.body.name,
        resthomeid: req.resthome.id,
      };

      if (resident.resthomeid.toString() === req.resthome.id) {
        resident.notes.unshift(newNote);

        await resident.save();
      } else {
        return res.status(401).json({ msg: 'You cannot access this data' });
      }

      res.json(resident.notes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/residents/notes/:id/:note_id
// @desc    Delete specific note from the Resident
// @access  Private
router.delete('/notes/:id/:note_id', auth, async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);

    // Pull out note
    const note = resident.notes.find((note) => note.id === req.params.note_id);

    // Make sure note exists
    if (!note) {
      return res.status(404).json({ msg: 'Note does not exist' });
    }

    // Check Resthome
    if (note.resthomeid.toString() !== req.resthome.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    resident.notes = resident.notes.filter(
      ({ id }) => id !== req.params.note_id
    );

    await resident.save();

    return res.json(resident.notes);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// POST     api/residents/heartrate/:id
// @desc    Record Heartrate about the resident
// @access  Private
router.post(
  '/heartrate/:id',
  [auth, [check('heartrate', 'Heartrate is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const resthome = await Resthome.findById(req.resthome.id);
      const resident = await Resident.findById(req.params.id);

      const newHeartrate = {
        heartrate: req.body.heartrate,
        resthomeid: req.resthome.id,
        date: Date.now(),
      };

      if (resident.resthomeid.toString() === req.resthome.id) {
        resident.heartrate.unshift(newHeartrate);

        await resident.save();
      } else {
        return res.status(401).json({ msg: 'You cannot access this data' });
      }

      res.json(resident.heartrate);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// POST     api/residents/bloodpressure/:id
// @desc    Record Heartrate about the resident
// @access  Private
router.post(
  '/bloodpressure/:id',
  [
    auth,
    [check('bloodpressure', 'Blood Pressure is Required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const resthome = await Resthome.findById(req.resthome.id);
      const resident = await Resident.findById(req.params.id);

      const newBloodpressure = {
        bloodpressure: req.body.bloodpressure,
        date: Date.now(),
      };

      if (resident.resthomeid.toString() === req.resthome.id) {
        resident.bloodpressure.unshift(newBloodpressure);

        await resident.save();
      } else {
        return res.status(401).json({ msg: 'You cannot access this data' });
      }

      res.json(resident.bloodpressure);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
