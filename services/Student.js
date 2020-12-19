const Student = require('../schema/Student')
const coachService = require('../services/Coach')
var mongoose = require('mongoose')

// Get one Student by id
exports.getOne = async (id) => await Student.findById(id).populate({
                                  path: 'user_id',
                                  select: 'name email social photoUrl'
                                })

// Get Student by user_id
exports.getByUserId = async (userId) => Student.findOne({ userId: userId })

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
                    .populate({
                      path: 'user_id',
                      select: 'name email social photoUrl'
                    })
}

// Create Student User
exports.create = async (newStudent) => {
  
  // update totalStudents of coach
  for (let i = 0; i < newStudent.tpCoaches.length; i++) {
    coachUserId = newStudent.tpCoaches[i]
    coach = await coachService.getByUserId(coachUserId)

    coach.totalStudents += 1
    console.log(coach)
    coachService.update(coach._id, coach)
  }

  const newUser = await Student.create(newStudent)
  return newUser
};

// Update one Student by userId
exports.update = async (userId, newData) => {
  const updatedUser = await Student.updateOne({ userId: userId }, newData)
  return updatedUser.nModified
}
