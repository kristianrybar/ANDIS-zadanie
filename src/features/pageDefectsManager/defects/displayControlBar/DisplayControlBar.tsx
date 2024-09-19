import { FaListOl, FaMapMarkedAlt } from 'react-icons/fa'
import UiButton from '~/app_shared/ui_button/UiButton'
import css from './DisplayControlBar.module.css'

type Props = {
    onOpenForm: () => void
    onSetTable: () => void
    onSetMap: () => void
    listMode: 'table' | 'map'
    countSelectedDefects: number
}

const DisplayControlBar = (props: Props) => {
    return (
        <div className={css.displayControlBar}>
            <UiButton
                onClick={props.onOpenForm}
            >
                Vytvoriť investičnú požiadavku
                <span className={css.countDefects} title='Počet označených nedostatkov'> ({props.countSelectedDefects || 0})</span>
            </UiButton>
            <div className={css.listModeSwitcher}>
                <div 
                    className={`${props.listMode == 'table' && css.tableMode}`}
                    onClick={props.onSetTable}
                >
                    Tabuľka <FaListOl />
                </div>
                <div 
                    className={`${props.listMode == 'map' && css.mapMode}`}
                    onClick={props.onSetMap}
                >
                    Mapa <FaMapMarkedAlt />
                </div>
            </div>
        </div>
    )
}

export default DisplayControlBar