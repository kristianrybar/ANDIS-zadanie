import { useEffect, useRef, useState } from 'react'
import { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import ChangeView from './changeView/ChangeView'
import css from './Map.module.css'

const coordsBratislavaCity: LatLngExpression = [18.148598, 17.107748]
const technicalObjectsCoords = [
    [48.18956060247301, 17.154339464998106],
    [48.18929007047223, 17.15125257264557],
    [48.18971394180768, 17.152113612056183],
]

const technicalObjects = [
    {
      technicalObjectID: '1',
      technicalObjectName: 'Object 1',
      gpsCoordinates: [
        [17.123456, 48.123456],
        [17.223456, 48.223456],
        [17.323456, 48.323456],
      ],
    },
    {
      technicalObjectID: '2',
      technicalObjectName: 'Object 2',
      gpsCoordinates: [
        [17.654321, 48.654321],
        [17.754321, 48.754321],
        [17.854321, 48.854321],
      ],
    },
  ];

const Map = () => {
    const [currentLatLng, set_currentLatLng] = useState<LatLngExpression>(coordsBratislavaCity)
    const refCurrentLocationMarker = useRef<any>(null)
    const getCurrentLocationCoordinates = async () => {
        if(!navigator.geolocation) {
            alert('Geolocation is not supported by your browser')
            return
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            const coords: LatLngExpression = [lat, lng]
            if (!lat || !lng) 
                return
            
            set_currentLatLng(coords) 
        }, () => {
            alert('Unable to retrieve your location')
        })
    }

    useEffect(() => {
        getCurrentLocationCoordinates()


    }, [])

    useEffect(() => {
        if (!refCurrentLocationMarker) 
            return
        if (!refCurrentLocationMarker.current) 
            return
        
        refCurrentLocationMarker.current.openPopup()
    }, [currentLatLng])
    
    return (
        <div className={css.mapLeafletWrapper}>
            <MapContainer
                className={css.leafletMap} 
                center={currentLatLng} 
                zoom={9} 
                scrollWheelZoom={false}
            >
                
                <ChangeView center={currentLatLng} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker ref={refCurrentLocationMarker} position={currentLatLng}>
                    <Popup autoClose={true} keepInView={true}>
                        Vaša aktuálna poloha
                    </Popup>
                </Marker>

                {technicalObjectsCoords.map((array, index) => (
                    <Marker key={index} position={[array[0], array[1]]}>
                        <Popup>
                            Technický objekt {index}
                        </Popup>
                    </Marker>
                ))}

        </MapContainer>
        </div>
    )
}

export default Map