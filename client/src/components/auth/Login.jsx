// cleaned
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Typography,
    Snackbar,
} from "@mui/material"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Form from "./Form";
import { AuthButton } from "../ui/AuthButton";
import { StyledLink } from "../ui/StyledLink";
import { StyledAlert } from "../ui/StyledAlert";
import { BASE_URL } from "../../config";
import "./Auth.css"

export default function Login({ openSnack, setOpenSnack }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (username.trim() === "") {
            setUsernameError(true);
            return;
        } else {
            setUsernameError(false);
        }

        if (password.trim() === "") {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        const user = {
            username,
            password
        };

        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            window.location.reload();
        } else {
            setUsername("");
            setPassword("");
            setErrorMsg(data.message || "Registration failed");
        }
    }

    return (
        <>
            <Box className="auth-container">
                <Box className="form-container">
                    <Form
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        usernameError={usernameError}
                        passwordError={passwordError}
                        errorMsg={errorMsg}
                    >
                    </Form>
                    <AuthButton
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        errorMsg={errorMsg}
                    >
                        LOGIN
                    </AuthButton>
                    <Typography className="auth-helper-text">
                        Don't have an account?{" "}
                        <StyledLink
                            href="#"
                            underline="none"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </StyledLink>
                    </Typography>
                </Box>
            </Box>

            <Snackbar
                open={openSnack}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                onClose={() => setOpenSnack(false)}
            >
                <StyledAlert
                    onClose={() => setOpenSnack(false)}
                    severity="success"
                    icon={<TaskAltIcon sx={{ color: "white" }} />}
                >
                    Account created successfully!
                </StyledAlert>
            </Snackbar>
        </>
    )
}