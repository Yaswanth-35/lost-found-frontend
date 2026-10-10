import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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


    const handleChange = (e) => {

        setItem({

            ...item,

            [e.target.name]: e.target.value

        });

    };


    const submitItem = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/items",
                item
            );

            alert("Item reported successfully!");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert("Failed to report item");

        }

    };


    return (

        <div className="report-container">

            <div className="report-card">

                <h1>
                    Report Lost / Found Item
                </h1>


                <form onSubmit={submitItem}>


                    <div className="form-group">

                        <label>
                            Item Name
                        </label>

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

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Enter description"
                            value={item.description}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Location
                        </label>

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

                        <label>
                            Date
                        </label>

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

                        <label>
                            Type
                        </label>

                        <select
                            name="type"
                            value={item.type}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Type
                            </option>

                            <option value="Lost">
                                Lost Item
                            </option>

                            <option value="Found">
                                Found Item
                            </option>

                        </select>

                    </div>


                    <div className="form-group">

                        <label>
                            Contact
                        </label>

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
                        >
                            Submit Report
                        </button>


                        <button
                            type="button"
                            className="back-btn"
                            onClick={() =>
                                navigate("/dashboard")
                            }
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
