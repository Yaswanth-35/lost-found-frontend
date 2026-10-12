
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import "./App.css";

function Login() {
    const [loginType, setLoginType] = useState("USER");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint =
                loginType === "ADMIN"
                    ? "/users/admin-login"
                    : "/users/user-login";

            const response = await api.post(endpoint, {
                email: email.trim(),
                password
            });

            console.log("LOGIN RESPONSE:", response.data);

            const data = response.data?.user ?? response.data;
            const loggedInEmail = data?.email;
            const returnedRole = data?.role;

            if (!loggedInEmail) {
                alert("Login response is missing the email. Check the backend response.");
                return;
            }

            const role = String(returnedRole || "")
                .replace(/^ROLE_/, "")
                .toUpperCase();

            if (role !== loginType) {
                alert("The backend returned an unexpected role. Please check your login service.");
                return;
            }

            localStorage.setItem("email", loggedInEmail);
            localStorage.setItem("role", role);

            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error(
                "Login error:",
                error.response?.data || error.message
            );

            const message = error.response?.data;
            alert(
                "Login failed: " +
                (typeof message === "string"
                    ? message
                    : JSON.stringify(message || "Cannot connect to backend."))
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Lost &amp; Found</h1>

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

                <h2>{loginType === "ADMIN" ? "Admin Login" : "User Login"}</h2>

                <form className="login-form" onSubmit={login}>
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

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
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
