const mongoose = require('mongoose')

const { Schema } = mongoose

const CoachSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    totalStudents: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

module.exports = mongoose.model('Coach', CoachSchema)