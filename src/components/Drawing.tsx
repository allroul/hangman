import styles from './Drawing.module.css';

const HEAD = <div className={styles.head} key={1} />;

const BODY = <div className={styles.body} key={2} />;

const RIGHT_ARM = <div className={styles.rightArm} key={3} />;

const LEFT_ARM = <div className={styles.leftArm} key={4} />;

const RIGHT_LEG = <div className={styles.rightLeg} key={5} />;

const LEFT_LEG = <div className={styles.leftLeg} key={6} />;

const ROPE = <div className={styles.rope} key={7} />;

const BODY_PARTS = [ROPE, HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

const DIALOGUE = <div className={styles.dialogue}> Thank you</div>;

type DrawingProps = {
  numberOfGuesses: number;
  reveal?: boolean;
  isWinner: boolean;
};

export function Drawing({ numberOfGuesses, reveal = false, isWinner = false }: DrawingProps) {
  const FACE = (
    <div className={styles.face} key={7}>
      <div className={styles.eyes}>
        <span className={styles.rightEye} />
        <span className={styles.leftEye} />
      </div>
      <span className={`${styles.smile} ${isWinner ? styles.smileWinner : ''} `} />
    </div>
  );
  return (
    <div style={{ position: 'relative' }}>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      {(reveal || isWinner) && FACE}
      {isWinner && DIALOGUE}
      <div className={styles.bar} />
      <div className={styles.column} />
      <div className={styles.stand} />
    </div>
  );
}
