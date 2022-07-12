const { Router } = require('express');
const bcryprt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();
const User = require('../models/User');
const Question = require('../models/Question');

// /api/questions
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const questions = await Question.find({ owner: userId });
        return res.status(200).json(questions);
    } catch (e) {
        res.status(500).json({ message: `error in /questions GET:${e.message}` });
    }
});

// /api/questions/add
router.post('/add', async (req, res) => {
    try {
        const { userId, questionTitle } = req.body;
        if (!userId && !questionTitle) {
            return res.status(400).json({ message: "userId or questionTitle undefined" });
        }
        const question = new Question({ owner: userId, title: questionTitle })
        await question.save();

        res.status(201).json({ message: "Question added" });
    } catch (e) {
        res.status(500).json({ message: `error in /questions ADD:${e.message}` });
    }
});

// /api/questions/delete
router.post('/delete', async (req, res) => {
    try {
        const { questionId } = req.body;
        await Question.deleteOne({ _id:questionId});
        res.status(201).json({ message: "Question deleted" });
    } catch (e) {
        res.status(500).json({ message: `error in /questions delete:${e.message}` });
    }
});


module.exports = router;
