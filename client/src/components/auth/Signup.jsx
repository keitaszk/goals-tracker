// cleaned

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Typography,
} from "@mui/material"
import Form from "./Form";
import { AuthButton } from "../ui/AuthButton";
import { StyledLink } from "../ui/StyledLink";
import { BASE_URL } from "../../config";
import "./Auth.css"

export default function Signup({ setOpenSnack }) {

    const [username, setUsername] = useState("")
    const [password, setPaassword] = useState("")
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

        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            setErrorMsg("Password must be at least 8 characters and contain letters and numbers");
            return;
        }

        const newUser = {
            username,
            password
        };

        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })

        if (res.ok) {
            setOpenSnack(true);
            navigate("/login");
        } else {
            const error = await res.json();
            setErrorMsg(error.message || "Registration failed");
            setUsername("");
            setPaassword("");
        }
    }

    return (
        <Box className="auth-container">
            <Box className="form-container">
                <Form
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPaassword={setPaassword}
                    usernameError={usernameError}
                    passwordError={passwordError}
                    errorMsg={errorMsg}
                >
                </Form>
                <AuthButton
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                >
                    CREATE ACCOUNT
                </AuthButton>

                <Typography className="auth-helper-text">
                    Already have an account?{" "}
                    <StyledLink
                        href="#"
                        underline="none"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </StyledLink>
                </Typography>
            </Box>
        </Box>
    )
}