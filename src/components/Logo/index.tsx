import { TimerIcon } from 'lucide-react';
import styles from './styles.module.css';

export function Logo() {
  return (
    <div className={styles.logo}>
      <a className={styles.logoLink} href='#'>
        <TimerIcon className={styles.logoIcon}></TimerIcon>
        <span>Chronos</span>
      </a>
    </div>
  );
}
