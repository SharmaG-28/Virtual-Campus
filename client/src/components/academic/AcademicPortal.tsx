import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaCalendarAlt, FaFileAlt, FaUserTie, FaIdCard, FaBullhorn, FaQuestionCircle, FaChartBar, FaSearch, FaDownload, FaEnvelope, FaPhone, FaClock, FaUniversity, FaClipboardCheck, } from 'react-icons/fa';

// Global Data (moved here for central management, could be fetched from API in real app)
// Types
type Announcement = {
  id: number;
  title: string;
  content: string;
  date: string;
  category: 'academic' | 'exam' | 'holiday' | 'event';
};

type FacultyMember = {
  id: number;
  name: string;
  designation: string;
  department: string;
  subjects: string[];
  email: string;
  phone: string;
  officeHours: string;
  cabin: string;
  photo?: string;
};

type DocumentRequestType = {
  id: number;
  name: string;
  description: string;
  processingTime: string;
  fee?: number;
};

type SyllabusType = {
  id: number;
  subject: string;
  code: string;
  semester: number;
  department: string;
  credits: number;
  facultyInCharge: string;
  fileUrl: string;
};

type TimetableType = {
  id: number;
  title: string;
  type: 'class' | 'exam';
  semester: number;
  department: string;
  startDate: string;
  endDate?: string;
  fileUrl: string;
};

type ResultType = {
  id: number;
  title: string;
  semester: number;
  datePublished: string;
  fileUrl: string;
};

// Sample Data
const announcements: Announcement[] = [
  {
    id: 1,
    title: 'End-semester Exam Schedule Released',
    content: 'The schedule for end-semester exams has been published for all semesters',
    date: '2025-06-20',
    category: 'exam'
  },
  {
    id: 2,
    title: 'Summer Vacation Dates Announced',
    content: 'College will remain closed from May 15 to June 30 for summer vacation',
    date: '2025-06-15',
    category: 'holiday'
  },
  {
    id: 3,
    title: 'New Electives Added for Semester 5',
    content: 'Check the updated list of electives available for semester 5 students',
    date: '2025-06-10',
    category: 'academic'
  },
  {
    id: 4,
    title: 'Annual Tech Fest 2025',
    content: 'Get ready for the biggest tech event of the year! Registrations open soon.',
    date: '2025-07-01',
    category: 'event'
  }
];

const facultyMembers: FacultyMember[] = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    designation: 'Professor',
    department: 'Computer Science',
    subjects: ['Algorithms', 'Data Structures'],
    email: 'priya.sharma@college.edu',
    phone: '+91 9876543210',
    officeHours: 'Mon-Wed 10:00 AM - 12:00 PM',
    cabin: 'Block A-205',
    photo: 'https://placehold.co/100x100/A78BFA/ffffff?text=PS'
  },
  {
    id: 2,
    name: 'Prof. Rajesh Kumar',
    designation: 'Associate Professor',
    department: 'Mathematics',
    subjects: ['Discrete Mathematics', 'Calculus'],
    email: 'rajesh.kumar@college.edu',
    phone: '+91 9876543211',
    officeHours: 'Tue-Thu 2:00 PM - 4:00 PM',
    cabin: 'Block B-102',
    photo: 'https://placehold.co/100x100/FDBA74/ffffff?text=RK'
  },
  {
    id: 3,
    name: 'Dr. Anjali Singh',
    designation: 'Assistant Professor',
    department: 'Physics',
    subjects: ['Quantum Physics', 'Electromagnetism'],
    email: 'anjali.singh@college.edu',
    phone: '+91 9876543212',
    officeHours: 'Mon-Fri 1:00 PM - 2:00 PM',
    cabin: 'Block C-301',
    photo: 'https://placehold.co/100x100/6EE7B7/ffffff?text=AS'
  }
];

const availableDocuments: DocumentRequestType[] = [
  {
    id: 1,
    name: 'Bonafide Certificate',
    description: 'Certificate confirming student status for various purposes.',
    processingTime: '2 working days',
    fee: 100
  },
  {
    id: 2,
    name: 'Transcript Request',
    description: 'Official academic transcript for higher studies or employment.',
    processingTime: '5 working days',
    fee: 500
  },
  {
    id: 3,
    name: 'Character Certificate',
    description: 'Certificate of good conduct and moral character.',
    processingTime: '3 working days'
  },
  {
    id: 4,
    name: 'Fee Structure Letter',
    description: 'Official letter detailing the fee structure for a specific academic year.',
    processingTime: '1 working day'
  },
  {
    id: 5,
    name: 'Medium of Instruction Certificate',
    description: 'Certificate stating the medium of instruction was English.',
    processingTime: '2 working days'
  },
  {
    id: 6,
    name: 'Internship Permission Letter',
    description: 'Letter for allowing students to pursue internships.',
    processingTime: '2 working days'
  }
];

const syllabusData: SyllabusType[] = [
  {
    id: 1,
    subject: 'Data Structures',
    code: 'CS201',
    semester: 3,
    department: 'Computer Science',
    credits: 4,
    facultyInCharge: 'Dr. Priya Sharma',
    fileUrl: '#'
  },
  {
    id: 2,
    subject: 'Discrete Mathematics',
    code: 'MA202',
    semester: 3,
    department: 'Mathematics',
    credits: 3,
    facultyInCharge: 'Prof. Rajesh Kumar',
    fileUrl: '#'
  },
  {
    id: 3,
    subject: 'Object-Oriented Programming',
    code: 'CS203',
    semester: 4,
    department: 'Computer Science',
    credits: 4,
    facultyInCharge: 'Dr. Vivek Sharma',
    fileUrl: '#'
  },
  {
    id: 4,
    subject: 'Engineering Physics',
    code: 'PH101',
    semester: 1,
    department: 'Physics',
    credits: 3,
    facultyInCharge: 'Dr. Anjali Singh',
    fileUrl: '#'
  }
];

const timetables: TimetableType[] = [
  {
    id: 1,
    title: 'CSE 3rd Semester Class Schedule',
    type: 'class',
    semester: 3,
    department: 'Computer Science',
    startDate: '2025-07-01',
    fileUrl: '#'
  },
  {
    id: 2,
    title: 'B.Tech 1st Year Mid-semester Exam Schedule',
    type: 'exam',
    semester: 1,
    department: 'All',
    startDate: '2025-10-15',
    endDate: '2025-10-22',
    fileUrl: '#'
  },
  {
    id: 3,
    title: 'ECE 5th Semester Class Schedule',
    type: 'class',
    semester: 5,
    department: 'Electronics',
    startDate: '2025-07-01',
    fileUrl: '#'
  },
  {
    id: 4,
    title: 'B.Tech 3rd Year End-semester Exam Schedule',
    type: 'exam',
    semester: 6,
    department: 'All',
    startDate: '2025-11-15',
    endDate: '2025-11-30',
    fileUrl: '#'
  }
];

const results: ResultType[] = [
  {
    id: 1,
    title: 'Semester 2 Results (B.Tech CSE)',
    semester: 2,
    datePublished: '2025-06-05',
    fileUrl: '#'
  },
  {
    id: 2,
    title: 'Mid-semester Exam Results (Semester 3)',
    semester: 3,
    datePublished: '2025-04-20',
    fileUrl: '#'
  },
  {
    id: 3,
    title: 'Semester 4 Results (B.Tech ECE)',
    semester: 4,
    datePublished: '2025-06-10',
    fileUrl: '#'
  }
];

const faqs = [
  {
    id: 1,
    question: 'How to apply for Bonafide Certificate?',
    answer: 'You can apply for a Bonafide Certificate through the "Apply for Documents" section. Fill out the application form, select "Bonafide Certificate" as the document type, and submit. It usually takes 2 working days for processing.'
  },
  {
    id: 2,
    question: 'How to get old syllabus for reference?',
    answer: 'Old syllabi can be found in the "Syllabus & Curriculum" section. Use the filters for department and semester to locate the desired syllabus. If it\'s not available online, please contact your department coordinator.'
  },
  {
    id: 3,
    question: 'Whom to contact for a lost admit card?',
    answer: 'For a lost admit card, immediately contact the Examination Cell at the college administration office during working hours, or send an email to exam.support@college.edu.'
  },
  {
    id: 4,
    question: 'What is the procedure for revaluation of exam papers?',
    answer: 'Details regarding revaluation and rechecking procedures are typically announced along with the results. Please check the "Exam Results & Notices" section for specific circulars and deadlines.'
  },
  {
    id: 5,
    question: 'How do I access my attendance record?',
    answer: 'Your subject-wise attendance percentage can be viewed in the "Attendance" section. You might need to log in with your student ID and an OTP for verification.'
  }
];

// Reusable Modal Component
const Modal = ({ show, title, message, onClose }: { show: boolean, title: string, message: string, onClose: () => void }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};


// Components for Each Route
const HomePage = () => {
  const importantDates = [
    { id: 1, title: 'End-semester Exams Start', date: '2025-11-15' },
    { id: 2, title: 'Project Submission Deadline', date: '2025-10-30' },
    { id: 3, title: 'Summer Vacation Ends', date: '2025-06-30' }
  ];

  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  useEffect(() => {
    const tickerInterval = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) => 
        (prevIndex + 1) % announcements.length
      );
    }, 5000); // Change announcement every 5 seconds

    return () => clearInterval(tickerInterval);
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <span className='flex justify-center'>
          <img className='w-64' src="/assets/background/VC_Logo.png" alt="Logo" />
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Virtual Campus Academic Portal</h1>
      </div>

      <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-inner mb-8 flex items-center justify-center flex-wrap">
        <FaBullhorn className="mr-3 text-xl" />
        <span className="font-semibold text-md animate-pulse">
          {announcements[currentAnnouncementIndex]?.title || "No new announcements."}
        </span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link 
          to="/syllabus" 
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center border-2 border-blue-100 flex flex-col items-center justify-center"
        >
          <FaBook className="text-3xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">Syllabus</h3>
          <p className="text-gray-600 text-xs">Curriculum & course details</p>
        </Link>
        <Link 
          to="/timetable" 
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center border-2 border-green-100 flex flex-col items-center justify-center"
        >
          <FaCalendarAlt className="text-3xl text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">Timetable</h3>
          <p className="text-gray-600 text-xs">Class & exam schedules</p>
        </Link>
        <Link 
          to="/results" 
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center border-2 border-purple-100 flex flex-col items-center justify-center"
        >
          <FaFileAlt className="text-3xl text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">Results</h3>
          <p className="text-gray-600 text-xs">Exam results & marksheets</p>
        </Link>
        <Link 
          to="/documents" 
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center border-2 border-orange-100 flex flex-col items-center justify-center"
        >
          <FaIdCard className="text-3xl text-orange-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">Documents</h3>
          <p className="text-gray-600 text-xs">Request certificates</p>
        </Link>
      </div>

      <div className="">
        <h2 className="text-xl font-bold text-gray-800 mb-6">📅 Important Deadlines</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {importantDates.map(date => (
            <div key={date.id} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 flex items-center">
              <FaClock className="text-blue-500 mr-3" />
              <div>
                <h3 className="text-md font-bold text-gray-800">{date.title}</h3>
                <p className="text-gray-600">{date.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SyllabusPage = () => {
  const [filters, setFilters] = useState({
    department: '',
    semester: ''
  });

  const filteredSyllabus = syllabusData.filter(syllabus => {
    return (
      (filters.department === '' || syllabus.department === filters.department) &&
      (filters.semester === '' || syllabus.semester.toString() === filters.semester)
    );
  });

  const departments = Array.from(new Set(syllabusData.map(s => s.department)));
  const semesters = Array.from(new Set(syllabusData.map(s => s.semester))).sort((a,b) => a-b);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📚 Syllabus & Curriculum</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Department</label>
            <select 
              value={filters.department}
              onChange={(e) => setFilters({...filters, department: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">All Departments</option>
              {departments.map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Semester</label>
            <select 
              value={filters.semester}
              onChange={(e) => setFilters({...filters, semester: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">All Semesters</option>
              {semesters.map(sem => (
                <option key={sem} value={sem.toString()}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSyllabus.length > 0 ? (
          filteredSyllabus.map(syllabus => (
            <div key={syllabus.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{syllabus.subject} ({syllabus.code})</h3>
              <div className="space-y-2 mb-4 text-gray-700">
                <p><span className="font-semibold">Department:</span> {syllabus.department}</p>
                <p><span className="font-semibold">Semester:</span> {syllabus.semester}</p>
                <p><span className="font-semibold">Credits:</span> {syllabus.credits}</p>
                <p><span className="font-semibold">Faculty:</span> {syllabus.facultyInCharge}</p>
              </div>
              <a 
                href={syllabus.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <FaDownload className="mr-2" />
                Download Syllabus
              </a>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-md">No syllabus found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

const TimetablePage = () => {
  const [activeTab, setActiveTab] = useState<'class' | 'exam'>('class');
  const [filters, setFilters] = useState({
    department: '',
    semester: ''
  });

  const filteredTimetables = timetables.filter(timetable => {
    return (
      timetable.type === activeTab &&
      (filters.department === '' || timetable.department === filters.department) &&
      (filters.semester === '' || timetable.semester.toString() === filters.semester)
    );
  });

  const departments = Array.from(new Set(timetables.map(t => t.department)));
  const semesters = Array.from(new Set(timetables.map(t => t.semester))).sort((a,b) => a-b);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">⏰ Timetables</h1>
      
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-md flex flex-wrap gap-2">
          {['class', 'exam'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'class' | 'exam')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors text-xs md:text-base ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-inner' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab === 'class' ? 'Class Timetables' : 'Exam Timetables'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Department</label>
            <select 
              value={filters.department}
              onChange={(e) => setFilters({...filters, department: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">All Departments</option>
              {departments.map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Semester</label>
            <select 
              value={filters.semester}
              onChange={(e) => setFilters({...filters, semester: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">All Semesters</option>
              {semesters.map(sem => (
                <option key={sem} value={sem.toString()}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTimetables.length > 0 ? (
          filteredTimetables.map(timetable => (
            <div key={timetable.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{timetable.title}</h3>
              <div className="space-y-2 mb-4 text-gray-700">
                <p><span className="font-semibold">Department:</span> {timetable.department}</p>
                <p><span className="font-semibold">Semester:</span> {timetable.semester}</p>
                <p><span className="font-semibold">Dates:</span> {timetable.startDate}{timetable.endDate ? ` - ${timetable.endDate}` : ''}</p>
              </div>
              <a 
                href={timetable.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <FaDownload className="mr-2" />
                Download Timetable
              </a>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-md">No timetables found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

const ResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');

  const filteredResults = results.filter(result => 
    result.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (semesterFilter === '' || result.semester.toString() === semesterFilter)
  );

  const semesters = Array.from(new Set(results.map(r => r.semester))).sort((a,b) => a-b);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📄 Exam Results & Notices</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Filters</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Search Results</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Semester</label>
            <select 
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">All Semesters</option>
              {semesters.map(sem => (
                <option key={sem} value={sem.toString()}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredResults.length > 0 ? (
          filteredResults.map(result => (
            <div key={result.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{result.title}</h3>
              <div className="space-y-2 mb-4 text-gray-700">
                <p><span className="font-semibold">Semester:</span> {result.semester}</p>
                <p><span className="font-semibold">Published:</span> {result.datePublished}</p>
              </div>
              <a 
                href={result.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <FaDownload className="mr-2" />
                View/Download Circular
              </a>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-md">No results found for the selected filters.</p>
        )}
      </div>

      <div className="mt-10 p-6 bg-yellow-50 rounded-lg shadow-inner">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Revaluation/Rechecking Instructions</h2>
        <p className="text-gray-700 mb-3">
          Students can apply for revaluation or rechecking of their answer sheets within 7 days of result declaration. 
          Please download the revaluation form from the official college website and submit it to the examination cell along with the prescribed fee.
        </p>
        <p className="text-gray-700 font-semibold">
          Last date for revaluation application: [Date 7 days after last result publish date]
        </p>
      </div>

      <div className="mt-6 p-6 bg-red-50 rounded-lg shadow-inner">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Exam Form Deadlines & Payment</h2>
        <p className="text-gray-700">
          All students are required to fill out their examination forms and pay the examination fees by the stipulated deadline. 
          Refer to the latest circulars for exact dates and payment gateways. Late submissions will incur penalties.
        </p>
        <p className="text-gray-700 font-semibold mt-3">
          Next Exam Form Deadline: [Upcoming Exam Form Deadline]
        </p>
      </div>
    </div>
  );
};

const FacultyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const filteredFaculty = facultyMembers.filter(faculty => {
    return (
      (faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
       faculty.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
       faculty.subjects.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (departmentFilter === '' || faculty.department === departmentFilter)
    );
  });

  const departments = Array.from(new Set(facultyMembers.map(f => f.department)));

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">👨‍🏫 Faculty Directory</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Search</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, department, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Department</label>
            <select 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">All Departments</option>
              {departments.map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFaculty.length > 0 ? (
          filteredFaculty.map(faculty => (
            <div key={faculty.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col sm:flex-row items-center sm:items-start border-t-4 border-yellow-500">
              {faculty.photo ? (
                <img 
                  src={faculty.photo} 
                  alt={faculty.name} 
                  className="w-24 h-24 rounded-full object-cover mr-0 sm:mr-6 mb-4 sm:mb-0 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl mr-0 sm:mr-6 mb-4 sm:mb-0 shadow-lg">
                  <FaUserTie />
                </div>
              )}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{faculty.name}</h3>
                <p className="text-gray-600 mb-3 text-xs">{faculty.designation}, {faculty.department}</p>
                
                <div className="space-y-2 text-gray-700 text-xs">
                  <div className="flex items-center justify-center sm:justify-start">
                    <FaEnvelope className="mr-2 text-blue-500" />
                    <span>{faculty.email}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <FaPhone className="mr-2 text-green-500" />
                    <span>{faculty.phone}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <FaClock className="mr-2 text-purple-500" />
                    <span>Office Hours: {faculty.officeHours}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <FaUniversity className="mr-2 text-orange-500" />
                    <span>Cabin: {faculty.cabin}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Subjects Taught:</h4>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {faculty.subjects.map((subject, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-md">No faculty found matching your search.</p>
        )}
      </div>
    </div>
  );
};

const DocumentsPage = () => {
  const [formData, setFormData] = useState({
    documentType: '',
    name: '',
    rollNo: '',
    course: '',
    semester: '',
    purpose: '',
    mode: 'softcopy',
    idProof: null as File | null
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, idProof: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.documentType || !formData.name || !formData.rollNo || !formData.course || !formData.semester || !formData.purpose) {
      setModalContent({ title: 'Submission Error', message: 'Please fill in all required fields.' });
      setShowModal(true);
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    setModalContent({ title: 'Request Submitted', message: 'Your document request has been submitted successfully! You will receive an email confirmation shortly.' });
    setShowModal(true);
    
    // Reset form after successful submission
    setFormData({
      documentType: '',
      name: '',
      rollNo: '',
      course: '',
      semester: '',
      purpose: '',
      mode: 'softcopy',
      idProof: null
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📄 Apply for College Documents</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Available Documents</h2>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-indigo-500">
            {availableDocuments.map(doc => (
              <div key={doc.id} className="mb-6 pb-6 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <h3 className="text-md font-bold text-gray-800 flex items-center mb-1">
                  <FaClipboardCheck className="mr-2 text-indigo-600" />
                  {doc.name}
                </h3>
                <p className="text-gray-600 mb-2 text-xs">{doc.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Processing: <span className="font-medium text-gray-700">{doc.processingTime}</span></span>
                  {doc.fee && (
                    <span className="font-medium text-blue-600">Fee: ₹{doc.fee}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Application Form</h2>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Document Type *</label>
                  <select
                    name="documentType"
                    value={formData.documentType}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select Document</option>
                    {availableDocuments.map(doc => (
                      <option key={doc.id} value={doc.name}>{doc.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Roll No. *</label>
                    <input
                      type="text"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Course *</label>
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">Semester *</label>
                    <input
                      type="number"
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      required
                      min="1"
                      max="8"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Reason / Purpose *</label>
                  <textarea
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Delivery Mode *</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mode"
                        value="softcopy"
                        checked={formData.mode === 'softcopy'}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      Soft Copy (Email)
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mode"
                        value="hardcopy"
                        checked={formData.mode === 'hardcopy'}
                        onChange={handleChange}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      Hard Copy (Collect from Office)
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Upload ID Proof (Optional)</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full text-gray-700 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">Accepted: PDF, JPG, PNG (Max 2MB)</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md mt-6"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal 
        show={showModal} 
        title={modalContent.title} 
        message={modalContent.message} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

const NoticesPage = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | Announcement['category']>('all');

  const filteredAnnouncements = activeCategory === 'all' 
    ? announcements 
    : announcements.filter(announcement => announcement.category === activeCategory);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📢 Circulars / Announcements</h1>
      
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg p-1 shadow-md flex flex-wrap gap-2">
          {['all', 'academic', 'exam', 'holiday', 'event'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as 'all' | Announcement['category'])}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-xs md:text-base ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-inner' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? 'All' : 
               category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-100">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map(announcement => (
            <div key={announcement.id} className="p-6">
              <div className="flex items-start">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded mr-3 uppercase ${
                  announcement.category === 'academic' ? 'bg-blue-200 text-blue-800' :
                  announcement.category === 'exam' ? 'bg-red-200 text-red-800' :
                  announcement.category === 'holiday' ? 'bg-green-200 text-green-800' :
                  'bg-purple-200 text-purple-800'
                }`}>
                  {announcement.category}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{announcement.title}</h3>
                  <p className="text-gray-700 mb-3">{announcement.content}</p>
                  <p className="text-xs text-gray-500">Published: {announcement.date}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="p-6 text-center text-gray-600 text-md">No announcements found for this category.</p>
        )}
      </div>
    </div>
  );
};

const AttendancePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [otp, setOtp] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  // Sample attendance data (replace with actual data fetching in real app)
  const attendanceData = {
    '12345': [
      { subject: 'Data Structures', percentage: 78, classesAttended: 25, totalClasses: 32 },
      { subject: 'Discrete Mathematics', percentage: 85, classesAttended: 20, totalClasses: 23 },
      { subject: 'Object-Oriented Programming', percentage: 72, classesAttended: 22, totalClasses: 30 },
      { subject: 'Engineering Physics', percentage: 90, classesAttended: 18, totalClasses: 20 },
    ],
    '67890': [
      { subject: 'Linear Algebra', percentage: 88, classesAttended: 28, totalClasses: 32 },
      { subject: 'Thermodynamics', percentage: 70, classesAttended: 21, totalClasses: 30 },
    ]
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMessage('');
    // Simulate OTP verification and login
    if (studentId && otp === '1234') { // Simple hardcoded OTP for demo
      setIsLoggedIn(true);
      setLoginMessage('Login successful!');
    } else {
      setLoginMessage('Invalid Student ID or OTP. Please try again.');
    }
  };

  const currentStudentAttendance = isLoggedIn ? attendanceData[studentId as keyof typeof attendanceData] : null;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📊 Attendance Portal</h1>
      
      {!isLoggedIn ? (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto border-t-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Student Login</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="studentId" className="block text-gray-700 mb-2 font-medium">Student ID</label>
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label htmlFor="otp" className="block text-gray-700 mb-2 font-medium">OTP (For demo: 1234)</label>
              <input
                type="password"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            {loginMessage && (
              <p className={`text-center font-medium ${loginMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                {loginMessage}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-green-500">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Your Attendance ({studentId})</h2>
          {currentStudentAttendance && currentStudentAttendance.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 uppercase text-xs leading-normal">
                      <th className="py-3 px-6 text-left">Subject</th>
                      <th className="py-3 px-6 text-left">Percentage</th>
                      <th className="py-3 px-6 text-left">Attended</th>
                      <th className="py-3 px-6 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-xs font-light">
                    {currentStudentAttendance.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{item.subject}</td>
                        <td className="py-3 px-6 text-left">
                          <span className={`font-semibold ${item.percentage < 75 ? 'text-red-600' : 'text-green-600'}`}>
                            {item.percentage}%
                          </span>
                        </td>
                        <td className="py-3 px-6 text-left">{item.classesAttended}</td>
                        <td className="py-3 px-6 text-left">{item.totalClasses}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
                <button
                  className="bg-purple-600 text-white py-2 px-5 rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-md"
                >
                  Export Attendance Report
                </button>
                <button
                  onClick={() => { setIsLoggedIn(false); setStudentId(''); setOtp(''); setLoginMessage(''); }}
                  className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-md"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600 text-md">No attendance data available for this student.</p>
          )}
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const toggleAnswer = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">❓ Help / FAQs</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(faq => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg focus:outline-none"
                onClick={() => toggleAnswer(faq.id)}
              >
                <span className="text-md font-semibold text-gray-800">{faq.question}</span>
                <span className="text-lg text-gray-600">
                  {openQuestionId === faq.id ? '-' : '+'}
                </span>
              </button>
              {openQuestionId === faq.id && (
                <div className="p-4 bg-white rounded-b-lg">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center border-t border-gray-200 pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Still have questions?</h3>
          <p className="text-gray-700 mb-4">
            If you couldn't find the answer to your query, feel free to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:support@college.edu" 
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
            >
              <FaEnvelope className="mr-2" />
              Email Support
            </a>
            <a 
              href="tel:+911234567890" 
              className="inline-flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold shadow-md"
            >
              <FaPhone className="mr-2" />
              Call Helpdesk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Home', icon: FaHome },
    { path: '/syllabus', name: 'Syllabus', icon: FaBook },
    { path: '/timetable', name: 'Timetable', icon: FaCalendarAlt },
    { path: '/results', name: 'Results', icon: FaFileAlt },
    { path: '/faculty', name: 'Faculty', icon: FaUserTie },
    { path: '/documents', name: 'Documents', icon: FaIdCard },
    { path: '/notices', name: 'Notices', icon: FaBullhorn },
    { path: '/attendance', name: 'Attendance', icon: FaChartBar }, // New
    { path: '/faq', name: 'FAQ', icon: FaQuestionCircle }, // New
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-xl font-bold mb-4 md:mb-0 flex items-center group">
            <span className="tracking-wide">Academic Portal</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 md:gap-x-2 text-sm">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center space-x-2 py-1 px-2 rounded-md transition-all duration-300 
                  ${location.pathname === link.path 
                    ? 'text-yellow-300 bg-blue-800/50 shadow-inner' 
                    : 'hover:text-yellow-200 hover:bg-blue-700/30'
                  }`}
              >
                <link.icon className="text-lg" />
                <span className="hidden sm:inline">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};


// Main App Component
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;