const mongoose = require('mongoose')

const { Schema } = mongoose

const AplicationsSchema = new Schema(
  {
    status: {
      type: String,
      enum: [ 'Rejected', 'Got Offer', 'RejectedByStudent', 'Placed'],
      required: false
    },
    companyName: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true,
    },
    aspiration:  {
      currency: {
        enum: ['COP'],
        type: String
      },
      amount: Schema.Types.Decimal128
    },
    offeredSalary:  {
      currency: {
        enum: ['COP'],
        type: String
      },
      amount: Schema.Types.Decimal128
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    advice: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

module.exports = mongoose.model('Aplications', AplicationsSchema)