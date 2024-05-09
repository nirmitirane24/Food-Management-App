const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "Heyitsnirmitiranemakinmernapp$24"

router.post("/createuser", [
    body("email").isEmail(),
    body('name').isLength({ min:5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)



        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({ success: true }));

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }

    })

    router.post("/loginuser", [
        body("email").isEmail(),
        body('password', 'Incorrect Password').isLength({ min: 5 })
    ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            const { email, password } = req.body; // Destructure email and password from request body
    
            try {
                // Find user by email
                const userData = await User.findOne({ email: email });
                
                if (!userData) {
                    return res.status(400).json({ errors: "Try login with correct credentials " });
                }

                const pwdCompare = await bcrypt.compare(password, userData.password)
                // Check if password matches
                if (!pwdCompare) {
                    return res.status(400).json({ errors: "Try login with correct credentials " });
                }
                
                const data ={
                    user:{
                        id:userData.id
                    }
                }

                const authToken = jwt.sign(data, jwtSecret)
                return res.json({ success: true, authToken: authToken });
    
            } catch (error) {
                console.log(error);
                res.json({ success: false });
            }
        });
module.exports = router;