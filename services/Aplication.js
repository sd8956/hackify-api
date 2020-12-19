const Aplication = require('../schema/Aplication')


// Create aplication
exports.create = async(newData) => {
  const newAplication = await Aplication.create(newData)
  return newAplication
}

// Update aplication
exports.update = async (id, newData) => {
  const updatedUser = await Aplication.updateOne({ _id: id }, newData)
  return updatedUser.nModified
}

// Get APliccation by userId
exports.getByUserId = async(userId) => Aplication.find({ userId: userId })

// Get APliccation by id
exports.getOne = async(id) => Aplication.findById(id)


exports.getPlacedAplications = async() => await Aplication.find({ status: "Placed" })
                                                          .populate({
                                                            path: 'userId',
                                                            select: 'name email social photoUrl'
                                                          })
