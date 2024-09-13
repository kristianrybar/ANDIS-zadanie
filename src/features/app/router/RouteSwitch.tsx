import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PageDefectsManager from '~/pageDefectsManager/PageDefectsManager'

const RouteSwitch = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Navigate to={'defectsManager'} />} />
        <Route path={'/defectsManager'} element={<PageDefectsManager />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch