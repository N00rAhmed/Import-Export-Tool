import React, { useState } from "react";
import axios from "axios";
import "./App.css"

function App() {
    const [file, setFile] = useState(null);
    const [mongoURI, setMongoURI] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file || !mongoURI || !collectionName) {
            setMessage("please provide all the required inputs");
            return;
        }

        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("mongoURI", mongoURI);
        formdata.append("collectionName", collectionName);

        try {
            const response = await axios.post("https://import-export-tool-api.onrender.com/upload", formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "Error uploading file");
        }
    };

    const handleExport = async () => {
        if (!mongoURI || !collectionName) {
            setMessage("Please provide Mongo URI and collection name");
            return;
        }

        try {
            const response = await axios.get("https://import-export-tool-api.onrender.com/export", {
                params: { mongoURI, collectionName },
                responseType: "blob", // Important for handling binary data
            });

            // Create a link element and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${collectionName}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            setMessage("Data exported successfully!");
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "Error exporting data");
        }
    };

    return (
        <div className="App">
          <div className="container">
            <div className="content">
              <div className="left-section">
                <h2>📚 Import/Export to MongoDB</h2>
                <p className="description">
                  Datamorph imports excel files to MongoDB and also exports data from MongoDB into a downloadable excel file.
                   To upload an excel file type youre MongoDB URI in the corresponding input field and create a collection 
                    by giving a name in the collection name input field.
                </p>
              </div>
              <form className="inputSection" onSubmit={handleUpload}>
                <div className="inputcontainer">
                  <label>Mongo URI:</label>
                  <textarea
                    style={{ height: "100px" }}
                    value={mongoURI}
                    onChange={(e) => setMongoURI(e.target.value)}
                    required
                  />
                </div>
                <div className="inputcontainer">
                  <label>Collection Name:</label>
                  <input
                    type="text"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    required
                  />
                </div>
                <div className="inputcontainer">
                  <label>Excel File:</label>
                  <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} required />
                </div>
                <button className="upload-btn" type="submit">
                  📤 Upload
                </button>
              </form>
            </div>
            <button className="export-btn" onClick={handleExport}>
              📥 Export to Excel
            </button>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      );
    }
    
export default App;