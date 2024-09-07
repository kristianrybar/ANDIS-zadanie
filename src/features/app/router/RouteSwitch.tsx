import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DefectsManagerPage from '~/defectsManagerPage/DefectsManagerPage'

const RouteSwitch = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Navigate to={'defectsManager'} />} />
        <Route path={'/defectsManager'} element={<DefectsManagerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch