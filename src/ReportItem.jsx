
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
import API_URL from "./api";

function ReportItem() {
    const navigate = useNavigate();

    const [item, setItem] = useState({
        itemName: "",
        description: "",
        location: "",
        date: "",
        type: "",
        contact: ""
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    };

    const submitItem = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            await axios.post(`${API_URL}/items`, item);

            alert("Item reported successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Report item error:", error);

            if (error.response) {
                alert(
                    `Failed to report item. Server returned ${error.response.status}.`
                );
            } else {
                alert("Cannot connect to the backend. Please try again.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="report-container">
            <div className="report-card">
                <h1>Report Lost / Found Item</h1>

                <form onSubmit={submitItem}>
                    <div className="form-group">
                        <label>Item Name</label>
                        <input
                            type="text"
                            name="itemName"
                            placeholder="Enter item name"
                            value={item.itemName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            placeholder="Enter description"
                            value={item.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Where was it lost/found?"
                            value={item.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="text"
                            name="date"
                            placeholder="DD-MM-YYYY"
                            value={item.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Type</label>
                        <select
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
                        <label>Contact</label>
                        <input
                            type="text"
                            name="contact"
                            placeholder="Enter contact number"
                            value={item.contact}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="report-buttons">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Submit Report"}
                        </button>

                        <button
                            type="button"
                            className="back-btn"
                            onClick={() => navigate("/dashboard")}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReportItem;
