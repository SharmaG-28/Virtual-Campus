import React, { useState } from 'react';
import { FaCode, FaRobot, FaGithub, FaDiscord, FaLinkedin, FaInstagram,FaDownload,FaPlay,FaTrophy,FaCalendarAlt,FaUsers,FaLaptopCode,FaBookOpen,FaTools,FaMicrophone,FaProjectDiagram,FaMapMarkerAlt,FaEnvelope,FaPhone } from 'react-icons/fa';
import { SiJavascript, SiPython, SiReact, SiNodedotjs, SiMongodb,SiDocker,SiKubernetes,SiTensorflow } from 'react-icons/si';

const TechClub: React.FC = () => {
  const resources = {
    study: [
      {
        title: "DSA Master Sheet",
        description: "Complete Data Structures & Algorithms roadmap",
        difficulty: "intermediate",
        type: "PDF",
        link: "#"
      },
      {
        title: "Web Development Bootcamp",
        description: "Full-stack development notes & projects",
        difficulty: "beginner",
        type: "GitHub",
        link: "#"
      },
      {
        title: "Machine Learning Fundamentals",
        description: "ML algorithms with Python implementations",
        difficulty: "advanced",
        type: "PDF",
        link: "#"
      },
      {
        title: "System Design Primer",
        description: "Scalable system architecture concepts",
        difficulty: "advanced",
        type: "GitHub",
        link: "#"
      }
    ],
    tutorials: [
      {
        title: "React Masterclass",
        description: "Complete React development series",
        difficulty: "intermediate",
        type: "Video",
        duration: "8 hours"
      },
      {
        title: "Git & GitHub Workshop",
        description: "Version control essentials",
        difficulty: "beginner",
        type: "Video",
        duration: "2 hours"
      },
      {
        title: "Docker & DevOps",
        description: "Containerization and CI/CD",
        difficulty: "advanced",
        type: "Video",
        duration: "6 hours"
      }
    ],
    tools: [
      {
        title: "Developer Resume Template",
        description: "LaTeX & Canva templates for tech resumes",
        difficulty: "beginner",
        type: "Template"
      },
      {
        title: "Hackathon Starter Pack",
        description: "MERN stack boilerplate codes templates with auth",
        difficulty: "intermediate",
        type: "GitHub"
      },
      {
        title: "VS Code Extensions Pack",
        description: "Essential extensions for developers to make their work easy",
        difficulty: "beginner",
        type: "List"
      }
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description: "Full-stack marketplace with payment integration",
        difficulty: "advanced",
        type: "Project",
        tech: ["React", "Node.js", "MongoDB"]
      },
      {
        title: "Weather App",
        description: "Real-time weather data with geolocation and region",
        difficulty: "beginner",
        type: "Project",
        tech: ["HTML", "CSS", "JavaScript"]
      },
      {
        title: "AI Chatbot",
        description: "NLP-powered conversational assistant like Alexa, Siri",
        difficulty: "advanced",
        type: "Project",
        tech: ["Python", "TensorFlow", "Flask"]
      }
    ]
  };

  const events = [
    {
      title: "HackFest Hackathon 2025",
      date: "July 15-17, 2025",
      description: "48-hour hackathon with industry mentors and experts",
      status: "upcoming",
      participants: 150
    },
    {
      title: "AI/ML Workshop Series",
      date: "August 10, 2025",
      description: "Introduction to Machine Learning with Python",
      status: "upcoming",
      participants: 80
    },
    {
      title: "Open Source Contribution Drive",
      date: "May 1-31, 2024",
      description: "Month-long open source project contributions",
      status: "ongoing",
      participants: 45
    }
  ];

  const achievements = [
    {
      title: "Smart India Hackathon Winner",
      description: "AI-powered traffic management system",
      year: "2024",
      team: "Team CodeCraft"
    },
    {
      title: "Google Summer of Code",
      description: "3 students selected for GSoC 2024",
      year: "2024",
      team: "Individual Contributors"
    },
    {
      title: "Inter-College Coding Contest",
      description: "First place in algorithmic programming",
      year: "2023",
      team: "Team Alpha"
    }
  ];

  const teamMembers = [
    {
      name: "Arjun Patel",
      role: "President",
      skills: "Full-stack Development, DevOps",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Priya Sharma",
      role: "Vice President",
      skills: "AI, Machine Learning, Data Science",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Rohit Kumar",
      role: "Technical Lead",
      skills: "System Design, Cloud Computing",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Sneha Reddy",
      role: "Event Coordinator",
      skills: "Project Management, UI/UX, Frontend",
      linkedin: "#",
      github: "#"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderResourceSection = (title: string, icon: React.ReactNode, resourceList: any[]) => (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center space-x-3">
        {icon}
        <span>{title}</span>
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceList.map((resource, index) => (
          <div key={index} className="bg-white/30 p-6 rounded-lg hover:bg-white/40 transition-colors">
            <div className='flex justify-between items-start mb-3'>
              <h4 className="font-semibold text-[#812094] text-lg">{resource.title}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
            {'tech' in resource && (
              <div className='flex flex-wrap gap-1 mb-4'>
                {resource.tech?.map((tech: string, i: number) => (
                  <span key={i} className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'>
                    {tech}
                  </span>
                ))}
              </div>
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
        <h1 className='text-4xl font-bold text-[#7718A6]'>CodeCraft Technical Club</h1>   
      </div>

      {/* Hero Section */}
      <div className='bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white rounded-lg p-10 mb-10'>
        <div className='flex flex-row items-center justify-between'>
          <div className='w-[70%]'>
            <h2 className='text-5xl font-bold mb-4'>Code. Build. Innovate.</h2>
            <p className='text-xl mb-6'>Empowering students through technology, fostering innovation, and building the next generation of tech leaders.</p>
            <div className='flex space-x-4'>
              <button className='bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2'>
                <FaDiscord />
                <span>Join Discord</span>
              </button>
              <button className='bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors flex items-center space-x-2'>
                <FaGithub />
                <span>GitHub Org</span>
              </button>
            </div>
          </div>
          <div className='w-[30%] flex justify-center'>
            <div className='text-8xl'>
              <FaLaptopCode />
            </div>
          </div>
        </div>
      </div>

      {/* Notice Board */}
      <div className='w-full bg-white/20 rounded-lg p-10 flex flex-col space-y-5 mb-10'>
        <h2 className='text-center mb-10 font-bold text-3xl text-amber-700'>📢 ANNOUNCEMENTS</h2>
        <span className='flex flex-row space-x-5 text-lg'>
          <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>New</p>
          <p className='p-2 font-semibold'>Google Summer of Code 2024 applications open - Mentorship available!</p>
        </span>
        <span className='flex flex-row space-x-5 text-lg'>
          <p className='bg-red-600 rounded-[40px] p-2 w-16 text-center text-yellow-400 font-bold text-[16px]'>Hot</p>
          <p className='p-2 font-semibold'>AI/ML Workshop Series starts April 10th - Register now!</p>
        </span>
        <span className='flex flex-row space-x-5 text-lg'>
          <p className='bg-green-600 rounded-[40px] p-2 w-16 text-center text-white font-bold text-[16px]'>Live</p>
          <p className='p-2 font-semibold'>Open Source Contribution Drive ongoing - 50+ repositories available</p>
        </span>
        <span className='flex flex-row space-x-5 text-lg'>
          <p className='bg-blue-600 rounded-[40px] p-2 w-16 text-center text-white font-bold text-[16px]'>Info</p>
          <p className='p-2 font-semibold'>Tech interview preparation sessions every weekend</p>
        </span>
      </div>

      {/* Resources Section */}
      <h2 className="text-3xl font-bold text-center mb-12">📚 Resources Hub</h2>
      
      {/* Study Materials */}
      {renderResourceSection(
        "Study Materials", 
        <FaBookOpen className="text-purple-600" />, 
        resources.study
      )}

      {/* Tutorials */}
      {renderResourceSection(
        "Tutorials", 
        <FaPlay className="text-blue-600" />, 
        resources.tutorials
      )}

      {/* Tools & Templates */}
      {renderResourceSection(
        "Tools & Templates", 
        <FaTools className="text-green-600" />, 
        resources.tools
      )}

      {/* Project Ideas */}
      {renderResourceSection(
        "Project Ideas", 
        <FaProjectDiagram className="text-orange-600" />, 
        resources.projects
      )}

      {/* Events & Workshops */}
      <h2 className="text-3xl font-bold text-center mb-8">🚀 Events & Workshops</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {events.map((event, index) => (
          <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
            <div className='flex items-center space-x-4 text-sm text-gray-500 mb-4'>
              <span className='flex items-center space-x-1'>
                <FaCalendarAlt />
                <span>{event.date}</span>
              </span>
              <span className='flex items-center space-x-1'>
                <FaUsers />
                <span>{event.participants} participants</span>
              </span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {event.status === 'upcoming' ? 'Register Now' : 'View Details'}
            </button>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h2 className="text-3xl font-bold text-center mb-8">🏆 Hall of Fame</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <FaTrophy className="w-8 h-8 text-yellow-600 mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">{achievement.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
            <div className='flex justify-between items-center'>
              <p className="text-sm text-gray-500">{achievement.team}</p>
              <p className="text-xs text-yellow-600 font-semibold">{achievement.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <h2 className="text-3xl font-bold text-center mb-8">⚡ Technologies We Work With</h2>
      <div className='bg-white/20 rounded-lg p-8 mb-16'>
        <div className='grid grid-cols-4 md:grid-cols-8 gap-6 text-center'>
          <div className='flex flex-col items-center space-y-2'>
            <SiJavascript className='text-4xl text-yellow-500' />
            <span className='text-sm font-semibold'>JavaScript</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <SiPython className='text-4xl text-blue-500' />
            <span className='text-sm font-semibold'>Python</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <SiReact className='text-4xl text-cyan-500' />
            <span className='text-sm font-semibold'>React</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <SiNodedotjs className='text-4xl text-green-500' />
            <span className='text-sm font-semibold'>Node.js</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <SiMongodb className='text-4xl text-green-600' />
            <span className='text-sm font-semibold'>MongoDB</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <SiDocker className='text-4xl text-blue-600' />
            <span className='text-sm font-semibold'>Docker</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <SiKubernetes className='text-4xl text-blue-700' />
            <span className='text-sm font-semibold'>Kubernetes</span>
          </div>
          <div className='flex flex-col items-center space-y-2'>
            <SiTensorflow className='text-4xl text-orange-500' />
            <span className='text-sm font-semibold'>TensorFlow</span>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <h2 className="text-3xl font-bold text-center mb-8">📸 Club Moments</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="bg-white/30 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-purple-400 to-blue-500 h-32 rounded mb-3 flex items-center justify-center">
            <FaCode className="text-white text-3xl" />
          </div>
          <p className="text-center font-semibold">Hackathon 2024</p>
        </div>
        <div className="bg-white/30 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-green-400 to-blue-500 h-32 rounded mb-3 flex items-center justify-center">
            <FaRobot className="text-white text-3xl" />
          </div>
          <p className="text-center font-semibold">Robotics Workshop</p>
        </div>
        <div className="bg-white/30 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-orange-400 to-red-500 h-32 rounded mb-3 flex items-center justify-center">
            <FaMicrophone className="text-white text-3xl" />
          </div>
          <p className="text-center font-semibold">Tech Talks</p>
        </div>
        <div className="bg-white/30 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-pink-400 to-purple-500 h-32 rounded mb-3 flex items-center justify-center">
            <FaTrophy className="text-white text-3xl" />
          </div>
          <p className="text-center font-semibold">Awards Ceremony</p>
        </div>
      </div>

      {/* Team Section */}
      <h2 className="text-3xl font-bold text-center mb-8">👥 Meet Our Team</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white/30 p-6 rounded-lg text-center hover:bg-white/40 transition-colors">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <FaUsers className="text-white text-2xl" />
            </div>
            <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
            <p className="text-purple-600 font-semibold mb-2">{member.role}</p>
            <p className="text-sm text-gray-600 mb-4">{member.skills}</p>
            <div className="flex justify-center space-x-3">
              <a href={member.linkedin} className="text-blue-600 hover:text-blue-800">
                <FaLinkedin className="text-xl" />
              </a>
              <a href={member.github} className="text-gray-800 hover:text-black">
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <h2 className="text-3xl font-bold text-center mb-8">📞 Get In Touch</h2>
      <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Club Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-purple-600" />
                <p className="text-gray-700">Room 204, Computer Science Block</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-purple-600" />
                <p className="text-gray-700">codecraft@institute.edu.in</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-purple-600" />
                <p className="text-gray-700">+91 98765-43210</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors">
                <FaDiscord className="text-xl" />
              </a>
              <a href="#" className="bg-gray-800 text-white p-3 rounded-lg hover:bg-black transition-colors">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
            </div>
            <p className="text-sm text-gray-600">
              Meeting Hours: Mon-Fri 6:00 PM - 8:00 PM<br />
              Workshop Sessions: Weekends 10:00 AM - 4:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechClub;