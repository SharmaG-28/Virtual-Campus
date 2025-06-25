import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaCreditCard, FaHistory, FaDownload, FaExclamationCircle, FaQuestionCircle, FaUserGraduate, FaMoneyBillWave, FaCalendarAlt, FaBullhorn, FaReceipt, FaFilter, FaSearch, FaEnvelope, FaPhone, FaClock, FaUniversity, FaClipboardCheck } from 'react-icons/fa';

// Global Data - Simulated for demo purposes
// In a real application, this data would come from a backend API and a database (e.g., Firestore).

// Types
type FeeStatus = 'Paid' | 'Pending' | 'Partially Paid';

type FeeDetail = {
  type: 'Tuition Fee' | 'Exam Fee' | 'Hostel Fee' | 'ID Card Fee' | 'Convocation Fee' | 'Fine';
  amount: number;
  status: FeeStatus;
  dueDate?: string;
  transactionId?: string; // For paid fees
  receiptUrl?: string; // For paid fees
};

type PaymentHistoryEntry = {
  id: string;
  date: string;
  type: FeeDetail['type'];
  amount: number;
  status: 'Success' | 'Failed' | 'Pending';
  transactionId: string;
  receiptUrl: string;
};

type StudentInfo = {
  name: string;
  rollNo: string;
  course: string;
  semester: number;
};

// Sample Data
const studentInfo: StudentInfo = {
  name: 'Alice Johnson',
  rollNo: '21034567',
  course: 'B.Tech Computer Science',
  semester: 5,
};

const initialFeeDetails: FeeDetail[] = [
  { type: 'Tuition Fee', amount: 75000, status: 'Pending', dueDate: '2025-07-31' },
  { type: 'Exam Fee', amount: 2000, status: 'Paid', transactionId: 'TXN123456789', receiptUrl: '#' },
  { type: 'Hostel Fee', amount: 30000, status: 'Partially Paid', dueDate: '2025-08-15' },
  { type: 'ID Card Fee', amount: 500, status: 'Pending', dueDate: '2025-07-15' },
];

let paymentHistory: PaymentHistoryEntry[] = [
  { id: 'REC001', date: '2025-01-10', type: 'Exam Fee', amount: 2000, status: 'Success', transactionId: 'TXN123456789', receiptUrl: 'https://placehold.co/200x100/A78BFA/ffffff?text=Receipt_001' },
  { id: 'REC002', date: '2024-12-01', type: 'Tuition Fee', amount: 30000, status: 'Success', transactionId: 'TXN987654321', receiptUrl: 'https://placehold.co/200x100/FDBA74/ffffff?text=Receipt_002' },
  { id: 'REC003', date: '2025-03-15', type: 'Hostel Fee', amount: 15000, status: 'Success', transactionId: 'TXN112233445', receiptUrl: 'https://placehold.co/200x100/6EE7B7/ffffff?text=Receipt_003' },
];

const importantNotices = [
  { id: 1, title: 'Late fee for Tuition after July 31', date: '2025-07-01' },
  { id: 2, title: 'Exam fee deadline extended to July 10', date: '2025-06-25' },
  { id: 3, title: 'Hostel fee installment due August 15', date: '2025-07-10' },
];

const faqs = [
  {
    id: 1,
    question: 'How to request a refund for overpaid fees?',
    answer: 'Refund requests can be initiated from the "Contact Support" section or by emailing finance@college.edu. Please provide your transaction ID and reason for refund. Refunds are processed within 7-10 working days after verification.'
  },
  {
    id: 2,
    question: 'My UPI payment failed but money was deducted. What should I do?',
    answer: 'If your UPI payment failed but money was deducted, please wait for 24-48 hours. Most banks auto-reverse failed transactions. If not reversed, send an email with transaction details (UPI ID, date, amount, bank statement screenshot) to support@college.edu.'
  },
  {
    id: 3,
    question: 'How can I get an official receipt for my payment?',
    answer: 'All successful payment receipts can be downloaded from the "Download Receipts" section after your transaction status is updated to "Success". You will also receive an email with the receipt.'
  },
  {
    id: 4,
    question: 'Whom to contact for payment errors or discrepancies?',
    answer: 'For any payment errors, discrepancies, or issues, please contact the college finance department at finance@college.edu or call our helpline number during office hours. You can find contact details in the "Help / FAQs" section.'
  },
  {
    id: 5,
    question: 'Can I pay my fees in installments?',
    answer: 'Installment payment options are available for certain fee types like Tuition and Hostel fees, subject to college policy. Please check the "Pending Dues" section or contact the finance office for eligible installment plans.'
  }
];

