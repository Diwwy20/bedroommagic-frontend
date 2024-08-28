import React from 'react'
import { AuthProvider } from './context/authContext'
import ScreenMenu from './components/Menus/ScreenMenu'
import { PhotoProvider } from './context/photoContext'

const RootNavigation = () => {
  return (
    <AuthProvider>
      <PhotoProvider>
        <ScreenMenu />
      </PhotoProvider> 
    </AuthProvider>
  )
}

export default RootNavigation