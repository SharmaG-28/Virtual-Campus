import { useState } from 'react'
import NSS from './NSS'
import Ncc from './Ncc'
import TechClub from './TechClub';
import LiteratureClub from './LiteratureClub';

const ClubResourcesPortal = () => {

  const [selected, setSelected] = useState("");

  return (
    <div className='w-full h-full flex flex-col justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-4 relative overflow-hidden'>
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
              Welcome to Campus's Clubs Area
          </h1>
          <p className="text-gray-900 font-medium font-serif text-[18px]">
            Explore Clubs of your Interest.
          </p>
        </div>

        {/* card */}
        <div className='px-8 py-4'>
          {/* Coding Platforms */}
          <div className="text-center flex flex-col justify-center space-y-5 py-5">
            <p className="text-[#7718A6] font-mono text-[25px] font-medium">
              Here are the current running clubs in Virtual Campus
            </p>
            <div className="flex flex-row justify-center space-x-5">
              <div 
                className={`bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer ${selected === "NSS" ? "ring-4 ring-[#812094]" : ""}`}
                onClick={() => (setSelected("NSS"))}
              >
                <img className='h-40' src="/assets/images/clubs/nss.jpg" alt="NSS" />
                <p className="font-bold text-md mt-4">NSS</p>
              </div>
              <div 
                className={`bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer ${selected === "NCC" ? "ring-4 ring-[#812094]" : ""}`}
                onClick={() => (setSelected("NCC"))}
              >
                <img className='h-40' src="/assets/images/clubs/ncc.png" alt="NCC" />
                <p className="font-bold text-md mt-4">National Cadet Corps</p>
              </div>
              <div 
                className={`bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer ${selected === "TECH" ? "ring-4 ring-[#812094]" : ""}`}
                onClick={() => (setSelected("TECH"))}
              >
                <img className='h-40' src="/assets/images/clubs/TC.jpg" alt="Technical" />
                <p className="font-bold text-md mt-4">Technical Club</p>
              </div>
              <div 
                className={`bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer ${selected === "LIT" ? "ring-4 ring-[#812094]" : ""}`}
                onClick={() => (setSelected("LIT"))}
              >
                <img className='h-40' src="/assets/images/clubs/LC.jpg" alt="Literature" />
                <p className="font-bold text-md mt-4">Literature Club</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selected === "NSS" && <NSS/>}
      {selected === "NCC" && <Ncc/>}
      {selected === "TECH" && <TechClub/>}
      {selected === "LIT" && <LiteratureClub/>}
    </div>
  )
}

export default ClubResourcesPortal