const bcrypt = require('bcryptjs')
const {generateToken} = require('../lib/jwt');
const userService = require('../services/User');
const { errors } = require('../utils/constants');
const { okResponse, errorResponse } = require('../utils/utils');


exports.login = async (req, res) => {
  const { email, password } = req.body

  const user = await userService.getByEmail(email)
 
  if (user === null) {
    return errorResponse(res, errors.AUTHENTICATION_FAILED);
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
};

// Get one user
exports.getOne = async (req, res) => {
  try {
    const id = req.user._id

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS);
    }

    const user = await userService.getOne(id)

    return okResponse(res, 200, { user })
  } catch (err) {
    console.log('exports.getOne -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
};

// Create user
exports.create = async (req, res) => {
  const userData = req.body

  try {
    const newUSer = await userService.create(userData)

    if ((!newUSer.name, !newUSer.email, !newUSer.password)) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }

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
    console.log('exports.update -> err', err);
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
};