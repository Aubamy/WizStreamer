import React from 'react';
import '../css/trending.css';
import { Link } from 'react-router-dom';    

export default function Trending() {
  const trendingStreams = [
    {
      title: "Insane Tekken Combo",
      game: "Tekken 8",
      streamer: "FighterX",
      thumbnail: "https://cdn.cloudflare.steamstatic.com/steam/apps/2051120/header.jpg",
    },
    {
      title: "Minecraft Hardcore Journey",
      game: "Minecraft",
      streamer: "BlockBuilder",
      thumbnail: "https://xboxwire.thesourcemediaassets.com/sites/2/2024/05/Hero-8c18da7c19a1a8811ddb-1536x864.jpg",
    },
    {
      title: "Ghost Mode Snipes",
      game: "Warzone",
      streamer: "SilentGhost",
      thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1962663/54bd6a40eb3759aca46966aadd4c4d0d84b2713e/header.jpg?t=1748534520",
    },
    {
      title: "5-Star Cooking Battle",
      game: "Cooking Simulator",
      streamer: "ChefMaster",
      thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/641320/header.jpg",
    },
    {
        title: "Insane Tekken Combo",
        game: "Tekken 8",
        streamer: "FighterX",
        thumbnail: "https://cdn.cloudflare.steamstatic.com/steam/apps/2051120/header.jpg",
      },
      {
        title: "Minecraft Hardcore Journey",
        game: "Minecraft",
        streamer: "BlockBuilder",
        thumbnail: "https://xboxwire.thesourcemediaassets.com/sites/2/2024/05/Hero-8c18da7c19a1a8811ddb-1536x864.jpg",
      },
      {
        title: "Ghost Mode Snipes",
        game: "Warzone",
        streamer: "SilentGhost",
        thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1962663/54bd6a40eb3759aca46966aadd4c4d0d84b2713e/header.jpg?t=1748534520",
      },
      {
        title: "5-Star Cooking Battle",
        game: "Cooking Simulator",
        streamer: "ChefMaster",
        thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/641320/header.jpg",
      },
      {
        title: "Insane Tekken Combo",
        game: "Tekken 8",
        streamer: "FighterX",
        thumbnail: "https://cdn.cloudflare.steamstatic.com/steam/apps/2051120/header.jpg",
      },
      {
        title: "Minecraft Hardcore Journey",
        game: "Minecraft",
        streamer: "BlockBuilder",
        thumbnail: "https://xboxwire.thesourcemediaassets.com/sites/2/2024/05/Hero-8c18da7c19a1a8811ddb-1536x864.jpg",
      },
      {
        title: "Ghost Mode Snipes",
        game: "Warzone",
        streamer: "SilentGhost",
        thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1962663/54bd6a40eb3759aca46966aadd4c4d0d84b2713e/header.jpg?t=1748534520",
      },
      {
        title: "5-Star Cooking Battle",
        game: "Cooking Simulator",
        streamer: "ChefMaster",
        thumbnail: "https://cdn.akamai.steamstatic.com/steam/apps/641320/header.jpg",
      },
      {
        title: "Insane Tekken Combo",
        game: "Tekken 8",
        streamer: "FighterX",
        thumbnail: "https://cdn.cloudflare.steamstatic.com/steam/apps/2051120/header.jpg",
      },
      {
        title: "Minecraft Hardcore Journey",
        game: "Minecraft",
        streamer: "BlockBuilder",
        thumbnail: "https://xboxwire.thesourcemediaassets.com/sites/2/2024/05/Hero-8c18da7c19a1a8811ddb-1536x864.jpg",
      },
      {
        title: "Ghost Mode Snipes",
        game: "Warzone",
        streamer: "SilentGhost",
        thumbnail: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1962663/54bd6a40eb3759aca46966aadd4c4d0d84b2713e/header.jpg?t=1748534520",
      },
    
  ];

  return (
    <div className="trendingPage">
      <div className="backButtonWrapper">
        <button className="backButton"><Link to="/dashboard">← Back</Link></button>
      </div>

      <header className="trendingHeader">
        <h1>🔥 Trending Live Streams</h1>
        <p>Watch what's buzzing across GameVerse right now.</p>
      </header>

      <div className="trendingGrid">
        {trendingStreams.map((stream, index) => (
          <div key={index} className="trendCard">
            <img src={stream.thumbnail} alt={stream.title} />
            <div className="trendInfo">
              <h3>{stream.title}</h3>
              <p><strong>{stream.streamer}</strong> • {stream.game}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
