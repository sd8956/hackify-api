const studentService = require('../services/Student')
const { errors } = require('../utils/constants')
const { okResponse, errorResponse } = require('../utils/utils')

exports.getOne = async(req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }

    const student = await studentService.getOne(id)

    return okResponse(res, 200, { student })
  } catch (err) {
    console.log('exports.getOne -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}

exports.getFilteredStudents = async(req, res) => {
  try {
    
    const { coachId, cohort } = req.query

    const students = await studentService.getFilterStudents(coachId, cohort)

    return okResponse(res, 200, { students })
  } catch (err) {
    console.log('exports.getFilteredStudents -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}

exports.create = async(req, res) => {
  const studentData = req.body

  try {
    if ((!studentData.cohort, !studentData.positioned, !studentData.userId, !studentData.tpCoaches)) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }
    
    const newCoach = await studentService.create(studentData)

    return okResponse(
      res,
      201,
      { coach: newCoach },
      'Estudiante creado correctamente',
    );
  } catch (err) {
    console.log('exports.create -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}

exports.update = async (req, res) => {
  try {
    const userId = req.user._id
    const newData = req.body

    const updatedStudent = await studentService.update(userId, newData)

    return okResponse(res, 200, { updatedStudent })
  } catch (err) {
    console.log('exports.update -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
};