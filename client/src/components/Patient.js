import { Button, Stack } from "@mui/material"
import { useState } from "react";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import NewApt from "./NewApt";
import AllPtApt from "./AllPtApt";
import AllDoctors from "./AllDoctors";

function Patient({ setUser, user }) {
  const [expanded, setExpanded] = useState(false)

  function handleLogout() {
      fetch("/api/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
        }
      })}


    return (
      <div className="dbbody">
          <div className={expanded ? "sidebar sidebar--expanded" : "sidebar"} onMouseEnter={()=>setExpanded(true)} onMouseLeave={()=>setExpanded(false)} >
            {expanded ? 
            <div id="largenav">
              <div id="logo">
                <h1><VolunteerActivismIcon sx={{ fontSize: 42 }} /> OneHealth</h1>
              </div>
              <Stack id="navcontent">
                <h2> </h2>
                <Button >
                  <Link class="hvr-pulse-grow" to="/">
                    Dashboard
                  </Link>
                </Button>
                <Button>
                  <Link class="hvr-pulse-grow" to="/profile">
                    Patient Profile
                  </Link>
                </Button>
                <Button>
                  <Link class="hvr-pulse-grow" to="/newappt">
                    New Appointments
                  </Link>
                </Button>
                <Button>
                  <Link class="hvr-pulse-grow" to="/myappts">
                    My Appointments
                  </Link>
                </Button>
                <Button>
                  <Link  class="hvr-pulse-grow" to="/alldoctors">
                    My Dcotors
                  </Link>
                </Button>
              </Stack>
            </div>:
            <div id="smallnav">
              <div id="logo"><VolunteerActivismIcon sx={{ fontSize: 42 }} /></div>
            </div>
            }
          </div>
          <section className={expanded ? "main-content main-content--expanded" : "main-content"}>
            <header>
              <span>Hello, {user.full_name}</span>
              <Button  onClick={handleLogout}>Log Out</Button>
            </header>
            <div className="container">
              <Routes>
                  <Route path='/' element={<Dashboard />}></Route>
                  <Route path='/profile' element={<Profile />}></Route>
                  <Route path='/newappt' element={<NewApt user={user} />}></Route>
                  <Route path='/myappts' element={<AllPtApt />}></Route>
                  <Route path='/alldoctors' element={<AllDoctors />}></Route>
              </Routes>
            </div>
          </section>
      </div>
    )
}

export default Patient