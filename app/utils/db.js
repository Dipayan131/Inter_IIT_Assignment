import mongoose from 'mongoose';

export const apiKey = 'mongodb+srv://Inter_IIT:59WUYI5ZNAe1dp8I@cluster0.lipdsuk.mongodb.net/IIT?retryWrites=true&w=majority&appName=Cluster0';

const connectDb = async () => {
  console.log('Attempting to connect to MongoDB...');
  if (mongoose.connection.readyState >= 1) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(apiKey);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDb;
