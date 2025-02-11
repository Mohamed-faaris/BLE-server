import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Alert from './models/model.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectToMongoDB();

app.use(express.json());

app.post('/alerts', async (req, res) => {
    try {
        const alert = new Alert(req.body);
        await alert.save();
        res.status(201).send(alert);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find({});
        res.status(200).send(alerts);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});