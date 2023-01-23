import React from 'react'
import Orders from './pages/Orders';
import OrderDetails from './pages/Orders/orderDetails';
import SideBar from './components/Sidebar/sidebar';
import sidebar_menu from './constants/sidebar-menu';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { Login } from './pages/Login/login';
import _Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';

export function AllRoutes() {
    return (
        <div>
            <Router>
                {/* <div className='dashboard-container'>
                    <SideBar menu={sidebar_menu} />x
                    <div className='dashboard-body'> */}
                        <Routes>
                            <Route exact path="/" element={<Login/>} />
                            <Route path="*" element={<div></div>} />
                            <Route path="/dasboard/" element={<_Sidebar/>}>
                                <Route exact path="orders" element={< Orders/>} />
                                <Route path="orders/:id" element={<OrderDetails/>} />
                                <Route exact path="products" element={<div></div>} />
                                <Route exact path="profile" element={<div></div>} />
                                <Route path=""/>
                            </Route>
                        </Routes>
                    {/* </div>
                </div> */}
            </Router>
            <ToastContainer />
        </div>
    )
}
