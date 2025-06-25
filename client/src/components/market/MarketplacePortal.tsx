import { useState } from 'react';
import { FaSearch, FaUpload, FaDownload, FaBook, FaFilePdf, FaFilePowerpoint, FaFileWord, FaUser, FaStar, FaCalendarAlt, FaFilter, FaChalkboardTeacher, FaGraduationCap, FaUniversity, FaClipboardList, FaDiscord, FaTelegram, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';

const MarketplacePortal = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subject: '',
    tags: '',
    description: '',
    contributor: '',
    anonymous: false
  });

  const categories = [
    { id: 'all', name: 'All Resources', icon: FaBook },
    { id: 'notes', name: 'Lecture Notes', icon: FaClipboardList },
    { id: 'papers', name: 'Previous Papers', icon: FaUniversity },
    { id: 'ppts', name: 'Presentations', icon: FaFilePowerpoint },
    { id: 'mcq', name: 'MCQ Banks', icon: FaChalkboardTeacher },
    { id: 'projects', name: 'Projects', icon: FaGraduationCap }
  ];

  const subjects = [
    'Database Systems',
    'Data Structures',
    'Algorithms',
    'Operating Systems',
    'Computer Networks',
    'Artificial Intelligence',
    'Machine Learning',
    'Software Engineering',
    'Discrete Mathematics',
    'Theory of Computation'
  ];

  const resources = [
    {
      id: 1,
      title: 'DBMS Complete Notes - All Units',
      subject: 'Database Systems',
      type: 'notes',
      semester: '4',
      format: 'PDF',
      uploadedBy: 'Rahul Sharma',
      date: '2025-05-15',
      downloads: 124,
      rating: 4.8,
      tags: ['database', 'sql', 'normalization'],
      verified: true
    },
    {
      id: 2,
      title: 'Algorithm Analysis Previous Papers (2019-2024)',
      subject: 'Algorithms',
      type: 'papers',
      semester: '3',
      format: 'PDF',
      uploadedBy: 'Anonymous',
      date: '2025-06-02',
      downloads: 89,
      rating: 4.5,
      tags: ['complexity', 'sorting', 'graphs'],
      verified: false
    },
    {
      id: 3,
      title: 'Operating System Process Scheduling PPT',
      subject: 'Operating Systems',
      type: 'ppts',
      semester: '5',
      format: 'PPTX',
      uploadedBy: 'Priya Patel',
      date: '2025-05-28',
      downloads: 67,
      rating: 4.2,
      tags: ['scheduling', 'deadlock', 'memory'],
      verified: true
    },
    {
      id: 4,
      title: 'Software Engineering MCQ Bank',
      subject: 'Software Engineering',
      type: 'mcq',
      semester: '6',
      format: 'DOCX',
      uploadedBy: 'Amit Kumar',
      date: '2025-06-10',
      downloads: 112,
      rating: 4.7,
      tags: ['sdlc', 'testing', 'uml'],
      verified: false
    },
    {
      id: 5,
      title: 'ML Project Report - Sentiment Analysis',
      subject: 'Machine Learning',
      type: 'projects',
      semester: '7',
      format: 'PDF',
      uploadedBy: 'Neha Gupta',
      date: '2025-05-20',
      downloads: 156,
      rating: 4.9,
      tags: ['nlp', 'python', 'classification'],
      verified: true
    },
    {
      id: 6,
      title: 'Computer Network Layers Summary',
      subject: 'Computer Networks',
      type: 'notes',
      semester: '4',
      format: 'PDF',
      uploadedBy: 'Anonymous',
      date: '2025-06-05',
      downloads: 72,
      rating: 4.3,
      tags: ['tcp-ip', 'osi-model', 'protocols'],
      verified: false
    }
  ];

  const featuredResources = resources.sort((a, b) => b.downloads - a.downloads).slice(0, 3);
  const topContributors = [
    { name: 'Rahul Sharma', uploads: 28, badge: 'gold' },
    { name: 'Priya Patel', uploads: 19, badge: 'silver' },
    { name: 'Amit Kumar', uploads: 15, badge: 'silver' },
    { name: 'Neha Gupta', uploads: 12, badge: 'bronze' }
  ];

  const announcements = [
    {
      title: 'Midterm Exam Resources Drive',
      description: 'Upload your study materials for upcoming midterm exams',
      date: '2025-07-10'
    },
    {
      title: 'New Content Guidelines',
      description: 'Please review our updated file naming conventions',
      date: '2025-06-25'
    },
    {
      title: 'Looking for AI Unit 5 Notes',
      description: 'Help us complete the AI course materials collection',
      date: '2025-06-15'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.type === activeCategory;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log('Upload form submitted:', uploadForm);
    // Reset form
    setUploadForm({
      title: '',
      subject: '',
      tags: '',
      description: '',
      contributor: '',
      anonymous: false
    });
  };

  const getFileIcon = (format: string) => {
    switch(format.toLowerCase()) {
      case 'pdf': return <FaFilePdf className="text-red-500" />;
      case 'pptx': return <FaFilePowerpoint className="text-orange-500" />;
      case 'docx': return <FaFileWord className="text-blue-500" />;
      default: return <FaFilePdf className="text-gray-500" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch(badge) {
      case 'gold': return 'bg-yellow-500 text-white';
      case 'silver': return 'bg-gray-400 text-white';
      case 'bronze': return 'bg-amber-700 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header / Hero Section */}
      <div className="bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <span className='flex justify-center'>
              <img className='w-50' src="/assets/background/VC_Logo.png" alt="Logo" />
            </span>
            <h1 className="text-5xl font-bold mb-4">Student Study Resource Hub</h1>
            <p className="text-xl mb-8">Upload. Share. Learn. Together.</p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-lg p-2 flex items-center shadow-lg">
              <div className="flex items-center flex-1 min-w-0">
                <FaSearch className="text-gray-400 ml-4" />
                <input 
                  type="text" 
                  placeholder="Search resources by title, subject, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 text-gray-700 outline-none rounded"
                />
              </div>
              <button 
                className="bg-purple-600 text-white px-8 py-3 rounded-lg ml-2 hover:bg-purple-700 transition-colors"
              >
                Search
              </button>
            </div>
            
            <div className="mt-6 flex justify-center space-x-4 flex-wrap">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-2">
                <FaUpload className="inline mr-2" />
                Upload Your Notes
              </button>
              <button className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors mb-2">
                <FaSearch className="inline mr-2" />
                Explore Resources
              </button>
            </div>
            
            <p className="mt-4 text-sm opacity-80">📚 500+ resources shared by students</p>
          </div>
        </div>
      </div>

      {/* Announcements Bar */}
      <div className="bg-blue-50 border-b border-blue-200 py-3">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center space-x-6 text-sm flex-wrap">
            <span className="text-blue-800 font-medium">📢 Midterm Exam Resources Drive - Upload your materials!</span>
            <span className="text-blue-800">🔥 New: Faculty verified resources now available</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Resource Categories */}
        <section className="mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md flex-wrap flex">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mb-1 ${
                      activeCategory === category.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🌟 Featured Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-2 border-blue-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <span className="font-medium">{resource.subject}</span>
                      {resource.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <FaStar className="mr-1" /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-2xl">
                    {getFileIcon(resource.format)}
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <FaUser />
                    <span>{resource.uploadedBy}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <FaCalendarAlt />
                    <span>Uploaded: {resource.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Semester: {resource.semester}</span>
                    <span className="text-gray-500">{resource.downloads} downloads</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center space-x-2">
                  <FaDownload className="text-sm" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* All Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📚 All Study Resources</h2>
          
          {/* Filters */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
              <FaFilter className="text-gray-500" />
              <select className="bg-transparent border-none outline-none text-gray-700">
                <option>All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
              <span className="text-gray-500">Sort by:</span>
              <select className="bg-transparent border-none outline-none text-gray-700">
                <option>Most Recent</option>
                <option>Most Downloads</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Resource Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{resource.title}</h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <span className="text-sm">{resource.subject}</span>
                    </div>
                  </div>
                  <div className="text-xl">
                    {getFileIcon(resource.format)}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600 text-xs">
                    <FaUser />
                    <span>{resource.uploadedBy}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-xs">
                    <FaCalendarAlt />
                    <span>{resource.date}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Sem {resource.semester}</span>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{resource.rating}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <FaDownload className="text-sm" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources found matching your criteria.</p>
              <p className="text-gray-400">Try adjusting your search filters.</p>
            </div>
          )}
        </section>

        {/* Upload Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📤 Upload Your Resources</h2>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleUploadSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Resource Title *</label>
                  <input 
                    type="text" 
                    name="title"
                    value={uploadForm.title}
                    onChange={handleUploadChange}
                    placeholder="e.g., DBMS Notes - Unit 2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Subject *</label>
                    <select 
                      name="subject"
                      value={uploadForm.subject}
                      onChange={handleUploadChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    >
                      <option value="">Select a subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Semester</label>
                    <select 
                      name="semester"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>Semester {num}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    name="tags"
                    value={uploadForm.tags}
                    onChange={handleUploadChange}
                    placeholder="e.g., database, sql, normalization"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea 
                    name="description"
                    value={uploadForm.description}
                    onChange={handleUploadChange}
                    rows={3}
                    placeholder="Brief description of what this resource contains..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="contributor"
                    value={uploadForm.contributor}
                    onChange={handleUploadChange}
                    disabled={uploadForm.anonymous}
                    placeholder="Will be displayed as contributor"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
                  />
                  <div className="mt-2 flex items-center">
                    <input 
                      type="checkbox" 
                      id="anonymous"
                      name="anonymous"
                      checked={uploadForm.anonymous}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600">Upload anonymously</label>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload file or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, PPT, DOCX (Max 10MB)</p>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold"
                >
                  Submit Resource
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Top Contributors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🏆 Top Contributors</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {topContributors.map((contributor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {contributor.name.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{contributor.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{contributor.uploads} uploads</p>
                <span className={`text-xs px-3 py-1 rounded-full ${getBadgeColor(contributor.badge)}`}>
                  {contributor.badge === 'gold' ? 'Gold Contributor' : 
                   contributor.badge === 'silver' ? 'Silver Contributor' : 'Bronze Contributor'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Announcements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">📢 Announcements</h2>
          
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
                <div className="flex justify-between items-start flex-wrap">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="font-bold text-lg mb-2 text-blue-800">{announcement.title}</h3>
                    <p className="mb-2 text-blue-700">{announcement.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <FaCalendarAlt />
                      <span>Posted: {announcement.date}</span>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8">
            <h2 className="text-3xl font-bold text-center mb-8">📊 Community Stats</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-200">Study Resources</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2K+</div>
                <div className="text-blue-200">Total Downloads</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">150+</div>
                <div className="text-blue-200">Active Contributors</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4.7★</div>
                <div className="text-blue-200">Average Rating</div>
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
              <h3 className="text-xl font-bold mb-4">Study Resource Hub</h3>
              <p className="text-gray-300 text-sm mb-4">A student-driven platform for sharing knowledge and academic resources to help each other succeed.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaGithub className="text-xl" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FaTelegram className="text-xl" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Browse Resources</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Upload Materials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Top Contributors</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Community Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">Lecture Notes</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Previous Papers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Presentations</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">MCQ Banks</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Project Reports</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact & Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center space-x-2">
                  <FaEnvelope />
                  <span>studyhub@yourcollege.edu</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaDiscord />
                  <span>Join our Discord</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaTelegram />
                  <span>Telegram Channel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketplacePortal;