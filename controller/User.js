const bcrypt = require('bcryptjs')
const {generateToken} = require('../lib/jwt');
const userService = require('../services/User');
const studentService = require('../services/Student')
const coachService = require('../services/Coach')
const { errors } = require('../utils/constants');
const { okResponse, errorResponse } = require('../utils/utils');


exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await userService.getByEmail(email)
  
    if (!user) {
      return errorResponse(res, errors.AUTHENTICATION_FAILED)
    }
    const validatePassword = await bcrypt.compare(password, user.password)
    if (validatePassword){
      const token = await generateToken({
        id: user._id,
      })
      return okResponse(res, 200, { token })
    } else {
      return errorResponse(res, errors.AUTHENTICATION_FAILED)
    }
  } catch (err) { 
    console.log('exports.login -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
};

exports.getAllCoach = async(req, res) => {
  try {
    const coaches = await userService.getAllUserCoach()

    if(!coaches) {
      return errorResponse(res, errors.NOT_FOUND)
    }
  
    return okResponse(res, 200, { coaches })
  } catch (err) { 
    console.log('exports.getAllCoach -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}

// Get one user
exports.getOne = async (req, res) => {
  try {
    const id = req.user._id

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }

    const user = await userService.getOne(id)
    let extraInfo = {}

    if (user.role == "student") {
      extraInfo = await studentService.getByUserId(user._id)
    } else {
      extraInfo = await coachService.getByUserId(user._id)
    }

    return okResponse(res, 200, { user, extraInfo })
  } catch (err) {
    console.log('exports.getOne -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
};

// Create user
exports.create = async (req, res) => {
  const userData = req.body

  try {
    if ((!userData.name, !userData.email, !userData.password)) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }

    const newUSer = await userService.create(userData)

    return okResponse(
      res,
      201,
      { user: newUSer },
      'Usuario creado correctamente',
    );
  } catch (err) {
    console.log('exports.create -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
};

// Update user
exports.update = async (req, res) => {
  try {
    const id = req.user._id
    const newData = req.body

    const updatedUser = await userService.update(id, newData)

    return okResponse(res, 200, { updatedUser })
  } catch (err) {
    console.log('exports.update -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
};