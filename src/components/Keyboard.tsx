import styles from './Keyboard.module.css';

const KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
type KeyboardProps = {
  disabled: boolean;
  activeLetters: string[];
  inActiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

export const Keyboard = ({
  disabled = false,
  activeLetters,
  inActiveLetters,
  addGuessedLetter,
}: KeyboardProps) => {
  return (
    <div className={styles.keyboard}>
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInActive = inActiveLetters.includes(key);
        return (
          <button
            onClick={() => addGuessedLetter(key)}
            disabled={isActive || isInActive || disabled}
            key={key}
            className={`${styles.btn} ${isActive ? styles.active : ''} ${
              isInActive ? styles.inactive : ''
            }`}>
            {key}
          </button>
        );
      })}
    </div>
  );
};
