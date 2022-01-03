import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments, addAppointments, apptsSlectors } from "../features/appointment/appointmentsSlice"
import { Button } from '@mui/material';

function Schedule({ user }) {
    const dispatch = useDispatch()
    const appointments = useSelector(apptsSlectors.selectAll)
    useEffect(()=>{
        dispatch(getAppointments())
      }, [dispatch])
    const onAddAppt = useCallback((obj)=>dispatch(addAppointments(obj)), [])
    const [openSlot, setOpenSlot] = useState(false)
    const [blocked, setBlocked] = useState([])
    function apptToShow() {
        return appointments.filter(
            appt=>{return appt.title!=="block"}
            ).map((appt)=>{
            return ({
                title: appt.title,
                start: new Date(appt.start),
                end: new Date(appt.end)
            })
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

    function handleShowOpen() {
        const startTimes = appointments.map(appt=>{
            return new Date(appt.start).toString()
        })
        setBlocked(startTimes)
        setOpenSlot(true)
    }

    function handleSelect({ start, end }) {
        const newBlocked = blocked + [new Date(start).toString()]
        setBlocked(newBlocked)
        onAddAppt({
            patient_user_id: 1,
            office_user_id: user.id,
            title: "block",
            start: start,
            end: end,
            confirmed: false,
            completed:false,
            description: "",
            charge: 0,
            rating: 5,
            review: ""
        })
    }
    const minTime= new Date()
    minTime.setHours(8,30,0)
    const maxTime= new Date()
    maxTime.setHours(19,30,0)
    const localizer = momentLocalizer(moment)
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
        <>
            {openSlot?
            <div id="schedule">
                <Button variant="outlined" onClick={()=>setOpenSlot(false)}>Show Appointments</Button>
                <Calendar
                selectable
                localizer={localizer}
                events={availAppts()}
                defaultView={Views.WEEK}
                Date={Date.now()}
                views={[Views.DAY, Views.MONTH, Views.WEEK]}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelect}
                min={minTime}
                max={maxTime}
                components={{toolbar: CustomToolbar}}
                />
            </div>
            :
            <div id="schedule">
                <Button variant="outlined" onClick={handleShowOpen}>Manage Open Slots</Button>
                <Calendar
                localizer={localizer}
                events={apptToShow()}
                defaultView={Views.WEEK}
                Date={Date.now()}
                views={[Views.DAY, Views.MONTH, Views.WEEK]}
                startAccessor="start"
                endAccessor="end"
                min={minTime}
                max={maxTime}
                components={{toolbar: CustomToolbar}}
                />
            </div>
            }
            
        </>
    )
}

export default Schedule