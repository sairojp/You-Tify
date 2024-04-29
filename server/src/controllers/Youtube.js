
const querystring = require("querystring");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = "http://localhost:5000/google/auth";


//Login for Google 
const loginGoogle = async (req, res) => {
  const queryPara = querystring.stringify({
    client_id: GOOGLE_CLIENT_ID,
    response_type: "code",
    redirect_uri: GOOGLE_REDIRECT_URI,
    scope: "https://www.googleapis.com/auth/youtube.force-ssl",
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${queryPara}`);
}

//Redirect of Oauth for google 
const redirectGoogle = async (req, res) => {
  const google_code = req.query.code || null;

  axios({
    method: "post",
    url: "https://oauth2.googleapis.com/token",
    data: querystring.stringify({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code: google_code,
      grant_type: "authorization_code",
      redirect_uri: GOOGLE_REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    mode: "cors",
  })
    .then((response) => {
      if (response.status === 200) {
        //  res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
        // console.log(JSON.stringify(response.data));

        const { access_token } = response.data;
        queryParam = querystring.stringify({
          access_token,
        });
        // redirect to react app
        res.redirect(`http://localhost:3000/transfer?${queryParam}`);
      } else {
         res.send(response);
      }
    })
    .catch((error) => {
      res.send(error);
    });
};

module.exports = { loginGoogle , redirectGoogle};