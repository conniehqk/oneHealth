
import { Button, ButtonGroup, SwipeableDrawer, Stack, Grid } from '@mui/material';
import  Container from '@mui/material/Container';
import { useState } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Signin from './Signin';
import Signup from './Signup';

function Landing({ onPtLogin, onEmLogin }) {
    const [signinDrawer, setSigninDrawer] = useState(false)
    const [signupDrawer, setSignupDrawer] = useState(false)
    return (
        <div id="landing">
            <Grid>
                <ButtonGroup id="landingbuttons" variant="text" orientation="vertical" aria-label="text button group">
                    <Button size="large" onClick={()=>setSigninDrawer(true)}>Sign In</Button>
                    <SwipeableDrawer
                        anchor="right"
                        open={signinDrawer}
                        onClose={()=>setSigninDrawer(false)}
                        onOpen={()=>setSigninDrawer(true)}
                    >
                        <Signin onPtLogin={onPtLogin} onEmLogin={onEmLogin} />
                    </SwipeableDrawer>
                    <Button size="large" onClick={()=>setSignupDrawer(true)}>Sign Up</Button>
                    <SwipeableDrawer
                        anchor="right"
                        open={signupDrawer}
                        onClose={()=>setSignupDrawer(false)}
                        onOpen={()=>setSignupDrawer(true)}
                    >
                        <Signup onPtLogin={onPtLogin} />
                    </SwipeableDrawer>
                </ButtonGroup>
                <div id="landingsocial">
                    <Stack  direction="row" spacing={2}>
                        <LinkedInIcon fontSize="large" />
                        <InstagramIcon fontSize="large" />
                        <FacebookIcon fontSize="large" />
                        <TwitterIcon fontSize="large" />
                    </Stack>
                </div>
            </Grid>
            <Container id="landingstuff" maxWidth="lg">
                <div id="landingtitle">OneHealth</div>
                <div id="landingtext">
                    <p>All your healthcare need at one place.</p>
                </div>
            </Container>
        </div>
    )
}

export default Landing