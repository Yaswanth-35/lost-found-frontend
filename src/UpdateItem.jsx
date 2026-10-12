
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";
import "./App.css";

function UpdateItem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState({
        itemName: "",
        description: "",
        location: "",
        date: "",
        type: "",
        contact: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Fetch item
    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await api.get(`/items/${id}`);
                const data = response.data;

                setItem({
                    itemName: data.itemName || "",
                    description: data.description || "",
                    location: data.location || "",
                    date: data.date || "",
                    type: data.type || "",
                    contact: data.contact || ""
                });
            } catch (error) {
                console.error(
                    "Fetch item error:",
                    error.response?.data || error.message
                );

                setError(
                    error.response?.status === 404
                        ? "Item not found."
                        : "Unable to load item."
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchItem();
        } else {
            setError("Item ID is missing.");
            setLoading(false);
        }
    }, [id]);

    // Handle changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setItem((previousItem) => ({
            ...previousItem,
            [name]: value
        }));
    };

    // Save changes
    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            await api.put(`/items/${id}`, item);

            alert("Item updated successfully!");
            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error(
                "Update error:",
                error.response?.data || error.message
            );

            setError(
                typeof error.response?.data === "string"
                    ? error.response.data
                    : `Update failed. Status: ${
                          error.response?.status || "Network error"
                      }`
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="report-container">
                <h2>Loading item...</h2>
            </div>
        );
    }

    if (error && !item.itemName && !item.description) {
        return (
            <div className="report-container">
                <div className="report-card">
                    <h1>Update Item</h1>
                    <p>{error}</p>

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="report-container">
            <div className="report-card">
                <h1>Update Item</h1>

                {error && (
                    <p className="error-message">{error}</p>
                )}

                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="itemName">Item Name</label>
                        <input
                            id="itemName"
                            type="text"
                            name="itemName"
                            value={item.itemName}
                            onChange={handleChange}
                            placeholder="Enter item name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={item.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            id="location"
                            type="text"
                            name="location"
                            value={item.location}
                            onChange={handleChange}
                            placeholder="Where was it lost/found?"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            type="text"
                            name="date"
                            value={item.date}
                            onChange={handleChange}
                            placeholder="DD-MM-YYYY"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            id="type"
                            name="type"
                            value={item.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Lost">Lost Item</option>
                            <option value="Found">Found Item</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact">Contact</label>
                        <input
                            id="contact"
                            type="text"
                            name="contact"
                            value={item.contact}
                            onChange={handleChange}
                            placeholder="Enter contact number"
                            required
                        />
                    </div>

                    <div className="report-buttons">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={saving}
                        >
                            {saving ? "Updating..." : "Update Item"}
                        </button>

                        <button
                            type="button"
                            className="back-btn"
                            disabled={saving}
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateItem;
