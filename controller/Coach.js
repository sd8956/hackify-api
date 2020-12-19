const coachService = require('../services/Coach')
const { errors } = require('../utils/constants');
const { okResponse, errorResponse } = require('../utils/utils');

exports.getOne = async(req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }

    const coach = await coachService.getOne(id)

    return okResponse(res, 200, { coach })
  } catch (err) {
    console.log('exports.getOne -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}

exports.create = async(req, res) => {
  const coachData = req.body

  try {
    if ((!coachData.userId)) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }

    const newCoach = await coachService.create(coachData)

    return okResponse(
      res,
      201,
      { coach: newCoach },
      'Usuario creado correctamente',
    );
  } catch (err) {
    console.log('exports.create -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}
