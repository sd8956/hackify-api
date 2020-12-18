const Student = require('../schema/Student')

// Get one Student by id
exports.getOne = async (id) => Student.findById(id)

// Get Student by user_id
exports.getByUserId = async (user_id) => Student.findOne({ user_id: user_id })

// Get students by cohort and coach_id
exports.getFilterStudents = async (coach_id, cohort) => {
    let query = {}

    if (coach_id) {
        query = {
            tpCoaches: { "$in": [coach_id] }
        }
    }

    if (cohort) {
        query = {
            ...query,
            cohort: cohort
        }
    }

    return await Student.find(query)
}

// Create Student User
exports.create = async (newStudent) => {
  const newUser = await Student.create(newStudent)
  return newUser
};

// Update one Student by id
exports.update = async (id, newData) => {
  const updatedUser = await Student.updateOne({ _id: id }, newData)
  return updatedUser.nModified
}
