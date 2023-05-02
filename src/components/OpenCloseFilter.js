import cx from "clsx"
import styles from "./OpenCloseFilter.module.css"

export default function OpenCloseFilter({ size, state, selected, onClick }) {
  return (
    <span
      role="button"
      className={cx(styles.textFilter, { [styles.selected]: selected })}
      onClick={onClick}
    >
      {size} {state}
    </span>
  )
}
