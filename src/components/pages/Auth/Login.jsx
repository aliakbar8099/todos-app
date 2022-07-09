import React from "react"
import TextField from "@mui/material/TextField"
import style from '../../../view/Auth/auth.module.scss'
import Button from "@mui/material/Button"
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { validEmail } from "../../../utils/form";
import { postLogin } from "../../../services/postApi";
import { CircularProgress } from "@mui/material";
import {useNavigate} from 'react-router-dom'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Loing() {
    const redierct = useNavigate()

    const [value, setValue] = React.useState({
        email: "",
        password: ""
    })
    const [open, setOpen] = React.useState(false);
    const [isLoading , setIsLoading] = React.useState(false);
    const [alert, setAlert] = React.useState({
        severity: "",
        msg: ""
    })

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function getValueInput(event) {
        setValue({ ...value, [event.target.name]: event.target.value })
    }

    function handleSubmit() {
        if (value.email === "") {
            setAlert({ ...alert, severity: "error", msg: 'ایمیل خود را وارد کنید' })
            document.querySelector('input[name="email"]').focus()
            handleClick()
        }
        else if (!validEmail(value.email)) {
            setAlert({ ...alert, severity: "error", msg: 'ایمیل اشتباه است!' })
            document.querySelector('input[name="email"]').focus()
            handleClick()
        }
        else if (value.password === "") {
            setAlert({ ...alert, severity: "error", msg: 'پسورد خود را وارد کنید' })
            document.querySelector('input[name="password"]').focus()
            handleClick()
        }
        else {
            setIsLoading(true)
            postLogin(value).then(response => {
                setAlert({ ...alert, severity: "success", msg: 'شما وارد شدید' })
                localStorage.setItem("token",response.token)
                redierct('/pacel')
                setIsLoading(false)
                handleClick()
            })
            .catch(err=> {
                setAlert({ ...alert, severity: "error", msg: err.response.data.message})
                setIsLoading(false)
                handleClick()
            })
        }
    }

    return (
        <>
            <div className={style.box_form}>
                <TextField autoFocus onChange={getValueInput} color="success" id="standard-basic" margin="dense" name="email" label="ایمیل" placeholder="ایمیل خودتو بنویس" fullWidth variant="standard" />
                <TextField onChange={getValueInput} color="success" id="standard-basic" margin="dense" name="password" label="رمز عبور" placeholder="رمز عبور خود را وارد کنید" fullWidth variant="standard" />
                <Button onClick={handleSubmit} >
                    {
                        !isLoading ?
                            <>ورود</>
                            :
                            <>
                                لطفا صبر کنید
                                &nbsp;
                                <CircularProgress sx={{ color: "#fff" }} size={22} />
                            </>
                    }
                </Button>
            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                {/* <Button variant="outlined" onClick={handleClick}>
                    Open success snackbar
                </Button> */}
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
                        {alert.msg}
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    )
}