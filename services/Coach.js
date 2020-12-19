const Coach = require('../schema/Coach')
var ObjectId = require('mongoose').Types.ObjectId; 

// Get one Coach by id
exports.getOne = async (id) => Coach.findById(id).populate({
                                  path: 'user_id',
                                  select: 'name email social photoUrl'
                                })

// Get Coach by user_id
exports.getByUserId = async (userId) => Coach.findOne({ userId: userId })

// Create Coach User
exports.create = async (newCoach) => {
  const newUser = await Coach.create(newCoach)
  return newUser
};

// Update one Coach by id
exports.update = async (id, newData) => {
  const updatedUser = await Coach.updateOne({ _id: id }, newData)
  return updatedUser.nModified
}
