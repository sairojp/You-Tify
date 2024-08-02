import { useState , useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const Playlist = () => {
const navigate = useNavigate();
const location = useLocation();
const tokens = location.state;

const [playlistData, setPlaylistData] = useState(null);
const [playlistItems, setPlaylistItems] = useState(null);
const [playlistId,setplaylistId ] = useState(null)


const HandleGetPlaylist = () => {
  try{
  fetch(
    `https://youtube.googleapis.com/youtube/v3/playlists?access_token=${tokens.accessTokenYoutube}&part=snippet%2CcontentDetails&maxResults=100&mine=true&key='api_key_placeholder'`,
    {}
  )
    .then((response) => response.json())
    .then((response) => setPlaylistData(response.items))
    
} catch (error){ console.error(error)};
};


const HandleGetPlaylistItems = (buttonState) => {
  setplaylistId(buttonState);
  fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?access_token=${tokens.accessTokenYoutube}&part=snippet%2CcontentDetails&maxResults=100&playlistId=${buttonState}&key=api_key_placeholder`,{

  })
  .then(response => response.json())
  .then(response => HandleGetSongTitle(response.items),
  )
  .catch(err => console.error(err));
}

const HandleGetSongTitle = (items) =>{
  // playlistItems.map(()=>
  // setsongTitle(current => [...current.data])
  // )
  setPlaylistItems(items.map(item => item.snippet.title));
  
}
const HandleRemoveSelection = () => {
  setplaylistId(null)
}

const HandleTransferSongs = () => {
  console.log(playlistItems)
  //  const SongTitles = playlistItems.map(item => item);
   
  //  console.log(SongTitles);

  const queryParams = new URLSearchParams({key: tokens.accessTokenSpotify}).toString();

  fetch(`http://localhost:5000/send?${queryParams}`,{
    method:"POST" ,
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify({
      playlistItems
    }),
  })
  .then((resp) => resp.json())
  .then((data) => {
    const items = { accessTokenSpotify: tokens.accessTokenSpotify ,uri: data}
    // seturi(data);
    navigate('/spotifyplaylist', {state:items})
    // if(data){
    //   window.location.href = "http://localhost:5000/login";
    // }
  })
  .catch((err) => {
    console.error(err);
  })


}

useEffect(() => {
    HandleGetPlaylist();
},[])

  return(
    <div class="main-Container">
    <div class="center-div">
      <div class="sub-container">
        <div class="Description">Your Playlists in </div>
        <div class="icon-container">
          <img class="icon" src="youtube.svg" alt="Youtube"/>
        </div>
      </div>
      <div><button onClick={HandleTransferSongs}>Transfer Selected</button>
      <button onClick={HandleRemoveSelection}>Remove Selection</button></div>
      <div>
        {playlistData &&
          playlistData.map((data, index) => {
            return (
              <div key={index}>
                <div className="interest-container">
                  <div className="interest-body">
                    <div className="interest-content">
                      <div className="icons">
                        <img className="thumbnails" async src={data.snippet.thumbnails.default.url} loading="lazy"/>
                      </div>
                      <div className="interest-title">
                        <h2>{data.snippet.title}</h2>
                      </div>
                      <div className="interest-description">
                        Items : {data.contentDetails.itemCount}
                      </div>
                    </div>
                  </div>
                  <div className="button-container">
                  {playlistId !== data.id ?
                    <button onClick={ event => {
                    HandleGetPlaylistItems(data.id);}}>SELECT</button>:(
                      <div style={{ color: 'white' }}>Selected</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>


  </div>
  )
};
export default Playlist;