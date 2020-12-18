const Coach = require('../schema/Coach')

// Get one Coach by id
exports.getOne = async (id) => Coach.findById(id)

// Get Coach by user_id
exports.getByUserId = async (user_id) => Coach.findOne({ user_id: user_id })

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
