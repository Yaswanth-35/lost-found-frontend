
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import "./App.css";

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
        const { name, value } = e.target;

        setItem((previousItem) => ({
            ...previousItem,
            [name]: value
        }));
    };

    const submitItem = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await api.post("/items", item);

            console.log("Item saved:", response.status, response.data);

            alert("Item reported successfully!");
            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error("Report item failed:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });

            alert(
                `Failed to report item. ${
                    error.response
                        ? `Server status: ${error.response.status}`
                        : "Check your network connection or CORS settings."
                }`
            );
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
                        <label htmlFor="itemName">Item Name</label>
                        <input
                            id="itemName"
                            type="text"
                            name="itemName"
                            placeholder="Enter item name"
                            value={item.itemName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            value={item.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            id="location"
                            type="text"
                            name="location"
                            placeholder="Where was it lost/found?"
                            value={item.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            type="text"
                            name="date"
                            placeholder="DD-MM-YYYY"
                            value={item.date}
                            onChange={handleChange}
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
