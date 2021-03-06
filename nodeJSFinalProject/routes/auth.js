const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();


//signing in by email and password
router.post('/', async (req, res) => {
 
    const { error } = validateSignIn(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');
   
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
   
    res.json({ token: user.generateAuthToken() }); // creating and sending the token to the browser
   
  });
   
  function validateSignIn(data) {
   
    const schema = Joi.object({
      email: Joi.string().min(6).max(255).required().email(),
      password: Joi.string().min(6).max(1024).required()
    });
   
    return schema.validate(data);
  }
 
module.exports = router;