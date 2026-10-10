
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
import API_URL from "./api";

function Dashboard() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    // Check login before loading dashboard
    useEffect(() => {
        if (!email || !role) {
            navigate("/login", { replace: true });
        } else {
            getItems();
        }
    }, []);

    // Get all items
    const getItems = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/items`
            );

            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
            alert("Failed to fetch items. Please try again.");
        }
    };

    // Search items
    const searchItems = async () => {
        if (search.trim() === "") {
            getItems();
            return;
        }

        try {
            const response = await axios.get(
                `${API_URL}/items/search?name=${encodeURIComponent(search)}`
            );

            setItems(response.data);
        } catch (error) {
            console.error("Search error:", error);
            alert("Failed to search items.");
            setItems([]);
        }
    };

    // Update item - Admin only
    const updateItem = (id) => {
        if (role !== "ADMIN") {
            alert("Only admins can update items");
            return;
        }

        navigate(`/update-item/${id}`);
    };

    // Delete item - Admin only
    const deleteItem = async (id) => {
        if (role !== "ADMIN") {
            alert("Only admins can delete items");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(`${API_URL}/items/${id}`);

            alert("Item deleted successfully");
            getItems();
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete item.");
        }
    };

    // Report item
    const reportItem = () => {
        if (!email || !role) {
            navigate("/login", { replace: true });
            return;
        }

        navigate("/report-item");
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        setItems([]);
        navigate("/login", { replace: true });
    };

    // Do not render dashboard when logged out
    if (!email || !role) {
        return null;
    }

    return (
        <div className="dashboard-container">

            {/* HEADER */}
            <div className="dashboard-header">
                <h1>Lost & Found Dashboard</h1>

                <p>
                    Welcome: <b>{email}</b>
                </p>

                <p>
                    Role: <b>{role}</b>
                </p>
            </div>

            {/* SEARCH */}
            <div className="dashboard-actions">
                <div className="search-box">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search item..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchItems();
                            }
                        }}
                    />

                    <button
                        className="btn btn-search"
                        onClick={searchItems}
                    >
                        Search
                    </button>

                    <button
                        className="btn btn-all"
                        onClick={() => {
                            setSearch("");
                            getItems();
                        }}
                    >
                        All Items
                    </button>
                </div>

                {/* DASHBOARD BUTTONS */}
                <div className="dashboard-buttons">
                    <button
                        className="btn btn-report"
                        onClick={reportItem}
                    >
                        Report Item
                    </button>

                    <button
                        className="btn btn-logout"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* NO ITEMS */}
            {items.length === 0 && (
                <div className="no-items">
                    <h2>No Items Found</h2>
                </div>
            )}

            {/* ITEMS TABLE */}
            {items.length > 0 && (
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

                                {role === "ADMIN" && (
                                    <th>Action</th>
                                )}
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

                                    {/* ADMIN ONLY */}
                                    {role === "ADMIN" && (
                                        <td>
                                            <button
                                                className="update-btn"
                                                onClick={() =>
                                                    updateItem(item.id)
                                                }
                                            >
                                                Update
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteItem(item.id)
                                                }
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
