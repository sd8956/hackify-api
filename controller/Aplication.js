const aplicationService = require('../services/Aplication')
const { errors } = require('../utils/constants')
const { okResponse, errorResponse } = require('../utils/utils')


exports.getOne = async(req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }

    const aplication = await aplicationService.getOne(id)

    return okResponse(res, 200, { aplication })
  } catch (err) {
    console.log('exports.getOne -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}

exports.getByAuthUser = async(req, res) => {
  try {
    const userId = req.user._id
    const aplications = await aplicationService.getByUserId(userId)

    return okResponse(res, 200, { aplications })
  } catch (err) {
    console.log('exports.getByUserId -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)    
  }
}

exports.getByUserId = async(req, res) => {
  try {
    const userId = req.params.id
    const aplications = await aplicationService.getByUserId(userId)

    return okResponse(res, 200, { aplications })
  } catch (err) {
    console.log('exports.getByUserId -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)    
  }
}

exports.getPlacedAplications = async(req, res) => {
  try {
    const aplications = await aplicationService.getPlacedAplications()

    return okResponse(res, 200, { aplications }) 
  } catch (err) {
    console.log('exports.getPlacedAplications -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)       
  }
}

exports.create = async(req, res) => {
  try {
    const aplicationData = req.body

    if ((!aplicationData.companyName, !aplicationData.position, !aplicationData.userId)) {
      return errorResponse(res, errors.MISSING_REQUIRED_FIELDS)
    }

    const newAplication = await aplicationService.create(aplicationData)

    return okResponse(
      res,
      201,
      { aplication: newAplication },
      'Aplicación creado correctamente',
    );
  } catch (err) {
    console.log('exports.create -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}

exports.update = async(req, res) => {
  try {
    const id = req.params.id
    const newData = req.body

    const updatedAplication = await aplicationService.update(id, newData)

    return okResponse(res, 200, { updatedAplication })
  } catch (err) {
    console.log('exports.update -> err', err)
    return errorResponse(res, errors.INTERNAL_ERROR, err)
  }
}
