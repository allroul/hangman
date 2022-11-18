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

  const restartGame = () => {
    setGuessedLetters([]);
    setWordToGuess(getWord());
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
      <div className={styles.container}>
        <img src="tree.png" className={styles.tree} />
        <Drawing numberOfGuesses={inCorrectLetters.length} />
        <div className={styles.mainTextWrapper}>
          {isWinner && (
            <div className={styles.mainText}>
              Winner!
              <button className={styles.tryAgain} onClick={() => restartGame()}>
                Try again
              </button>
            </div>
          )}
          {isLoser && (
            <div className={styles.mainText}>
              Game Over!
              <button className={styles.tryAgain} onClick={() => restartGame()}>
                Try again
              </button>
            </div>
          )}
        </div>
        <div className={styles.wrapper}>
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
    </div>
  );
}

export default App;
