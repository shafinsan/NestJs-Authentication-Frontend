"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { ProfileData, UpdateProfileDto } from "@/lib/types";
import ProtectedRoute from "../components/ProtectedRoute";
import { imageLink } from "@/lib/util";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UpdateProfileDto>();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/customer/profile");
      const profileData = response.data.data;
      setProfile(profileData);

      const formattedData = {
        ...profileData,
        dateOfBirth: profileData.dateOfBirth
          ? formatDateForInput(profileData.dateOfBirth)
          : "",
      };

      reset(formattedData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.match(/image\/(jpg|jpeg|png|gif)/)) {
        setMessage("Only JPG, JPEG, PNG, and GIF images are allowed");
        return;
      }

      // Check file size (3MB limit)
      if (file.size > 3 * 1024 * 1024) {
        setMessage("Image size must be less than 3MB");
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async () => {
    if (!selectedFile) {
      setMessage("Please select an image first");
      return;
    }

    setUploadingImage(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await api.post("/customer/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(response.data.data);
      setMessage("Profile image updated successfully");
      setSelectedFile(null);
      setPreviewUrl(null);

      // Refresh profile data
      setTimeout(() => {
        fetchProfile();
      }, 1000);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: UpdateProfileDto) => {
    setUpdating(true);
    setMessage("");

    try {
      const response = await api.put("/customer/profile", data);
      setProfile(response.data.data);
      setMessage("Profile updated successfully");

      setTimeout(() => {
        fetchProfile();
      }, 1000);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Error updating profile");
    } finally {
      setUpdating(false);
    }
  };

  const deleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;

    try {
      await api.delete("/customer/account");
      router.push("/login");
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Error deleting account");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-8 text-white">
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-blue-100 mt-2">
                Manage your account information and preferences
              </p>
            </div>

            {message && (
              <div
                className={`mx-6 mt-6 p-4 rounded-lg ${
                  message.includes("Error")
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}
              >
                <div className="flex items-center">
                  {message.includes("Error") ? (
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 极 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span>{message}</span>
                </div>
              </div>
            )}

            <div className="px-6 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="relative">
                  <img
                    className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
                    src={
                      previewUrl ||
                      (profile?.profileImage
                        ? imageLink + profile.profileImage
                        : "/default-avatar.png")
                    }
                    alt={`${profile?.firstName} ${profile?.lastName}`}
                  />
                  <label
                    htmlFor="profile-image-upload"
                    className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full shadow-md hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>

                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile?.firstName} {profile?.lastName}
                  </h2>
                  <p className="text-gray-600 mt-1">@{profile?.username}</p>
                  <p className="text-gray-600">{profile?.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full capitalize">
                    {profile?.role}
                  </span>

                  {selectedFile && (
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={uploadProfileImage}
                        disabled={uploadingImage}
                        className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                      >
                        {uploadingImage ? "Uploading..." : "Save Image"}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* ... rest of your form fields remain the same ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={profile?.firstName}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={profile?.lastName}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    {...register("bio")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={profile?.bio}
                    placeholder="Tell us a little about yourself..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="text"
                    {...register("phoneNumber")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={profile?.phoneNumber}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      {...register("dateOfBirth")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {profile?.dateOfBirth && (
                      <p className="text-sm text-gray-500 mt-2">
                        Current value:{" "}
                        {new Date(profile.dateOfBirth).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      {...register("gender")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={profile?.gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="nationality"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nationality
                    </label>
                    <input
                      id="nationality"
                      type="text"
                      {...register("nationality")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={profile?.nationality}
                      placeholder="Your nationality"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="religion"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Religion
                    </label>
                    <input
                      id="religion"
                      type="text"
                      {...register("religion")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={profile?.religion}
                      placeholder="Your religion"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="currentLocation"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Current Location
                  </label>
                  <input
                    id="currentLocation"
                    type="text"
                    {...register("currentLocation")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={profile?.currentLocation}
                    placeholder="City, Country"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="hometown"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Hometown
                    </label>
                    <input
                      id="hometown"
                      type="text"
                      {...register("hometown")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={profile?.hometown}
                      placeholder="Your hometown"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      ZIP Code
                    </label>
                    <input
                      id="zip"
                      type="text"
                      {...register("zip")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={profile?.zip}
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all duration-200 flex items-center justify-center"
                  >
                    {updating ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={deleteAccount}
                    className="px-6 py-3 bg-red-100 text-red-700 font-medium rounded-lg shadow-sm hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 极 00-1 1v3M4 极7h16"
                      />
                    </svg>
                    Delete Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
