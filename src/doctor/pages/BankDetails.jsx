import { useState } from "react";
import { 
  CreditCard, Building2, User, Hash, MapPin, 
  CheckCircle, Plus, Trash2, Edit2, Shield,
  AlertCircle, Save, X, ChevronRight
} from "lucide-react";

function mockBankAccounts() {
  return [
    {
      id: "acc1",
      accountName: "Dr. Sarah Khan",
      accountNumber: "****6789",
      bankName: "HBL Bank",
      branchCode: "1234",
      iban: "PK36HABB************6789",
      isPrimary: true,
      isVerified: true,
      addedDate: "2024-12-01"
    },
    {
      id: "acc2",
      accountName: "Dr. Sarah Khan",
      accountNumber: "****4321",
      bankName: "Meezan Bank",
      branchCode: "5678",
      iban: "PK89MEZN************4321",
      isPrimary: false,
      isVerified: true,
      addedDate: "2024-11-15"
    }
  ];
}

function DoctorBankDetails() {
  const [accounts, setAccounts] = useState(mockBankAccounts());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    branchCode: "",
    iban: "",
    city: "",
    country: "Pakistan"
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddAccount = () => {
    if (!formData.accountName || !formData.accountNumber || !formData.bankName || !formData.iban) {
      alert("Please fill all required fields");
      return;
    }

    const newAccount = {
      id: `acc${Date.now()}`,
      ...formData,
      accountNumber: `****${formData.accountNumber.slice(-4)}`,
      iban: `${formData.iban.slice(0, 8)}**********************${formData.iban.slice(-4)}`,
      isPrimary: accounts.length === 0,
      isVerified: false,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setAccounts([...accounts, newAccount]);
    setShowAddModal(false);
    setFormData({
      accountName: "",
      accountNumber: "",
      bankName: "",
      branchCode: "",
      iban: "",
      city: "",
      country: "Pakistan"
    });
    alert("Bank account added successfully! Verification pending.");
  };

  const handleSetPrimary = (accountId) => {
    setAccounts(accounts.map(acc => ({
      ...acc,
      isPrimary: acc.id === accountId
    })));
  };

  const handleDeleteAccount = (accountId) => {
    if (window.confirm("Are you sure you want to delete this bank account?")) {
      setAccounts(accounts.filter(acc => acc.id !== accountId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bank Account Management</h1>
          <p className="text-gray-600">Manage your bank accounts for withdrawals and payments</p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8 flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
            <Shield size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Secure & Encrypted</h3>
            <p className="text-sm text-blue-700">Your bank details are encrypted and stored securely. We never share your information with third parties.</p>
          </div>
        </div>

        {/* Add New Account Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Add New Bank Account
          </button>
        </div>

        {/* Bank Accounts List */}
        <div className="space-y-4">
          {accounts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <CreditCard size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bank Accounts Added</h3>
              <p className="text-gray-600 mb-6">Add your bank account to receive payments and withdrawals</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-semibold"
              >
                Add Your First Account
              </button>
            </div>
          ) : (
            accounts.map((account) => (
              <div
                key={account.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Account Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white flex-shrink-0">
                        <Building2 size={28} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{account.bankName}</h3>
                          {account.isPrimary && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              Primary
                            </span>
                          )}
                          {account.isVerified ? (
                            <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                              <CheckCircle size={12} />
                              Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                              <AlertCircle size={12} />
                              Pending Verification
                            </span>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <User size={16} className="text-gray-400" />
                            <span className="text-sm font-medium">{account.accountName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Hash size={16} className="text-gray-400" />
                            <span className="text-sm">Account: {account.accountNumber}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <CreditCard size={16} className="text-gray-400" />
                            <span className="text-sm">IBAN: {account.iban}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            Added on {new Date(account.addedDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 lg:items-end">
                      {!account.isPrimary && account.isVerified && (
                        <button
                          onClick={() => handleSetPrimary(account.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition text-sm font-medium border border-green-200"
                        >
                          <CheckCircle size={16} />
                          Set as Primary
                        </button>
                      )}
                      <div className="flex gap-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteAccount(account.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield size={20} className="text-gray-600" />
            Security Information
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Bank accounts require verification before they can be used for withdrawals</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Verification typically takes 1-2 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Your primary account will be used for automatic withdrawals</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <span>All bank details are encrypted using industry-standard security</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Add Bank Account</h3>
                <p className="text-sm text-gray-600 mt-1">Enter your bank account details</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Account Holder Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Holder Name *
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter full name as per bank records"
                    value={formData.accountName}
                    onChange={(e) => handleInputChange("accountName", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Bank Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bank Name *
                </label>
                <div className="relative">
                  <Building2 size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.bankName}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Bank</option>
                    <option value="HBL Bank">HBL Bank</option>
                    <option value="Meezan Bank">Meezan Bank</option>
                    <option value="MCB Bank">MCB Bank</option>
                    <option value="UBL Bank">UBL Bank</option>
                    <option value="Allied Bank">Allied Bank</option>
                    <option value="Bank Alfalah">Bank Alfalah</option>
                    <option value="Faysal Bank">Faysal Bank</option>
                    <option value="Standard Chartered">Standard Chartered</option>
                  </select>
                </div>
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Number *
                </label>
                <div className="relative">
                  <Hash size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter account number"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* IBAN */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  IBAN Number *
                </label>
                <div className="relative">
                  <CreditCard size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="PK36XXXX0000001234567890"
                    value={formData.iban}
                    onChange={(e) => handleInputChange("iban", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">24-character IBAN starting with PK</p>
              </div>

              {/* Branch Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Branch Code
                </label>
                <div className="relative">
                  <Hash size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter branch code (optional)"
                    value={formData.branchCode}
                    onChange={(e) => handleInputChange("branchCode", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* City & Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
                <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <strong className="font-semibold">Important:</strong> Please ensure all details match your bank records exactly. Incorrect information may delay verification.
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAccount}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-semibold flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Add Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorBankDetails;