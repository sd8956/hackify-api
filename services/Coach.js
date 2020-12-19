const Coach = require('../schema/Coach')

// Get one Coach by id
exports.getOne = async (id) => Coach.findById(id).populate({
                                  path: 'userId',
                                  select: 'name email social photoUrl'
                                })
                                .populate({
                                  path: 'cohort',
                                  select: 'number start_talent_placement'
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
