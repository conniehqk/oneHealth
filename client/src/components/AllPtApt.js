import { Button, List, ListItem, ListItemAvatar, Avatar, Grid, ListItemText, Divider, ButtonGroup, Rating, Modal, Box, Snackbar } from '@mui/material';
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments, deleteAppointments, apptsSlectors } from "../features/appointment/appointmentsSlice"
import { updateDoctors } from "../features/officeuser/officeusersSlice"

function AllPtApt() {
    const dispatch = useDispatch()
    const appointments = useSelector(apptsSlectors.selectAll)
    useEffect(()=>{
        dispatch(getAppointments())
      }, [])
    const onDelete = useCallback((id)=>dispatch(deleteAppointments(id)), [])
    const onPatch = useCallback((id, obj)=>dispatch(updateDoctors({id, obj})), [])
    const [docRate, setDocRate] = useState(-1)
    const [rateView, setRateView] = useState(false)
    const [rating, setRating] = useState(5)
    const [ratingSuccess, setRatingSuccess] = useState(false)
    function handleRating() {
        onPatch(docRate, { 'ratings': rating })
        setRatingSuccess(true)
        setRateView(false)
    }
    return (
        <>
            <Grid container spacing={3} id="allappts">
                <Grid item xs={4}>
                    <h3>Appointments Requested</h3>
                    <List sx={{maxHeight:700, overflow: 'auto', paddingRight:2}}>
                    {appointments.filter(
                        appt=>{return appt.confirmed===false && appt.completed===false}
                        ).map(appt=>{
                        return (
                            <>
                                <ListItem id="apptcard" key={appt.id} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={appt.office_user.full_name} src={appt.office_user.image} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                    primary={<h3>Dr. {appt.office_user.full_name}</h3>}
                                    secondary={
                                        <>
                                            <p>Start: {new Date(appt.start).toString().slice(0,25)}</p>
                                            <p>End: {new Date(appt.end).toString().slice(0,25)}</p>
                                        </>
                                    }
                                    />
                                    <Button onClick={()=>onDelete(appt.id)} variant="contained">Cancel</Button>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )
                    })}
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <h3>Appointments In Progress</h3>
                    <List sx={{maxHeight:700, overflow: 'auto', paddingRight:2}}>
                    {appointments.filter(appt=>{
                        return appt.confirmed===true && appt.completed===false
                        }).map(appt=>{
                        return (
                            <>
                                <ListItem id="apptcard" key={appt.id} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={appt.office_user.full_name} src={appt.office_user.image} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                    primary={<h3>Dr. {appt.office_user.full_name}</h3>}
                                    secondary={
                                        <>
                                            <p>Start: {new Date(appt.start).toString().slice(0,25)}</p>
                                            <p>End: {new Date(appt.end).toString().slice(0,25)}</p>
                                        </>
                                    }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )
                    })}
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <h3>Appointments Completed</h3>
                    <List sx={{maxHeight:700, overflow: 'auto', paddingRight:2}}>
                    {appointments.filter(appt=>{
                        return appt.confirmed===true && appt.completed===true
                        }).map(appt=>{
                        return (
                            <>
                                <ListItem id="apptcard" key={appt.id} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={appt.office_user.full_name} src={appt.office_user.image} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                    primary={<h3>Dr. {appt.office_user.full_name}</h3>}
                                    secondary={
                                        <>
                                            <p>Start: {new Date(appt.start).toString().slice(0,25)}</p>
                                            <p>End: {new Date(appt.end).toString().slice(0,25)}</p>
                                            <p>Charge: ${appt.charge}</p>
                                        </>
                                    }
                                    />
                                    <ButtonGroup
                                        orientation="vertical"
                                        aria-label="vertical contained button group"
                                    >
                                        <Button key="one">Pay</Button>
                                        <Button onClick={()=>{
                                            setDocRate(appt.office_user.id)
                                            setRateView(true)
                                        }} key="two">Rate</Button>
                                    </ButtonGroup>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )
                    })}
                    </List>
                </Grid>
            </Grid>
            <Modal
                open={rateView}
                onClose={()=>setRateView(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box id="apptconfirm">
                    <div>
                        <h2 id="parent-modal-title">Please rate this doctor:</h2>
                        <div>
                            <Rating onChange={(e)=>setRating(e.target.value)} name="half-rating" defaultValue={5} precision={0.5} />
                        </div>
                        <Button onClick={handleRating} id="apptbtn" variant="outlined">Submit</Button>
                    </div>
                </Box>
            </Modal>
            <Snackbar 
            open={ratingSuccess}
            autoHideDuration={6000}
            onClose={()=>setRatingSuccess(false)}
            message="Thank you for your rating!"
            />
        </>
    )
}

export default AllPtApt