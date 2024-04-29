
const querystring = require("querystring");
const axios = require("axios");
const url = require("url");
const dotenv = require("dotenv");
dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = "http://localhost:5000/callback";

// Login for Spotify 
const loginSpotify = async (req, res) => {
  const queryParam = querystring.stringify({
    client_id: SPOTIFY_CLIENT_ID,
    scope: 'playlist-modify-public playlist-modify-private playlist-read-private',
    response_type: "code",
    redirect_uri: SPOTIFY_REDIRECT_URI,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParam}`);
}

// Redirect for Spotify Oauth 
const redirectSpotify = async  (req, res) => {
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    mode: "cors",
  })
    .then((response) => {
      if (response.status === 200) {
        const access_token_spotify = response.data.access_token;
        const queryP = querystring.stringify({
          access_token_spotify,
        });

        //  redirect to react app
        // res.redirect(`http://localhost:5000/transfer?${queryP}`);
        res.redirect(`http://localhost:3000/transfer?${queryP}`);
        // res.redirect(`http://localhost:3000/transfer?${queryParam}`);
      } else {
        res.redirect(
          `http://localhost:3000/?${querystring.stringify({
            error: "invalid_token",
          })}`
        );
      }
    })
    .catch((error) => {
      res.send(error);
    });
}

//GET list of music titles(youtube) from fe and search and retrieve music uri from spotify 
const searchMusicSpotify = async (req, res) => {
  const data = req.body.playlistItems;
  const access_token = req.query.key;
  const number_songs = data.length;
  console.log("send api");
  console.log(number_songs);
  const MusicList = [];

  for (let i = 0; i < number_songs; i++) {
    if(data[i] == "Deleted video"){
      continue;
    }
    const queryparameters = {
      q: data[i],
      type: "track",
      limit: "10",
      offset: "5",
    };
    const querypar = querystring.stringify(queryparameters);
    const params = new url.URLSearchParams(querypar);
    const token = access_token; 

    await axios({
      method: "get",
      url: `https://api.spotify.com/v1/search?${params}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      MusicList.push( response.data.tracks.items[0].uri,
      // MusicTitle : response.data.tracks.items[0].name
    )      
    });
  }
  console.log(MusicList);
  
  res.send(MusicList);
}


module.exports = {
  loginSpotify , redirectSpotify , searchMusicSpotify
}