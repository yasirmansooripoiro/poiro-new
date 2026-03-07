"use client";
import useBlocks from "@/hooks/useBlocks";
import styles from "./styles.module.css";

const HARD_CODED_COLUMNS = 20;

export default function Home() {
  const { getBlocks } = useBlocks();

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <p>Poiro</p>
      </div>
      <div className={styles.grid}>
        {[...Array(HARD_CODED_COLUMNS).keys()].map((_, index) => {
          return (
            <div key={index} className={styles.column}>
              {getBlocks()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
