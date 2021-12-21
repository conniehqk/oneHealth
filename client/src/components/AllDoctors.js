import { Divider, Select, FormControl, InputLabel, MenuItem, Button, Modal,Box,Alert } from "@mui/material"
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDoctors, docsSlectors } from "../features/officeuser/officeusersSlice"

function AllDoctors() {
    return (
        <div>
            <h1>All Dcotors page</h1>
        </div>
    )
}

export default AllDoctors