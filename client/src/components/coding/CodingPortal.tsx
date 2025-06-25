import { RxVideo } from "react-icons/rx";

export default function CodingPortal() {
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
              Welcome to Coding Space
          </h1>
          <p className="text-gray-900 font-medium font-serif text-[18px]">
            Boost your Coding and Problem Solving Skills
          </p>
        </div>

        {/* card */}
        <div className='px-8 py-4'>
          {/* Coding Platforms */}
          <div className="text-center flex flex-col justify-center space-y-5 py-5">
            <p className="text-[#7718A6] font-mono text-[25px] font-medium">
                Here are the top Coding Platform for you. Just click and start coding.
            </p>
            <div className="flex flex-row justify-center space-x-5">
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.geeksforgeeks.org/problem-of-the-day" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img className="h-20 p-3" src="/assets/images/coding/GeeksForGeeks_logo.png" alt="GFG" />
                  <p className="font-bold text-lg mt-2">GeeksForGeeks</p>
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://leetcode.com/problemset/"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img className="h-20" src="/assets/images/coding/Leetcode.png" alt="GFG" />
                  <p className="font-bold text-lg mt-2">LeetCode</p>
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.codechef.com/practice"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img className="h-20" src="/assets/images/coding/Codechef_logo.png" alt="GFG" />
                  <p className="font-bold text-lg mt-2">CodeChef</p>
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.hackerrank.com/dashboard"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img className="h-20" src="/assets/images/coding/HakerRank.png" alt="GFG" />
                  <p className="font-bold text-lg mt-2">HackerRank</p>
                </a>
              </div>
            </div>
          </div>

          {/* Coding Resourses */}
          <div className="text-center flex flex-col justify-center space-y-5 py-5">
            <p className="text-[#7718A6] font-mono text-[25px] font-medium">
                Here are the free Coding Courses for you, just one click away.
            </p>
            <div className="flex flex-row justify-center space-x-5">
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img  src="/assets/images/coding/DSA_JAVA.jpg" alt="DSA" />
                  <p className="font-bold text-lg mt-2">DSA in Java</p>
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.youtube.com/playlist?list=PLeo1K3hjS3uu_n_a__MI_KktGTLYopZ12"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img  src="/assets/images/coding/DSA_PY.jpg" alt="DSA" />
                  <p className="font-bold text-lg mt-2">DSA in Python</p>
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img  src="/assets/images/coding/DSA_C++.jpg" alt="DSA" />
                  <p className="font-bold text-lg mt-2">DSA in C++</p>
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.youtube.com/playlist?list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img  src="/assets/images/coding/JAVA.jpg" alt="JAVA" />
                  <p className="font-bold text-lg mt-2">Java Programming</p>
                </a>
              </div>
            </div>
            <div className="flex flex-row justify-center space-x-5">
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.youtube.com/playlist?list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img  src="/assets/images/coding/PY.jpg" alt="PYTHON" />
                  <p className="font-bold text-lg mt-2">Python Programming</p>
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.youtube.com/playlist?list=PLDzeHZWIZsTo0wSBcg4-NMIbC0L8evLrD"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img  src="/assets/images/coding/FULL.jpg" alt="WEB DEV" />
                  <p className="font-bold text-lg mt-2">Full Stack Web Dev</p>
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.youtube.com/playlist?list=PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img  src="/assets/images/coding/HTML.jpg" alt="HTML" />
                  <p className="font-bold text-lg mt-2">HTML and CSS</p>
                </a>
              </div>
              <div className="bg-white/30 p-5 w-[25%] rounded-md flex flex-col items-center cursor-pointer">
                <a 
                  href="https://www.youtube.com/playlist?list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img  src="/assets/images/coding/JS.jpg" alt="JS" />
                  <p className="font-bold text-lg mt-2">JavaScript</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}