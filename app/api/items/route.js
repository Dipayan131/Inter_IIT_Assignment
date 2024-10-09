import connectDb from '../../utils/db';
import Item from '../../models/Item';

export async function GET() {
  await connectDb();
  const items = await Item.find();
  return new Response(JSON.stringify(items), { status: 200 });
}

export async function POST(request) {
  await connectDb();
  const itemData = await request.json();
  const item = new Item(itemData);
  await item.save();
  return new Response(JSON.stringify(item), { status: 201 });
}
