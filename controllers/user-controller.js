const { User, Thought } = require('../models');

const userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const userData = await User.find().select('-__v')
            res.json(userData);
        } 
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // get single user
    async getUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId }).select('-__v').populate('friends').populate('thoughts');
            if (!userData) {
                return res.status(404).json({ message: 'Sorry! No user found!' });
            }
            res.json(userData);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create user
    async newUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } 
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // update user
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {$set: req.body},
                {runValidators: true, new: true,}
            );

            if (!userData) {
                return res.status(404).json({ message: 'Sorry! User not found!' });
            }
            res.json(userData);
        } 
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete user and their thoughts
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userId })
            if (!userData) {
                return res.status(404).json({ message: "Sorry! User doesn't exist!" });
            }
        
            await Thought.deleteMany({ _id: { $in: userData.thoughts } });
            res.json({ message: "Everything's gone!" });
        } 
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add friend
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!userData) {
                return res.status(404).json({ message: "Oh no! It doesn't seem this user exist"});
            }
            res.json(userData);
        } 
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // remove friend
    async dropFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!userData) {
                return res.status(404).json({ message: 'No user found!' });
            }
            res.json(userData);
        } 
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = userController;