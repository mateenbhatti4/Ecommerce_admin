import * as React from 'react';
import { Button, Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllRoutes } from '../../routes';

export function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const HandleLogin = async (e) => {
        e.preventDefault()

            // strapi-----------------------------------------
            try{
                axios.post('http://localhost:1337/api/auth/local',{
                    identifier: email,
                    password: password
                }).then(response=>{
                    console.log('login successfully!')
                    const {jwt,user} = response.data
                    localStorage.setItem('Jwt_Token', jwt)
                    toast.success('Login Successfully!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                        navigate('/dasboard/')
                }).catch( error =>{
                    toast.error('Login Failed', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                })
            }catch(error){
                console.error("An error occured: ")
                
            }
        }
    return (
        <Grid container>
            <Grid item lg={4}>

            </Grid>
            <Grid item lg={4} mt={15} mb={10}>
                <Box sx={{p:4, border: '0.5px solid black'}}>
                    <form onSubmit={HandleLogin}>
                        <Typography variant="h4" mb={2} sx={{textAlign:'center'}}>Login<PersonIcon sx={{height:'45px',width:'45px'}}/></Typography>
                            <TextField type='email' sx={{m:1, width: '100%'}} label={'Email'} variant={'standard'} value={email} onChange={(event)=> setEmail(event.target.value)}/>
                            <TextField type='password' sx={{m:1, width: '100%'}} label={'Password'} variant={'standard'} value={password} onChange={(event)=> setPassword(event.target.value)}/>
                        <FormControl sx={{m:2}}>
                        </FormControl>
                        {/* <Button variant="contained" type="submit" fullWidth sx={{bgcolor:'#7b7c7d', mt:'10px', textAlign:'center'}}>Login</Button> */}
                        <Button variant={'contained'} type={'submit'} style={{bgcolor:'#7b7c7d', mt:'10px', textAlign:'center', width:'100%'}}>Login</Button>
                    </form>
                </Box>
                

            </Grid>
            <Grid item lg={4}>

            </Grid>
        </Grid>
    )
}