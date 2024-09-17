import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { LatLngBounds, LatLngBoundsLiteral } from 'leaflet'
import { TDefect } from '~/pageDefectsManager/_t/TDefect'

type Props = {
    defects: TDefect[]
    currentLatLng
}

const FitBounds = (props: Props) => {
    const map = useMap()

    const finalCoords: LatLngBoundsLiteral = props.defects.map((d) => [d.technicalObject?.gpsCoordinates?.[0], d.technicalObject?.gpsCoordinates?.[1]])
    finalCoords.push(props.currentLatLng)
    
    useEffect(() => {
        if (!props.defects.length) 
            return
        if (!props.currentLatLng) 
            return
        if (!finalCoords) 
            return
        
        const bounds = new LatLngBounds(finalCoords)
        if (!bounds) 
            return
        
        map.fitBounds(bounds)
    }, [props.defects, map, props.currentLatLng])

    return null
}

export default FitBounds