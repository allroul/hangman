import styles from './Word.module.css';
type WordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export const Word = ({ guessedLetters, wordToGuess, reveal = false }: WordProps) => {
  return (
    <div className={styles.wordWrapper}>
      {wordToGuess.split('').map((letter, index) => (
        <span className={styles.wordLetter} key={index}>
          <span
            style={{
              visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden',
              color: !guessedLetters.includes(letter) && reveal ? 'red' : '#000',
            }}>
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};
