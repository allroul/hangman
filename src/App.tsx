import { useEffect, useState } from 'react';
import { Drawing } from './components/Drawing';
import { Word } from './components/Word';
import { Keyboard } from './components/Keyboard';
import words from './wordList.json';
import styles from './App.module.css';

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const inCorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));

  const isLoser = inCorrectLetters.length >= 7;
  const isWinner = wordToGuess.split('').every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = (letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters((currentLetters) => [...currentLetters, letter]);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [guessedLetters, isLoser, isWinner]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== 'Enter') return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <div className={styles.mainText}>
          {isWinner && 'Winner! Refresh to try again!'}
          {isLoser && 'Failed! Refresh to try again!'}
        </div>
        <Drawing reveal={isLoser} isWinner={isWinner} numberOfGuesses={inCorrectLetters.length} />
        <Word reveal={isLoser} wordToGuess={wordToGuess} guessedLetters={guessedLetters} />
        <div className={styles.keyboardWrapper}>
          <Keyboard
            disabled={isLoser || isWinner}
            activeLetters={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
            inActiveLetters={inCorrectLetters}
            addGuessedLetter={addGuessedLetter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
