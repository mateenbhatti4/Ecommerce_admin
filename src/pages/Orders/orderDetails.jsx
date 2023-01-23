import { Box, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function OrderDetails() {
    const {id} = useParams();


    const handleChange = async (event) => {
        let token = localStorage.getItem('Jwt_Token');
        try {
            let response = await axios.put
         (
            `http://localhost:1337/api/orders/${id}`,
            {
                data: {
                    orderStatus: event.target.value
                }
            },
            {
               headers: { Authorization: `Bearer ${token}` }
            }
         );
         console.log(response.data.data)
         
         }
         catch(error){
            console.log(error.message)
         }
    };
    
    const TOKEN = 'ce33331d942f00b8b0c2fc308840e373a68fae3417549fb32169c5a1b9e0bb1999a65c0b7561b5dac1964863937305e58d29a26614aa5e8acce6c4287980d97e5ae7e11cd763b56d257e95bbad4a4150b8e8e3aad65fa1e94326b64bf5bf13c3414358682511d333859ad3d0d09a69727b257816371666c5ff4dc119c3a7e74c';
    const [orderDetails, setOrderDetails] = useState('')
    const getData = async () => {
        try {
           let response = await axios.get
        (
           `http://localhost:1337/api/orders/?filters[id][$eq]=${id}&populate=*`,
           {
              headers: { Authorization: `Bearer ${TOKEN}` }
           }
        );
        setOrderDetails(response.data.data)
        console.log(response.data.data)
        
        }
        catch(error){
           console.log(error.message)
        }
  }
  useEffect(()=>{
     getData();
  },[])



    return (
    <Box sx={{mt: "70px"}} className="container">

        <Grid container>
            <Grid item lg={6} sx={{ml:'auto', mr:'auto'}} >
            <Box sx={{boxShadow: 1, borderRadius: '5px', p:'20px', background:'#fdfdfd', ml: 6, mr: 3}}>
                    {/* <Box sx={{display:'flex'}}> */}
                    <Typography variant="h6" sx={{fontWeight: 'bold',}}>Order Details</Typography>
                    {orderDetails && 
                    <Grid container sx={{mt:'20px'}} className="container">
                        <Grid item lg={6}>
                            <Typography variant="h6" sx={{fontSize:'14px', mt:1, mb:1,color: 'grey', color: 'grey'}} align="left">ID:</Typography>                    
                        </Grid>
                        <Grid item lg={6}>
                            <Typography variant="h6" sx={{fontSize:'17px', mt:1, mb:1, fontWeight: 'bold'}} align="right">{orderDetails[0].id}</Typography>
                        </Grid>
                        <Grid item lg = {12} sx={{mt:'5px'}}>
                            <Box sx={{borderBottom: "1px solid #c4c4c4"}}></Box>
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}} >
                            <Typography variant="h6" sx={{fontSize:'14px', mt:1, mb:1,color: 'grey'}} align="left">Order Date:</Typography>                    
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}}>
                            <Typography variant="h6" sx={{fontSize:'17px',mt:1, mb:1, fontWeight: 'bold'}} align="right">{orderDetails[0].attributes.date.split("T")[0]}</Typography>
                        </Grid>
                        <Grid item lg = {12} sx={{mt:'5px'}}>
                            <Box sx={{borderBottom: "1px solid #c4c4c4"}}></Box>
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}} >
                            <Typography variant="h6" sx={{fontSize:'14px', mt:1, mb:1,color: 'grey'}} align="left">Total Amount:</Typography>                    
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}}>
                            <Typography variant="h6" sx={{fontSize:'17px', mt:1, mb:1,fontWeight: 'bold'}} align="right">{orderDetails[0].attributes.grandTotal}</Typography>
                        </Grid>
                        <Grid item lg = {12} sx={{mt:'5px'}}>
                            <Box sx={{borderBottom: "1px solid #c4c4c4"}}></Box>
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}} >
                            <Typography variant="h6" sx={{fontSize:'14px', mt:1, mb:1,color: 'grey'}} align="left">Customer ID:</Typography>                    
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}}>
                            <Typography variant="h6" sx={{fontSize:'17px',mt:1, mb:1, fontWeight: 'bold'}} align="right">{orderDetails[0].attributes.customer.data.id}</Typography>
                        </Grid>
                        
                        <Grid item lg = {12} sx={{mt:'5px'}}>
                            <Box sx={{borderBottom: "1px solid #c4c4c4"}}></Box>
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}} >
                            <Typography variant="h6" sx={{fontSize:'14px',fontWeight: 'bold',mt:3, mb:1,color: 'grey'}} align="left">Order Status:</Typography>                    
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}}>
                            {/* <Typography variant="h6" sx={{fontSize:'17px',mt:1, mb:1, fontWeight: 'bold'}} align="right">{orderDetails[0].attributes.orderStatus}</Typography> */}
                            <FormControl  sx={{ mt: 2, minWidth: 150, ml: "90px" }} size="small">
                                <InputLabel id="demo-select-small">status</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    label="Status"
                                    onChange={handleChange}
                                    align='center'
                                    defaultValue={orderDetails && orderDetails[0].attributes.orderStatus}
                                >
                                    <MenuItem value="">
                                    <em>Choose</em>
                                    </MenuItem>
                                    <MenuItem value={'pending'}>Pending</MenuItem>
                                    <MenuItem value={'accepted'}>Accepted</MenuItem>
                                    <MenuItem value={'delivered'}>Delivered</MenuItem>
                                    <MenuItem value={'cancelled'}>Cancelled</MenuItem>
                                    <MenuItem value={'completed'}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        
                        </Grid>
                    </Grid>
                    }
                </Box>
            </Grid>

            <Grid item lg={6}>
            <Box sx={{boxShadow: 1, borderRadius: '5px', p:'20px', background:'#fdfdfd', ml: 3, mr: 6}}>
                    {/* <Box sx={{display:'flex'}}> */}
                    <Typography variant="h6" sx={{fontWeight: 'bold',}}>Shipping Details</Typography>
                    {orderDetails && 
                    <Grid container sx={{mt:'20px'}} className="container">
                        <Grid item lg={6}>
                            <Typography variant="h6" sx={{fontSize:'14px', mt:1, mb:1,color: 'grey', color: 'grey'}} align="left">ID:</Typography>                    
                        </Grid>
                        <Grid item lg={6}>
                            <Typography variant="h6" sx={{fontSize:'17px',mt:1, mb:1, fontWeight: 'bold'}} align="right">{orderDetails[0].attributes.shippingDetails.id}</Typography>
                        </Grid>
                        <Grid item lg = {12} sx={{mt:'5px'}}>
                            <Box sx={{borderBottom: "1px solid #c4c4c4"}}></Box>
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}} >
                            <Typography variant="h6" sx={{fontSize:'14px', mt:1, mb:1,color: 'grey'}} align="left">Full Name:</Typography>                    
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}}>
                            <Typography variant="h6" sx={{fontSize:'17px',mt:1, mb:1, fontWeight: 'bold'}} align="right">{orderDetails[0].attributes.shippingDetails.name}</Typography>
                        </Grid>
                        <Grid item lg = {12} sx={{mt:'5px'}}>
                            <Box sx={{borderBottom: "1px solid #c4c4c4"}}></Box>
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}} >
                            <Typography variant="h6" sx={{fontSize:'14px', mt:1, mb:1,color: 'grey'}} align="left">Email:</Typography>                    
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}}>
                            <Typography variant="h6" sx={{fontSize:'17px', mt:1, mb:1, fontWeight: 'bold'}} align="right">{orderDetails[0].attributes.shippingDetails.email}</Typography>
                        </Grid>
                        <Grid item lg = {12} sx={{mt:'5px'}}>
                            <Box sx={{borderBottom: "1px solid #c4c4c4"}}></Box>
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}} >
                            <Typography variant="h6" sx={{fontSize:'14px', mt:1, mb:1,color: 'grey'}} align="left">Phone:</Typography>                    
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}}>
                            <Typography variant="h6" sx={{fontSize:'17px', mt:1, mb:1, fontWeight: 'bold'}} align="right">{orderDetails[0].attributes.shippingDetails.phone_number}</Typography>
                        </Grid>
                        
                        <Grid item lg = {12} sx={{mt:'5px'}}>
                            <Box sx={{borderBottom: "1px solid #c4c4c4"}}></Box>
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}} >
                            <Typography variant="h6" sx={{fontSize:'14px',mt:1, mb:1,color: 'grey'}} align="left">Delivery Address:</Typography>                    
                        </Grid>
                        <Grid item lg={6} sx={{mt:'5px'}}>
                            <Typography variant="h6" sx={{fontSize:'17px',mt:1, mb:1,fontWeight: 'bold'}} align="right">{orderDetails[0].attributes.shippingDetails.address}</Typography>
                        </Grid>
                    </Grid>
                    }
                </Box>
            </Grid>
            <Box sx={{height:"1px",borderBottom: "1px soild grey"}}></Box>

        </Grid>
        <Grid container sx={{mt: 6}} className="container">
            <Grid item lg={0.5}></Grid>
            <Grid item lg={11} >
                <Box sx={{mb:"50px"}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{fontSize:'17px', fontWeight: 'bold', padding: "40px"}}>ID</TableCell>
                                <TableCell align="center" sx={{fontSize:'17px', fontWeight: 'bold'}}>Image</TableCell>
                                <TableCell align="center" sx={{fontSize:'17px', fontWeight: 'bold'}}>Product</TableCell>
                                <TableCell align="center" sx={{fontSize:'17px', fontWeight: 'bold'}}>Category</TableCell>
                                <TableCell align="center" sx={{fontSize:'17px', fontWeight: 'bold'}}>Quantity</TableCell>
                                <TableCell align="center" sx={{fontSize:'17px', fontWeight: 'bold'}}>Subtotal</TableCell>
                                

                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderDetails && orderDetails[0].attributes.productDetails.map((d)=>(

                                
                                    <TableRow>
                                    <TableCell align="center">{d.id}</TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <img src="https://cdn-icons-png.flaticon.com/512/3114/3114540.png" alt="" height="70px" width="70px"/>
                                    </TableCell>
                                    
                                    <TableCell align="center">product title</TableCell>
                                    <TableCell align="center">categoryName</TableCell>
                                    <TableCell align="center">{d.quantity}</TableCell>
                            
                                    
                                    <TableCell align="center">${d.subtotal}</TableCell>
                                    {/* <TableCell><Button onClick={()=>dispatch(RemoveFromCard(d.productId))}></Button></TableCell> */}
                                    </TableRow>
                                ))}
                                
                                <TableRow>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">Total: ${orderDetails && orderDetails[0].attributes.grandTotal}</TableCell>
                                </TableRow>
                                
                            
                            </TableBody>
                        </Table>
                     </TableContainer>
                </Box>
                <Box align="right" className="container">
                    {/* <Link to="/checkout" className="nav-link"><SubmitButton variant={'outlined'} style={{mb:'30px'}} text={`Checkout Now (${grandTotal})`}/></Link> */}
                </Box>
            </Grid>
            <Grid item lg={0.5}></Grid>
        </Grid>
    </Box>

    )
}
