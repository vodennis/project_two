import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Flashcard as FlashcardType } from '../types/flashcard';
import Flashcard from './Flashcard';
import Link from 'next/link';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const flashcardsCol = collection(db, 'flashcards');
      const flashcardsSnapshot = await getDocs(flashcardsCol);
      const flashcardsData = flashcardsSnapshot.docs.map((doc) => ({
        ...(doc.data() as unknown as FlashcardType),
      }));
      

      setFlashcards(flashcardsData);
    };
    fetchFlashcards();
  }, []);

  const handleLevelChange = (cardId: number, newLevel: number) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((card) =>
        card.id === cardId ? { ...card, understanding_level: newLevel } : card
      )
    );
  };

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1));
  };

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-4xl font-bold text-blue-600 mb-4 drop-shadow-lg">Flashcards</h1>
      {flashcards.length > 0 && (
        <>
          <Flashcard
            key={currentCardIndex}
            card={flashcards[currentCardIndex]}
            onLevelChange={handleLevelChange}
          />
          <p className="text-gray-600 mt-2">
            Card {currentCardIndex + 1} of {flashcards.length}
          </p>
        </>
      )}
      <div className="flex mt-4 gap-4">
        <button onClick={goToPreviousCard} className="btn bg-blue-500 hover:bg-blue-600 text-white">
          Previous
        </button>
        <button onClick={goToNextCard} className="btn bg-blue-500 hover:bg-blue-600 text-white">
          Next
        </button>
      </div>
      <div className="mt-6">
        <Link href="/add-card">
          <span className="btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
            Add New Card
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FlashcardList;
