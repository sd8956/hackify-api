const Cohort = require('../schema/Cohort')

exports.getAll = async () => Cohort.find()

exports.getOne = async (id) => Cohort.findById(id)

exports.create = async (newData) => {
  const newCohort = await Cohort.create(newData)
  return newCohort
};