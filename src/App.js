import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [rowItems, setRowItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    tempId: "",
    tempName: "",
    createdBy: "",
    testedBy: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    setFormData({
      categoryName: "",
      tempId: "",
      tempName: "",
      createdBy: "",
      testedBy: "",
    });
    setEdit(false);
  };

  const fetchRecord = async () => {
    try {
      const response = await axios.get("http://localhost:3600/api/records");
      setRowItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  const filteredItems = rowItems.filter(
    (item) =>
      item.categoryName.toLowerCase().includes(search.toLowerCase()) ||
      item.tempId.toLowerCase().includes(search.toLowerCase()) ||
      item.tempName.toLowerCase().includes(search.toLowerCase()) ||
      item.createdBy.toLowerCase().includes(search.toLowerCase()) ||
      item.testedBy.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you want to delete the item")) {
      try {
        await axios.delete(`http://localhost:3600/api/records/${id}`);
        setRowItems(rowItems.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit1 = async () => {
    try {
      await axios.post("http://localhost:3600/api/records", formData);
      setOpen(false);
      fetchRecord();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setFormData({
      categoryName: "",
      tempId: "",
      tempName: "",
      createdBy: "",
      testedBy: "",
    });
  };
  const handleEdit = (item) => {
    setFormData(item);
    setOpen(true);
    setEdit(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3600/api/records/${formData._id}`,
        formData
      );
      setRowItems(
        rowItems.map((item) => (item._id === formData._id ? formData : item))
      );
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Header title={"Template Data"} />
      <div className="inline">
        <SearchItem search={search} setSearch={setSearch} />
        <AddItem handleSubmit={handleSubmit} open={open} setOpen={setOpen} />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Temp Id</th>
              <th>Temp Name</th>
              <th>Created By</th>
              <th>Tested By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td>{item.categoryName}</td>
                <td>{item.tempId}</td>
                <td>{item.tempName}</td>
                <td>{item.createdBy}</td>
                <td>{item.testedBy}</td>
                <td className="buttonInline">
                  <div className="buttonIn">
                    <button className="edit" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div
          className="modal-overlay"
          onClick={() => {
            console.log("Closing modal");
            setOpen(false);
          }} // Close modal on outside click
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={edit ? handleUpdate : handleSubmit1}>
              <div className="form-container">
                <label>Category Name : </label>
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  required
                />
                <label>Temp Id : </label>
                <input
                  type="text"
                  name="tempId"
                  value={formData.tempId}
                  onChange={handleChange}
                  required
                  disabled={edit}
                />
                <label>Temp Name : </label>
                <input
                  type="text"
                  name="tempName"
                  value={formData.tempName}
                  onChange={handleChange}
                  required
                />
                <label>Created By : </label>
                <input
                  type="text"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  required
                />
                <label>Tested By : </label>
                <input
                  type="text"
                  name="testedBy"
                  value={formData.testedBy}
                  onChange={handleChange}
                  required
                />
                <div className="button-container">
                  <div className="btn">
                    <button type="submit" className="edit">
                      {edit ? "Update" : "Add"}
                    </button>
                    <button
                      className="cancel"
                      type="button"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
