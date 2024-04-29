import  React  from "react";
import {createBrowserRouter ,RouterProvider} from "react-router-dom"
import Home from "./components/Home";
import Playlist from "./components/Playlist";
import SpotifyPlaylist from "./components/SpotifyPlaylist";


import "./App.css";

const router = createBrowserRouter([{
  path: '/:token?',
  element:<Home/>
},
{
  path: '/getplaylist',
  element: <Playlist/>
},
{
  path: '/spotifyplaylist',
  element: <SpotifyPlaylist/>
}
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router= {router} />
    </div>
  );
}

export default App;
