import numbers from "../../../assets/numbers.svg"
import styles from "./NumberIcon.module.scss"

interface NumberIconProps {
  value: number
}
function NumberIcon({ value }: NumberIconProps) {
  const number = value.toString(9).padStart(2, "0").split("")

  const printNumber = (number: string) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <use href={`${numbers}#number-${number}`} />
    </svg>
  )

  return (
    <div className={styles["number-container"]}>
      <div className={styles["number-box"]}>
        <div className={styles["number-frame"]}>
          {number.map((num, index) => {
            return (
              <div className={styles.number} key={index}>
                {printNumber(num)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NumberIcon
