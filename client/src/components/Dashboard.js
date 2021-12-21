import { Box,Stack } from "@mui/material"
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoctors, docsSlectors } from "../features/officeuser/officeusersSlice"
import { getAppointments, apptsSlectors } from "../features/appointment/appointmentsSlice"


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
            </div>
            <div className="module-wrapper">
              <div className="module--full">
                stuff
              </div>
            </div>
        </>
    )
}

export default Dashboard