const cohortService = require('../services/Cohort')
const { errors } = require('../utils/constants')
const { okResponse, errorResponse } = require('../utils/utils')

exports.getOne = async(req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }

    const cohort = await cohortService.getOne(id)

    return okResponse(res, 200, { cohort })
  } catch (err) {
    console.log('exports.getOne -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}

exports.getAll = async(req, res) => {
  try {
    const cohort = await cohortService.getAll()

    return okResponse(res, 200, { cohort })
  } catch (err) {
    console.log('exports.getAll -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}

exports.create = async(req, res) => {
  const cohortData = req.body

  try {
    if ((!cohortData.number)) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }

    const newCohort = await cohortService.create(cohortData)

    return okResponse(
      res,
      201,
      { coach: newCohort },
      'Cohort creado correctamente',
    );
  } catch (err) {
    console.log('exports.create -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}