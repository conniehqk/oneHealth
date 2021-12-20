import React, { useEffect, useState } from 'react';

import Landing from './Landing';
import Patient from './Patient';
import Employee from './Employee';

function App() {
  const [patientUser, setPatientUser] = useState(null);
  const [officeUser, setOfficeUser] = useState(null);
  useEffect(() => {
    // auto-login
    fetch("/api/patient_me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setPatientUser(user));
      }
    });
  }, []);
  useEffect(() => {
    // auto-login
    fetch("/api/office_me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setOfficeUser(user));
      }
    });
  }, []);
  if (!patientUser&&!officeUser) {
    return (
    <div className="App">
      <Landing onPtLogin={setPatientUser} onEmLogin={setOfficeUser} />
    </div>
  ) 
  }else if (patientUser) {
    return (
      <div className="App">
        <Patient setUser={setPatientUser} user={patientUser} />
      </div>
    )
  }else {
    return (
      <div className="App">
        <Employee setUser={setOfficeUser} user={officeUser} />
      </div>
    )
  }
}

export default App;
