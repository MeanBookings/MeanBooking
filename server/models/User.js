const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./types/user-types');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, default: "" }, //ojo, el campo contraseña debe tener 4 caracteres minimo comprobar en el front.
  role: { type: String, enum: TYPES, default: 'client'},
  bookings: { type: Schema.Types.ObjectId, ref: 'Book'},
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;