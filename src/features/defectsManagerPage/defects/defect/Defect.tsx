
import { TDefect } from '../../_t/TDefect'
import { FaArrowRightLong } from "react-icons/fa6"
import UiInput from '~/app_shared/ui_input/UiInput'
import css from './Defect.module.css'

type Props = {
    defect: TDefect
    onOpenDetail: () => void
    onCheckbox: () => void
}

const Defect = (props: Props) => {
    const d = props.defect

    return (
        <div className={css.defect}>
            <div>
                <UiInput
                    type='checkbox'
                    value='mock_checkbox_value'
                    onChange={props.onCheckbox}
                />
            </div>
            <div className={css.leftPart}>
                <div>{d.defectType.defectTypeName}</div>
                <div>{d.technicalObject.technicalObjectName}</div>
            </div>
            <div className={css.rightPart}>
                <div>vytvoreny: {d.createdDTime.toString().replace('T', ', ')}</div>
                <div>{d.technicalObject.municipality}</div>
            </div>
            <div 
                className={css.arrowRight}
                onClick={props.onOpenDetail}
            >
                <FaArrowRightLong />
            </div>
        </div>
    )
}

export default Defect