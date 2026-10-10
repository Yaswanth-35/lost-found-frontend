import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import ReportItem from "./ReportItem";
import UpdateItem from "./UpdateItem";
import Register from "./Register";

import "./App.css";

// Protect pages that require login
function ProtectedRoute({ children }) {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (!email || !role) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Default page */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Public login page */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Public registration page */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Protected report page */}
                <Route
                    path="/report-item"
                    element={
                        <ProtectedRoute>
                            <ReportItem />
                        </ProtectedRoute>
                    }
                />

                {/* Protected update page */}
                <Route
                    path="/update-item/:id"
                    element={
                        <ProtectedRoute>
                            <UpdateItem />
                        </ProtectedRoute>
                    }
                />

                {/* Unknown URLs */}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;

