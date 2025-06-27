import React, { useRef, useEffect, useState } from 'react';
import '../css/home.css'
import play from'../assets/play.png';
import Navigation from'../component/Navigation'


export default function Home(){

       const {
          createcallClick,
    audioroomClick,
    livestreamClick
    } = Navigation();


    return(
       <>
        <div className="sidesection">
          <div className="sideicon">
              <img src={play} />
              <img src={play} />
              <img src={play} />
              <img src={play} />
              <img src={play} />
          </div>
          <div className="sidebar">

          </div>
          <div className="content">
            <h2>Video & Audio Overview</h2>

            <h4>getting Started with Video & Audio</h4>

            <p>Easily create a new call, audio room, or livestream quickly using our server-side Video and Audio SDKs.</p>

            <form>
              <button onClick={createcallClick}><img src={play} />Create Call</button>
              <button onClick={audioroomClick}><img src={play} />Create Audion Room</button>
              <button onClick={livestreamClick}><img src={play} />Create Livestream</button>
            </form>
            
            <h3>App Access Keys</h3>
          </div>
        </div>
       
        </>
    )
}