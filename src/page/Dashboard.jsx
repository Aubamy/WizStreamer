import React from 'react';
import '../css/dashboard.css';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  return (
    <div className="mainDashboard">
      <aside className="mainSidebar">
        <div className="sidebarHeader">
          <h2><span className="logo">Game</span>Verse</h2>
        </div>
        <nav className="sidebarNav">
          <ul>
            <li className="navItem active">Home</li>
            <li className="navItem"><Link to="/trending">Trending</Link></li>
            <li className="navItem"><a href="https://gameverse-xfcn.onrender.com" target="_blank" rel="noopener noreferrer">Games</a></li>
            <li className="navItem"><Link to="/chart">Chat</Link></li>
            <li className="navItem"><Link to="/moderation">Moderation</Link></li>
            <li className="navItem"> <Link to="/livestream">Go live</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="dashboardContent">
        <div className="topNav">
          <div className="searchBar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="topActions">
            <span className="icon">🔔</span>
            <img className="profileAvatar" src="data:image/jpeg;base64,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" alt="avatar" />
          </div>
        </div>

        <section className="heroBanner">
          <h1><span className='logo'>Game</span>Verse Live Streams: <span>Join the Hype!</span></h1>
          <div className="tagRow">
            {['Valorant', 'PUBG', 'Minecraft', 'Cooking', 'Free Fire', 'Tekken'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </section>

        <section className="recommendationSection">
          <h2>Recommended Live Videos</h2>
          <div className="videoCards">
            <div className="videoCard">
              <img src="https://variety.com/wp-content/uploads/2024/08/Valorant_a27b53.png?w=1000&h=667&crop=1&resize=1360%2C907" alt="stream" />
              <div className="videoInfo">
                <div className="title">Epic Gameplay #1</div>
                <div className="streamer">Iquickscopei • Valorant</div>
              </div>
            </div>
            <div className="videoCard">
              <img src="https://xboxwire.thesourcemediaassets.com/sites/2/2024/05/Hero-8c18da7c19a1a8811ddb-1536x864.jpg" alt="stream" />
              <div className="videoInfo">
                <div className="title">Epic Gameplay #2</div>
                <div className="streamer">Grox • Minecraft</div>
              </div>
            </div>
            <div className="videoCard">
              <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1962663/54bd6a40eb3759aca46966aadd4c4d0d84b2713e/header.jpg?t=1748534520" alt="stream" />
              <div className="videoInfo">
                <div className="title">Epic Gameplay #3</div>
                <div className="streamer">Faze Booya • Call of Duty-warzone</div>
              </div>
            </div>
          </div>
        </section>

        <section className="gamesSection">
          <h2>The Games We Think You'll Like</h2>
          <div className="gameThumbnails">
            <div className="gameCard">
              <img src="https://variety.com/wp-content/uploads/2024/08/Valorant_a27b53.png?w=1000&h=667&crop=1&resize=1360%2C907" alt="Valorant" />
              <p>Valorant</p>
            </div>
            <div className="gameCard">
              <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg" alt="PUBG" />
              <p>PUBG</p>
            </div>
            <div className="gameCard">
              <img src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/header.jpg?t=1749122165" alt="The Sims" />
              <p>The Sims</p>
            </div>
            <div className="gameCard">
              <img src="https://xboxwire.thesourcemediaassets.com/sites/2/2024/05/Hero-8c18da7c19a1a8811ddb-1536x864.jpg" alt="Minecraft" />
              <p>Minecraft</p>
            </div>
            <div className="gameCard">
              <img src="https://dropinblog.net/34253310/files/featured/imagem-2024-09-26-103919931.png" alt="Fortnite" />
              <p>Fortnite</p>
            </div>
            <div className="gameCard">
              <img src="https://www.trustedreviews.com/wp-content/uploads/sites/7/2013/02/GTA-V-1.jpg" alt="GTA V" />
              <p>GTA V</p>
            </div>
          </div>
        </section>

        <section className="popularStreamers">
          <h3>Popular Streamers</h3>
          <div className="streamerList">
            {[
              { name: "Akpan Idara", avatar: "https://i.pravatar.cc/100?img=1" },
              { name: "Collins Emelumba", avatar: "https://i.pravatar.cc/100?img=2" },
              { name: "Collins Echeng", avatar: "https://i.pravatar.cc/100?img=3" }
            ].map((streamer, i) => (
              <div key={i} className="streamerItem">
                <div className="streamerInfo">
                  <img className="streamerAvatar" src={streamer.avatar} alt={streamer.name} />
                  <span className="name">{streamer.name}</span>
                </div>
                <button className="followBtn">Follow</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
