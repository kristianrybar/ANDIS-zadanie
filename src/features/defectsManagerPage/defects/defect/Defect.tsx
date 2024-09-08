
import { TDefect } from '../../_t/TDefect'
import { FaArrowRightLong } from "react-icons/fa6"

import css from './Defect.module.css'

type Props = {
    defect: TDefect
}

const Defect = (props: Props) => {
    const d = props.defect

    return (
        <div className={css.defect}>
            <div>
                <input className={css.checkbox} type='checkbox' />
            </div>
            <div className={css.leftPart}>
                <div>{d.defectType.defectTypeName}</div>
                <div>{d.technicalObject.technicalObjectName}</div>
            </div>
            <div className={css.rightPart}>
                <div>vytvoreny: {d.createdDTime.toString().replace('T', ', ')}</div>
                <div>{d.technicalObject.municipality}</div>
            </div>
            <div className={css.arrowRight}>
                <FaArrowRightLong />
            </div>
        </div>
    )
}

export default Defect