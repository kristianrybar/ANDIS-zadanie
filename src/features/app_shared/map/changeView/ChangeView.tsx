import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

const ChangeView = ({ center }: { center: LatLngExpression }) => {
    const map = useMap()

    useEffect(() => {
        map.setView(center)
    }, [center])
    
    return null
}

export default ChangeView