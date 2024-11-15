import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const flashcardsCol = collection(db, 'flashcards');
    const flashcardsSnapshot = await getDocs(flashcardsCol);
    const flashcards = flashcardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    res.status(500).json({ error: 'Error fetching flashcards' });
  }
}
