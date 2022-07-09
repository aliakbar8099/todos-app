// styles
import React from 'react';
import { TextField } from '@mui/material'
import style from './auth.module.scss'
import Button from '@mui/material/Button';
import FullWidthTabs from '../../components/common/FixedTabs';
import {useNavigate} from 'react-router-dom'

// pages
import Loing from '../../components/pages/Auth/Login';
import SingUp from '../../components/pages/Auth/SingUp';

export default function Auth() {
    const redirect = useNavigate();
    
    React.useEffect(()=> {
        if(localStorage.getItem('token') != null){
            redirect('/pacel')
        }
    },[])

    return (
        <div className={style.layout}>
            <div className={style.box_auth}>
                <FullWidthTabs login={<Loing />} singup={<SingUp />} />
            </div>
        </div>
    )
}