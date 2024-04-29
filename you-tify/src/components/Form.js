import React, { useState } from 'react';

const FormComponent = ({props ,setid}) => {
  const accessTokenSpotify = props.accesstoken;

  const HandleCreatePlaylistSpotify = (formData) =>{
    fetch(`https://api.spotify.com/v1/users/i25t0qnzg63i47rvfryg37s7l/playlists`,{
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessTokenSpotify,
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        "name": formData.name,
        "description": formData.description,
        "public": false
      })
    })
    .then((resp)=> resp.json())
    .then((data) => {
      console.log(data.id);
      setid(data.id)
      // setplaylistid(data.id);

    })
  }

  
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, you can send data to server or perform other actions
    HandleCreatePlaylistSpotify(formData);
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2>New Playlist Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name of Playlist:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};



export default FormComponent;