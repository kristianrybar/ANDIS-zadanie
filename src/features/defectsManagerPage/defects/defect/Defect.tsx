
import { TDefect } from '../../_t/TDefect'
import css from './Defect.module.css'

type Props = {
    defect: TDefect
}

const Defect = (props: Props) => {
    
    return (
        <div className={css.defect}>
            <div className={css.leftPart}>
                <div>defetcTypeName</div>
                <div>technicalObjectName</div>
            </div>
            <div className={css.rightPart}>
                <div>vytvoreny:</div>
                <div>mucipality</div>
            </div>
        </div>
    )
}

export default Defect