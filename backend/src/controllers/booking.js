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
        return res.json(booking);
    } catch (error) {
        return res.json(error.message);
    }
}

module.exports = {
    save
}