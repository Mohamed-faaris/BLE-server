import mongoose from 'mongoose';

const { Schema } = mongoose;

const alertSchema = new Schema({
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
    },
    accuracy: {
        type: Number,
        required: true
    },
    uuid: {
        type: String,
        required: true,
        unique: true
    }
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;