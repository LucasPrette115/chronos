import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

type Themes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<Themes>(() => {
    return (localStorage.getItem('theme') as Themes) || 'dark';
  });

  const nextThemeIcon = {
    dark: <SunIcon></SunIcon>,
    light: <MoonIcon></MoonIcon>,
  };

  function handleThemeClick(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(prevTheme => {
      const next = prevTheme === 'dark' ? 'light' : 'dark';
      return next;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <a className={styles.menuLink} href='#' title='Menu' aria-label='Menu'>
        <HouseIcon className={styles.menuIcon}></HouseIcon>
      </a>
      <a
        className={styles.menuLink}
        href='#'
        title='Histórico'
        aria-label='Histórico'
      >
        <HistoryIcon className={styles.menuIcon}></HistoryIcon>
      </a>
      <a
        className={styles.menuLink}
        href='#'
        title='Configurações'
        aria-label='Configurações'
      >
        <SettingsIcon className={styles.menuIcon}></SettingsIcon>
      </a>
      <a
        className={styles.menuLink}
        href='#'
        onClick={handleThemeClick}
        title='Tema'
        aria-label='Tema'
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
