const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find().sort({ createdAt: -1 });
      res.json(thoughtData);
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get thought by id
  async getThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thoughtData) {
        return res.status(404).json({ message: "Oh no! There doesn't seem to be a thought!" });
      }
      res.json(thoughtData);
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // create thought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);

      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } },
        { new: true }
      );

      //catch if there is no user signed in when thought is made
      if (!userData) {
        return res.status(404).json({ message: 'Thought created but no user exists! Please sign in!' });
      }
      res.json({ message: 'You created a thought!' });
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // update thought
  async updateThought(req, res) {
    const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });

    if (!thoughtData) {
      return res.status(404).json({ message: "This thought doesn't seem to exist yet!" });
    }
    res.json(thoughtData);
    console.log(err);
    res.status(500).json(err);
  },

  // delete thought
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId })

      if (!thoughtData) {
        return res.status(404).json({ message: "Can't delete something that doesn't exist!" });
      }

      // update user's associated thoughts
      const userData = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!userData) {
        return res.status(404).json({ message: "We can't delete this until we know who thunk this thought!" });
      }
      res.json({ message: 'Thought deleted!' });
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add reaction
  async makeReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: "You can't react to something that doesn't exist!" });
      }
      res.json(thoughtData);
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // remove reaction
  async removeReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: "There's no thought here!" });
      }
      res.json(thoughtData);
    } 
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;