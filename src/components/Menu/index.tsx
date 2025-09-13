import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';

export function Menu() {
  return (
    <nav className={styles.menu}>
      <a className={styles.menuLink} href='#'>
        <HouseIcon className={styles.menuIcon}></HouseIcon>
      </a>
      <a className={styles.menuLink} href='#'>
        <HistoryIcon className={styles.menuIcon}></HistoryIcon>
      </a>
      <a className={styles.menuLink} href='#'>
        <SettingsIcon className={styles.menuIcon}></SettingsIcon>
      </a>
      <a className={styles.menuLink} href='#'>
        <SunIcon className={styles.menuIcon}></SunIcon>
      </a>
    </nav>
  );
}
