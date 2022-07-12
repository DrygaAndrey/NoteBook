const { Router } = require('express');
const bcryprt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();
const User = require('../models/User');

// /api.auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const isValidateSuccess = validateForm(email, password);
        if (isValidateSuccess) {
            console.log('Результат валидации', isValidateSuccess);
            return res.status(400).json({ message: isValidateSuccess });
        }

        const candidate = await User.findOne({ email: email })

        if (candidate) {
            return res.status(400).json({ message: "User with this email already exists" });
        };

        const hashedPassword = await bcryprt.hash(password, 12);
        const user = new User({ email: email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User created" });

    } catch (e) {
        res.status(500).json({ message: `error in router.post(/register):${e}` });
    }
});

// /api.auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const isValidateSuccess = validateForm(email, password);
        if (isValidateSuccess) {
            console.log('Результат валидации', isValidateSuccess);
            return res.status(400).json({ message: isValidateSuccess });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "There are no user with this email" })
        }
        const isMatch = await bcryprt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "User with this email have another password" })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );
        res.json({ token, userId: user.id });
    } catch (e) {
        res.status(500).json({ message: `error in router.post(/login):${e.message}` })
    }
});

function validateForm(email, password) {
    if (!email || !password) {
        return 'Password and email should not be empty';
    };

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return 'Email is invalid';
    };

    const minimum8Chars = /^.{8,}$/
    const containsNotEnglishLetters = /^[a-zA-Z0-9]+$/;
    if (!minimum8Chars.test(password)) {
        return 'Password should containt atleast 8 symbols';
    };
    if (password.includes(' ')) {
        return 'Password should not contain spaces';
    };
    if (!containsNotEnglishLetters.test(password)) {
        return 'Password should contain only english letters';
    };
}

module.exports = router;
