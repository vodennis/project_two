import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("flashcardsApp");

    if (req.method === 'GET') {
      const flashcards = await db.collection("flashcards").find({}).toArray();
      res.status(200).json(flashcards);
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    res.status(500).json({ error: 'Database connection error' });
  }
}