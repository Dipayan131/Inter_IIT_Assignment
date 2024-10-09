import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = [{ email: 'test@example.com', password: 'password' }]; // Predefined user for demonstration

export async function POST(request) {
  const { email, password } = await request.json();
  
  const user = users.find((u) => u.email === email);
  if (!user) return new Response('Invalid credentials', { status: 401 });

  const pswd = users.find((u) => u.password === password);
  if (!pswd) return new Response('Invalid credentials', { status: 401 });

  const token = jwt.sign({ email }, 'iamin', { expiresIn: '1h' });
  return new Response(JSON.stringify({ token }), { status: 200 });
}
