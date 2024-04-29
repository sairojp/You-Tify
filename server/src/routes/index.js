const {Router} = require("express");

const router = Router();

const { loginGoogle , redirectGoogle} = require("../controllers/Youtube");

const {loginSpotify , redirectSpotify , searchMusicSpotify } = require("../controllers/Spotify")

// root path
router.get("/", (req, res) => {
  res.status(200).send({ status: "OK", message: "App is running" });
});


//**************** YOUTUBE APIs BEGIN  ********************/

router.get("/google", loginGoogle);

router.get("/google/auth", redirectGoogle);


/*************************YOUTUBE APIs end  ********************/



/************************** SPOTIFY APIs Start ***************/

router.get("/login",loginSpotify);

router.get("/callback",redirectSpotify);

router.post("/send", searchMusicSpotify);

/************************SPOTIFY APIs End */

module.exports = { router,};