import { useState } from "react"
import arrow from "../../../assets/arrow.svg"
import { TUTORIAL } from "../../../data/consts"
import { classNames } from "../../../utils/classNames"
import styles from "./Slider.module.scss"

function Slider() {
  const [slide, setSlide] = useState(0)
  const { head, body, img_alt } = TUTORIAL[slide]

  const handleClickPrev = () => {
    setSlide((prevState) =>
      prevState - 1 < 0 ? TUTORIAL.length - 1 : prevState - 1
    )
  }
  const handleClickNext = () => {
    setSlide((prevState) =>
      prevState + 1 > TUTORIAL.length - 1 ? 0 : prevState + 1
    )
  }

  return (
    <div className={styles.slider}>
      <div className={styles["image-box"]}>
        <img src={`./img/tuto/tuto-${slide + 1}.png`} alt={img_alt} />
      </div>

      <div className={styles["text-box"]}>
        <p className={styles["text-head"]}>{head}</p>
        <div className={styles["text-body"]}>
          <i></i>
          <span dangerouslySetInnerHTML={{ __html: body }}></span>
        </div>
        <p className={styles["text-food"]}>{`${slide + 1}/${
          TUTORIAL.length
        }`}</p>
      </div>

      <div className={styles.controls}>
        <div className={classNames(styles.control, styles["control-prev"])}>
          <button onClick={handleClickPrev}>
            <img src={arrow} alt="arrow" />
          </button>
        </div>

        <div className={styles["control-line"]}></div>

        <div className={classNames(styles.control, styles["control-next"])}>
          <button onClick={handleClickNext}>
            <img src={arrow} alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Slider