// Helper to simulate a unique ID for transactions
const generateUniqueId = () => `TRX${Date.now()}${Math.floor(Math.random() * 1000)}`;
const generateReceiptId = () => `REC${Date.now()}${Math.floor(Math.random() * 100)}`;


// Reusable Modal Component
const Modal = ({ show, title, message, onClose }: { show: boolean, title: string, message: string, onClose: () => void }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 m-4 max-w-sm w-full animate-fade-in-up">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">{title}</h3>
        <p className="text-gray-700 mb-6 text-center">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Close
        </button>
      </div>
    </div>
  );
};


// 1. Dashboard / Summary
const DashboardPage = () => {
  const [feeDetails, setFeeDetails] = useState<FeeDetail[]>(initialFeeDetails);
  
  // Calculate total paid and pending
  const totalTuitionPaid = feeDetails.filter(f => f.type === 'Tuition Fee' && f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
  const totalTuitionPending = feeDetails.filter(f => f.type === 'Tuition Fee' && f.status === 'Pending').reduce((sum, f) => sum + f.amount, 0);
  const totalExamPaid = feeDetails.filter(f => f.type === 'Exam Fee' && f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
  const totalExamPending = feeDetails.filter(f => f.type === 'Exam Fee' && f.status === 'Pending').reduce((sum, f) => sum + f.amount, 0);
  const totalHostelPaid = feeDetails.filter(f => f.type === 'Hostel Fee' && f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
  const totalHostelPending = feeDetails.filter(f => f.type === 'Hostel Fee' && f.status === 'Pending').reduce((sum, f) => sum + f.amount, 0);

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8 text-center animate-fade-in">💰 Finance Portal Dashboard</h1>

      {/* Student Info */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 mb-8 transform hover:scale-101 transition-transform duration-300 ease-in-out">
        <h2 className="text-xl font-bold mb-3 flex items-center">
          <FaUserGraduate className="mr-3 text-2xl" />
          Welcome, {studentInfo.name}!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium">
          <p><span className="font-semibold">PRN.:</span> {studentInfo.rollNo}</p>
          <p><span className="font-semibold">Course:</span> {studentInfo.course}</p>
          <p><span className="font-semibold">Semester:</span> {studentInfo.semester}</p>
        </div>
      </div>

      {/* Fee Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-blue-500 flex flex-col items-start transform hover:-translate-y-1 transition-transform duration-200">
          <FaMoneyBillWave className="text-3xl text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tuition Fee</h3>
          <p className="text-gray-700 text-xs mb-1">Total Paid: <span className="font-bold text-green-600">{formatCurrency(totalTuitionPaid)}</span></p>
          <p className="text-gray-700 text-xs">Total Pending: <span className="font-bold text-red-600">{formatCurrency(totalTuitionPending)}</span></p>
          <Link to="/payments" className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center">
            Pay Now <span className="ml-1 text-xs">→</span>
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-purple-500 flex flex-col items-start transform hover:-translate-y-1 transition-transform duration-200">
          <FaClipboardCheck className="text-3xl text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Exam Fee</h3>
          <p className="text-gray-700 text-xs mb-1">Total Paid: <span className="font-bold text-green-600">{formatCurrency(totalExamPaid)}</span></p>
          <p className="text-gray-700 text-xs">Total Pending: <span className="font-bold text-red-600">{formatCurrency(totalExamPending)}</span></p>
          <Link to="/payments" className="mt-4 text-purple-600 hover:text-purple-800 font-medium text-xs flex items-center">
            Pay Now <span className="ml-1 text-xs">→</span>
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-b-4 border-green-500 flex flex-col items-start transform hover:-translate-y-1 transition-transform duration-200">
          <FaUniversity className="text-3xl text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Hostel Fee</h3>
          <p className="text-gray-700 text-xs mb-1">Total Paid: <span className="font-bold text-green-600">{formatCurrency(totalHostelPaid)}</span></p>
          <p className="text-gray-700 text-xs">Total Pending: <span className="font-bold text-red-600">{formatCurrency(totalHostelPending)}</span></p>
          <Link to="/payments" className="mt-4 text-green-600 hover:text-green-800 font-medium text-xs flex items-center">
            Pay Now <span className="ml-1 text-xs">→</span>
          </Link>
        </div>
      </div>

      {/* Current Payment Deadlines & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-red-600" /> Current Payment Deadlines
          </h2>
          <ul className="space-y-3">
            {feeDetails.filter(f => f.status !== 'Paid' && f.dueDate).map((fee, index) => (
              <li key={index} className="flex justify-between items-center text-gray-700">
                <span>{fee.type}: <span className="font-semibold">{formatCurrency(fee.amount)}</span></span>
                <span className="text-xs font-medium text-red-500">Due: {fee.dueDate}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <FaBullhorn className="mr-2 text-yellow-600" /> Notices
          </h2>
          <ul className="space-y-3">
            {importantNotices.map(notice => (
              <li key={notice.id} className="flex justify-between items-center text-gray-700">
                <span className="font-medium">{notice.title}</span>
                <span className="text-xs text-gray-500">{notice.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// 2. Pay Fees
const PaymentsPage = () => {
  const [feeType, setFeeType] = useState<FeeDetail['type'] | ''>('');
  const [baseFee, setBaseFee] = useState<number>(0);
  const [lateFee, setLateFee] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  // Simulate available fee types based on initialFeeDetails
  const availableFeeOptions = initialFeeDetails.filter(f => f.status !== 'Paid');

  useEffect(() => {
    const selectedFee = availableFeeOptions.find(f => f.type === feeType);
    if (selectedFee) {
      setBaseFee(selectedFee.amount);
      // Simulate late fee if due date is passed
      const today = new Date();
      if (selectedFee.dueDate && new Date(selectedFee.dueDate) < today && selectedFee.status === 'Pending') {
        setLateFee(500); // Example late fee
      } else {
        setLateFee(0);
      }
      setTotalPayable(selectedFee.amount + lateFee);
    } else {
      setBaseFee(0);
      setLateFee(0);
      setTotalPayable(0);
    }
  }, [feeType, lateFee]); // Recalculate if feeType or lateFee changes

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeType || totalPayable <= 0) {
      setModalContent({ title: 'Payment Error', message: 'Please select a fee type and ensure the amount is valid.' });
      setShowModal(true);
      return;
    }

    // Simulate payment processing
    setModalContent({ title: 'Processing Payment...', message: 'Please wait while your payment is being processed. Do not close this window.' });
    setShowModal(true);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 90% success rate for demo

      if (isSuccess) {
        const transactionId = generateUniqueId();
        const receiptId = generateReceiptId();
        const newPayment: PaymentHistoryEntry = {
          id: receiptId,
          date: new Date().toISOString().slice(0, 10),
          type: feeType as FeeDetail['type'],
          amount: totalPayable,
          status: 'Success',
          transactionId: transactionId,
          receiptUrl: `https://placehold.co/200x100/4CAF50/ffffff?text=${receiptId}` // Placeholder receipt URL
        };
        paymentHistory.push(newPayment);

        // Update fee status in initialFeeDetails (simulated database update)
        initialFeeDetails.forEach(fee => {
          if (fee.type === feeType) {
            fee.status = 'Paid';
            fee.transactionId = transactionId;
            fee.receiptUrl = newPayment.receiptUrl;
          }
        });

        setModalContent({ title: 'Payment Successful!', message: `Your payment of ₹${totalPayable.toLocaleString()} for ${feeType} was successful. Transaction ID: ${transactionId}. Redirecting to history...` });
        // In a real app, you'd redirect using navigate('/history') from react-router-dom
      } else {
        setModalContent({ title: 'Payment Failed', message: 'Your payment could not be processed. Please try again or contact support.' });
      }
    }, 3000); // Simulate network delay
  };

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">💳 Pay Fees</h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-indigo-500">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Select Fee Type</h2>
        <div className="mb-6">
          <label htmlFor="feeType" className="block text-gray-700 text-md font-medium mb-2">Choose Fee to Pay:</label>
          <select
            id="feeType"
            value={feeType}
            onChange={(e) => setFeeType(e.target.value as FeeDetail['type'])}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-md"
          >
            <option value="">-- Select a Fee Type --</option>
            {availableFeeOptions.map((fee, index) => (
              <option key={index} value={fee.type}>{fee.type} ({fee.status === 'Partially Paid' ? 'Partially Paid' : 'Pending'})</option>
            ))}
          </select>
        </div>

        {feeType && (
          <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-lg mb-6 shadow-sm">
            <h3 className="font-bold text-md mb-2">Fee Breakdown:</h3>
            <p className="flex justify-between py-1">
              <span>Base Fee:</span> <span className="font-semibold">{formatCurrency(baseFee)}</span>
            </p>
            <p className="flex justify-between py-1">
              <span>Late Fee:</span> <span className="font-semibold text-red-600">{formatCurrency(lateFee)}</span>
            </p>
            <hr className="my-2 border-blue-200" />
            <p className="flex justify-between py-1 text-lg font-bold">
              <span>Total Payable:</span> <span>{formatCurrency(totalPayable)}</span>
            </p>
          </div>
        )}

        <form onSubmit={handlePayment} className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Payment Details</h2>
          
          <div>
            <label className="block text-gray-700 text-md font-medium mb-2">Student Information</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-800"><span className="font-semibold">Name:</span> {studentInfo.name}</p>
              <p className="text-gray-800"><span className="font-semibold">PRN:</span> {studentInfo.rollNo}</p>
              <p className="text-gray-800"><span className="font-semibold">Course:</span> {studentInfo.course}</p>
              <p className="text-gray-800"><span className="font-semibold">Semester:</span> {studentInfo.semester}</p>
            </div>
          </div>

          <div>
            <label htmlFor="paymentMethod" className="block text-gray-700 text-md font-medium mb-2">Payment Method</label>
            <select
              id="paymentMethod"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-md"
            >
              <option value="upi">UPI</option>
              <option value="card">Credit/Debit Card</option>
              <option value="netbanking">Net Banking</option>
            </select>
          </div>

          {/* Placeholder for UPI ID / Card Details etc. */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg">
            <p className="font-medium">
              Payment Gateway Integration (Razorpay/Paytm/Stripe) would go here. <br/>
              This is a simulated form for demonstration purposes.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!feeType || totalPayable <= 0}
          >
            Pay {formatCurrency(totalPayable)} Now
          </button>
        </form>
      </div>
      <Modal show={showModal} title={modalContent.title} message={modalContent.message} onClose={() => setShowModal(false)} />
    </div>
  );
};

// 3. Payment History
const PaymentHistoryPage = () => {
  const [filters, setFilters] = useState({
    type: 'All',
    status: 'All',
    searchTerm: '',
  });

  const filteredHistory = paymentHistory.filter(payment => {
    return (
      (filters.type === 'All' || payment.type === filters.type) &&
      (filters.status === 'All' || payment.status === filters.status) &&
      (payment.transactionId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
       payment.type.toLowerCase().includes(filters.searchTerm.toLowerCase()))
    );
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">📜 Payment History</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-blue-500">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filters & Search</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="filterType" className="block text-gray-700 text-xs font-medium mb-2">Fee Type</label>
            <select
              id="filterType"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Types</option>
              {Array.from(new Set(paymentHistory.map(p => p.type))).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filterStatus" className="block text-gray-700 text-xs font-medium mb-2">Status</label>
            <select
              id="filterStatus"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label htmlFor="searchTerm" className="block text-gray-700 text-xs font-medium mb-2">Search</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="searchTerm"
                placeholder="Search by Transaction ID or Type..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-purple-500">
        {filteredHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">{payment.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">{payment.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800 font-semibold">{formatCurrency(payment.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'Success' ? 'bg-green-100 text-green-800' :
                        payment.status === 'Failed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">{payment.transactionId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                      {payment.status === 'Success' && payment.receiptUrl ? (
                        <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 flex items-center">
                          <FaDownload className="mr-1" /> View/Download
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-8 text-center text-gray-600 text-md">No payment history found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

// 4. Download Receipts
const ReceiptsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const successfulPayments = paymentHistory.filter(p => p.status === 'Success' && p.receiptUrl);

  const filteredReceipts = successfulPayments.filter(receipt =>
    receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.type.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">📄 Download Receipts</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-green-500">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Search Receipts</h2>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Receipt No., Transaction ID, or Fee Type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-yellow-500">
        {filteredReceipts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt No.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReceipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">{receipt.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">{receipt.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">{receipt.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800 font-semibold">{formatCurrency(receipt.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">{receipt.transactionId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                      <a
                        href={receipt.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900 mr-4 flex items-center mb-2 sm:mb-0"
                      >
                        <FaDownload className="mr-1" /> Download PDF
                      </a>
                      {/* <button className="text-purple-600 hover:text-purple-900 flex items-center">
                        <FaReceipt className="mr-1" /> View Inline
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-8 text-center text-gray-600 text-md">No receipts available or matching your search.</p>
        )}
      </div>
    </div>
  );
};

// 5. Pending Dues
const DuesPage = () => {
  const pendingDues = initialFeeDetails.filter(fee => fee.status !== 'Paid');
  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">⚠️ Pending Dues</h1>

      <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-500">
        {pendingDues.length > 0 ? (
          <div className="space-y-6">
            {pendingDues.map((due, index) => (
              <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-red-50 border border-red-200 rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                <div className="mb-3 sm:mb-0">
                  <h3 className="text-lg font-bold text-red-800 mb-1">{due.type}</h3>
                  <p className="text-gray-700 text-xs">Amount: <span className="font-semibold">{formatCurrency(due.amount)}</span></p>
                  {due.dueDate && <p className="text-gray-700 text-xs">Due Date: <span className="font-semibold">{due.dueDate}</span></p>}
                  {new Date(due.dueDate || '') < new Date() && due.status === 'Pending' && (
                    <p className="text-red-600 text-xs font-semibold mt-1">Late Fees Applicable: Yes</p>
                  )}
                  {due.status === 'Partially Paid' && (
                    <p className="text-orange-600 text-xs font-semibold mt-1">Status: Partially Paid</p>
                  )}
                </div>
                <Link
                  to="/payments"
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 font-semibold shadow-md flex items-center justify-center"
                >
                  <FaCreditCard className="mr-2" /> Pay Now
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <FaClipboardCheck className="text-8xl text-green-500 mx-auto mb-6 opacity-75" />
            <p className="text-xl font-semibold text-gray-700 mb-2">No Pending Dues!</p>
            <p className="text-sm text-gray-600">You are all clear. Keep up the good work!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 6. FAQ / Help
const FAQPage = () => {
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);

  const toggleAnswer = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">❓ Help / FAQs</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(faq => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg focus:outline-none"
                onClick={() => toggleAnswer(faq.id)}
              >
                <span className="text-md font-semibold text-gray-800">{faq.question}</span>
                <span className="text-lg text-gray-600 font-bold">
                  {openQuestionId === faq.id ? '−' : '+'}
                </span>
              </button>
              {openQuestionId === faq.id && (
                <div className="p-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Still have questions?</h3>
          <p className="text-gray-700 mb-6">
            If you couldn't find the answer to your query, feel free to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:finance@college.edu" 
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md transform hover:scale-105"
            >
              <FaEnvelope className="mr-2" />
              Email Finance Support
            </a>
            <a 
              href="tel:+911234567890" 
              className="inline-flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold shadow-md transform hover:scale-105"
            >
              <FaPhone className="mr-2" />
              Call Helpdesk (+91-1234567890)
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-4">Office Hours: Mon - Fri, 9:00 AM - 5:00 PM</p>
        </div>
      </div>
    </div>
  );
};


// Navbar Component
const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', name: 'Dashboard', icon: FaHome },
    { path: '/payments', name: 'Pay Fees', icon: FaCreditCard },
    { path: '/history', name: 'History', icon: FaHistory },
    { path: '/receipts', name: 'Receipts', icon: FaReceipt },
    { path: '/dues', name: 'Dues', icon: FaExclamationCircle },
    { path: '/faq', name: 'FAQ', icon: FaQuestionCircle },
  ];

  return (
    <nav className="bg-gradient-to-r from-teal-700 to-teal-900 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-xl font-bold mb-4 md:mb-0 flex items-center group">
            <span className="tracking-wide">Virtual Campus Finance Portal</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 md:gap-x-4 text-xs">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center space-x-2 py-2 px-4 rounded-full transition-all duration-300 ease-in-out
                  ${location.pathname === link.path 
                    ? 'bg-teal-800 text-yellow-300 shadow-inner scale-105' 
                    : 'hover:text-yellow-200 hover:bg-teal-700/50'
                  }`}
              >
                <link.icon className="text-md" />
                <span className="hidden sm:inline font-medium">{link.name}</span>
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
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/history" element={<PaymentHistoryPage />} />
          <Route path="/receipts" element={<ReceiptsPage />} />
          <Route path="/dues" element={<DuesPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
