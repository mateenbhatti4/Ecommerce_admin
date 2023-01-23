import React from 'react'
import { Outlet } from 'react-router-dom'
import sidebar_menu from '../../constants/sidebar-menu'
import { AllRoutes } from '../../routes'
import SideBar from './sidebar'



export default function _Sidebar() {
    return (
        <div>
            <div className='dashboard-container'>
                <SideBar menu={sidebar_menu} />
                <div className='dashboard-body'>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
