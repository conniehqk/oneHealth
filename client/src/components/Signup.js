import { TextField, Button,  Stack, Alert } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useState } from 'react';

function Signup({ onPtLogin }) {
    const [value, setValue] = useState(new Date());
    const [errors, setErrors] = useState([]);
    const [formInput, setFormInput] = useState({
        full_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: ""
    })
    function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        fetch("/api/patient_signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "full_name": formInput['full_name'],
                "email": formInput['email'],
                "password": formInput['password'],
                "password_confirmation": formInput['password_confirmation'],
                "phone": formInput['phone'],
                "dob": value
            }),
          }).then((r) => {
            // setIsLoading(false);
            if (r.ok) {
              r.json().then((user) => onPtLogin(user));
            } else {
              r.json().then((err) => {
                  setErrors(err)});
            }
          })
    }
    function handleChange(e) {
        setFormInput({
            ...formInput,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div id="signform">
            <h3 id="signformtext">Please create new account</h3>
            {errors&&errors.length>0?
                <div>
                    <Alert variant="filled" severity="error">{
                        errors.map((err,index)=>{
                            return (<p key={index}>{err}</p>)
                        })
                    }</Alert>
                    <p></p>
                </div>:null}
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Email"
                    type="email"
                    margin="dense"
                    size="small"
                    name="email"
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    required
                    label="Password"
                    type="password"
                    margin="dense"
                    size="small"
                    name="password"
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    required
                    label="Confirm Password"
                    type="password"
                    margin="dense"
                    name="password_confirmation"
                    size="small"
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    required
                    fullWidth
                    label="Full Name"
                    type="text"
                    name="full_name"
                    margin="dense"
                    onChange={handleChange}
                    size="small"
                />
                <TextField
                    required
                    label="Phone Number"
                    margin="dense"
                    name="phone"
                    size="small"
                    onChange={handleChange}
                    fullWidth
                />
                <div id="signupdob">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            required
                            label="Date of Birth"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <Button id="submit" type="submit" variant="outlined" endIcon={<ArrowForwardIcon />}>Submit</Button>
            </form>
            <div id="signformfooter">
                <Stack direction="row" spacing={2}>
                    <LinkedInIcon  />
                    <InstagramIcon />
                    <FacebookIcon />
                    <TwitterIcon />
                </Stack>
            </div>
        </div>
    )
}

export default Signup