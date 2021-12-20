import { Button } from "@mui/material"

function Employee({ setUser, user }) {
    function handleLogout() {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        })}

    return (
        <div>
            <h1>Employee Page</h1>
            <Button onClick={handleLogout}>Log Out</Button>
        </div>
    )
}

export default Employee