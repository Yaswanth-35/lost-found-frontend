
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import "./App.css";

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
            const response = await api.post("/users/register", {
                email: email,
                password: password
            });

            console.log("REGISTER SUCCESS:", response.data);

            alert("Registration successful! Please login.");
            navigate("/login");

        } catch (error) {
            console.error("REGISTER ERROR:", error);

            if (error.response) {
                const data = error.response.data;

                const message =
                    typeof data === "string"
                        ? data
                        : JSON.stringify(data);

                alert(
                    "Registration failed: " +
                    error.response.status +
                    " - " +
                    message
                );
            } else {
                alert(
                    "Cannot connect to backend. Check whether the backend is running."
                );
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Lost &amp; Found</h1>
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
