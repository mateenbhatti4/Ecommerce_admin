import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';
// import all_orders from '../../constants/orders';
import {calculateRange, sliceData} from '../../utils/table-pagination';
import '../styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function Orders () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState('');
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [products, setProducts] = useState([]);
    const TOKEN = 'ce33331d942f00b8b0c2fc308840e373a68fae3417549fb32169c5a1b9e0bb1999a65c0b7561b5dac1964863937305e58d29a26614aa5e8acce6c4287980d97e5ae7e11cd763b56d257e95bbad4a4150b8e8e3aad65fa1e94326b64bf5bf13c3414358682511d333859ad3d0d09a69727b257816371666c5ff4dc119c3a7e74c';
    const API = "http://localhost:1337/api/orders/?populate=*"
    
    const getData = async ()=>{
        try{
           let response = await axios.get
           (
              API,
              {
                 headers: { Authorization: `Bearer ${TOKEN}` }
              }
           );
           setProducts(response.data.data)
           setOrders(response.data.data)
           setPagination(calculateRange(response.data.data, 5));
           setOrders(sliceData(response.data.data, page, 5))
           console.log(response.data.data)
           
        }
        catch(error){
           console.log(error)
        }
     }



    useEffect(() => {
        getData()
    }, []);

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = orders.filter((item) =>
                item.first_name.toLowerCase().includes(search.toLowerCase()) ||
                item.last_name.toLowerCase().includes(search.toLowerCase()) ||
                item.product.toLowerCase().includes(search.toLowerCase())
            );
            setOrders(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData(orders, new_page, 5));
    }

    return(
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="New Order" />

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Orders List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={(e) => __handleSearch(e)} />
                    </div>
                </div>
                <table>
                    <thead>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>COSTUMER</th>
                        {/* <th>PRODUCT</th> */}
                        <th>TOTAL</th>
                    </thead>

                    {products.length !== 0 ?
                        <tbody>
                            {products.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.id}</span></td>
                                    <td><span>{order.attributes.date.split("T")[0]}</span></td>
                                    <td>
                                        <div>
                                            {order.attributes.orderStatus === 'pending' ?
                                                <img
                                                src="https://cdn-icons-png.flaticon.com/512/833/833643.png"
                                                alt='paid-icon'
                                                className='dashboard-content-icon' />
                                            : order.attributes.orderStatus === 'accepted' ?
                                                <img
                                                src="https://cdn-icons-png.flaticon.com/512/5360/5360039.png"
                                                alt='canceled-icon'
                                                className='dashboard-content-icon' />
                                            : order.attributes.orderStatus === 'delivered' ?
                                                <img
                                                src="https://cdn-icons-png.flaticon.com/512/8905/8905668.png"
                                                alt='completed-icon'
                                                className='dashboard-content-icon' />
                                            : order.attributes.orderStatus === 'completed' ?
                                                <img
                                                src="https://cdn-icons-png.flaticon.com/512/8968/8968525.png"
                                                alt='completed-icon'
                                                className='dashboard-content-icon' />
                                            : order.attributes.orderStatus === 'cancelled' ?
                                                <img
                                                src="https://cdn-icons-png.flaticon.com/512/1828/1828666.png"
                                                alt='completed-icon'
                                                className='dashboard-content-icon' />
                                            : null}
                                            <span>{order.attributes.orderStatus}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            
                                            <span>{order.attributes.customer.data.attributes.username}</span>
                                        </div>
                                    </td>
                                    {/* <td><span>{order.product}</span></td> */}
                                    <td><span>${order.attributes.grandTotal}</span></td>
                                    <td><span>
                                        <Link to={`${order.id}`}>
                                            <Button sx={{color: 'black'}}>
                                                <ArrowForwardIosIcon/>
                                            </Button>
                                        </Link>
                                    </span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {products.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Orders;



