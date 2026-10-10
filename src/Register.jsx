
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
import API_URL from "./api";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/users/register`,
                {
                    email: email,
                    password: password
                }
            );

            console.log("REGISTER SUCCESS:", response.data);

            alert("Registration successful! Please login.");
            navigate("/login");

        } catch (error) {
            console.error("REGISTER ERROR:", error);

            if (error.response) {
                const message =
                    typeof error.response.data === "string"
                        ? error.response.data
                        : JSON.stringify(error.response.data);

                alert("Registration failed: " + message);
            } else {
                alert("Cannot connect to backend. Please try again.");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Lost & Found</h1>

                <h2>User Registration</h2>

                <form
                    className="login-form"
                    onSubmit={register}
                >
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Register
                    </button>
                </form>

                <br />

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
}

export default Register;
