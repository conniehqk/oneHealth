import { TextField, FormControlLabel, Switch, Button, Stack, Alert } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useState } from 'react';

function Signin({ onPtLogin, onEmLogin }) {
    const [employee, setEmployee] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState([]);
    function handleSubmit(e) {
        e.preventDefault()
        if (employee) {
            fetch("/api/office_login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo),
              }).then((r) => {
                if (r.ok) {
                  r.json().then((user) => onEmLogin(user));
                } else {
                  r.json().then((err) => setErrors(err.errors));
                }
              });
        } else {
            fetch("/api/patient_login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo),
              }).then((r) => {
                if (r.ok) {
                  r.json().then((user) => onPtLogin(user));
                } else {
                  r.json().then((err) => setErrors(err.errors));
                }
              });
        }
    }
    function handleChange(e) {
        setLoginInfo({
            ...loginInfo, [e.target.name]:e.target.value
        })
    }
    return (
        <div id="signform">
            <h3 id="signformtext">Please sign in to your account</h3>
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
                id="outlined-required"
                label="Email"
                type="email"
                margin="normal"
                name="email"
                onChange={handleChange}
                fullWidth
                />
                <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                margin="normal"
                onChange={handleChange}
                fullWidth
                />
                <FormControlLabel
                control={
                    <Switch checked={employee} onChange={()=>setEmployee(!employee)} name="user_type" />
                }
                label="Employee"
                />
                <Button id="submit" type="submit" variant="outlined" endIcon={<ArrowForwardIcon />}>Submit</Button>
            </form>
            <a href="#">Forgot password?</a>
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

export default Signin