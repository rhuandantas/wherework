const { Spot, User } = require('../models');

const save = async (req, res) => {
    try {
        const { filename } = req.file;
        const { userid } = req.headers;
        const { company, techs, price } = req.body;

        const user = await User.findById(userid);

        if (!user) return res.status(400).json("User not found");

        const spot = await Spot.create({
            thumbnail: filename,
            company,
            price,
            techs: stringToArray(techs),
            user: userid
        });
        return res.status(201).json(spot);
    } catch (error) {
        return res.send(error.message);
    }
}

const getByTechs = async (req, res) => {
    try {
        const { tech } = req.query;
        const spots = await Spot.find({
            techs: tech.toLowerCase()
        });

        return res.json(spots)
    } catch (error) {
        return res.json(error.message)
    }
}

const getByUserID = async (req, res) => {
    try {
        const { user } = req.headers;
        const spots = await Spot.find({
            user
        });

        return res.json(spots)
    } catch (error) {
        return res.json(error.message)
    }
}

const stringToArray = str => str.split(',').map(item => item.trim().toLowerCase());

module.exports = {
    save, getByTechs, getByUserID
}