import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    place: "",
    name: "",
    age: "",
  });

  const [entries, setEntries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.place.trim() || !formData.name.trim() || !formData.age.trim()) {
      return;
    }

    setEntries((prev) => [
      ...prev,
      {
        id: Date.now(),
        place: formData.place.trim(),
        name: formData.name.trim(),
        age: formData.age.trim(),
      },
    ]);

    setFormData({
      place: "",
      name: "",
      age: "",
    });
  };

  const handleClear = () => {
    setFormData({
      place: "",
      name: "",
      age: "",
    });
  };

  const handleRemove = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h1 className="title">Add People to Table</h1>
        <p className="subtitle">Enter Place, Name, and Age, then click Add.</p>

        <form onSubmit={handleAdd}>
          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="input-place">Place</label>
              <input
                id="input-place"
                type="text"
                name="place"
                placeholder="e.g. Mumbai"
                value={formData.place}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="input-name">Name</label>
              <input
                id="input-name"
                type="text"
                name="name"
                placeholder="e.g. Akash"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="input-age">Age</label>
              <input
                id="input-age"
                type="text"
                name="age"
                placeholder="e.g. 24"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="btn-row">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>

        <div className="list-section">
          {entries.length === 0 ? (
            <div className="empty-box">No entries yet. Add your first row!</div>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Place</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.place}</td>
                      <td>{entry.name}</td>
                      <td>{entry.age}</td>
                      <td className="action-col">
                        <button
                          type="button"
                          className="btn-remove"
                          onClick={() => handleRemove(entry.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}