import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  item_id: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  godown: { type: String, required: true },
  brand: { type: String, required: true },
  attributes: { type: Object, required: true },
  image_url: { type: String, required: true },
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;
