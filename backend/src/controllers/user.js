const { User } = require('../models');

const save = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.send(error.message);
    }
}

module.exports = {
    save
}