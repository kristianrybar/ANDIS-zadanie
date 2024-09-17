import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

type Props = {
    centerCoords: LatLngExpression
}

const ChangeView = (props: Props) => {
    const map = useMap()

    useEffect(() => {
        map.setView(props.centerCoords)
    }, [props.centerCoords])
    
    return null
}

export default ChangeView