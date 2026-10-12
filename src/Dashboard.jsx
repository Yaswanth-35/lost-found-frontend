
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import "./App.css";

function Dashboard() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const email = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role") || "";
    const role = storedRole.replace(/^ROLE_/, "").toUpperCase();

    useEffect(() => {
        if (!email || !role) {
            navigate("/login", { replace: true });
            return;
        }

        getItems();
    }, []);

    const getItems = async () => {
        setLoading(true);

        try {
            const response = await api.get("/items");
            setItems(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Fetch items error:", error.response?.data || error.message);
            alert(`Failed to fetch items. Status: ${error.response?.status || "Network error"}`);
        } finally {
            setLoading(false);
        }
    };

    const searchItems = async () => {
        if (!search.trim()) {
            await getItems();
            return;
        }

        setLoading(true);

        try {
            const response = await api.get("/items/search", {
                params: { name: search.trim() }
            });

            setItems(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Search error:", error.response?.data || error.message);
            alert("Failed to search items.");
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const updateItem = (id) => {
        if (role !== "ADMIN") {
            alert("Only admins can update items.");
            return;
        }

        navigate(`/update-item/${id}`);
    };

    const deleteItem = async (id) => {
        if (role !== "ADMIN") {
            alert("Only admins can delete items.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }

        try {
            await api.delete(`/items/${id}`);
            alert("Item deleted successfully.");
            await getItems();
        } catch (error) {
            console.error("Delete error:", error.response?.data || error.message);
            alert(`Delete failed. Status: ${error.response?.status || "Network error"}`);
        }
    };

    const reportItem = () => {
        if (!email || !role) {
            navigate("/login", { replace: true });
            return;
        }

        navigate("/report-item");
    };

    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        setItems([]);
        navigate("/login", { replace: true });
    };

    if (!email || !role) {
        return null;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Lost &amp; Found Dashboard</h1>
                <p>Welcome: <b>{email}</b></p>
                <p>Role: <b>{role}</b></p>
            </div>

            <div className="dashboard-actions">
                <div className="search-box">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search item..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") searchItems();
                        }}
                    />

                    <button
                        className="btn btn-search"
                        onClick={searchItems}
                        disabled={loading}
                    >
                        Search
                    </button>

                    <button
                        className="btn btn-all"
                        onClick={() => {
                            setSearch("");
                            getItems();
                        }}
                        disabled={loading}
                    >
                        All Items
                    </button>
                </div>

                <div className="dashboard-buttons">
                    <button className="btn btn-report" onClick={reportItem}>
                        Report Item
                    </button>

                    <button className="btn btn-logout" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            {loading && <p>Loading items...</p>}

            {!loading && items.length === 0 && (
                <div className="no-items">
                    <h2>No Items Found</h2>
                </div>
            )}

            {!loading && items.length > 0 && (
                <div className="table-container">
                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Item Name</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Contact</th>
                                {role === "ADMIN" && <th>Action</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.description}</td>
                                    <td>{item.location}</td>
                                    <td>{item.date}</td>
                                    <td>{item.type}</td>
                                    <td>{item.contact}</td>

                                    {role === "ADMIN" && (
                                        <td>
                                            <button
                                                className="update-btn"
                                                onClick={() => updateItem(item.id)}
                                            >
                                                Update
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteItem(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
