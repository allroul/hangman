import styles from './Drawing.module.css';

const HEAD = <img src="/hangman/head.png" className={styles.head} key={1} />;

const BODY = <img src="/hangman/body.png" className={styles.body} key={2} />;

const RIGHT_ARM = <img src="/hangman/rightArm.png" className={styles.rightArm} key={3} />;

const LEFT_ARM = <img src="/hangman/leftArm.png" className={styles.leftArm} key={4} />;

const RIGHT_LEG = <img src="/hangman/rightLeg.png" className={styles.rightLeg} key={5} />;

const LEFT_LEG = <img src="/hangman/leftLeg.png" className={styles.leftLeg} key={6} />;

const ROPE = <img src="/hangman/rope.png" className={styles.rope} key={7} />;

const BODY_PARTS = [ROPE, HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type DrawingProps = {
  numberOfGuesses: number;
};

export function Drawing({ numberOfGuesses }: DrawingProps) {
  return <div style={{ position: 'relative' }}>{BODY_PARTS.slice(0, numberOfGuesses)}</div>;
}
