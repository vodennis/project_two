import { useState } from 'react';
import { Flashcard as FlashcardType } from '../types/flashcard';

interface FlashcardProps {
  card: FlashcardType;
  onLevelChange: (cardId: number, newLevel: number) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, onLevelChange }) => {
  const [flipped, setFlipped] = useState(false);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleFlip = () => {
    setFlipped(!flipped);
    setClickedButton(null); 
  };

  const handleUnderstanding = async (difficulty: 'easy' | 'medium' | 'hard') => {
    if (clickedButton) return; 

    let adjustment = 0;
    if (difficulty === 'easy') adjustment = 10;
    if (difficulty === 'hard') adjustment = -10;

    const newLevel = Math.max(0, card.understanding_level + adjustment);
    onLevelChange(card.id, newLevel);
    setClickedButton(difficulty);

    try {
      await fetch('/api/updateFlashcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: card.id, understanding_level: newLevel }),
      });
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  return (
    <div
      className={`flip-card ${flipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p>{card.prompt}</p>
        </div>
        <div className="flip-card-back">
          <p className="text-lg font-semibold mb-2">Answer: {card.answer}</p>
          <p className="text-sm mb-4">Understanding Level: {card.understanding_level}%</p>
          <div className="mt-auto flex justify-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); handleUnderstanding('easy'); }}
              className={`btn ${clickedButton === 'easy' ? 'bg-gray-800' : 'bg-green-500 hover:bg-green-600'} text-white`}
              disabled={!!clickedButton}
            >
              Easy
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleUnderstanding('medium'); }}
              className={`btn ${clickedButton === 'medium' ? 'bg-gray-800' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
              disabled={!!clickedButton}
            >
              Medium
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleUnderstanding('hard'); }}
              className={`btn ${clickedButton === 'hard' ? 'bg-gray-800' : 'bg-red-500 hover:bg-red-600'} text-white`}
              disabled={!!clickedButton}
            >
              Hard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
