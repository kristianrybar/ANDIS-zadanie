import { useEffect, useRef } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { TDefect } from '~/pageDefectsManager/_t/TDefect'
import UiInput from '~/app_shared/ui_input/UiInput'
import css from './CustomMarker.module.css'

type Props = {
    defect: TDefect
    checked: boolean
    onCheckbox: (e) => void
}

const CustomMarker = (props: Props) => {
    const d = props.defect
    
    const refMarker = useRef<any>(null)

    useEffect(() => {
        if (!refMarker)
            return
        if (!refMarker.current)
            return

        refMarker.current.openPopup()
    }, [])
    
    return (
        <Marker
            ref={refMarker}
            key={d.defectID}
            position={[d.technicalObject?.gpsCoordinates?.[0], d.technicalObject?.gpsCoordinates?.[1]]}
        >
            <Tooltip>
                <div 
                    className={`
                        ${css.tooltipInner}
                        ${props.checked && css.checked}
                    `}
                >
                    <div>
                        <span>{props.checked && 'Označený'}</span>
                    </div>
                    {d.technicalObject.technicalObjectName}
                </div>
            </Tooltip>
            <Popup>
                <div className={css.popup}>
                    <UiInput
                        wrapperClassName={`${props.checked && css.checked}`}
                        label={props.checked ? 'Označený' : 'Označiť nedostatok'}
                        type='checkbox'
                        checked={props.checked || false}
                        onChange={props.onCheckbox}
                        value=''
                    />
                    <div>ID nedostatku:  {d.defectID}</div>
                    <div>Typ nedostatku:  {d.defectType.defectTypeName}</div>
                    <div>Techn. objekt:  {d.technicalObject.technicalObjectName}</div>
                    <div>Typ techn. objekt:  {d.technicalObject.technicalObjectType?.technicalObjectTypeName}</div>
                </div>
            </Popup>
        </Marker>
    )
}

export default CustomMarker