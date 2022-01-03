import { Box,Stack,Divider } from "@mui/material"
import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments, apptsSlectors } from "../features/appointment/appointmentsSlice"
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Link } from "react-router-dom";

function Edashboard() {
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
                        appt=>{return appt.title!=="block" && appt.confirmed===false && appt.completed===false}
                        ).length}</h1>
                    <h3>Appointment Requested</h3>
                  </Box>
                  <Box id="db-box">
                    <h1>{appointments.filter(
                        appt=>{return appt.title!=="block" && appt.confirmed===true && appt.completed===false}
                        ).length}</h1>
                    <h3>Appointment In Progress</h3>
                  </Box>
                  <Box id="db-box">
                    <h1>{appointments.filter(
                        appt=>{return appt.title!=="block" && appt.confirmed===true && appt.completed===true}
                        ).length}</h1>
                    <h3>Appointment Completed</h3>
                  </Box>
                  <Box id="db-box">
                    <h1>${appointments.reduce((a,b)=>a+b.charge,0)}</h1>
                    <h3>Total Earning</h3>
                  </Box>
                  <Box id="db-box">
                    <h1>{new Date(appointments.filter(
                        appt=>{return appt.confirmed===true && appt.completed===true}
                        ).map(function(e) { return e.start }).sort().reverse()[0]).toLocaleDateString()}</h1>
                    <h3>Last Visit</h3>
                  </Box>
                </Stack>
                <Divider id="db-divider" variant="fullwidth"></Divider>
            </div>
            
            <div className="module-wrapper">
              <div className="module--full">
                <Stack direction="row">
                    <Link id="db-box-button" class="hvr-bounce-in" to="/myappts">
                    <Box>
                        <DateRangeIcon sx={{ fontSize: 60 }} />
                        <h2>View All Appointment</h2>
                    </Box>
                    </Link>
                    <Link id="db-box-button" class="hvr-bounce-in" to="/myschedule">
                    <Box>
                        <ScheduleIcon sx={{ fontSize: 60 }} />
                        <h2>View Schedule</h2>
                    </Box>
                    </Link>
                </Stack>
              </div>
            </div>
        </>
    )
}

export default Edashboard