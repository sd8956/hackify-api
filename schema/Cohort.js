const mongoose = require('mongoose')

const { Schema } = mongoose

const CohortSchema = new Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    start_talent_placement: {
      type: Date,
      required: false,
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

module.exports = mongoose.model('Cohort', CohortSchema)