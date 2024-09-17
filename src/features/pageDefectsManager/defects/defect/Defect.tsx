
import { TDefect } from '../../_t/TDefect'
import { FaArrowRightLong } from "react-icons/fa6"
import UiInput from '~/app_shared/ui_input/UiInput'
import css from './Defect.module.css'
import { highlightSearchedText } from '../_utils/highlightSearchedText'

type Props = {
    defect: TDefect
    onOpenDetail: () => void
    onCheckbox: () => void
    searchQuery: string
}

const Defect = (props: Props) => {
    const d = props.defect

    return (
        <div className={css.defect}>
            <div>
                <UiInput
                    wrapperClassName='p-3'
                    type='checkbox'
                    value='mock_checkbox_value'
                    onChange={props.onCheckbox}
                />
            </div>
            <div>
                <div>
                    {highlightSearchedText(d.technicalObject.technicalObjectName, props.searchQuery)}&nbsp;
                    {highlightSearchedText(`${d.technicalObject.constructionYear ? '('+d.technicalObject.constructionYear?.toString()+')' : ''}`, props.searchQuery)}</div>
                <div>
                    {highlightSearchedText(d.defectType.defectTypeName, props.searchQuery)}&nbsp;
                    {highlightSearchedText(`${d.defectType.defaultSeverityLevel ? '('+d.defectType.defaultSeverityLevel+')' : ''}`, props.searchQuery)}
                </div>
            </div>
            <div>
                <div>{highlightSearchedText(d.defectState, props.searchQuery)}</div>
            </div>
            <div>
                <div>{highlightSearchedText(d.isPersistent ? 'Pretrváva' : 'Nepretrváva', props.searchQuery)}</div>
            </div>
            <div>
                <div>{highlightSearchedText(d.technicalObject.isCrucial ? 'Áno' : d.technicalObject.isCrucial == false ? 'Nie' : 'Bez určenia', props.searchQuery)}</div>
            </div>
            <div>
                <div>{highlightSearchedText(d.technicalObject.technicalObjectType?.voltageLevel.voltageLevelName, props.searchQuery)}</div>
                <div>{highlightSearchedText(d.technicalObject.supervisor, props.searchQuery)}</div>
            </div>
            <div>
                <div>{highlightSearchedText(d.technicalObject.municipality, props.searchQuery)}</div>
                <div>{highlightSearchedText(d.createdDTime.toString().replace('T', ',\u00A0'), props.searchQuery)}</div>
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