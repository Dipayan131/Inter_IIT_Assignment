// models/Location.js
import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  parent_godown: { type: String, default: null },
});

// Check if the model already exists to avoid redefinition
const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
export default Location;
