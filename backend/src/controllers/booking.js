const { Booking } = require('./../models');

const save = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req.headers;
        const { date } = req.body;

        const booking = await Booking.create({
            spot: id,
            date,
            user,
        });
        await booking.populate('spot').populate('user').execPopulate();

        const conn = req.connectedUsers[booking.spot.user];
        if (conn) req.io.to(conn).emit('booking_request', booking);

        return res.json(booking);
    } catch (error) {
        return res.json(error.message);
    }
}

const approval = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        booking.approve = true;
        booking.save();

        return res.json(booking);

    } catch (error) {
        return res.json(error.message);
    }
}
const rejection = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        booking.approve = false;
        booking.save();

        return res.json(booking);

    } catch (error) {
        return res.json(error.message);
    }
}

module.exports = {
    save, approval, rejection
}