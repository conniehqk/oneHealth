import { Button, List, ListItem, ListItemAvatar, Avatar, Grid, ListItemText, Divider } from '@mui/material';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoctors } from "../features/officeuser/officeusersSlice"
import { getAppointments, deleteAppointments } from "../features/appointment/appointmentsSlice"

function AllPtApt() {
    const dispatch = useDispatch()
    const doctors = useSelector((state)=> state.officeuser.data)
    const appointments = useSelector((state)=> state.appointment.data)
    useEffect(()=>{
        dispatch(getDoctors())
        dispatch(getAppointments())
      }, [])
    const [apptsReq, setApptsReq] = useState(appointments.filter(appt=>{
        return appt.confirmed===false && appt.completed===false
    }))
    const apptsIP = appointments.filter(appt=>{
        return appt.confirmed===true && appt.completed===false
    })
    const apptsDone = appointments.filter(appt=>{
        return appt.confirmed===true && appt.completed===true
    })
    function handleDelete(id) {
        dispatch(deleteAppointments(id))
        setApptsReq(appointments.filter(a=>{
            return a.id!==id && a.confirmed===false && a.completed===false
        }))
    }
    return (
        <>
            <Grid container spacing={3} id="allappts">
                <Grid item xs={4}>
                    <h3>Appointments Requested</h3>
                    <List sx={{maxHeight:700, overflow: 'auto', paddingRight:2}}>
                    {apptsReq.map(appt=>{
                        const doc = doctors.find(d=>{return d.id===appt.office_user_id})
                        return (
                            <>
                                <ListItem id="apptcard" key={appt.id} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={doc.full_name} src={doc.image} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                    primary={doc.full_name}
                                    secondary={
                                        <>
                                            <p>Start: {new Date(appt.start).toString().slice(0,25)}</p>
                                            <p>End: {new Date(appt.end).toString().slice(0,25)}</p>
                                        </>
                                    }
                                    />
                                    <Button onClick={()=>handleDelete(appt.id)} variant="contained">Cancel</Button>
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
                    {apptsIP.map(appt=>{
                        const doc = doctors.find(d=>{return d.id===appt.office_user_id})
                        return (
                            <>
                                <ListItem id="apptcard" key={appt.id} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={doc.full_name} src={doc.image} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                    primary={doc.full_name}
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
                    {apptsDone.map(appt=>{
                        const doc = doctors.find(d=>{return d.id===appt.office_user_id})
                        return (
                            <>
                                <ListItem id="apptcard" key={appt.id} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={doc.full_name} src={doc.image} />
                                    </ListItemAvatar>
                                    <ListItemText 
                                    primary={doc.full_name}
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
            </Grid>
        </>
    )
}

export default AllPtApt