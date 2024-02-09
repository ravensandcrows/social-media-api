const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  newUser,
  updateUser,
  deleteUser,
  addFriend,
  dropFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getAllUsers).post(newUser);

// /api/users/:userId
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(dropFriend);

module.exports = router;