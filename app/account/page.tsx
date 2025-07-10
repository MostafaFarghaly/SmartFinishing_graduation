"use client";
import { useState, useRef, useEffect } from "react";
import { useLoginClient } from "../context/regester/login_context";
import { useToken } from "../context/token_context";
import {
  FaUserCircle,
  FaLock,
  FaWallet,
  FaUser,
  FaQuestionCircle,
  FaTrash,
} from "react-icons/fa";
import Image from "next/image";
import Navbar from "../components/Nav/page";
import "@fortawesome/fontawesome-free/css/all.min.css";


export default function Account() {
  const { saveData, updateProfilePicture, deleteProfilePicture } = useLoginClient();
  const { userData } = useToken(); // ✅ تم وضعه قبل أي return
  const userRole =
    userData?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "";

  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(""); // <-- add this
  const fileInputRef = useRef(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
      setUploadStatus(null);
      setUploadErrorMessage("");
    }
  };

  const uploadProfilePictureToServer = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      const newUrl = await updateProfilePicture(selectedFile);
      setUploadStatus("success");
      setUploadErrorMessage("");
      setProfileImage(newUrl);
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
      setUploadErrorMessage(error.message || "An error occurred while uploading the image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePicture = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the image?");
    if (confirmDelete) {
      setIsDeleting(true);
      setDeleteMessage(""); // clear previous message
      const res = await deleteProfilePicture();
      setIsDeleting(false);
      if (res.success) {
        setProfileImage(null);
        setDeleteMessage("Image deleted successfully");
      } else {
        setDeleteMessage(res.message || "Failed to delete image");
      }
    }
  };

  useEffect(() => {
    if (saveData?.profilePictureUrl) {
      setProfileImage(saveData.profilePictureUrl);
    }
  }, [saveData?.profilePictureUrl]);

  useEffect(() => {
    return () => {
      if (profileImage?.startsWith("blob:")) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  if (!saveData) {
    return (<>
      <Navbar />
      <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-green-600 border-gray-300 mb-4"></div>
      <h3 className="text-lg font-semibold text-gray-700">جارٍ تحميل البيانات...</h3>
      <p className="text-sm text-gray-400 mt-1">يرجى الانتظار قليلًا</p>
      </div>
    </>);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <div className="flex flex-col md:flex-row p-4 gap-4 md:gap-6">
      {/* Left - Profile Card */}
      <div className="bg-white rounded-lg shadow w-full md:w-1/3 lg:w-1/4 text-center py-6 px-4">
        {profileImage ? (
          <Image
            width={112}
            height={112}
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-gray-400 mx-auto text-6xl sm:text-7xl" />
        )}
        <h2 className="text-base sm:text-lg font-semibold mt-4 break-words">{saveData.displayName}</h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-4 break-words">{saveData.email}</p>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="flex justify-center items-center gap-2 mt-2 flex-wrap">
          <button
            onClick={handleUploadClick}
            className="border border-gray-300 px-4 py-2 text-xs sm:text-sm rounded-md"
          >
            Upload photo
          </button>
          {saveData?.profilePictureUrl && (
            <button
              onClick={handleDeletePicture}
              title="Delete image"
              className="text-red-600 hover:text-red-800 text-xl flex items-center justify-center"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                <FaTrash />
              )}
            </button>
          )}
        </div>

        {selectedFile && (
          <div className="mt-3 space-y-2">
            <button
              onClick={uploadProfilePictureToServer}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center text-xs sm:text-sm"
              disabled={isUploading}
            >
              {isUploading ? (
                <i className="fa fa-spinner fa-spin mr-2"></i>
              ) : null}
              Save Image
            </button>
            {uploadStatus === "success" && (
              <p className="text-green-600 text-xs sm:text-sm">✅ Image saved successfully</p>
            )}
            {uploadStatus === "error" && (
              <p className="text-red-600 text-xs sm:text-sm">❌ {uploadErrorMessage}</p>
            )}
          </div>
        )}
        {deleteMessage && (
          <p className={`mt-2 text-xs sm:text-sm ${deleteMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {deleteMessage}
          </p>
        )}
      </div>

      {/* Right - Info Boxes */}
      <div className="flex-1 space-y-3 sm:space-y-4">
        <InfoBox
          icon={<FaUser />}
          title="My profile"
          desc="Edit your profile picture, name, email, phone number, and Location"
          onClick={() => (window.location.href = "/updateaccount")}
        />
        <InfoBox
          icon={<FaWallet />}
          title="Safe"
          desc="Top up your account, check your balance, and manage your payment preferences."
          onClick={() => (window.location.href = "/payment")}
        />
        <InfoBox
          icon={<FaLock />}
          title="Change password"
          desc="Update and manage your password."
          onClick={() => (window.location.href = "/changepassword")}
        />
        <InfoBox
          icon={<FaQuestionCircle />}
          title="Help"
          desc="Need help?"
          onClick={() => (window.location.href = "/PrivacyPage")}
        />
        {userRole === "Worker" && saveData?.workerId && (
          <InfoBox
            icon={<FaUser />}
            title="My public profile"
            desc="View your public profile page"
            onClick={() => (window.location.href = `/viewprofile/${saveData.workerId}`)}
          />
        )}
      </div>
      </div>
      <footer className="text-sm text-gray-500 text-center py-6 border-t">
        2025 Lilason, Inc. –{" "}
        <a href="#" className="underline">
          Terms of Use
        </a>{" "}
        –{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>{" "}
        –{" "}
        <a href="#" className="underline">
          Accessibility
        </a>{" "}
        –{" "}
        <a href="#" className="underline">
          Service Code
        </a>
      </footer>
    </div>
  );
}

function InfoBox({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-3 sm:p-4 rounded shadow cursor-pointer hover:bg-gray-50"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-3">
          <div className="text-lg sm:text-xl text-green-600">{icon}</div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{desc}</p>
          </div>
        </div>
        <span className="text-xl text-gray-400">›</span>
      </div>
    </div>
  );
}
