const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: String,
    approve: Boolean,
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Booking', bookingSchema);