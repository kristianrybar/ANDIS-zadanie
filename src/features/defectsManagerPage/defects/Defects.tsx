import { TDefect } from '../_t/TDefect'
import Defect from './defect/Defect'
import css from './Defects.module.css'

type Props = {
    defects: TDefect[]
}

const Defects = (props: Props) => {
    return (
        <div className={css.defects}>
            <h1>Nedostatky - zoznam</h1>
            <div className={css.scrollDefects}>
                <div className={css.defectsList}>
                    {props.defects.map(d => 
                        <Defect
                            key={d.defectID}
                            defect={d}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Defects