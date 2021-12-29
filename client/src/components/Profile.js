import { Divider, Grid, Fab, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Alert } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../features/profile/profileSlice"
import DoneIcon from '@mui/icons-material/Done';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

function Profile() {
    const profile = useSelector((state)=> state.profile.data)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProfile())
      }, [])
    const [edit, setEdit] = useState(false)
    const [formInput, setFormInput] = useState({})

    function handleProfileUpdate() {
        dispatch(updateProfile(formInput))
        setEdit(false)
    }

    function handleInputChange(name, val) {
        setFormInput({
           ...formInput, [name]:val
        })
    }

    return (
        <div className="page-module">
            <Divider><h2>Patient Profilie</h2></Divider>
            {Object.values(profile).some(x=>x===null||x==="")?
            <Alert severity="warning">Please complete your profile!</Alert>:null}
            <p></p>
            {edit? 
            <>
            <Fab color="secondary" size="medium" aria-label="doneedit" onClick={handleProfileUpdate}>
                <DoneIcon />
            </Fab>
            <h3>Basic Information</h3>
            <Grid container spacing={2} id="profilecontent">
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                    fullWidth
                    disabled
                    id="outlined-disabled"
                    label="Email"
                    value={profile.email}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                    fullWidth
                    id="outlined"
                    label="Full Name"
                    value={formInput.full_name? formInput.full_name:profile.full_name}
                    onChange={(e)=>{handleInputChange("full_name", e.target.value)}}
                    />
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group" onClick={(e)=>{handleInputChange("gender", e.target.value)}}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />

                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Birth"
                            value={formInput.dob?formInput.dob:profile.dob}
                            onChange={(newValue) => {
                            handleInputChange("dob", newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                    fullWidth
                    id="outlined"
                    label="Address"
                    value={formInput.address?formInput.address:profile.address}
                    onChange={(e)=>{handleInputChange("address", e.target.value)}}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                    fullWidth
                    id="outlined"
                    label="Phone Number"
                    value={formInput.phone?formInput.phone:profile.phone}
                    onChange={(e)=>{handleInputChange("phone", e.target.value)}}
                    />
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
            <h3>Insurance</h3>
            <Grid container spacing={2} id="profilecontent">
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                    fullWidth
                    id="outlined"
                    label="Insurance"
                    value={formInput.insurance?formInput.insurance:profile.insurance}
                    onChange={(e)=>{handleInputChange("insurance", e.target.value)}}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                    fullWidth
                    id="outlined"
                    label="Insurance ID"
                    value={formInput.insurance_id?formInput.insurance_id:profile.insurance_id}
                    onChange={(e)=>{handleInputChange("insurance_id", e.target.value)}}
                    />
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
            </>:
            <>
            <Fab color="secondary" size="medium" aria-label="edit" onClick={()=>{setEdit(true)}}>
                <EditIcon />
            </Fab>
            <h3>Basic Information</h3>
            <Grid container spacing={2} id="profilecontent">
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                    <p>Email: {profile.email}</p>
                </Grid>
                <Grid item xs={3}>
                    <p>Name: {profile.full_name}</p>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                    <p>Gender: {profile.gender}</p>
                </Grid>
                <Grid item xs={3}>
                    <p>Date of Birth: {profile.dob}</p>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                    <p>Address: {profile.address}</p>
                </Grid>
                <Grid item xs={3}>
                    <p>Phone: {profile.phone}</p>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
            <h3>Insurance</h3>
            <Grid container spacing={2} id="profilecontent">
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                    <p>Insurance: {profile.insurance}</p>
                </Grid>
                <Grid item xs={3}>
                    <p>Insurance ID: {profile.insurance_id}</p>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
            </>
            }
        </div>
    )
}

export default Profile