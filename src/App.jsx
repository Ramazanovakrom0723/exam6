import React from 'react'
import { Header, Sidebar } from './components'
import { Outlet } from 'react-router-dom'
import ResponsiveDrawer from './components/layout'

const App = () => {
  return (
	<div>
		<ResponsiveDrawer/>
	</div>
  )
}

export default App
