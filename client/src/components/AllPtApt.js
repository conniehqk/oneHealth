import { Button, List, ListItem, ListItemAvatar, Avatar, Grid, ListItemText, Divider, CircularProgress } from '@mui/material';
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments, deleteAppointments, apptsSlectors } from "../features/appointment/appointmentsSlice"

function AllPtApt() {
    const dispatch = useDispatch()
    const appointments = useSelector(apptsSlectors.selectAll)
    useEffect(()=>{
        dispatch(getAppointments())
      }, [])
    const onDelete = useCallback((id)=>dispatch(deleteAppointments(id)), [])
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
                                    <Button variant="contained">Pay</Button>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )
                    })}
                    </List>
                </Grid>
            </Grid>
        </>
    )
}

export default AllPtApt