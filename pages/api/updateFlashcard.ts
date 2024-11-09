import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, understanding_level } = req.body;

    try {
      const flashcardRef = doc(db, 'flashcards', id);
      await updateDoc(flashcardRef, { understanding_level });
      res.status(200).json({ message: 'Flashcard updated successfully' });
    } catch (error) {
      console.error('Error updating flashcard:', error);
      res.status(500).json({ error: 'Error updating flashcard' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
