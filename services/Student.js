const Student = require('../schema/Student')
const coachService = require('../services/Coach')
var mongoose = require('mongoose')

// Get one Student by id
exports.getOne = async (id) => await Student.findById(id).populate({
                                  path: 'userId',
                                  select: 'name email social photoUrl'
                                })                                
                                .populate({
                                  path: 'cohort',
                                  select: 'number start_talent_placement'
                                })

// Get Student by user_id
exports.getByUserId = async (userId) => Student.findOne({ userId: userId })
                                          .populate({
                                            path: 'cohort',
                                            select: 'number start_talent_placement'
                                          })

// Get students by cohort and coach_id
exports.getFilterStudents = async (coachId, cohort) => {
    let query = {}

    if (coachId) {
        query = {
            tpCoaches: { "$in": [coachId] }
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
                      path: 'userId',
                      select: 'name email social photoUrl'
                    })
                    .populate({
                      path: 'cohort',
                      select: 'number start_talent_placement'
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
