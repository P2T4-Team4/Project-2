import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';
// import { Book } from '../../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../../middleware/auth.js';


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET_KEY || '';

console.log('JWT_SECRET:', JWT_SECRET); // Log the JWT secret to ensure it's being set correctly


router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    const newUser = await User.create({ username, password });
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ token });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});


router.post('/login', async (req: Request, res: Response) => {
  console.log("LOGIN request received!");
  console.log("req.body:", req.body);
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/getLists', authenticateToken, async (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk((decoded as any).id, {
      include: [
        { model: User, as: 'wantToReadBooks' },
        { model: User, as: 'readBooks' }
      ]
    }) ;
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json({ wantToReadBooks: user.wantToReadBooks, readBooks: user.readBooks });
  } catch (error: any) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});


router.put('/updateLists', authenticateToken, async (req: Request, res: Response) => {
  const { wantToRead, readBooks} = req.body;
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = (decoded as any).id;
    if (!userId) return res.status(401).json({ message: 'Invalid token' });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const findOrCreateBooks = async (books: any[]) => {
      const bookInstances = [];
      for (const book of books) {
        const [bookInstance] = await book.findOrCreate({
          where: { id: book.id }, 
          defaults: {
            title: book.title,
            author: book.author,
            genre: book.genre,
            coverImageUrl: book.coverImageUrl,
            description: book.description,
          },
        });
        bookInstances.push(bookInstance);
      }
      return bookInstances;
    };
    const wantToReadBooks = await findOrCreateBooks(wantToRead);
    const readBooksInstances = await findOrCreateBooks(readBooks);

    await user.setWantToReadBooks(wantToReadBooks);
    await user.setReadBooks(readBooksInstances);

    return res.json({ message: 'User updated successfully' });
  } catch (error: any) {
    return res.status(401).json({ message: 'Invalid token' });
  }
})
  
  
  export { router as userRouter };
 
