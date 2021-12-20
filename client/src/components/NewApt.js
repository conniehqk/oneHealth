import { Divider, Select, FormControl, InputLabel, MenuItem, Button, Modal,Box,Alert } from "@mui/material"
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoctors } from "../features/officeuser/officeusersSlice"
import { addAppointments } from "../features/appointment/appointmentsSlice"

function NewApt({  user }) {
    const minTime= new Date()
    minTime.setHours(8,30,0)
    const maxTime= new Date()
    maxTime.setHours(19,30,0)
    const localizer = momentLocalizer(moment)
    const doctors = useSelector((state)=> state.officeuser.data)
    const [blocked, setBlocked] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDoctors())
      }, [])
    const [appt, setAppt] = useState({
        patient_user_id: user.id,
        office_user_id: -1,
        title: `Appointment with ${user.full_name}`,
        start: "",
        end: "",
        confirmed: false,
        completed:false,
        description: "",
        charge: 0
    })
    const [calShow, setCalShow] = useState(false)
    const [apptConfirm, setApptConfirm] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    function handleSelect({ start, end }) {
        setAppt({
            ...appt,
            ["start"]: start,
            ["end"]: end
        })
        setApptConfirm(true)
    }

    function handleNext() {
        if (appt.office_user_id!==-1) {
            const curDoc = doctors.find(d=>{return d.id===appt.office_user_id})
            const startTimes = curDoc.appointments.map(appt=>{
                return new Date(appt.start).toString()
            })
            setBlocked(startTimes)
            setCalShow(true)
        }
    }
    
    function doctorsDisplay(docs) {
        const filDocs = docs.filter(d=>{
            return (d.title=="MD"||d.title=="NP")
        })
        return filDocs.map(d=>{
            return (<MenuItem key={d.id} value={d.id}>{d.full_name} - {d.specialization}</MenuItem>)
        })
    }

    function availAppts() {
        let events = []
        let start = new Date()
        start = new Date(start.setDate(start.getDate() + 1))
        let end = new Date(start)
        end = new Date(end.setDate(end.getDate() + 14))
        
        let loop = new Date(start);
        while (loop <= end) {
            for (let st = 9; st < 19; st++) {
                let startTime = loop.setHours(st,0,0)
                let endTime = loop.setHours(st+1,0,0)
                if (!blocked.includes(new Date(startTime).toString())) {
                    events.push({
                        title: "Available Appointment",
                        start: new Date(startTime),
                        end: new Date(endTime)
                    })
                }
            }
            let newDate = loop.setDate(loop.getDate() + 1);
            loop = new Date(newDate);
        }
        return events
    }

    function handleSubmit() {
        dispatch(addAppointments(appt))
        setApptConfirm(false)
        setSubmitSuccess(true)
    }

    const CustomToolbar = (props) => {
        const [viewState, setViewState] = useState('week');
      
        function addMonths(date, months) {
          const d = date.getDate();
          date.setMonth(date.getMonth() + months);
          if (date.getDate() != d) {
            date.setDate(0);
          }
          console.log(date);
          return date;
        }
        
        function addWeeks(date, weeks) {
          date.setDate(date.getDate() + 7 * weeks);
          return date;
        }
        
        function addDays(date, days) {
          date.setDate(date.getDate() + days);
          return date;
        }
      
        const goToBack = () => {
          if (viewState === 'month') {
            props.onNavigate('prev', addMonths(props.date, -1));
          } else if (viewState === 'week') {
            props.onNavigate('prev', addWeeks(props.date, -1));
          } else {
            props.onNavigate('prev', addDays(props.date, -1));
          }
        };
      
        const goToNext = () => {
          if (viewState === 'month') {
            props.onNavigate('next', addMonths(props.date, +1));
          } else if (viewState === 'week') {
            props.onNavigate('next', addWeeks(props.date, +1));
          } else {
            props.onNavigate('next', addDays(props.date, +1));
          }
        };
      
        const goToToday = () => {
          const now = new Date();
          props.date.setMonth(now.getMonth());
          props.date.setYear(now.getFullYear());
          props.date.setDate(now.getDate());
          props.onNavigate('current');
        };
      
        return (
          <div className="rbc-toolbar">
            <div>
              <button onClick={goToBack}>&#8249;</button>
              <button onClick={goToToday}>Current Week</button>
              <button onClick={goToNext}>&#8250;</button>
            </div>
          </div>
        );
      };



    return (
        <div className="page-module">
            <Divider><h2>Schedule Appointment</h2></Divider>
            {submitSuccess?
            <Alert severity="success">Appointment Scheduled!</Alert>: null
            }
            <div id="selectdoctor">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select A Doctor</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select A Doctor"
                    onChange={(e)=>setAppt({...appt, ['office_user_id']:e.target.value})}
                    disabled={calShow}
                    >
                    {doctorsDisplay(doctors)}
                    </Select>
                    
                </FormControl>
                {calShow?
                <Button id="apptbtn" size="small" onClick={()=>setCalShow(false)} variant="outlined">Back</Button>:
                <Button id="apptbtn" size="small" onClick={handleNext} variant="outlined">Next</Button>
                }
            </div>
            {calShow?
            <div id="selectTime">
                <Calendar
                selectable
                localizer={localizer}
                events={availAppts()}
                defaultView={Views.WEEK}
                Date={Date.now()}
                views={[Views.DAY, Views.MONTH, Views.WEEK]}
                onSelectEvent={handleSelect}
                startAccessor="start"
                endAccessor="end"
                min={minTime}
                max={maxTime}
                components={{toolbar: CustomToolbar}}
                />
            </div>:null}
            <Modal
                open={apptConfirm}
                onClose={()=>setApptConfirm(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box id="apptconfirm">
                    <div>
                        <h2 id="parent-modal-title">You selected:</h2>
                        <p id="parent-modal-description">
                            {new Date(appt.start).toString().slice(0,25)} to {new Date(appt.end).toString().slice(0,25)}
                        </p>
                        <Button onClick={handleSubmit} variant="outlined">Confirm</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}


export default NewApt