import { useState } from 'react';
import { useRouter } from 'next/router';

const AddCard = () => {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const router = useRouter();

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock new card creation without saving to localStorage
    setPrompt('');
    setAnswer('');
    router.push('/');
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl mb-4">Add New Card</h1>
      <form onSubmit={handleAddCard} className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt"
          className="input p-2 border border-gray-300 rounded-md"
          required
        />
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter answer"
          className="input p-2 border border-gray-300 rounded-md"
          required
        />
        <button type="submit" className="btn bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Add Card
        </button>
      </form>
    </div>
  );
};

export default AddCard;
