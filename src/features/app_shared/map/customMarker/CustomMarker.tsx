import { useEffect, useRef } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { TDefect } from '~/pageDefectsManager/_t/TDefect'

type Props = {
    defect: TDefect
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
    return (
        <Marker
            ref={refMarker}
            key={d.defectID}
            position={[d.technicalObject?.gpsCoordinates?.[0], d.technicalObject?.gpsCoordinates?.[1]]}
        >
            <Tooltip>
                {d.technicalObject.technicalObjectName}
            </Tooltip>
            <Popup>
                <div>ID nedostatku:  {d.defectID}</div>
                <div>Typ nedostatku:  {d.defectType.defectTypeName}</div>
                <div>Techn. objekt:  {d.technicalObject.technicalObjectName}</div>
                <div>Typ techn. objekt:  {d.technicalObject.technicalObjectType?.technicalObjectTypeName}</div>
            </Popup>
        </Marker>
    )
}

export default CustomMarker