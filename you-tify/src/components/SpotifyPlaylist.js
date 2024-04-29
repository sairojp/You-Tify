import { useState , useEffect } from "react";
import { useLocation,useNavigate } from "react-router";
import FormComponent from "./Form";





const SpotifyPlaylist = ()=> {
  const navigate = useNavigate()
  const [uri,seturi] = useState(null);
  const [playlistspotify,setplaylistspotify] = useState(null);
  const [playlistid,setplaylistid] = useState(null); 
  const [newplaylistid,setnewplaylistid] = useState('1');
  
  const location = useLocation();
  const items = location.state;

  useEffect(() => {
    seturi(items.uri)
},[])

const HandleSetPlaylistId = (value) =>{
  setnewplaylistid('2');
  setplaylistid(value);
}


const HandleGetPlaylistSpotify = () =>{
  setnewplaylistid('1');
  fetch(`https://api.spotify.com/v1/me/playlists`,{
    method:"GET" ,
    headers: {
      Authorization: "Bearer " + items.accessTokenSpotify,
    },
  })
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    const playlistdetailspotify = data.items.map(({id ,name,description})  => ({id ,name ,description}));
    setplaylistspotify(playlistdetailspotify);
    console.log(playlistspotify);      
  })
}

  const HandleCreateNewPlaylistSpotify = () =>{
    setplaylistspotify(null);
    setnewplaylistid(null);
  }

  const HandleAddSongsToPlaylist = ()=> {
    fetch(`https://api.spotify.com/v1/playlists/${playlistid}/tracks`,{
    method: "POST",
    headers: {
      Authorization: "Bearer " + items.accessTokenSpotify,
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      "uris": uri
    })
  })
  .then((resp)=> resp.json())
    .then((data) => {
      console.log(data);
      window.alert("Transfer Completed....\n Redirecting to HomePage after you select ok")
      setTimeout(() => {
        navigate('/'); // Redirect to Homepage
      }, 5000);
    })
  }

  const HandleRemoveSelection = ()=> {
    setplaylistid(null);
    setnewplaylistid('1');
  }

  return(
    <div class="main-Container">
    <div class="center-div">
    <div class="sub-container">
      <div class="Description">Your Playlists in  </div>
    <div class="icon-container">
      <img class="icon-spot" src="spotify.png" alt="Spotify"/>
      </div>
    </div>
    <div>
    {playlistid == null ? (
      <div>
        <button onClick={HandleGetPlaylistSpotify}>Show Existing</button>
        <button onClick={HandleCreateNewPlaylistSpotify}>Create New</button>
      </div>
    ) : (
      <div>
        <button onClick={HandleRemoveSelection}>Remove Selection</button>
        <button onClick={HandleAddSongsToPlaylist}>Transfer to playlist</button>
      </div>
    )}
      </div>
    
      {newplaylistid === null ? (
        <FormComponent props={{'accesstoken':items.accessTokenSpotify}} setid ={HandleSetPlaylistId}/>
      ): newplaylistid == '1' ?(
        <></>
      ):(
        <div>New Playlist Created And</div>
      )}

    {playlistid == null ?
      (<div>
          {playlistspotify &&
            playlistspotify.map((data, index) => {
              return (
                <div key={index}>
                  <div className="interest-container">
                    <div className="interest-body">
                      <div className="interest-content">
                        <div className="icons">icon</div>
                        <div className="interest-title">
                          <h2>{data.name}</h2>
                        </div>
                        <div className="interest-description">
                          description : {data.description}
                        </div>
                      </div>
                    </div>
                    <div className="button-container">
                      <button onClick={ event => {
                      setplaylistid(data.id);}}>SELECT</button>
                    </div>
                  </div>
                </div>
              );
            })}     
      </div>): (
        <div>Playlist Selected</div>
      )}

      
      

    </div>
  </div>

  )
};
export default SpotifyPlaylist;