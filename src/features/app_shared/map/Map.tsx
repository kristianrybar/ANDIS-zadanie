import { useEffect, useRef, useState } from 'react'
import { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { TDefect } from '~/pageDefectsManager/_t/TDefect'
import ChangeView from './changeView/ChangeView'
import CustomMarker from './customMarker/CustomMarker'
import FitBounds from './fitBounds/FitBounds'
import css from './Map.module.css'

const coordsBratislavaCity: LatLngExpression = [18.148598, 17.107748]

type Props = {
  zoom: number
  defects: TDefect[]
  checked: (defectID) => boolean
  onCheckbox: (e, d) => void
}

const Map = (props: Props) => {
  const [currentLatLng, set_currentLatLng] = useState<LatLngExpression>(coordsBratislavaCity)
  const refCurrentLocationMarker = useRef<any>(null)


  // const getCurrentLocationCoordinates = async () => {
  //   if (!navigator.geolocation) {
  //     alert('Geolocation is not supported by your browser')
  //     return
  //   }

  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const lat = position.coords.latitude
  //     const lng = position.coords.longitude
  //     const coords: LatLngExpression = [lat, lng]
  //     if (!lat || !lng)
  //       return

  //     set_currentLatLng(coords)
  //   }, () => {
  //     alert('Unable to retrieve your location')
  //   })
  // }

  // useEffect(() => {
  //   getCurrentLocationCoordinates()
  // }, [])

  return (
    <MapContainer
      className={css.leafletMap}
      center={props.defects ? props.defects[0].technicalObject.gpsCoordinates : currentLatLng}
      zoom={props.zoom || 6}
      scrollWheelZoom={false}
    >
      {/* custom */}
      {/* <ChangeView 
        centerCoords={props.defects ? props.defects[0].technicalObject.gpsCoordinates : currentLatLng}
      /> */}
      
      
      
      {/* leaflet */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* <Marker ref={refCurrentLocationMarker} position={currentLatLng}>
        <Tooltip permanent>
          Vaša aktuálna poloha
        </Tooltip>
      </Marker> */}

      {props.defects
        .map((d) => (
          <CustomMarker
            key={d.defectID}
            defect={d}
            checked={props.checked(d.defectID)}
            onCheckbox={(e) => props.onCheckbox(e, d)}
          />
      ))}
      
      <FitBounds defects={props.defects} />
    </MapContainer>
  )
}

export default Map