import { Button, List, ListItem, Grid, ListItemText, Divider, ButtonGroup, Modal, Box, TextField } from '@mui/material';
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments, deleteAppointments, updateAppointments, apptsSlectors } from "../features/appointment/appointmentsSlice"

function AllEmApt() {
    const dispatch = useDispatch()
    const appointments = useSelector(apptsSlectors.selectAll)
    useEffect(()=>{
        dispatch(getAppointments())
      }, [dispatch])
    const onPatch = useCallback((id, obj)=>dispatch(updateAppointments({id, obj})), [])
    const onDelete = useCallback((id)=>dispatch(deleteAppointments(id)), [])
    const [completed, setCompleted] = useState(false)
    const [completeInfo, setCompleteInfo] = useState({
        id: -1,
        charge: 0
    })
    const [details, setDetails] = useState(false)
    const [patient, setPatient] = useState({})
    function handleComplete(id) {
        setCompleted(true)
        setCompleteInfo({
            ...completeInfo, ["id"]: id
        })
    }

    function handleSubmit() {
        console.log(completeInfo.id)
        console.log(completeInfo.charge)
        onPatch(completeInfo.id, {
            "charge": completeInfo.charge,
            "completed": true
        })
        setCompleted(false)
    }

    
    return (
        <>
            <Grid container spacing={3} id="allappts">
                <Grid item xs={4}>
                    <h3>Appointments Requested</h3>
                    <List sx={{maxHeight:700, overflow: 'auto', paddingRight:2}}>
                    {appointments.filter(
                        appt=>{return appt.title!=="block" && appt.confirmed===false && appt.completed===false }
                        ).map(appt=>{
                        return (
                            <div key={appt.id}>
                                <ListItem id="apptcard" key={appt.id} alignItems="flex-start">
                                    <ListItemText 
                                    primary={appt.title}
                                    secondary={
                                        <>
                                            <p>Start: {new Date(appt.start).toString().slice(0,25)}</p>
                                            <p>Reason for visit: {appt.description}</p>
                                        </>
                                    }
                                    />
                                    <ButtonGroup
                                    orientation="vertical"
                                    aria-label="vertical contained button group"
                                    variant="text">
                                        <Button onClick={()=>onDelete(appt.id)} key="one">Cancel</Button>
                                        <Button onClick={()=>onPatch(appt.id, {"confirmed": true})} key="two">Confirm</Button>
                                        <Button onClick={()=>{
                                            setDetails(true)
                                            setPatient(appt.patient_user)
                                            }} key="two">Details</Button>
                                    </ButtonGroup>
                                    <Modal
                                        open={details}
                                        onClose={()=>setDetails(false)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        >
                                        <Box id="apptconfirm">
                                            <div>
                                                <h2 id="parent-modal-title">Patient: {patient.full_name}</h2>
                                                <p>Date of Birth: {patient.dob}</p>
                                                <p>Gender: {patient.gender}</p>
                                                <p>Phone: {patient.phone}</p>
                                            </div>
                                        </Box>
                                    </Modal>
                                </ListItem>
                                <Divider />
                            </div>
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
                            <div key={appt.id}>
                                <ListItem id="apptcard" key={appt.id} alignItems="flex-start">
                                    <ListItemText 
                                    primary={appt.title}
                                    secondary={
                                        <>
                                            <p>Start: {new Date(appt.start).toString().slice(0,25)}</p>
                                            <p>Reason for visit: {appt.description}</p>
                                        </>
                                    }
                                    />
                                    <Button onClick={()=>handleComplete(appt.id)}>Completed</Button>
                                </ListItem>
                                <Divider />
                            </div>
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
                            <div key={appt.id}>
                                <ListItem id="apptcard" key={appt.id} alignItems="flex-start">
                                    <ListItemText 
                                    primary={appt.title}
                                    secondary={
                                        <>
                                            <p>Start: {new Date(appt.start).toString().slice(0,25)}</p>
                                            <p>End: {new Date(appt.end).toString().slice(0,25)}</p>
                                            <p>Charge Amount: ${appt.charge}</p>
                                        </>
                                    }
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}
                    </List>
                </Grid>
            </Grid>
            <Modal
                open={completed}
                onClose={()=>setCompleted(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box id="apptconfirm">
                    <div>
                        <h2 id="parent-modal-title">Please enter charge amount:</h2>
                        <div>
                            <TextField variant="standard" type="number" onChange={(e)=>setCompleteInfo({...completeInfo, ["charge"]:e.target.value})} />
                        </div>
                        <Button id="apptbtn" onClick={handleSubmit} variant="outlined">Complete and Charge</Button>
                    </div>
                </Box>
            </Modal>
            
        </>
    )
}

export default AllEmApt