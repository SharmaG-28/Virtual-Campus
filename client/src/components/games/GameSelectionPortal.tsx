import React from 'react'

const GameSelectionPortal = () => {
  return (
    <div className='w-full h-full flex justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-4 relative overflow-hidden'>
      {/* bg css */}
      <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* logo and heading */}
      <div className='relative z-10 flex flex-col items-center'>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-60 py-4">
              <img src="/assets/background/VC_Logo.png" alt="VIRTUAL CAMPUS" />
          </div>
          <h1 className="text-[35px] font-bold text-[#7718A6] tracking-wide">
              Welcome to Gaming Space
          </h1>
          <p className="text-gray-900 font-medium font-serif text-[18px]">
            Call your friends, it's game time, and laughs are guaranteed!
          </p>
        </div>

        {/* card */}
        <div className='px-8 py-4'>
          {/* Coding Platforms */}
          <div className="text-center flex flex-col justify-center space-y-10 py-5">
            <p className="text-black font-mono text-[20px] text-left font-medium">
              🌟Here are the fun Games🎮 for you and your friends:
            </p>
            {/* 1st row */}
            <div className="flex flex-row justify-center space-x-5">
              <div className="bg-white/30 p-5 w-[20%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://ludoking.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://images.sftcdn.net/images/t_app-cover-s-16-9,f_auto/p/6dfe0997-e662-4395-a0c5-61776fdd0982/1773045058/ludo-king-Ludo%20King%20(6).png" alt="LUDO" />
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[20%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://skribbl.io/"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://skribbl.io/img/thumbnail.png" alt="skribbl.io" />
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[20%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://bloxd.io/"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://imgs.crazygames.com/games/bloxdhop-io/cover_16x9-1709115453824.png?metadata=none&quality=40&width=372" alt="Bloxd.io" />
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[20%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/subway-surfers"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://subway-surfers.org/wp-content/uploads/2023/01/Subway-surfers-winter-holyday-300x167.jpg" alt="subway-surfers" />
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[20%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://codenames.game/room/create"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://www.ultraboardgames.com/img/slideshow/codenames.jpg" alt="codenames" />
                </a>
              </div>
            </div>
            {/* 2nd row */}
            <div className="flex flex-row justify-center space-x-5">
              <div className="bg-white/30 p-5 w-[20%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/temple-run-2"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/b5c8b617f65be7cc4d56dd3657590ae7/temple-run-2.png" alt="temple run" />
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[20%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/sprint-league" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/fc6ceed09df6e25cc25d569a46262811/sprint-league.jfif" alt="Sprint" />
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[20%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/cryzen-io"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/89faa8fcb2d56a8195c041a7cfb7a6a4/cryzen-io.jfif" alt="cryzen" />
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[20%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/smash-karts"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/9c9e529b14731be871b07b89660bbc2a/smash-karts.png" alt="smash-karts" />
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[20%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/stickman-hook"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=204,height=204,fit=cover,f=auto/99e090d154caf30f3625df7e456d5984/stickman-hook.png" alt="stickman-hook" />
                </a>
              </div>
            </div>
            {/* 3rd row */}
            <div className="flex flex-row justify-center space-x-10">
              <div className="bg-white/30 p-5 rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/soccer-skills-world-cup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=94,height=94,fit=cover,f=auto/1a9642e779cab413962255ea953d1155/soccer-skills-world-cup.png" alt="soccer" />
                </a>
              </div>
              <div className="bg-white/30 p-5 rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/stickman-climb-2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=94,height=94,fit=cover,f=auto/3c338d4afffa6a269b9642efef13f5ca/stickman-climb-2.png" alt="stickman-climb-2" />
                </a>
              </div>
              <div className="bg-white/30 p-5 rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/chess-multiplayer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=94,height=94,fit=cover,f=auto/08c7d5cca12d3a87f1f45839dd2d38c6/chess-multiplayer.png" alt="chess" />
                </a>
              </div>
              <div className="bg-white/30 p-5 rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/crazy-bikes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=94,height=94,fit=cover,f=auto/3dffba10e1aa5980e65408012b38db6d/crazy-bikes.png" alt="crazy-bikes" />
                </a>
              </div>
              <div className="bg-white/30 p-5 rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/house-of-hazards" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=94,height=94,fit=cover,f=auto/0609b0ba2889859b21cf47ca205818fe/house-of-hazards.png" alt="house-hazards" />
                </a>
              </div>
              <div className="bg-white/30 p-5 rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://poki.com/en/g/fantasy-sandbox" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=94,height=94,fit=cover,f=auto/bfad7bea98358eedda5aea45ee447e39/fantasy-sandbox.png" alt="fantasy-sandbox" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameSelectionPortal