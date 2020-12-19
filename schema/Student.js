const mongoose = require('mongoose')

const { Schema } = mongoose

const StudentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    positioned: {
      type: Boolean,
      required: true
    },
    areas: [{
        type: String,
        enum: ['Frontend', 'Backent', 'Datascience']
    }],
    cohort: {
        type: Number,
        required: true
    },
    platziUser: String,
    tpCoaches: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Coach'
    }],
    currentCompany: String,
    currentPosition: String,
    currentSalary: {
        amount: Schema.Types.Decimal128,
        currency: {
            type: String,
            enum: ['COP']
        }
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

module.exports = mongoose.model('Student', StudentSchema)