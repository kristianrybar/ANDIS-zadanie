import css from './DefectDetail.module.css'
import { FaArrowLeftLong } from "react-icons/fa6";

type Props = {
  onGoBack: () => void
}

const DefectDetail = (props: Props) => {
  return (
    <div className={css.defectDetail}>
      <div className={css.header}>
        <div 
          className={css.goBack}
          onClick={props.onGoBack}
        >
          <FaArrowLeftLong />
          <span>Späť</span>
        </div>
      </div>  
    </div>
  )
}

export default DefectDetail
