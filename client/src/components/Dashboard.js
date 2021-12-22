import { Box,Stack,Divider } from "@mui/material"
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments, apptsSlectors } from "../features/appointment/appointmentsSlice"
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link } from "react-router-dom";

function Dashboard() {
    const dispatch = useDispatch()
    const appointments = useSelector(apptsSlectors.selectAll)
    useEffect(()=>{
      dispatch(getAppointments())
    }, [dispatch])
    return (
        <>
            <div className="module--full">
                <Stack direction="row">
                  <Box id="db-box">
                    <h1>{appointments.filter(
                        appt=>{return appt.confirmed===false && appt.completed===false}
                        ).length}</h1>
                    <h3>Appointment Requested</h3>
                  </Box>
                  <Box id="db-box">
                    <h1>{appointments.filter(
                        appt=>{return appt.confirmed===true && appt.completed===false}
                        ).length}</h1>
                    <h3>Appointment In Progress</h3>
                  </Box>
                  <Box id="db-box">
                    <h1>{appointments.filter(
                        appt=>{return appt.confirmed===true && appt.completed===true}
                        ).length}</h1>
                    <h3>Appointment Completed</h3>
                  </Box>
                  <Box id="db-box">
                    <h1>${appointments.reduce((a,b)=>a+b.charge,0)}</h1>
                    <h3>Total Spending</h3>
                  </Box>
                  <Box id="db-box">
                    <h1>${appointments.reduce((a,b)=>a+b.charge,0)}</h1>
                    <h3>Last Visit</h3>
                  </Box>
                </Stack>
                <Divider id="db-divider" variant="fullwidth"></Divider>
            </div>
            
            <div className="module-wrapper">
              <div className="module--full">
              <Stack direction="row">
                  <Box 
                  id="db-box-button" 
                  sx={{'&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                  },}}
                  >
                    <AssignmentIndIcon sx={{ fontSize: 60 }} />
                    <h2>View/Edit Profile</h2>
                  </Box>
                  <Box 
                  id="db-box-button"
                  sx={{'&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                  },}}
                  >
                    <ScheduleIcon sx={{ fontSize: 60 }} />
                    <h2>Schedule Appointment</h2>
                  </Box>
                  <Box 
                  id="db-box-button"
                  sx={{'&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                  },}}
                  >
                    <DateRangeIcon sx={{ fontSize: 60 }} />
                    <h2>View All Appointment</h2>
                  </Box>
                </Stack>
              </div>
            </div>
        </>
    )
}

export default Dashboard