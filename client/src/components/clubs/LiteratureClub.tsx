import React from 'react';
import { FaBook, FaPen, FaMicrophone, FaTheaterMasks,FaDownload,FaTrophy,FaCalendarAlt,FaUsers,FaBookOpen,FaFeatherAlt, FaMapMarkerAlt, FaInstagram,FaTwitter, FaEdit,FaNewspaper,FaScroll } from 'react-icons/fa';
import {  MdOutlineEmail,  MdOutlineLocalPhone, MdHistoryEdu } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';
import { SlClock } from 'react-icons/sl';

const LiteratureClub: React.FC = () => {
  const resources = {
    readingMaterials: [
      {
        title: "Classic Literature Collection",
        description: "Curated list of must-read classics with analysis guides",
        genre: "classics",
        type: "PDF",
        author: "Various Authors",
        link: "#"
      },
      {
        title: "Contemporary Poetry Anthology",
        description: "Modern poets and their celebrated works",
        genre: "poetry",
        type: "PDF",
        author: "Club Compilation",
        link: "#"
      },
      {
        title: "Short Story Masterpieces",
        description: "Award-winning short stories from around the world",
        genre: "fiction",
        type: "PDF",
        author: "Various Authors",
        link: "#"
      },
      {
        title: "Literary Theory & Criticism",
        description: "Essential concepts in literary analysis",
        genre: "academic",
        type: "PDF",
        author: "Dr. Sarah Johnson",
        link: "#"
      }
    ],
    workshops: [
      {
        title: "Creative Writing Masterclass",
        description: "Learn the art of storytelling and character development",
        level: "intermediate",
        type: "Video",
        duration: "4 hours",
        instructor: "Prof. Michael Carter"
      },
      {
        title: "Poetry Writing Workshop",
        description: "From free verse to sonnets - explore poetic forms",
        level: "beginner",
        type: "Video",
        duration: "3 hours",
        instructor: "Dr. Emily Rose"
      },
      {
        title: "Public Speaking & Recitation",
        description: "Master the art of dramatic reading and presentation",
        level: "intermediate",
        type: "Video",
        duration: "2.5 hours",
        instructor: "Actor John Smith"
      }
    ],
    writingTools: [
      {
        title: "Writer's Journal Template",
        description: "Daily prompts and structured writing exercises",
        level: "beginner",
        type: "Template",
        format: "PDF & Word"
      },
      {
        title: "Story Planning Worksheets",
        description: "Character development and plot structure templates",
        level: "intermediate",
        type: "Worksheet",
        format: "PDF"
      },
      {
        title: "Poetry Forms Guide for Beginners",
        description: "Templates for sonnets, haikus, villanelles, and more",
        level: "beginner",
        type: "Guide",
        format: "PDF"
      }
    ],
    publications: [
      {
        title: "Inkwell - Club Magazine",
        description: "Quarterly publication featuring student works",
        issue: "Spring 2025",
        type: "Magazine",
        pages: 48
      },
      {
        title: "Literary Review Annual",
        description: "Critical essays and book reviews by members",
        issue: "2024 Edition",
        type: "Journal",
        pages: 120
      },
      {
        title: "Poetry Chapbook Series",
        description: "Individual collections by our club poets Gautam",
        issue: "Volume 3",
        type: "Anthology",
        pages: 32
      }
    ]
  };

  const events = [
    {
      title: "National Poetry Day Celebration",
      date: "August 21, 2025",
      description: "Open mic poetry reading and slam competition",
      status: "upcoming",
      participants: 75,
      venue: "Main Auditorium"
    },
    {
      title: "Author Meet & Greet",
      date: "September 15, 2025",
      description: "Interactive session with bestselling author Chetan Bhagat",
      status: "upcoming",
      participants: 200,
      venue: "Conference Hall"
    },
    {
      title: "Shakespeare Festival",
      date: "April 23, 2025",
      description: "Dramatic performances and literary discussions",
      status: "completed",
      participants: 150,
      venue: "Open Air Theatre"
    },
    {
      title: "Creative Writing Workshop Series",
      date: "Ongoing - Every Saturday",
      description: "Weekly sessions on various writing techniques",
      status: "ongoing",
      participants: 35,
      venue: "Literature Room"
    }
  ];

  const achievements = [
    {
      title: "National Literary Festival Winner",
      description: "First place in inter-college creative writing competition",
      year: "2024",
      winner: "Ananya Sharma",
      category: "Short Story"
    },
    {
      title: "Poetry Slam Championship",
      description: "State-level spoken word poetry competition",
      year: "2024",
      winner: "Rahul Mehta",
      category: "Spoken Word"
    },
    {
      title: "Best College Magazine Award",
      description: "Inkwell magazine wins regional recognition",
      year: "2023",
      winner: "Editorial Team",
      category: "Publication"
    },
    {
      title: "Drama Competition Victory",
      description: "Outstanding performance in university theatre fest",
      year: "2023",
      winner: "Theatre Group",
      category: "Drama"
    }
  ];

  const teamMembers = [
    {
      name: "Kavya Patel",
      role: "Club President",
      specialization: "Contemporary Fiction & Poetry",
      achievements: "Published poet, 3 anthologies",
      social: { instagram: "#", twitter: "#" }
    },
    {
      name: "Arjun Nair",
      role: "Vice President",
      specialization: "Classical Literature & Drama",
      achievements: "Theatre director, 5 productions",
      social: { instagram: "#", twitter: "#" }
    },
    {
      name: "Priya Singh",
      role: "Editor-in-Chief",
      specialization: "Literary Criticism & Journalism",
      achievements: "Published critic, 20+ reviews",
      social: { instagram: "#", twitter: "#" }
    },
    {
      name: "Vikram Joshi",
      role: "Events Coordinator",
      specialization: "Public Speaking & Recitation",
      achievements: "National debate finalist",
      social: { instagram: "#", twitter: "#" }
    }
  ];

  const getGenreColor = (genre: string) => {
    switch (genre) {
      case 'classics': return 'text-amber-700 bg-amber-100';
      case 'poetry': return 'text-purple-700 bg-purple-100';
      case 'fiction': return 'text-blue-700 bg-blue-100';
      case 'academic': return 'text-green-700 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderResourceSection = (title: string, icon: React.ReactNode, resourceList: any[], colorClass: string = 'text-purple-600') => (
    <div className="mb-16">
      <h3 className={`text-2xl font-bold text-center mb-8 flex items-center justify-center space-x-3`}>
        <span className={colorClass}>{icon}</span>
        <span>{title}</span>
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceList.map((resource, index) => (
          <div key={index} className="bg-white/30 p-6 rounded-lg hover:bg-white/40 transition-colors">
            <div className='flex justify-between items-start mb-3'>
              <h4 className="font-semibold text-[#812094] text-lg">{resource.title}</h4>
              {'genre' in resource && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGenreColor(resource.genre)}`}>
                  {resource.genre}
                </span>
              )}
              {'level' in resource && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(resource.level)}`}>
                  {resource.level}
                </span>
              )}
              {'issue' in resource && (
                <span className="px-2 py-1 rounded-full text-xs font-semibold text-indigo-600 bg-indigo-100">
                  {resource.issue}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
            
            {'author' in resource && (
              <p className="text-xs text-gray-500 mb-2">By: {resource.author}</p>
            )}
            {'instructor' in resource && (
              <p className="text-xs text-gray-500 mb-2">Instructor: {resource.instructor}</p>
            )}
            {'format' in resource && (
              <p className="text-xs text-gray-500 mb-2">Format: {resource.format}</p>
            )}
            {'pages' in resource && (
              <p className="text-xs text-gray-500 mb-2">{resource.pages} pages</p>
            )}
            {'duration' in resource && (
              <p className="text-xs text-gray-500 mb-4">Duration: {resource.duration}</p>
            )}
            
            <button className="w-full bg-gradient-to-r from-[#812094] to-purple-500 text-white font-semibold rounded-lg py-2 hover:from-[#812094] hover:to-purple-600 transition-all flex items-center justify-center space-x-2">
              <FaDownload className="w-4 h-4" />
              <span>Access Resource</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className='p-10 flex flex-col'>
      {/* Header Section */}
      <div className='flex flex-row items-center space-x-3 mb-10'>
        <div className='w-5 h-10 bg-[#7718A6]'></div>
        <h1 className='text-4xl font-bold text-[#7718A6]'>Wordsmith Literature Club</h1>   
      </div>

      {/* Hero Section */}
      <div className='bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white rounded-lg p-10 mb-10'>
        <div className='flex flex-row items-center justify-between'>
          <div className='w-[70%]'>
            <h2 className='text-5xl font-bold mb-4'>Read. Write. Inspire.</h2>
            <p className='text-xl mb-6'>Nurturing literary minds, fostering creativity, and celebrating the power of words through reading, writing, and meaningful discourse.</p>
            <div className='flex space-x-4'>
              <button className='bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2'>
                <FaInstagram />
                <span>Follow Us</span>
              </button>
              <button className='bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors flex items-center space-x-2'>
                <FaNewspaper />
                <span>Read Magazine</span>
              </button>
            </div>
          </div>
          <div className='w-[30%] flex justify-center'>
            <div className='text-8xl'>
              <FaBookOpen />
            </div>
          </div>
        </div>
      </div>

      {/* Notice Board */}
      <div className='w-full bg-white/20 rounded-lg p-10 flex flex-col space-y-5 mb-10'>
        <h2 className='text-center mb-10 font-bold text-3xl text-amber-700'>📚 LITERARY ANNOUNCEMENTS</h2>
        <span className='flex flex-row space-x-5 text-lg'>
          <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>New</p>
          <p className='p-2 font-semibold'>Submissions open for Inkwell Spring 2025 edition - Deadline: July 30th</p>
        </span>
        <span className='flex flex-row space-x-5 text-lg'>
          <p className='bg-green-600 rounded-[40px] p-2 w-16 text-center text-white font-bold text-[16px]'>Live</p>
          <p className='p-2 font-semibold'>Poetry Slam registration ongoing - Weekly eliminations every Friday</p>
        </span>
        <span className='flex flex-row space-x-5 text-lg'>
          <p className='bg-blue-600 rounded-[40px] p-2 w-16 text-center text-white font-bold text-[16px]'>Event</p>
          <p className='p-2 font-semibold'>Book Club reading: "The Seven Husbands of Evelyn Hugo" - Discussion Aug 15</p>
        </span>
        <span className='flex flex-row space-x-5 text-lg'>
          <p className='bg-purple-600 rounded-[40px] p-2 w-16 text-center text-white font-bold text-[16px]'>Meet</p>
          <p className='p-2 font-semibold'>Author Chetan Bhagat visits campus - Interactive session Sept 15</p>
        </span>
      </div>

      {/* Literary Genres Showcase */}
      <div className='bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8 mb-16'>
        <h2 className="text-3xl font-bold text-center mb-8">🎭 Literary Genres We Explore</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center'>
          <div className='flex flex-col items-center space-y-2'>
            <FaBook className='text-4xl text-amber-600' />
            <span className='text-sm font-semibold'>Fiction</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <FaFeatherAlt className='text-4xl text-purple-600' />
            <span className='text-sm font-semibold'>Poetry</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <FaTheaterMasks className='text-4xl text-red-600' />
            <span className='text-sm font-semibold'>Drama</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <FaNewspaper className='text-4xl text-blue-600' />
            <span className='text-sm font-semibold'>Essays</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <MdHistoryEdu className='text-4xl text-green-600' />
            <span className='text-sm font-semibold'>Biography</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <FaScroll className='text-4xl text-orange-600' />
            <span className='text-sm font-semibold'>Classics</span>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <h2 className="text-3xl font-bold text-center mb-12">📖 Literary Resources</h2>
      
      {/* Reading Materials */}
      {renderResourceSection(
        "Reading Materials", 
        <FaBook />, 
        resources.readingMaterials,
        "text-amber-600"
      )}

      {/* Workshops */}
      {renderResourceSection(
        "Writing Workshops", 
        <FaPen />, 
        resources.workshops,
        "text-blue-600"
      )}

      {/* Writing Tools */}
      {renderResourceSection(
        "Writing Tools & Templates", 
        <FaEdit />, 
        resources.writingTools,
        "text-green-600"
      )}

      {/* Publications */}
      {renderResourceSection(
        "Club Publications", 
        <FaNewspaper />, 
        resources.publications,
        "text-indigo-600"
      )}

      {/* Events & Activities */}
      <h2 className="text-3xl font-bold text-center mb-8">🎪 Literary Events</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {events.map((event, index) => (
          <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className='flex justify-between items-start mb-3'>
              <h3 className="font-bold text-gray-800 text-xl">{event.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                event.status === 'completed' ? 'bg-green-100 text-green-800' :
                event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {event.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{event.description}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 mb-4'>
              <span className='flex items-center space-x-1'>
                <FaCalendarAlt />
                <span>{event.date}</span>
              </span>
              <span className='flex items-center space-x-1'>
                <FaUsers />
                <span>{event.participants} participants</span>
              </span>
              <span className='flex items-center space-x-1 md:col-span-2'>
                <FaMapMarkerAlt />
                <span>{event.venue}</span>
              </span>
            </div>
            <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
              {event.status === 'upcoming' ? 'Register Now' : 
               event.status === 'ongoing' ? 'Join Session' : 'View Details'}
            </button>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h2 className="text-3xl font-bold text-center mb-8">🏆 Literary Achievements</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaTrophy className="w-8 h-8 text-yellow-600 mb-3" />
            <h3 className="font-bold text-gray-800 text-xl mb-2">{achievement.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
            <div className='flex justify-between items-center'>
              <div>
                <p className="text-sm font-semibold text-gray-700">{achievement.winner}</p>
                <p className="text-xs text-gray-500">{achievement.category}</p>
              </div>
              <p className="text-sm text-yellow-600 font-bold">{achievement.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Book Recommendations */}
      <h2 className="text-3xl font-bold text-center mb-8">📚 Current Reading List</h2>
      <div className='bg-white/20 rounded-lg p-8 mb-16'>
        <div className='grid md:grid-cols-3 gap-6'>
          <div className='bg-white/40 p-6 rounded-lg text-center'>
            <div className='w-16 h-20 bg-gradient-to-b from-blue-500 to-purple-600 rounded mx-auto mb-4 flex items-center justify-center'>
              <FaBook className='text-white text-2xl' />
            </div>
            <h4 className='font-bold text-lg mb-2'>Book of the Month</h4>
            <p className='text-sm text-gray-600 mb-1'>"The Seven Husbands of Evelyn Hugo"</p>
            <p className='text-xs text-gray-500'>by Taylor Jenkins Reid</p>
          </div>
          <div className='bg-white/40 p-6 rounded-lg text-center'>
            <div className='w-16 h-20 bg-gradient-to-b from-green-500 to-teal-600 rounded mx-auto mb-4 flex items-center justify-center'>
              <FaFeatherAlt className='text-white text-2xl' />
            </div>
            <h4 className='font-bold text-lg mb-2'>Poetry Collection</h4>
            <p className='text-sm text-gray-600 mb-1'>"The Sun and Her Flowers"</p>
            <p className='text-xs text-gray-500'>by Rupi Kaur</p>
          </div>
          <div className='bg-white/40 p-6 rounded-lg text-center'>
            <div className='w-16 h-20 bg-gradient-to-b from-orange-500 to-red-600 rounded mx-auto mb-4 flex items-center justify-center'>
              <FaScroll className='text-white text-2xl' />
            </div>
            <h4 className='font-bold text-lg mb-2'>Classic Pick</h4>
            <p className='text-sm text-gray-600 mb-1'>"To Kill a Mockingbird"</p>
            <p className='text-xs text-gray-500'>by Harper Lee</p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <h2 className="text-3xl font-bold text-center mb-8">📸 Literary Moments</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="bg-white/30 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 h-32 rounded mb-3 flex items-center justify-center">
            <FaMicrophone className="text-white text-3xl" />
          </div>
          <p className="text-center font-semibold">Poetry Slam</p>
        </div>
        <div className="bg-white/30 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-purple-400 to-pink-500 h-32 rounded mb-3 flex items-center justify-center">
            <FaTheaterMasks className="text-white text-3xl" />
          </div>
          <p className="text-center font-semibold">Drama Workshop</p>
        </div>
        <div className="bg-white/30 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-blue-400 to-cyan-500 h-32 rounded mb-3 flex items-center justify-center">
            <FaUsers className="text-white text-3xl" />
          </div>
          <p className="text-center font-semibold">Book Discussion</p>
        </div>
        <div className="bg-white/30 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-green-400 to-teal-500 h-32 rounded mb-3 flex items-center justify-center">
            <FaTrophy className="text-white text-3xl" />
          </div>
          <p className="text-center font-semibold">Award Ceremony</p>
        </div>
      </div>

      {/* Team Section */}
      <h2 className="text-3xl font-bold text-center mb-8">✍️ Meet Our Literary Team</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white/30 p-6 rounded-lg text-center hover:bg-white/40 transition-colors">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FaPen className="text-white text-2xl" />
            </div>
            <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
            <p className="text-amber-600 font-semibold mb-2">{member.role}</p>
            <p className="text-sm text-gray-600 mb-2">{member.specialization}</p>
            <p className="text-xs text-gray-500 mb-4">{member.achievements}</p>
            <div className="flex justify-center space-x-3">
              <a href={member.social.instagram} className="text-pink-600 hover:text-pink-800">
                <FaInstagram className="text-xl" />
              </a>
              <a href={member.social.twitter} className="text-blue-400 hover:text-blue-600">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <h2 className="text-3xl font-bold text-center mb-8">📞 Connect With Us</h2>
      <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Club Coordinator</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Dr. Meera Krishnan</p>
                  <p className="text-sm text-gray-600">Professor of English Literature</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MdOutlineLocalPhone className="w-5 h-5 text-amber-600" />
                <p className="text-gray-700">+91 98765-43210</p>
              </div>
              <div className="flex items-center space-x-3">
                <MdOutlineEmail className="w-5 h-5 text-amber-600" />
                <p className="text-gray-700">literature.club@institute.edu.in</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Meeting Details</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <GrLocation className="w-5 h-5 text-orange-600" />
                <p className="text-gray-700">Room 12, Arts & Humanities Block</p>
              </div>
              <div className="flex items-center space-x-3">
                <SlClock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-gray-700">Regular Meetings: Wed & Fri 5:00 PM - 7:00 PM</p>
                  <p className="text-gray-700">Writing Sessions: Saturdays 2:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiteratureClub;