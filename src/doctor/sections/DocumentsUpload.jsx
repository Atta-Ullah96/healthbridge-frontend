import { useRef, useState, useEffect } from "react";
import { Edit2, FileText, Upload, File } from "lucide-react";
import { EditModal } from "../pages/ProfilePage";
import { toast } from "react-toastify";
import { useCompleteUploadMutation, useGetDoctorDocumentsQuery, useGetDocumentViewUrlQuery, useInitiateUploadMutation } from "../../api/doctorApi";
import { Link } from "react-router-dom";


const initialDocumentsData = {
  medicalLicense: null,
  degreeCertificate: null,
};

const fieldLabels = {
  medicalLicense: "Medical License",
  degreeCertificate: "Degree Certificate",
};

function DocumentsUpload() {
  const [editing, setEditing] = useState(false);
  const [documentsData, setDocumentsData] = useState(initialDocumentsData);
  const [tempData, setTempData] = useState(initialDocumentsData);
  const [currentField, setCurrentField] = useState("");
  const fileInputRef = useRef(null);

  // RTK Query
  const [initiateUpload] = useInitiateUploadMutation();
  const [completeUpload] = useCompleteUploadMutation();
  const { data: uploadedDocs, refetch } = useGetDoctorDocumentsQuery();

  // Load existing docs
  useEffect(() => {
    if (uploadedDocs) {
      const docs = { ...initialDocumentsData };
      uploadedDocs.forEach((doc) => {
        if (doc.purpose === "medical_license") docs.medicalLicense = doc;
        if (doc.purpose === "degree_certificate") docs.degreeCertificate = doc;
      });
      setDocumentsData(docs);
    }
  }, [uploadedDocs]);

  // Open modal
  const openModal = () => {
    setTempData(documentsData);
    setEditing(true);
  };
  const closeModal = () => setEditing(false);

  // Trigger file input
  const handleButtonClick = (field) => {
    setCurrentField(field);
    fileInputRef.current.click();
  };

  // Handle file selection & upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["application/pdf"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only PDF files allowed");
      return;
    }
    if (file.size / 1024 / 1024 > 5) {
      toast.error("File size must not exceed 5MB");
      return;
    }

    try {
      const purpose = currentField === "medicalLicense" ? "medical_license" : "degree_certificate";

      // Initiate upload
      const initRes = await initiateUpload({
        fileName: file.name,
        contentType: file.type,
        size: file.size,
        purpose,
      }).unwrap();

      // Upload to S3
      await fetch(initRes.signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // Complete upload
      await completeUpload({ uploadId: initRes.uploadId }).unwrap();

      // Update temp data
      setTempData({
        ...tempData,
        [currentField]: { ...initRes, name: file.name, purpose },
      });

      toast.success(`${fieldLabels[currentField]} uploaded successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload document");
    }
  };

  const saveChanges = () => {
    setDocumentsData(tempData);
    setEditing(false);
    refetch();
  };

  const getFileIcon = (file) => <File size={20} className="text-red-500" />;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FileText size={22} className="text-blue-600" /> Documents
        </h2>
        <button
          onClick={openModal}
          className=" cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition-colors"
        >
          <Edit2 size={16} /> Edit
        </button>
      </div>

      <div className="space-y-4">
        {Object.keys(initialDocumentsData).map((field) => (
          <DocumentRow
            key={field}
            field={field}
            doc={documentsData[field]}
          />
        ))}
      </div>

      {/* Modal */}
      {editing && (
        <EditModal title="Upload Documents" onClose={closeModal} onSave={saveChanges}>
          <div className="space-y-5">
            {Object.keys(initialDocumentsData).map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {fieldLabels[field]}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleButtonClick(field)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <Upload size={16} />
                    Choose File
                  </button>
                  {tempData[field] ? (
                    <div className="flex items-center gap-2">
                      {getFileIcon(tempData[field])}
                      <span className="text-sm text-gray-700 font-medium">{tempData[field].name}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">No file selected</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Accepted formats: PDF (Max 5MB)
                </p>
              </div>
            ))}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="application/pdf"
            />
          </div>
        </EditModal>
      )}
    </div>
  );
}

// Separate component to show document row with preview link
function DocumentRow({ field, doc }) {


  
  const { data: viewUrlData } = useGetDocumentViewUrlQuery(doc?.purpose);
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm text-gray-500 mb-1">{fieldLabels[field]}</p>
        {doc ? (
          <div className="flex items-center gap-2">
            <File size={20} className="text-red-500" />
            <Link
              to={viewUrlData?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gray-900 underline hover:text-blue-600"
            >
              {doc?.purpose}
            </Link>
          </div>
        ) : (
          <p className="font-medium text-gray-400">Not uploaded yet</p>
        )}
      </div>
    </div>
  );
}

export default DocumentsUpload;
