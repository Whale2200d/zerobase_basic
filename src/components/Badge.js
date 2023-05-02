import styles from "./Badge.module.css"

export default function Badge({ name, color }) {
  return (
    <div className={styles.badge} style={{ background: `#${color}` }}>
      {name}
    </div>
  )
}
