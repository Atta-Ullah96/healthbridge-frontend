import { useState } from "react";
import { 
  TrendingUp, DollarSign, Calendar, CreditCard, 
  Download, ArrowUpRight, Wallet, CheckCircle,
  Clock, Filter, ChevronDown
} from "lucide-react";

function mockEarnings() {
  return {
    last30: [
      { date: "2025-01-02", amount: 150, consultations: 3 },
      { date: "2025-01-03", amount: 200, consultations: 4 },
      { date: "2025-01-04", amount: 100, consultations: 2 },
      { date: "2024-12-28", amount: 175, consultations: 3 },
      { date: "2024-12-29", amount: 225, consultations: 5 },
      { date: "2024-12-30", amount: 150, consultations: 3 },
      { date: "2024-12-31", amount: 125, consultations: 3 },
    ],
    withdrawable: 1200,
    pending: 350,
    totalEarned: 8450,
    history: [
      { 
        id: "h1", 
        amount: 150, 
        date: "2025-01-02", 
        time: "2:30 PM",
        method: "Bank Transfer", 
        status: "completed",
        patient: "Ahmed Ali",
        type: "Online Consultation"
      },
      { 
        id: "h2", 
        amount: 200, 
        date: "2025-01-03", 
        time: "10:15 AM",
        method: "Bank Transfer", 
        status: "completed",
        patient: "Fatima Hassan",
        type: "In-Person Visit"
      },
      { 
        id: "h3", 
        amount: 100, 
        date: "2025-01-04", 
        time: "4:00 PM",
        method: "Credit Card", 
        status: "completed",
        patient: "Bilal Ahmed",
        type: "Follow-up"
      },
      { 
        id: "h4", 
        amount: 175, 
        date: "2024-12-28", 
        time: "11:30 AM",
        method: "Bank Transfer", 
        status: "pending",
        patient: "Sara Khan",
        type: "Online Consultation"
      },
      { 
        id: "h5", 
        amount: 225, 
        date: "2024-12-29", 
        time: "3:45 PM",
        method: "Credit Card", 
        status: "completed",
        patient: "Omar Farooq",
        type: "In-Person Visit"
      },
    ],
    withdrawals: [
      { id: "w1", amount: 1000, date: "2024-12-25", status: "completed", method: "Bank Transfer" },
      { id: "w2", amount: 1500, date: "2024-12-10", status: "completed", method: "Bank Transfer" },
      { id: "w3", amount: 800, date: "2024-11-28", status: "completed", method: "Bank Transfer" },
    ]
  };
}

function DoctorEarning() {
  const [earnings, setEarnings] = useState(mockEarnings());
  const [activeTab, setActiveTab] = useState("earnings");
  const [filterPeriod, setFilterPeriod] = useState("30days");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const totalLast30 = earnings.last30.reduce((s, e) => s + e.amount, 0);
  const totalConsultations = earnings.last30.reduce((s, e) => s + e.consultations, 0);
  const avgPerConsultation = totalConsultations > 0 ? (totalLast30 / totalConsultations).toFixed(0) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings Dashboard</h1>
          <p className="text-gray-600">Track your income and manage withdrawals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Earned */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <DollarSign size={24} />
              </div>
              <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                <TrendingUp size={14} />
                <span>+12%</span>
              </div>
            </div>
            <div className="text-sm opacity-90 mb-1">Total Earned</div>
            <div className="text-3xl font-bold">${earnings.totalEarned.toLocaleString()}</div>
          </div>

          {/* Withdrawable */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Wallet size={24} className="text-green-600" />
              </div>
              <button 
                onClick={() => setShowWithdrawModal(true)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                Withdraw
                <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="text-sm text-gray-600 mb-1">Available Balance</div>
            <div className="text-3xl font-bold text-gray-900">${earnings.withdrawable.toLocaleString()}</div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock size={24} className="text-yellow-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Pending Clearance</div>
            <div className="text-3xl font-bold text-gray-900">${earnings.pending.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-2">Clears in 3-5 days</div>
          </div>

          {/* Last 30 Days */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Calendar size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1">Last 30 Days</div>
            <div className="text-3xl font-bold text-gray-900">${totalLast30.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-2">{totalConsultations} consultations</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("earnings")}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === "earnings"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Recent Earnings
            </button>
            <button
              onClick={() => setActiveTab("withdrawals")}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === "withdrawals"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Withdrawal History
            </button>
          </div>

          <div className="p-6">
            {activeTab === "earnings" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Payment History</h3>
                    <p className="text-sm text-gray-600 mt-1">Your recent consultation payments</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium">
                    <Download size={16} />
                    Export
                  </button>
                </div>

                <div className="space-y-3">
                  {earnings.history.map((h) => (
                    <div 
                      key={h.id} 
                      className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 rounded-xl transition border border-gray-100"
                    >
                      <div className="flex items-start gap-4 mb-3 md:mb-0">
                        <div className={`p-3 rounded-xl ${
                          h.status === "completed" ? "bg-green-100" : "bg-yellow-100"
                        }`}>
                          {h.status === "completed" ? (
                            <CheckCircle size={20} className="text-green-600" />
                          ) : (
                            <Clock size={20} className="text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">{h.patient}</div>
                          <div className="text-sm text-gray-600 mb-1">{h.type}</div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {h.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {h.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-6">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">${h.amount}</div>
                          <div className="text-xs text-gray-500">{h.method}</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          h.status === "completed" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {h.status === "completed" ? "Paid" : "Pending"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "withdrawals" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Withdrawal History</h3>
                    <p className="text-sm text-gray-600 mt-1">Track your withdrawal requests</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {earnings.withdrawals.map((w) => (
                    <div 
                      key={w.id} 
                      className="flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 rounded-xl transition border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <CreditCard size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Withdrawal to {w.method}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <Calendar size={14} />
                            {w.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${w.amount.toLocaleString()}</div>
                        <div className="mt-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold inline-block">
                          Completed
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-sm text-blue-700 mb-2 font-medium">Avg. per Consultation</div>
              <div className="text-3xl font-bold text-blue-900">${avgPerConsultation}</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="text-sm text-green-700 mb-2 font-medium">Total Consultations</div>
              <div className="text-3xl font-bold text-green-900">{totalConsultations}</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <div className="text-sm text-purple-700 mb-2 font-medium">Growth Rate</div>
              <div className="text-3xl font-bold text-purple-900">+12%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Withdraw Funds</h3>
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">Available Balance</div>
              <div className="text-4xl font-bold text-gray-900">${earnings.withdrawable.toLocaleString()}</div>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount to Withdraw</label>
                <input 
                  type="number" 
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Withdrawal Method</label>
                <select className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Bank Transfer</option>
                  <option>PayPal</option>
                  <option>Wire Transfer</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition font-semibold"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowWithdrawModal(false);
                  alert("Withdrawal request submitted!");
                }}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorEarning;