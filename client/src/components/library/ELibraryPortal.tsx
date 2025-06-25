import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaBook, FaFileAlt, FaFilePdf, FaSearch, FaUpload, FaHome, FaInfoCircle, FaNewspaper, FaProjectDiagram, FaCalendarAlt, FaDownload, FaExternalLinkAlt, FaStar, } from 'react-icons/fa';

// Types and Data
type Resource = {
  id: number;
  title: string;
  author?: string;
  category: string;
  subject: string;
  semester?: string;
  year?: string;
  dateAdded: string;
  downloads: number;
  type: 'book' | 'note' | 'paper' | 'project' | 'magazine';
  fileUrl: string;
  externalLink?: string;
  tags?: string[];
  rating?: number;
};

const resources: Resource[] = [
  {
    id: 1,
    title: 'Introduction to Algorithms',
    author: 'Cormen, Leiserson, Rivest, Stein',
    category: 'Computer Science',
    subject: 'Algorithms',
    semester: '4',
    dateAdded: '2025-05-10',
    downloads: 245,
    type: 'book',
    fileUrl: '#',
    externalLink: 'https://example.com',
    rating: 4.8
  },
  {
    id: 2,
    title: 'DBMS Complete Notes',
    category: 'Computer Science',
    subject: 'Database Systems',
    semester: '3',
    dateAdded: '2025-06-05',
    downloads: 189,
    type: 'note',
    fileUrl: '#',
    tags: ['sql', 'normalization', 'transactions']
  },
  {
    id: 3,
    title: 'Operating Systems 2024 Endsem',
    category: 'Computer Science',
    subject: 'Operating Systems',
    semester: '5',
    year: '2024',
    dateAdded: '2025-05-22',
    downloads: 132,
    type: 'paper',
    fileUrl: '#'
  },
  {
    id: 4,
    title: 'E-Commerce Platform Project',
    category: 'Web Development',
    subject: 'Software Engineering',
    semester: '6',
    dateAdded: '2025-06-12',
    downloads: 98,
    type: 'project',
    fileUrl: '#',
    externalLink: 'https://github.com/example/ecommerce',
    tags: ['react', 'nodejs', 'mongodb']
  },
  {
    id: 5,
    title: 'CS Department Magazine - Spring 2025',
    category: 'Magazine',
    subject: 'Computer Science',
    dateAdded: '2025-04-15',
    downloads: 76,
    type: 'magazine',
    fileUrl: '#'
  },
  {
    id: 6,
    title: 'Computer Networks Textbook',
    author: 'Andrew S. Tanenbaum',
    category: 'Computer Science',
    subject: 'Computer Networks',
    semester: '4',
    dateAdded: '2025-03-18',
    downloads: 210,
    type: 'book',
    fileUrl: '#',
    rating: 4.6
  }
];

const announcements = [
  {
    id: 1,
    title: 'New Syllabus PDFs Added',
    content: 'Updated syllabus documents for all semesters are now available',
    date: '2025-06-20'
  },
  {
    id: 2,
    title: 'Library Week Events',
    content: 'Join us for special events from July 1-7, 2025',
    date: '2025-06-15'
  },
  {
    id: 3,
    title: 'Summer Reading Challenge',
    content: 'Read 5 books this summer and win prizes!',
    date: '2025-06-10'
  }
];

// Components
const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-[#7718A6] shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
            Virtual Campus E-Library
          </Link>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 ${location.pathname === '/' ? 'text-yellow-300' : 'hover:text-yellow-200'}`}
            >
              <FaHome />
              <span>Home</span>
            </Link>
            <Link 
              to="/books" 
              className={`flex items-center space-x-2 ${location.pathname === '/books' ? 'text-yellow-300' : 'hover:text-yellow-200'}`}
            >
              <FaBook />
              <span>Books</span>
            </Link>
            <Link 
              to="/notes" 
              className={`flex items-center space-x-2 ${location.pathname === '/notes' ? 'text-yellow-300' : 'hover:text-yellow-200'}`}
            >
              <FaFileAlt />
              <span>Notes</span>
            </Link>
            <Link 
              to="/papers" 
              className={`flex items-center space-x-2 ${location.pathname === '/papers' ? 'text-yellow-300' : 'hover:text-yellow-200'}`}
            >
              <FaFilePdf />
              <span>Papers</span>
            </Link>
            <Link 
              to="/projects" 
              className={`flex items-center space-x-2 ${location.pathname === '/projects' ? 'text-yellow-300' : 'hover:text-yellow-200'}`}
            >
              <FaProjectDiagram />
              <span>Projects</span>
            </Link>
            <Link 
              to="/magazines" 
              className={`flex items-center space-x-2 ${location.pathname === '/magazines' ? 'text-yellow-300' : 'hover:text-yellow-200'}`}
            >
              <FaNewspaper />
              <span>Magazines</span>
            </Link>
            <Link 
              to="/upload" 
              className={`flex items-center space-x-2 ${location.pathname === '/upload' ? 'text-yellow-300' : 'hover:text-yellow-200'}`}
            >
              <FaUpload />
              <span>Upload</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
  const trendingResources = [...resources].sort((a, b) => b.downloads - a.downloads).slice(0, 4);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <span className='flex justify-center'>
          <img className='w-64' src="/assets/background/VC_Logo.png" alt="Logo" />
        </span>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Virtual Campus E-Library</h1>
        <p className="text-xl text-gray-600 italic">"A room without books is like a body without a soul."</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link 
          to="/books" 
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center border-2 border-blue-100"
        >
          <FaBook className="text-4xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Books</h3>
          <p className="text-gray-600">Explore our eBook collection</p>
        </Link>
        <Link 
          to="/notes" 
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center border-2 border-green-100"
        >
          <FaFileAlt className="text-4xl text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Notes</h3>
          <p className="text-gray-600">Class notes by subject</p>
        </Link>
        <Link 
          to="/papers" 
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center border-2 border-purple-100"
        >
          <FaFilePdf className="text-4xl text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Papers</h3>
          <p className="text-gray-600">Previous year question papers</p>
        </Link>
        <Link 
          to="/upload" 
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center border-2 border-orange-100"
        >
          <FaUpload className="text-4xl text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Upload</h3>
          <p className="text-gray-600">Contribute to our library</p>
        </Link>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Trending Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📢 Announcements</h2>
        <div className="bg-blue-50 rounded-lg p-6">
          {announcements.map(announcement => (
            <div key={announcement.id} className="mb-4 pb-4 border-b border-blue-100 last:border-0 last:mb-0 last:pb-0">
              <h3 className="text-lg font-bold text-blue-800">{announcement.title}</h3>
              <p className="text-blue-700 mb-2">{announcement.content}</p>
              <p className="text-sm text-blue-600">{announcement.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BooksPage = () => {
  const [filter, setFilter] = useState({
    stream: '',
    semester: '',
    subject: ''
  });

  const books = resources.filter(r => r.type === 'book');

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📚 Books Section</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Stream</label>
            <select 
              value={filter.stream}
              onChange={(e) => setFilter({...filter, stream: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Streams</option>
              <option value="Engineering">Engineering</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Semester</label>
            <select 
              value={filter.semester}
              onChange={(e) => setFilter({...filter, semester: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Subject</label>
            <select 
              value={filter.subject}
              onChange={(e) => setFilter({...filter, subject: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Subjects</option>
              {Array.from(new Set(books.map(b => b.subject))).map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <ResourceCard key={book.id} resource={book} />
        ))}
      </div>

      <div className="mt-8 bg-gray-100 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">External Free Libraries</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="https://www.pdfdrive.com/" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center">
            <FaExternalLinkAlt className="text-blue-500 mr-3" />
            <span>PDF Drive - Free eBooks</span>
          </a>
          <a href="https://archive.org/" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center">
            <FaExternalLinkAlt className="text-blue-500 mr-3" />
            <span>Internet Archive</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const NotesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const notes = resources.filter(r => r.type === 'note');

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📝 Class Notes</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes by title, subject, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <select className="p-2 border border-gray-300 rounded">
              <option>Sort by: Most Recent</option>
              <option>Sort by: Most Downloads</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Top Notes of the Month</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.slice(0, 3).map(note => (
            <ResourceCard key={note.id} resource={note} featured />
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">All Notes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <ResourceCard key={note.id} resource={note} />
        ))}
      </div>
    </div>
  );
};

const PapersPage = () => {
  const [filters, setFilters] = useState({
    year: '',
    subject: '',
    semester: '',
    examType: ''
  });

  const papers = resources.filter(r => r.type === 'paper');

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📄 Previous Year Papers</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Year</label>
            <select 
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Subject</label>
            <select 
              value={filters.subject}
              onChange={(e) => setFilters({...filters, subject: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Subjects</option>
              {Array.from(new Set(papers.map(p => p.subject))).map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Semester</label>
            <select 
              value={filters.semester}
              onChange={(e) => setFilters({...filters, semester: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Exam Type</label>
            <select 
              value={filters.examType}
              onChange={(e) => setFilters({...filters, examType: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Types</option>
              <option value="Midsem">Midsem</option>
              <option value="Endsem">Endsem</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map(paper => (
          <ResourceCard key={paper.id} resource={paper} />
        ))}
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const projects = resources.filter(r => r.type === 'project');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => 
        (activeCategory === 'tech' && project.category.toLowerCase().includes('tech')) ||
        (activeCategory === 'non-tech' && !project.category.toLowerCase().includes('tech'))
      );

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">💡 Project Reports</h1>
      
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-md flex">
          {['all', 'tech', 'non-tech'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'All Projects' : 
               category === 'tech' ? 'Technical' : 'Non-Technical'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ResourceCard key={project.id} resource={project} />
        ))}
      </div>
    </div>
  );
};

const MagazinesPage = () => {
  const magazines = resources.filter(r => r.type === 'magazine');

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📰 Department/Club Magazines</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {magazines.map(magazine => (
          <ResourceCard key={magazine.id} resource={magazine} />
        ))}
      </div>
    </div>
  );
};

const UploadPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'book',
    subject: '',
    description: '',
    contributor: '',
    anonymous: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle upload logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      title: '',
      category: 'book',
      subject: '',
      description: '',
      contributor: '',
      anonymous: false
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📤 Upload Resources</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="book">Book</option>
                  <option value="note">Note</option>
                  <option value="paper">Paper</option>
                  <option value="project">Project</option>
                  <option value="magazine">Magazine</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                name="contributor"
                value={formData.contributor}
                onChange={handleChange}
                disabled={formData.anonymous}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
              />
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="anonymous" className="text-gray-600">Upload anonymously</label>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Click to upload file or drag and drop</p>
              <p className="text-sm text-gray-500">PDF, DOCX (Max 10MB)</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Upload Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">ℹ️ About E-Library</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Purpose</h2>
          <p className="text-gray-700 mb-6">
            The College E-Library is a student-driven initiative to promote knowledge sharing and peer support. 
            Our mission is to create a centralized repository of academic resources that helps students excel in 
            their studies and research.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Team</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Dr. Priya Sharma</h3>
              <p className="text-gray-600">Faculty Advisor</p>
              <p className="text-sm text-gray-500">psharma@college.edu</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Rahul Verma</h3>
              <p className="text-gray-600">Student Coordinator</p>
              <p className="text-sm text-gray-500">rahul.v@college.edu</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea rows={4} className="w-full p-3 border border-gray-300 rounded-lg"></textarea>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </form>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">FAQs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-800">How can I contribute resources?</h3>
              <p className="text-gray-700">Use the Upload section to share your notes, papers, or other academic materials.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Are there any restrictions on file types?</h3>
              <p className="text-gray-700">We accept PDF, DOCX, and PPT files up to 10MB in size.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Can I upload anonymously?</h3>
              <p className="text-gray-700">Yes, you can choose to upload anonymously in the upload form.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourceCard = ({ resource, featured = false }: { resource: Resource, featured?: boolean }) => {
  const getIcon = () => {
    switch(resource.type) {
      case 'book': return <FaBook className="text-blue-500" />;
      case 'note': return <FaFileAlt className="text-green-500" />;
      case 'paper': return <FaFilePdf className="text-purple-500" />;
      case 'project': return <FaProjectDiagram className="text-orange-500" />;
      case 'magazine': return <FaNewspaper className="text-red-500" />;
      default: return <FaFileAlt className="text-gray-500" />;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 ${featured ? 'border-2 border-yellow-300' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className={`font-bold ${featured ? 'text-xl' : 'text-lg'} text-gray-800 mb-2`}>{resource.title}</h3>
          {resource.author && (
            <p className="text-gray-600 text-sm mb-2">by {resource.author}</p>
          )}
        </div>
        <div className="text-2xl">
          {getIcon()}
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <span className="font-medium">{resource.subject}</span>
          {resource.semester && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Sem {resource.semester}</span>
          )}
        </div>
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <FaCalendarAlt />
          <span>Added: {resource.dateAdded}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <FaDownload />
          <span>{resource.downloads} downloads</span>
        </div>
        {resource.rating && (
          <div className="flex items-center space-x-2 text-gray-600 text-sm">
            <FaStar className="text-yellow-400" />
            <span>{resource.rating}/5.0</span>
          </div>
        )}
      </div>

      {resource.tags && resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex space-x-3">
        <a 
          href={resource.fileUrl} 
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <FaDownload />
          <span>Download</span>
        </a>
        {resource.externalLink && (
          <a 
            href={resource.externalLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-200 text-gray-800 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
  );
};

// Main App Component
const ELibraryApp = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/papers" element={<PapersPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/magazines" element={<MagazinesPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default ELibraryApp;