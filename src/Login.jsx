
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
import API_URL from "./api";

function Login() {
    const [loginType, setLoginType] = useState("USER");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        try {
            let response;

            // USER LOGIN
            if (loginType === "USER") {
                response = await axios.post(
                    `${API_URL}/users/user-login`,
                    {
                        email: email,
                        password: password
                    }
                );
            }

            // ADMIN LOGIN
            else {
                response = await axios.post(
                    `${API_URL}/users/admin-login`,
                    {
                        email: email,
                        password: password
                    }
                );
            }

            console.log("LOGIN SUCCESS:", response.data);

            localStorage.setItem(
                "email",
                response.data.email
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            navigate("/dashboard");

        } catch (error) {
            console.error("LOGIN ERROR:", error);

            if (error.response) {
                console.error(
                    "Backend response:",
                    error.response.data
                );

                alert(
                    "Login failed: " +
                    (typeof error.response.data === "string"
                        ? error.response.data
                        : JSON.stringify(error.response.data))
                );
            } else {
                alert(
                    "Cannot connect to the backend. Please try again."
                );
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Lost & Found</h1>

                {/* LOGIN TYPE */}
                <div className="login-type-buttons">
                    <button
                        type="button"
                        onClick={() => {
                            setLoginType("USER");
                            setEmail("");
                            setPassword("");
                        }}
                    >
                        User Login
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setLoginType("ADMIN");
                            setEmail("");
                            setPassword("");
                        }}
                    >
                        Admin Login
                    </button>
                </div>

                {/* TITLE */}
                <h2>
                    {loginType === "USER"
                        ? "User Login"
                        : "Admin Login"}
                </h2>

                {/* LOGIN FORM */}
                <form
                    className="login-form"
                    onSubmit={login}
                >
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        New User? Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
