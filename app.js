const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));


app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/questions', require('./routes/question.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`app has been started at port ${PORT}...`));
    } catch (e) {
        console.log('Error na Servere', e.message);
        console.log(config.get('mongoUri'));
        process.exit(1);
    }
}
start();
