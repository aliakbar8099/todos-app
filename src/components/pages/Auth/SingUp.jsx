import React from "react"
import TextField from "@mui/material/TextField"
import style from '../../../view/Auth/auth.module.scss'
import Button from "@mui/material/Button"
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { validEmail } from "../../../utils/form";
import { postSingUp } from "../../../services/postApi";
import { CircularProgress } from "@mui/material";
import {useNavigate} from 'react-router-dom'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SingUp() {
    const redierct = useNavigate()

    const [value, setValue] = React.useState({
        username:"",
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
        if (value.username === "") {
            setAlert({ ...alert, severity: "error", msg: ' نام کابری خود را وارد کنید' })
            document.querySelector('input[name="username"]').focus()
            handleClick()
        }
        else if (value.email === "") {
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
        else if (value.password.length < 6) {
            setAlert({ ...alert, severity: "error", msg: 'پسورد حداقل 6 کاراکتر باشد' })
            document.querySelector('input[name="password"]').focus()
            handleClick()
        }
        else if(value.password !== document.querySelector('input[name="password2"]').value){
            setAlert({ ...alert, severity: "error", msg: 'کلمه عبور برابر نیست' })
            document.querySelector('input[name="password2"]').focus()
            handleClick()
        }
        else {
            setIsLoading(true)
            postSingUp(value).then(response => {
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
                <TextField autoFocus onChange={getValueInput} color="success" id="standard-basic" margin="dense" name="username" label="نام کاربری" placeholder="نام کاربری خودتو بنویس" fullWidth variant="standard" />
                <TextField onChange={getValueInput} color="success" id="standard-basic" margin="dense" name="email" label="ایمیل" placeholder="ایمیل خودتو بنویس" fullWidth variant="standard" />
                <TextField onChange={getValueInput} color="success" id="standard-basic" margin="dense" name="password" label="رمز عبور" placeholder="رمز عبور خود را وارد کنید" fullWidth variant="standard" />
                <TextField color="success" id="standard-basic" margin="dense" name="password2" label="تکرار کلمه عبور" placeholder="رمز عبور خود را وارد کنید" fullWidth variant="standard" />
                <Button onClick={handleSubmit} >
                    {
                        !isLoading ?
                            <>ثبت نام</>
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
                {/* <Alert severity="error">This is an error message!</Alert>
                <Alert severity="warning">This is a warning message!</Alert>
                <Alert severity="info">This is an information message!</Alert>
                <Alert severity="success">This is a success message!</Alert> */}
            </Stack>
        </>
    )
}