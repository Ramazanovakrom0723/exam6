import React from 'react'
import { NavLink} from 'react-router-dom'
// import { List, Product } from '../../pages'
const Sidebar = () => {
  return (
  <div>
    <NavLink to="/">
      List
    </NavLink>
    <NavLink to="product">
      Buyurtmalar
    </NavLink>
    </div>
  )
}

export default Sidebar
