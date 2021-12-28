import { Card, Grid, CardMedia, CardContent, Rating, Divider } from "@mui/material"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoctors, docsSlectors } from "../features/officeuser/officeusersSlice"

function AllDoctors() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDoctors())
      }, [])
    const doctors = useSelector(docsSlectors.selectAll)
    function DocDisplay() {
        return doctors.filter(d=>{
            return (d.title=="MD"||d.title=="NP")
        }).map(d=>{
            const appts = d.appointments.filter(appt=>{
                return appt.confirmed===true && appt.completed===true})
            return (
                <>
                    
                    <Grid item xs={2}>
                        <Card>
                            <CardMedia 
                            component="img"
                            image={d.image}
                            height="200"
                            alt={d.full_name}
                            />
                            <CardContent>
                                <h2>{d.full_name}</h2>
                                <p>{d.specialization}</p>
                                <div>
                                    <Rating value={appts.reduce((total,next)=>total+next.rating,0)/appts.length} precision={0.1} readOnly />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </>
            )
        })
    }
    return (
        <div className="page-module">
            <Divider><h2>All Doctors</h2></Divider>
            <Grid container spacing={5} id="allappts">
                {DocDisplay()}
            </Grid>
        </div>
    )
}

export default AllDoctors