import { useEffect, useRef } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { TDefect } from '~/pageDefectsManager/_t/TDefect'
import './custom.css'
import UiInput from '~/app_shared/ui_input/UiInput'

type Props = {
    defect: TDefect
    checked: boolean
    onCheckbox: (e) => void
}

const CustomMarker = (props: Props) => {

    const refMarker = useRef<any>(null)

    useEffect(() => {
        if (!refMarker)
            return
        if (!refMarker.current)
            return

        refMarker.current.openPopup()
    }, [])
    
    const d = props.defect

    console.log(props.checked)
    return (
        <Marker
            ref={refMarker}
            key={d.defectID}
            position={[d.technicalObject?.gpsCoordinates?.[0], d.technicalObject?.gpsCoordinates?.[1]]}
        >
            <Tooltip>
                <div 
                    className={`
                        ${props.checked && 'outline outline-offset-8 outline-[green]'}
                    `}
                >
                    <div>
                        <span className='text-green-400 text-base font-semibold'>{props.checked && 'Označený'}</span>
                    </div>
                    {d.technicalObject.technicalObjectName}
                </div>
            </Tooltip>
            <Popup>
                <div className=''>
                    <UiInput
                        wrapperClassName={`${props.checked && 'text-green-400 !font-semibold'}`}
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