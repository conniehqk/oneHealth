import { Button, List, ListItem, ListItemAvatar, Avatar, Grid, ListItemText, Divider, ButtonGroup, Rating, Modal, Box, Snackbar, TextField  } from '@mui/material';
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments, deleteAppointments, updateAppointments, apptsSlectors } from "../features/appointment/appointmentsSlice"
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_51K0tRICrSmL0ujtERl9T1qCIEyYFfc6xdbYm0xcEX6O0UHrZWZWVocKCdRjbGtwXbFJL0bBm1JS7TTkuQtAwNVxa00Havyz2kS");

function AllPtApt() {
    const dispatch = useDispatch()
    const appointments = useSelector(apptsSlectors.selectAll)
    useEffect(()=>{
        dispatch(getAppointments())
      }, [])
    const onDelete = useCallback((id)=>dispatch(deleteAppointments(id)), [])
    const onPatch = useCallback((id, obj)=>dispatch(updateAppointments({id, obj})), [])
    const [apptRate, setApptRate] = useState(-1)
    const [rateView, setRateView] = useState(false)
    const [payView, setPayView] = useState(false)
    const [payment, setPayment] = useState(0)
    const [rating, setRating] = useState(5)
    const [review, setReview] = useState("")
    const [ratingSuccess, setRatingSuccess] = useState(false)
    function handleRating() {
        onPatch(apptRate, { 'rating': rating, 'review': review })
        setRatingSuccess(true)
        setRateView(false)
    }
    function handlePay(e) {
        e.preventDefault()
        console.log(payment)
    }
    const CARD_ELEMENT_OPTIONS = {
        iconStyle: "solid",
        hidePostalCode: true,
        style: {
          base: {
            iconColor: "rgb(240, 57, 122)",
            color: "rgb(240, 57, 122)",
            fontSize: "16px",
            fontFamily: '"Open Sans", sans-serif',
            fontSmoothing: "antialiased",
            "::placeholder": {
              color: "#CFD7DF"
            }
          },
          invalid: {
            color: "#e5424d",
            ":focus": {
              color: "#303238"
            }
          }
        }
      };
    return (
        <>
            <Grid container  id="allappts">
                <Grid item xs={4}>
                    <h3>Appointments Requested</h3>
                    <List sx={{maxHeight:700, overflow: 'auto', paddingRight:2}}>
                    {appointments.filter(
                        appt=>{return appt.title!=='block' && appt.confirmed===false && appt.completed===false }
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
                                            <p>Reason for visit: {appt.description}</p>
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
                                            <p>Charge: ${appt.charge}</p>
                                            <p>My rating: <Rating value={appt.rating} precision={0.5} readOnly /></p>
                                            <p>My review: {appt.review? appt.review:"No review yet"}</p>
                                        </>
                                    }
                                    />
                                    <ButtonGroup
                                        orientation="vertical"
                                        aria-label="vertical contained button group"
                                    >
                                        <Button onClick={()=>{
                                            setPayment(appt.charge)
                                            setPayView(true)
                                        }} key="one">Pay</Button>
                                        <Button onClick={()=>{
                                            setApptRate(appt.id)
                                            setRateView(true)
                                        }} key="two">Rate</Button>
                                    </ButtonGroup>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        )
                    })}
                    </List>
                </Grid>
            </Grid>
            <Modal
                open={rateView}
                onClose={()=>setRateView(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box id="apptconfirm">
                    <div>
                        <h2 id="parent-modal-title">Please rate this visit:</h2>
                        <div>
                            <Rating onChange={(e)=>setRating(e.target.value)} name="half-rating" defaultValue={5} precision={0.5} />
                        </div>
                        <div>
                            <TextField 
                                label="Review"
                                fullWidth
                                multiline
                                rows={3}
                                onChange={(e)=>{setReview(e.target.value)}}
                                />
                        </div>
                        <Button onClick={handleRating} id="apptbtn" variant="outlined">Submit</Button>
                    </div>
                </Box>
            </Modal>
            <Modal
                open={payView}
                onClose={()=>setPayView(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box id="apptconfirm">
                    <div>
                            <form onSubmit={handlePay}>
                                <Elements stripe={stripePromise}>
                                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                                </Elements>
                                <Button type="submit" id="apptbtn" variant="outlined">Submit payment of ${payment}</Button>
                            </form>
                    </div>
                </Box>
            </Modal>
            <Snackbar 
            open={ratingSuccess}
            autoHideDuration={6000}
            onClose={()=>setRatingSuccess(false)}
            message="Thank you for your rating!"
            />
        </>
    )
}

export default AllPtApt