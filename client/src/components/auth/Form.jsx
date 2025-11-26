import { useState } from "react";
import {
    Typography,
    TextField,
    InputAdornment,
    IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Form.css"

export default function Form({ username, setUsername, password, setPaassword, usernameError, passwordError, errorMsg }) {

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <Typography
                className="form-title"
                variant="h4"
            >
                Goals Tracker
            </Typography>

            {/* Username */}
            <TextField
                className="text-field"
                fullWidth
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                label="Username"
                variant="outlined"
                error={usernameError}
                helperText={usernameError ? "Username is required" : ""}
            />

            {/* Password */}
            <TextField
                className="text-field"
                fullWidth
                onChange={(e) => setPaassword(e.target.value)}
                value={password}
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                error={passwordError}
                helperText={passwordError ? "Password is required" : ""}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleTogglePassword}
                                edge="end"
                                disableTouchRipple
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            {errorMsg && (
                <Typography color="error" sx={{ mb: 2, fontSize: "0.9rem" }}>
                    {errorMsg}
                </Typography>
            )}
        </>
    )
}