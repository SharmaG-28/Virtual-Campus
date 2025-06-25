import { useState } from 'react';
import { FaSearch, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaExternalLinkAlt, FaDownload, FaPlay, FaUser, FaLinkedin, FaPhone, FaEnvelope, FaBriefcase, FaFileAlt, FaUsers, FaBell, FaFilter, FaUpload, FaTwitter, FaWhatsapp, FaTelegram, FaVideo, FaBookOpen, FaClipboardList, FaLaptopCode, FaUserTie, FaHandshake } from 'react-icons/fa';

const CareerPortal = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [resourceTab, setResourceTab] = useState('resume');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const jobListings = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      type: "Internship",
      mode: "On-site",
      deadline: "2025-07-15",
      posted: "2 days ago",
      skills: ["React", "Node.js", "Python"],
      link: "#"
    },
    {
      id: 2,
      title: "Data Science Analyst",
      company: "Microsoft",
      location: "Hyderabad, India",
      type: "Full-time",
      mode: "Hybrid",
      deadline: "2025-07-20",
      posted: "1 week ago",
      skills: ["Python", "Machine Learning", "SQL"],
      link: "#"
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Flipkart",
      location: "Remote",
      type: "Internship",
      mode: "Remote",
      deadline: "2025-07-25",
      posted: "3 days ago",
      skills: ["React", "JavaScript", "CSS"],
      link: "#"
    },
    {
      id: 4,
      title: "Product Manager Trainee",
      company: "Amazon",
      location: "Mumbai, India",
      type: "Full-time",
      mode: "On-site",
      deadline: "2025-08-01",
      posted: "5 days ago",
      skills: ["Strategy", "Analytics", "Communication"],
      link: "#"
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "Zomato",
      location: "Gurgaon, India",
      type: "Internship",
      mode: "Hybrid",
      deadline: "2025-07-30",
      posted: "1 day ago",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      link: "#"
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Paytm",
      location: "Noida, India",
      type: "Full-time",
      mode: "On-site",
      deadline: "2025-08-05",
      posted: "4 days ago",
      skills: ["AWS", "Docker", "Kubernetes"],
      link: "#"
    }
  ];

  const resources = {
    resume: [
      {
        title: "Professional Resume Template",
        description: "LaTeX template for tech professionals",
        type: "Template",
        format: "LaTeX/PDF"
      },
      {
        title: "ATS-Friendly Resume Format",
        description: "Canva templates optimized for ATS systems",
        type: "Template",
        format: "Canva"
      },
      {
        title: "Professional Cover Letter Samples",
        description: "Industry-specific cover letter examples",
        type: "Guide",
        format: "PDF"
      },
      {
        title: "Resume Review Checklist",
        description: "Common mistakes and how to avoid them",
        type: "Checklist",
        format: "PDF"
      }
    ],
    roadmaps: [
      {
        title: "Software Developer Roadmap",
        description: "Complete guide from beginner to expert",
        type: "Roadmap",
        format: "PDF"
      },
      {
        title: "Data Science Career Path",
        description: "Step-by-step guide to becoming a data scientist",
        type: "Roadmap",
        format: "PDF"
      },
      {
        title: "Software UI/UX Design Journey",
        description: "From basics to advanced design principles",
        type: "Roadmap",
        format: "PDF"
      },
      {
        title: "MBA Preparation Guide",
        description: "Complete MBA entrance and career guide",
        type: "Guide",
        format: "PDF"
      }
    ],
    videos: [
      {
        title: "Our Alumni Success Stories",
        description: "Hear from seniors placed in top companies",
        type: "Video Series",
        format: "YouTube"
      },
      {
        title: "Google Interview Experience",
        description: "Former student shares interview tips",
        type: "Webinar",
        format: "Video"
      },
      {
        title: "LinkedIn Optimization Workshop",
        description: "Build a professional LinkedIn profile",
        type: "Workshop",
        format: "Video"
      },
      {
        title: "Salary Negotiation Masterclass",
        description: "How to negotiate your first job offer",
        type: "Masterclass",
        format: "Video"
      }
    ]
  };

  const mockTests = [
    {
      title: "Computer based Aptitude Test - Week 1",
      description: "Quantitative, Logical & Verbal Reasoning",
      questions: 50,
      duration: "60 mins"
    },
    {
      title: "Company DSA Coding Challenge",
      description: "DSA problems from top companies",
      questions: 3,
      duration: "90 mins"
    },
    {
      title: "HR Interview Questions",
      description: "Common behavioral interview questions",
      questions: 25,
      duration: "30 mins"
    },
    {
      title: "Group Discussion Topics",
      description: "Current affairs and technical topics",
      questions: 10,
      duration: "20 mins"
    }
  ];

  const successStories = [
    {
      name: "Rahul Sharma",
      company: "Google",
      role: "Software Engineer",
      year: "2024",
      tips: "Focus on DSA and system design. Practice mock interviews regularly.",
      linkedin: "#"
    },
    {
      name: "Priya Patel",
      company: "Microsoft",
      role: "Product Manager",
      year: "2023",
      tips: "Build strong analytical skills and work on real projects with impact.",
      linkedin: "#"
    },
    {
      name: "Arjun Kumar",
      company: "Amazon",
      role: "Data Scientist",
      year: "2024",
      tips: "Master statistics and ML fundamentals. Contribute to open source projects.",
      linkedin: "#"
    }
  ];

  const announcements = [
    {
      title: "Google Summer Internship 2025 Open!",
      description: "Applications open for software engineering roles across India",
      deadline: "July 30, 2025",
      type: "urgent"
    },
    {
      title: "Campus Placement Drive - Week 3",
      description: "15+ companies including Microsoft, Amazon, Flipkart",
      deadline: "August 5, 2025", 
      type: "info"
    },
    {
      title: "Mock Interview Sessions",
      description: "Free mock interviews with industry professionals",
      deadline: "Ongoing",
      type: "event"
    }
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesTab = selectedTab === 'all' || 
      (selectedTab === 'internships' && job.type === 'Internship') ||
      (selectedTab === 'fulltime' && job.type === 'Full-time') ||
      (selectedTab === 'remote' && job.mode === 'Remote');
    
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = location === '' || 
      job.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesTab && matchesSearch && matchesLocation;
  });

  const getTypeColor = (type:any) => {
    return type === 'Internship' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const getAnnouncementColor = (type:any) => {
    switch(type) {
      case 'urgent': return 'bg-red-100 border-red-300 text-red-800';
      case 'info': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'event': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const handleSearch = () => {
    // Search functionality is handled by filteredJobs
    console.log('Searching for:', searchQuery, 'in', location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header / Hero Section */}
      <div className="bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <span className='flex justify-center'>
              <img className='w-50' src="/assets/background/VC_Logo.png" alt="Logo" />
            </span>
            <h1 className="text-5xl font-bold mb-4">Career Portal</h1>
            <p className="text-xl mb-2">Explore | Apply | Grow</p>
            <p className="text-lg mb-8 opacity-90">Internships | Jobs | Roadmaps | Resume Help</p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-2 flex items-center shadow-lg flex-wrap md:flex-nowrap">
              <div className="flex items-center flex-1 min-w-0">
                <FaSearch className="text-gray-400 ml-4" />
                <input 
                  type="text" 
                  placeholder="Search jobs, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 text-gray-700 outline-none rounded"
                />
              </div>
              <input 
                type="text" 
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full md:w-48 px-4 py-3 text-gray-700 outline-none border-l border-gray-200"
              />
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="px-4 py-3 text-gray-600 border-l border-gray-200 hover:bg-gray-50 rounded-r"
              >
                <FaFilter />
              </button>
              <button 
                onClick={handleSearch}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg ml-2 hover:bg-purple-700 transition-colors"
              >
                Search
              </button>
            </div>
            
            <div className="mt-6 flex justify-center space-x-4 flex-wrap">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-2">
                Explore Jobs
              </button>
              <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors mb-2">
                Submit Resume
              </button>
            </div>
            
            <p className="mt-4 text-sm opacity-80">📊 100+ listings updated weekly</p>
          </div>
        </div>
      </div>

      {/* Announcements Bar */}
      <div className="bg-yellow-50 border-b border-yellow-200 py-3">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center space-x-6 text-sm flex-wrap">
            <FaBell className="text-yellow-600" />
            <span className="text-yellow-800 font-medium">🔥 Google Summer Internship 2025 applications open!</span>
            <span className="text-yellow-800">📅 Campus placement drive starts next week</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Job & Internship Listings */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🧳 Job & Internship Listings</h2>
          
          {/* Filter Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md flex-wrap flex">
              {[
                { key: 'all', label: 'All Positions' },
                { key: 'internships', label: 'Internships' },
                { key: 'fulltime', label: 'Full-time' },
                { key: 'remote', label: 'Remote' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-colors mb-1 ${
                    selectedTab === tab.key 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <FaBuilding className="text-sm" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <FaMapMarkerAlt />
                    <span>{job.location} • {job.mode}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <FaCalendarAlt />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                  <div className="text-gray-500 text-xs">Posted {job.posted}</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <span>Apply Now</span>
                  <FaExternalLinkAlt className="text-sm" />
                </button>
              </div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
              <p className="text-gray-400">Try adjusting your search filters.</p>
            </div>
          )}
        </section>

        {/* Career Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📚 Career Resources</h2>
          
          {/* Resource Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md flex-wrap flex">
              {[
                { key: 'resume', label: 'Resume & Cover Letter', icon: FaFileAlt },
                { key: 'roadmaps', label: 'Roadmaps & Guides', icon: FaBookOpen },
                { key: 'videos', label: 'Videos & Talks', icon: FaVideo }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setResourceTab(tab.key)}
                  className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mb-1 ${
                    resourceTab === tab.key 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="text-sm" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Resource Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources[resourceTab].map((resource:any, index:any) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{resource.type}</span>
                  <span className="text-xs text-gray-500">{resource.format}</span>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <FaDownload className="text-sm" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Mock Tests & Prep */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🧪 Mock Tests & Prep Materials</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTests.map((test, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{test.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Questions:</span>
                    <span className="font-semibold">{test.questions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-semibold">{test.duration}</span>
                  </div>
                </div>
                <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2">
                  <FaPlay className="text-sm" />
                  <span>Start Test</span>
                </button>
              </div>
            ))}
          </div>

          {/* Daily Challenge */}
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">💡 Daily Challenge</h3>
            <p className="text-gray-600 mb-4">Implement a Binary Search Tree with insertion and deletion operations</p>
            <div className="flex justify-center space-x-4 flex-wrap">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors mb-2">
                View Problem
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-2">
                Submit Solution
              </button>
            </div>
          </div>
        </section>

        {/* Submit Resume Form */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📝 Submit Resume</h2>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <FaFileAlt className="text-2xl text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Resume Review</h3>
                <p className="text-sm text-gray-600">Get feedback from experts</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <FaUsers className="text-2xl text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Referral Pool</h3>
                <p className="text-sm text-gray-600">Join our referral network</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <FaBriefcase className="text-2xl text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Internal Hiring</h3>
                <p className="text-sm text-gray-600">Club positions & projects</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" />
                <input type="email" placeholder="Email Address" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" />
              </div>
              <input type="url" placeholder="LinkedIn Profile URL" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" />
              <textarea placeholder="Key Skills (comma separated)" rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"></textarea>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload resume or drag and drop</p>
                <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-semibold">
                Submit Resume
              </button>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🏆 Alumni & Success Stories</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.role} at {story.company}</p>
                    <p className="text-xs text-gray-500">Class of {story.year}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 italic">"{story.tips}"</p>
                <a href={story.linkedin} className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm">
                  <FaLinkedin />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Announcements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📢 Announcements & Deadlines</h2>
          
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className={`border-l-4 rounded-lg p-6 ${getAnnouncementColor(announcement.type)}`}>
                <div className="flex justify-between items-start flex-wrap">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="font-bold text-lg mb-2">{announcement.title}</h3>
                    <p className="mb-2">{announcement.description}</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <FaCalendarAlt />
                      <span>Deadline: {announcement.deadline}</span>
                    </div>
                  </div>
                  <button className="bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Downloads Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📥 Downloads</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Resume Formats", desc: "Professional templates", icon: FaFileAlt },
              { title: "Placement Handbook", desc: "Complete placement guide", icon: FaBookOpen },
              { title: "GD/PI Checklist", desc: "Group discussion tips", icon: FaClipboardList },
              { title: "Off-campus Guide", desc: "Self-placement strategies", icon: FaLaptopCode }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
                <item.icon className="text-3xl text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                  <FaDownload className="text-sm" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Contacts / Club Panel */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">👥 Contact & Support</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <FaUserTie className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Placement Coordinator</h3>
              <p className="text-gray-600 text-sm mb-3">Dr. Rajesh Kumar</p>
              <div className="space-y-2">
                <a href="mailto:placement@college.edu" className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 text-sm">
                  <FaEnvelope />
                  <span>placement@college.edu</span>
                </a>
                <a href="tel:+919876543210" className="flex items-center justify-center space-x-2 text-green-600 hover:text-green-800 text-sm">
                  <FaPhone />
                  <span>+91 98765 43210</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <FaUsers className="text-3xl text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Career Club Lead</h3>
              <p className="text-gray-600 text-sm mb-3">Ananya Sharma</p>
              <div className="space-y-2">
                <a href="#" className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 text-sm">
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center justify-center space-x-2 text-green-600 hover:text-green-800 text-sm">
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <FaHandshake className="text-3xl text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">T&P Cell</h3>
              <p className="text-gray-600 text-sm mb-3">Training & Placement</p>
              <div className="space-y-2">
                <a href="mailto:tnp@college.edu" className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 text-sm">
                  <FaEnvelope />
                  <span>tnp@college.edu</span>
                </a>
                <a href="#" className="flex items-center justify-center space-x-2 text-blue-400 hover:text-blue-600 text-sm">
                  <FaTwitter />
                  <span>@CollegeTnP</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
              <FaTelegram className="text-3xl text-blue-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 mb-2">Join Groups</h3>
              <p className="text-gray-600 text-sm mb-3">Stay Updated</p>
              <div className="space-y-2">
                <a href="#" className="flex items-center justify-center space-x-2 text-green-600 hover:text-green-800 text-sm">
                  <FaWhatsapp />
                  <span>WhatsApp Group</span>
                </a>
                <a href="#" className="flex items-center justify-center space-x-2 text-blue-500 hover:text-blue-700 text-sm">
                  <FaTelegram />
                  <span>Telegram Channel</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white p-8">
            <h2 className="text-3xl font-bold text-center mb-8">📊 Quick Stats</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">150+</div>
                <div className="text-purple-100">Active Job Listings</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">85%</div>
                <div className="text-purple-100">Placement Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-purple-100">Partner Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">12 LPA</div>
                <div className="text-purple-100">Average Package</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Career Portal</h3>
              <p className="text-gray-300 text-sm mb-4">Empowering students with career opportunities and guidance for a successful future.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaTelegram className="text-xl" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#jobs" className="text-gray-300 hover:text-white">Job Listings</a></li>
                <li><a href="#resources" className="text-gray-300 hover:text-white">Career Resources</a></li>
                <li><a href="#tests" className="text-gray-300 hover:text-white">Mock Tests</a></li>
                <li><a href="#alumni" className="text-gray-300 hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Resume Templates</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Interview Prep</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Coding Practice</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Placement Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center space-x-2">
                  <FaEnvelope />
                  <span>placement@college.edu</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaPhone />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaMapMarkerAlt />
                  <span>College Campus, City</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareerPortal;