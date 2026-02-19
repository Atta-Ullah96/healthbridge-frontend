import { useState } from 'react';
import { Download, CreditCard, Calendar, CheckCircle, Clock, DollarSign } from 'lucide-react';

// Sample payment data
const paymentsData = [
  {
    id: 1,
    invoiceNumber: "INV-2026-001",
    doctor: "Dr. Michael Chen",
    service: "Cardiology Consultation",
    date: "2026-01-05",
    amount: 150,
    status: "paid",
    paymentMethod: "Credit Card"
  },
  {
    id: 2,
    invoiceNumber: "INV-2025-089",
    doctor: "Dr. Sarah Williams",
    service: "Dermatology Checkup",
    date: "2025-12-28",
    amount: 120,
    status: "paid",
    paymentMethod: "Debit Card"
  },
  {
    id: 3,
    invoiceNumber: "INV-2026-002",
    doctor: "Dr. Emily Roberts",
    service: "General Consultation",
    date: "2026-01-08",
    amount: 100,
    status: "pending",
    paymentMethod: "-"
  },
  {
    id: 4,
    invoiceNumber: "INV-2025-078",
    doctor: "City Lab Diagnostics",
    service: "Blood Test Package",
    date: "2025-12-20",
    amount: 80,
    status: "paid",
    paymentMethod: "Credit Card"
  },
  {
    id: 5,
    invoiceNumber: "INV-2025-067",
    doctor: "Dr. James Wilson",
    service: "Orthopedic Consultation",
    date: "2025-12-15",
    amount: 130,
    status: "paid",
    paymentMethod: "Cash"
  },
  {
    id: 6,
    invoiceNumber: "INV-2025-056",
    doctor: "Elite Diagnostics",
    service: "X-Ray Examination",
    date: "2025-12-10",
    amount: 90,
    status: "paid",
    paymentMethod: "Credit Card"
  }
];

function PaymentCard({ payment }) {
  const handleDownload = () => {
    alert(`Downloading invoice ${payment.invoiceNumber}...`);
    // In real app: trigger download or open PDF
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900">{payment.service}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              payment.status === 'paid' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {payment.status === 'paid' ? (
                <span className="flex items-center gap-1">
                  <CheckCircle size={12} />
                  Paid
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Pending
                </span>
              )}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{payment.doctor}</p>
          <p className="text-xs text-gray-500">Invoice: {payment.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">${payment.amount}</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          {payment.status === 'paid' && (
            <span className="flex items-center gap-1">
              <CreditCard size={14} />
              {payment.paymentMethod}
            </span>
          )}
        </div>
        {payment.status === 'paid' ? (
          <button
            onClick={handleDownload}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
          >
            <Download size={16} />
            Invoice
          </button>
        ) : (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}

function Payments() {
  const [filter, setFilter] = useState('all');

  const filteredPayments = paymentsData.filter(payment => {
    if (filter === 'all') return true;
    return payment.status === filter;
  });

  const totalPaid = paymentsData
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalPending = paymentsData
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const paidCount = paymentsData.filter(p => p.status === 'paid').length;
  const pendingCount = paymentsData.filter(p => p.status === 'pending').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments</h1>
        <p className="text-gray-600">View your payment history and manage bills</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-gray-900">${totalPaid}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">${totalPending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <CreditCard size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{paymentsData.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Payments ({paymentsData.length})
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              filter === 'paid'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Paid ({paidCount})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              filter === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({pendingCount})
          </button>
        </div>
      </div>

      {/* Payment History */}
      <div className="space-y-4">
        {filteredPayments.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <CreditCard size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No payments found</h3>
            <p className="text-gray-500 text-sm">You don't have any {filter} payments</p>
          </div>
        ) : (
          filteredPayments.map(payment => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        )}
      </div>

      {/* Payment Methods Info */}
      {filter === 'all' && (
        <div className="mt-6 bg-blue-50 rounded-xl p-5 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">💳 Payment Methods</h3>
          <p className="text-sm text-blue-800">
            We accept Credit Cards, Debit Cards, and Cash payments. All online transactions are secured and encrypted.
          </p>
        </div>
      )}
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <Payments />
      </div>
    </div>
  );
}