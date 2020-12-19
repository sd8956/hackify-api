const User = require('../schema/User')
const bcrypt = require('bcryptjs')

// Get one user by id
exports.getOne = async (id) => User.findById(id)

// Get user by email
exports.getByEmail = async (email) => User.findOne({ email: email })

// Get all user with rol coach: name and _id
exports.getAllUserCoach = async () => User.find({ role: 'coach' }, 'name')

// Create one User
exports.create = async (userData) => {
  const password = await bcrypt.hash(userData.password, 7)

  const newData = {
    ...userData,
    password: password
  }

  const newUser = await User.create(newData)
  return newUser
};

// Update one User by id
exports.update = async (id, newData) => {
  const updatedUser = await User.updateOne({ _id: id }, newData)
  return updatedUser.nModified
}
