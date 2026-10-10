
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import API_URL from "./api";

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

    useEffect(() => {
        fetchItem();
    }, [id]);

    // Fetch item details
    const fetchItem = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/items/${id}`
            );

            console.log("Item received:", response.data);
            setItem(response.data);
        } catch (error) {
            console.error("Error loading item:", error);
            alert("Cannot load item " + id);
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    };

    // Update item
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `${API_URL}/items/${id}`,
                item
            );

            alert("Item updated successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Update error:", error);
            alert("Failed to update item. Please try again.");
        }
    };

    // Loading screen
    if (loading) {
        return (
            <div className="report-container">
                <h2>Loading item...</h2>
            </div>
        );
    }

    return (
        <div className="report-container">
            <div className="report-card">
                <h1>Update Item</h1>

                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>Item Name</label>
                        <input
                            type="text"
                            name="itemName"
                            value={item.itemName || ""}
                            onChange={handleChange}
                            placeholder="Enter item name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={item.description || ""}
                            onChange={handleChange}
                            placeholder="Enter description"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={item.location || ""}
                            onChange={handleChange}
                            placeholder="Where was it lost/found?"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="text"
                            name="date"
                            value={item.date || ""}
                            onChange={handleChange}
                            placeholder="DD-MM-YYYY"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Type</label>
                        <select
                            name="type"
                            value={item.type || ""}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Lost">Lost Item</option>
                            <option value="Found">Found Item</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={item.contact || ""}
                            onChange={handleChange}
                            placeholder="Enter contact number"
                            required
                        />
                    </div>

                    <div className="report-buttons">
                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Update Item
                        </button>

                        <button
                            type="button"
                            className="back-btn"
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
