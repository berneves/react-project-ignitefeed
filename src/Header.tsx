import to_do from './assets/to_do.svg'
import styles from "./Header.module.css"

export function Header() {
  return (
    <header className={styles.header}>
        <img src = {to_do}></img>
    </header>
    )
}
