import connectDb from '../../utils/db';
import Location from '../../models/Location';

export async function GET() {
  try {
    await connectDb();
    const locations = await Location.find();
    return new Response(JSON.stringify(locations), { status: 200 });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDb();
    const locationData = await request.json();
    const location = new Location(locationData);
    await location.save();
    return new Response(JSON.stringify(location), { status: 201 });
  } catch (error) {
    console.error('Error creating location:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
