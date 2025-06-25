import { LuNotebookText } from "react-icons/lu";
import { RxVideo } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { FaAward, FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { SlClock } from "react-icons/sl";
import { GrLocation } from "react-icons/gr";

const Ncc = () => {
  return (
    <div className='p-10 flex flex-col'>
        <div className='flex flex-row items-center space-x-3 mb-10'>
            <div className='w-5 h-10 bg-[#7718A6]'></div>
            <h1 className='text-4xl font-bold text-[#7718A6]'>National Cadet Corps</h1>   
        </div>
        <div className='w-full bg-white/20 rounded-lg p-10 flex flex-col space-y-5 mb-10'>
            <h2 className='text-center mb-10 font-bold text-3xl text-amber-700'>NOTICE BOARD</h2>
            <span className='flex flex-row space-x-5 text-lg'>
                <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>New</p>
                <p className='p-2 font-semibold'>Enrollment for this year is open, fill the enrollment form</p>
            </span>
            <span className='flex flex-row space-x-5 text-lg'>
                <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>New</p>
                <p className='p-2 font-semibold'>Annual Training Camp registration starts from 15th July 2025</p>
            </span>
            <span className='flex flex-row space-x-5 text-lg'>
                <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>New</p>
                <p className='p-2 font-semibold'>Republic Day Parade selections on 20th July 2025</p>
            </span>
            <span className='flex flex-row space-x-5 text-lg'>
                <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>New</p>
                <p className='p-2 font-semibold'>Special PT session every Saturday 6-7 AM</p>
            </span>
        </div>
        <div className='bg-gradient-to-r from-orange-200 via-white to-green-200 shadow-lg flex flex-row items-center justify-between p-8'>
            <div className='w-[25%] ml-20'>
                <img src="/assets/images/clubs/ncc_logo.png" alt="logo" />
            </div>
            <div className='w-[75%] ml-10'>
                <h2 className='text-4xl font-bold'>National Cadet Corps</h2>
                <p className='text-xl m-1'>Virtual Campus Unit • Established 2008</p>
                <p className='text-xl m-1'>Army Wing • Air Force Wing • Navy Wing</p>
            </div>
        </div>
        <div className='bg-blue-900 flex flex-col justify-center p-5 mb-10'>
            <img src="/assets/images/clubs/nss_2.jpg" alt="banner 1" />
        </div>

        {/* About */}
        <h2 className='font-medium font-serif text-3xl mb-10'>National Cadet Corps (NCC)</h2>

        <h3 className='font-semibold text-xl mb-3'>About National Cadet Corps (NCC)</h3>
        <p className='mb-10'>The National Cadet Corps (NCC) is the youth wing of the Indian Armed Forces with its headquarters in New Delhi, India. It is open to school and college students on voluntary basis as a Tri-Services Organisation, comprising the Army, the Navy and Air Force. Cadets are given basic military training in small arms and drill. Officers and cadets have no liability for active military service once they complete their course.</p>

        {/* Resources */}
        <h2 className="text-3xl font-bold text-center mb-8">📚 Resources</h2>

        {/* Training Module */}
        <div className='flex flex-row items-center space-x-3 mb-8'>
            <div className='w-3 h-8 bg-[#7718A6]'></div>
            <LuNotebookText className="text-xl" />
            <h3 className='text-xl font-semibold'>Training Manuals</h3> 
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
            <div className="bg-white/30 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-[#812094]  text-lg">Drill Handbook</h4>
                <p className="text-md text-gray-600 mb-2">Complete guide to NCC drill procedures</p>
                <button className="cursor-pointer bg-gradient-to-r from-[#812094] to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-[#812094] hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-102 px-4 py-2 flex items-center space-x-2">
                    {/* <Download className="w-4 h-4" /> */}
                    <span>Download PDF</span>
                </button>
            </div>
            <div className="bg-white/30 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-[#812094]  text-lg">Weapon Training Manual</h4>
                <p className="text-md text-gray-600 mb-2">Safety protocols and handling procedures</p>
                <button className="cursor-pointer bg-gradient-to-r from-[#812094] to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-[#812094] hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-102 px-4 py-2 flex items-center space-x-2">
                    {/* <Download className="w-4 h-4" /> */}
                    <span>Download PDF</span>
                </button>
            </div>
            <div className="bg-white/30 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-[#812094]  text-lg ">Map Reading Guide</h4>
                <p className="text-md text-gray-600 mb-2">Navigation and map interpretation skills</p>
                <button className="cursor-pointer bg-gradient-to-r from-[#812094] to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-[#812094] hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-102 px-4 py-2 flex items-center space-x-2">
                    {/* <Download className="w-4 h-4" /> */}
                    <span>Download PDF</span>
                </button>
            </div>
            <div className="bg-white/30 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <h4 className="font-semibold text-[#812094]  text-lg">Physical Training Schedule</h4>
                <p className="text-md text-gray-600 mb-2">Weekly PT routine and fitness standards</p>
                <button className="cursor-pointer bg-gradient-to-r from-[#812094] to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-[#812094] hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-102 px-4 py-2 flex items-center space-x-2">
                    {/* <Download className="w-4 h-4" /> */}
                    <span>Download PDF</span>
                </button>
            </div>
        </div>

        {/* Videos Tutorial */}
        <div className='flex flex-row items-center space-x-3 mb-8'>
            <div className='w-3 h-8 bg-[#7718A6]'></div>
            <RxVideo className="text-xl" />
            <h3 className='text-xl font-semibold'>Videos & Tutorials</h3> 
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
            <div className="bg-white/30 p-4 rounded-lg">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                    <RxVideo className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className="font-semibold text-[#812094] text-lg">Drill Demonstration</h4>
                <p className="text-md text-gray-600">Step-by-step drill movements</p>
            </div>
            <div className="bg-white/30 p-4 rounded-lg">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                    <RxVideo className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className="font-semibold text-[#812094] text-lg">Weapon Handling</h4>
                <p className="text-md text-gray-600">Safe weapon handling procedures</p>
            </div>
            <div className="bg-white/30 p-4 rounded-lg">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                    <RxVideo className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className="font-semibold text-[#812094] text-lg">Yoga & PT</h4>
                <p className="text-md text-gray-600">Physical fitness routines</p>
            </div>
            <div className="bg-white/30 p-4 rounded-lg">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                    <RxVideo className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className="font-semibold text-[#812094] text-lg">First Aid Basics</h4>
                <p className="text-md text-gray-600">Emergency medical procedures</p>
            </div>
        </div>

        {/* Schedule & SOPs */}
        <div className='flex flex-row items-center space-x-3 mb-8'>
            <div className='w-3 h-8 bg-[#7718A6]'></div>
            <SlCalender className="text-xl" />
            <h3 className='text-xl font-semibold'>Schedule & SOPs</h3> 
        </div>
        <div className="space-y-4 mb-16">
            <div className="bg-gradient-to-r from-green-50 to-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-600 text-xl mb-2">Annual Training Calendar 2025</h4>
                <div className="grid md:grid-cols-2 gap-4 text-md mt-5">
                    <div>
                        <strong>July:</strong> Annual Training Camp
                    </div>
                    <div>
                        <strong>August:</strong> Independence Day Parade
                    </div>
                    <div>
                        <strong>October:</strong> Shooting Competition
                    </div>
                    <div>
                        <strong>November:</strong> Combined Annual Training Camp
                    </div>
                    <div>
                        <strong>January:</strong> Republic Day Parade
                    </div>
                    <div>
                        <strong>March:</strong> Vayu Sainik Camp
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/40 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-600 text-xl">Parade Schedule</h4>
                    <p className="text-md text-gray-600 mt-2">Every Tuesday & Thursday, 4:00 PM - 6:00 PM</p>
                </div>
                <div className="bg-white/40 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-600 text-xl">Dress Code Standards</h4>
                    <p className="text-md text-gray-600 mt-2">Complete uniform guidelines and grooming standards</p>
                </div>
            </div>
        </div>

        {/* Achievements */}
        <h2 className="text-3xl font-bold text-center mb-8">🏆 Achievements</h2>
        <div className="grid grid-cols-2 gap-6 mb-16">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <FaAward  className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Best Cadet Award</h3>
                <p className="text-sm text-gray-600 mb-1">Cadet Gautam Sharma</p>
                <p className="text-xs text-yellow-600 font-semibold">2024-2025</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <FaAward  className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Republic Day Camp Selection</h3>
                <p className="text-sm text-gray-600 mb-1">Cadet Alice Joghnson</p>
                <p className="text-xs text-yellow-600 font-semibold">2025</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <FaAward  className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Thal Sainik Camp</h3>
                <p className="text-sm text-gray-600 mb-1">Cadet Bob Charles</p>
                <p className="text-xs text-yellow-600 font-semibold">2024</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <FaAward  className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">Best Wing Award</h3>
                <p className="text-sm text-gray-600 mb-1">Navy Wing</p>
                <p className="text-xs text-yellow-600 font-semibold">2024</p>
            </div>
        </div>

        {/* Gallery */}
        <h2 className="text-3xl font-bold text-center mb-8">📸 Gallery</h2>
        <div className="grid grid-cols-2 gap-6 mb-16">
            <div className="bg-white/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img className="w-[100%]" src="https://static.mygov.in/indiancc/2021/05/mygov-9999999992087126249.jpg" alt="" />
                <p className="text-lg text-center font-bold mt-2">Training</p>
            </div>
            <div className="bg-white/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img className="w-[100%]" src="https://static.mygov.in/indiancc/2021/05/mygov-9999999991403680401.jpg" alt="" />
                <p className="text-lg text-center font-bold mt-2">SSCD</p>
            </div>
            <div className="bg-white/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img className="w-[100%] h-[88%]" src="https://www.shobhituniversity.ac.in/images/ncc-su-img-01.jpg" alt="" />
                <p className="text-lg text-center font-bold mt-2">Parade</p>
            </div>
            <div className="bg-white/30 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img className="w-[100%]" src="https://static.mygov.in/indiancc/2021/05/mygov-999999999613546560.jpg" alt="" />
                <p className="text-lg text-center font-bold mt-2">YEP</p>
            </div>
        </div>

        {/* Contact */}
        <h2 className="text-3xl font-bold text-center mb-8">☎️ Contact Information</h2>
        <div className="bg-gradient-to-br from-orange-100 to-green-100 p-8 rounded-lg shadow-md">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">NCC Officer</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                                <FaRegUser className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Lt. Colonel Rajesh Sharma</p>
                                <p className="text-sm text-gray-600">Associate NCC Officer</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MdOutlineLocalPhone className="w-5 h-5 text-orange-600" />
                            <p className="text-gray-700">+91 98765-43210</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MdOutlineEmail className="w-5 h-5 text-orange-600" />
                            <p className="text-gray-700">ncc.officer@institute.edu.in</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Office Details</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <GrLocation  className="w-5 h-5 text-green-600" />
                            <p className="text-gray-700">Room No. 15, Administrative Block</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <SlClock  className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="text-gray-700">Monday - Friday: 9:00 AM - 5:00 PM</p>
                                <p className="text-gray-700">Saturday: 9:00 AM - 1:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Ncc