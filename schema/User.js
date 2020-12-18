const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    social: {
      discord: String,
      linkedIn: String,
      github: String
    },
    photoUrl: String,
    role: {
      type: String,
      enum: ['student', 'coach'],
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

module.exports = mongoose.model('User', UserSchema)