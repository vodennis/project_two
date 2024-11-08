// src/pages/index.tsx
import Head from 'next/head';
import FlashcardList from '../components/FlashcardList';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Flashcards App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen p-4">
        <FlashcardList />
      </main>
    </div>
  );
};

export default Home;
