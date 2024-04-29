const express = require("express");
const app = express();


const bodyParser = require("body-parser");

const cors = require("cors");
const { router } = require("./routes");

const dotenv = require("dotenv");
dotenv.config();


app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors());
app.use(router)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});

// module.exports = { axios ,url ,querystring };

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
// const GOOGLE_REDIRECT_URI = "http://localhost:5000/google/auth";

// app.get("/google", (req, res) => {
//   const queryPara = querystring.stringify({
//     client_id: GOOGLE_CLIENT_ID,
//     response_type: "code",
//     redirect_uri: GOOGLE_REDIRECT_URI,
//     scope: "https://www.googleapis.com/auth/youtube.force-ssl",
//   });
//   res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${queryPara}`);
// });
// app.get("/google/auth", (req, res) => {
//   const google_code = req.query.code || null;

//   axios({
//     method: "post",
//     url: "https://oauth2.googleapis.com/token",
//     data: querystring.stringify({
//       client_id: GOOGLE_CLIENT_ID,
//       client_secret: GOOGLE_CLIENT_SECRET,
//       code: google_code,
//       grant_type: "authorization_code",
//       redirect_uri: GOOGLE_REDIRECT_URI,
//     }),
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//     },
//     mode: "cors",
//   })
//     .then((response) => {
//       if (response.status === 200) {
//         //  res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
//         // console.log(JSON.stringify(response.data));

//         const { access_token } = response.data;
//         queryParam = querystring.stringify({
//           access_token,
//         });

//         // redirect to react app
//         res.redirect(`http://localhost:3000/transfer?${queryParam}`);
//       } else {
//         // res.send(response);
//       }
//     })
//     .catch((error) => {
//       res.send(error);
//     });
// });

// app.post("/send", async (req, res) => {
//   const data = req.body.songTitle;
//   const access_token = req.query.key;
//   const number_songs = data.length;
//   console.log("send api");
//   console.log(number_songs);
//   const MusicList = [];

//   for (let i = 0; i < number_songs; i++) {
//     if(data[i] == "Deleted video"){
//       continue;
//     }
//     const queryparameters = {
//       q: data[i],
//       type: "track",
//       limit: "10",
//       offset: "5",
//     };
//     const querypar = querystring.stringify(queryparameters);
//     const params = new url.URLSearchParams(querypar);
//     const token = access_token; 

//     await axios({
//       method: "get",
//       url: `https://api.spotify.com/v1/search?${params}`,
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     }).then((response) => {
//       MusicList.push( response.data.tracks.items[0].uri,
//       // MusicTitle : response.data.tracks.items[0].name
//     )      
//     });
//   }
//   console.log(MusicList);
  
//   res.send(MusicList);
// });

// // const url = "https://oauth2.googleapis.com/token";
// // const custom_headers = {
// //   "content-type" : "application/x-www-form-urlencoded",
// // }
// // fetch(url,{
// //   method: "POST",
// //   headers: custom_headers,
// //   body: querystring.stringify({
// //     client_id: GOOGLE_CLIENT_ID,
// //     client_secret: GOOGLE_CLIENT_SECRET,
// //     code: google_code,
// //     grant_type:"authorization_code",
// //     redirect_uri:GOOGLE_REDIRECT_URI
// //   }),
// // }).then(response => {
// //   if (response.status === 200 ){
// //      res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
// //     console.log(response.data);
// //   }else {
// //     // res.send(response);
// //   }
// // })
// // .catch(error => {
// //   res.send(error);
// // });

// app.get("/transfer", (req, res) => {
//   const access_token = req.query.access_token;
//   const queryparameters = {
//     q: "King Gnu - SPECIALZ",
//     type: "track",
//     limit: "10",
//     offset: "5",
//   };
//   const querypar = querystring.stringify(queryparameters);
//   const params = new url.URLSearchParams(querypar);
//   console.log(params);
//   const token = access_token;
//   console.log(token); 

//   axios({
//     method: "get",
//     url: `https://api.spotify.com/v1/search?${params}`,
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   }).then((response) => {
//     console.log(response.data);
//     for (let i = 0; i < 5; i++) {
//       console.log(response.data.tracks.items[0].id);
//     }

//     res.send(response.data);
//   });
// });

// const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
// const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
// const SPOTIFY_REDIRECT_URI = "http://localhost:5000/callback";

// app.get("/login", (req, res) => {
//   const queryParam = querystring.stringify({
//     client_id: SPOTIFY_CLIENT_ID,
//     scope: 'playlist-modify-public playlist-modify-private playlist-read-private',
//     response_type: "code",
//     redirect_uri: SPOTIFY_REDIRECT_URI,
//   });

//   res.redirect(`https://accounts.spotify.com/authorize?${queryParam}`);
// });

// app.get("/callback", (req, res) => {
//   const code = req.query.code || null;

//   axios({
//     method: "post",
//     url: "https://accounts.spotify.com/api/token",
//     data: querystring.stringify({
//       grant_type: "authorization_code",
//       code: code,
//       redirect_uri: SPOTIFY_REDIRECT_URI,
//     }),
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//       Authorization: `Basic ${new Buffer.from(
//         `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
//       ).toString("base64")}`,
//     },
//     mode: "cors",
//   })
//     .then((response) => {
//       if (response.status === 200) {
//         const access_token_spotify = response.data.access_token;
//         const queryP = querystring.stringify({
//           access_token_spotify,
//         });

//         //  redirect to react app
//         // res.redirect(`http://localhost:5000/transfer?${queryP}`);
//         res.redirect(`http://localhost:3000/transfer?${queryP}`);
//         // res.redirect(`http://localhost:3000/transfer?${queryParam}`);
//       } else {
//         res.redirect(
//           `http://localhost:3000/?${querystring.stringify({
//             error: "invalid_token",
//           })}`
//         );
//       }
//     })
//     .catch((error) => {
//       res.send(error);
//     });
// });
