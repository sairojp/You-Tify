import { useState , useEffect } from "react";
import { useNavigate } from "react-router";

const HandleLoginYoutube = () => {
  window.location.href = "http://localhost:5000/google";
};



const HandleLoginSpotify = () => {
  window.location.href = "http://localhost:5000/login";
};





const Home = () => {
  const navigate = useNavigate();

  const [accessTokenYoutube, setTokenYoutube] = useState(null);
  const [accessTokenSpotify, setTokenSpotify] = useState(null);




  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessTokenYoutube = urlParams.get("access_token");
    const accessTokenSpotify = urlParams.get("access_token_spotify");

    if(accessTokenYoutube){
      sessionStorage.setItem("youtubekey", accessTokenYoutube)
      console.log("yt");
    }
    if(accessTokenSpotify){
      sessionStorage.setItem("spotifykey", accessTokenSpotify)
      console.log("spot");
    }
    setTokenYoutube(sessionStorage.getItem("youtubekey"));
    setTokenSpotify(sessionStorage.getItem("spotifykey"));
    
  }, []);
  

  const HandleTransfer = () => {
    const tokens = {accessTokenYoutube: accessTokenYoutube , accessTokenSpotify: accessTokenSpotify}
    if(accessTokenSpotify && accessTokenYoutube){
      navigate('/getplaylist', {state:tokens})
    }
    else{
      window.alert("Login first");
    }
  }

  const HandleLogoutYoutube = () => {
    setTokenYoutube(null)
    sessionStorage.removeItem("youtubekey")
  }

  const HandleLogoutSpotify = () => {
    setTokenSpotify(null)
    sessionStorage.removeItem("spotifykey")
  }


  return (
  <div className="main-Container">
    <div className="description"> Transfer playlist from Youtube to Spotify</div>
    <div className="image-container">
        <img src="image.png" alt="YT"/>
    </div>
    <div className="button-container">
      {accessTokenYoutube === null ? (
      <button onClick={HandleLoginYoutube}>Youtube Login</button>
      ) : (
      <button onClick={HandleLogoutYoutube}>Youtube Logged in</button>
      )}
      
      <button onClick={HandleTransfer}>Transfer</button>

      {accessTokenSpotify === null ? (
        <button onClick={HandleLoginSpotify}>Spotify Login</button>
      ): (
        <button onClick={HandleLogoutSpotify}>Spotify Logged in</button>
      )}
      
    </div>
      
  </div>
  )
};

export default Home;
