import { Divider } from "@mui/material"
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'


function NewApt() {
    const localizer = momentLocalizer(moment)
    function handleSelect({ start, end }) {
        console.log("wat")
    }
    return (
        <div className="page-module">
            <Divider><h2>Schedule Appointment</h2></Divider>
            <div>
                <Calendar
                selectable
                localizer={localizer}
                events={[
                    {
                        id: 0,
                        title: 'All Day Event very long title',
                        allDay: true,
                        start: new Date(2021, 12, 20),
                        end: new Date(2021, 12, 20),
                      },
                      {
                        id: 1,
                        title: 'Available Appointment',
                        start: new Date(2021, 12, 21, 14, 0, 0, 0),
                        end: new Date(2021, 12, 21, 15, 0, 0, 0),
                      },
                ]}
                defaultView={Views.WEEK}
                Date={Date.now()}
                onNavigate={date=>console.log(date)}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={handleSelect}
                />
            </div>
        </div>
    )
}

export default NewApt