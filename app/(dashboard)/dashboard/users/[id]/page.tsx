"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { User, Role, UpdateProfileDto } from "@/lib/types";
import { removeToken } from "@/lib/auth";
import { imageLink } from "@/lib/util";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [dateValue, setDateValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UpdateProfileDto>();

  useEffect(() => {
    if (params.id) {
      fetchUser();
      fetchRoles();
    }
  }, [params.id]);

  useEffect(() => {
    if (user && user.profile) {
      // Pre-fill the form with existing profile data
      setValue("bio", user.profile.bio || "");
      setValue("phoneNumber", user.profile.phoneNumber || "");
      setValue("gender", user.profile.gender || "");

      // Handle date conversion safely
     if (user.profile.dateOfBirth) {
        try {
          const date = new Date(user.profile.dateOfBirth);
          if (!isNaN(date.getTime())) {
            // Set the string value for the input
            setDateValue(date.toISOString().split("T")[0]);
            // Set the Date value for the form
            setValue("dateOfBirth", date);
          }
        } catch (error) {
          console.error("Error parsing date:", error);
        }
      }

      setValue("nationality", user.profile.nationality || "");
      setValue("religion", user.profile.religion || "");
      setValue("currentLocation", user.profile.currentLocation || "");
      setValue("zip", user.profile.zip || "");
      setValue("hometown", user.profile.hometown || "");
    }
  }, [user, setValue]);

  const fetchUser = async () => {
    try {
      console.log("Fetching user with ID:", params.id);

      // Fetch all users and find the specific one
      const response = await api.get("/admin/users");
      console.log("All users response:", response.data);

      // The API returns an ARRAY of users
      const users = Array.isArray(response.data) ? response.data : [];

      // Find the user with matching ID - ensure both are strings for comparison
      const foundUser = users.find(
        (u: User) => String(u.id) === String(params.id)
      );

      console.log("Found user:", foundUser);

      if (foundUser) {
        setUser(foundUser);
      } else {
        console.error(
          "User not found in the list. Available IDs:",
          users.map((u) => u.id)
        );
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get("/role");
      console.log("Roles response:", response.data);

      // Handle different possible response structures
      if (Array.isArray(response.data)) {
        setRoles(response.data);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setRoles(response.data.data);
      } else {
        console.warn("Unexpected roles response structure:", response.data);
        setRoles([]);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const updateUserRole = async (roleId: string) => {
    if (!user) return;

    setUpdating(true);
    try {
      await api.put(`/admin/users/${user.id}/role`, { roleId });
      fetchUser();
      const userId = JSON.parse(localStorage.getItem("user") || "{}");
      console.log(userId);
      if (user.id === userId.id) {
        removeToken();
        router.push("/login");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Error updating user role");
    } finally {
      setUpdating(false);
    }
  };

  const toggleUserStatus = async () => {
    if (!user) return;

    setUpdating(true);
    try {
      await api.put(`/admin/users/${user.id}/status`, {
        isActive: !user.isActive,
      });
      fetchUser(); // Refresh user data
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Error updating user status");
    } finally {
      setUpdating(false);
    }
  };

  const updateUserProfile = async (data: UpdateProfileDto) => {
    if (!user) return;

    setUpdating(true);
    try {
      // Update the user's profile
      await api.put(`/customer/profile`, {
        ...data,
        userId: user.id, // Send the user ID to identify which user to update
      });

      setEditingProfile(false);
      fetchUser(); // Refresh user data
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert("Error updating user profile");
    } finally {
      setUpdating(false);
    }
  };

  const deleteUser = async () => {
    if (!user || !confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${user.id}`);
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  if (loading) {
    return <div className="text-center">Loading user details...</div>;
  }

  if (!user) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">User not found</h2>
        <p className="text-gray-600 mb-4">User ID: {params.id}</p>
        <button
          onClick={() => router.push("/dashboard/users")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Details</h1>
        <button
          onClick={() => router.push("/dashboard/users")}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Back to Users
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <img
            className="h-24 w-24 rounded-full mr-6"
            src={imageLink+user.profileImage || "/default-avatar.png"}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <div>
            <h2 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600">@{user.username}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600 text-sm">ID: {user.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Account Information</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    user.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </p>
              <p>
                <span className="font-medium">Role:</span> {user.role.name}
              </p>
              <p>
                <span className="font-medium">Created:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Last Updated:</span>{" "}
                {new Date(user.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Profile Information</h3>
              <button
                onClick={() => setEditingProfile(!editingProfile)}
                className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                {editingProfile ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>

            {editingProfile ? (
              <form
                onSubmit={handleSubmit(updateUserProfile)}
                className="space-y-3"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    {...register("bio")}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    {...register("phoneNumber")}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nationality
                  </label>
                  <input
                    type="text"
                    {...register("nationality")}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Religion
                  </label>
                  <input
                    type="text"
                    {...register("religion")}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Current Location
                  </label>
                  <input
                    type="text"
                    {...register("currentLocation")}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    {...register("zip")}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Hometown
                  </label>
                  <input
                    type="text"
                    {...register("hometown")}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {updating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            ) : user.profile ? (
              <div className="space-y-2">
                {user.profile.bio && (
                  <p>
                    <span className="font-medium">Bio:</span> {user.profile.bio}
                  </p>
                )}
                {user.profile.phoneNumber && (
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {user.profile.phoneNumber}
                  </p>
                )}
                {user.profile.gender && (
                  <p>
                    <span className="font-medium">Gender:</span>{" "}
                    {user.profile.gender}
                  </p>
                )}
                {user.profile.dateOfBirth && (
                  <p>
                    <span className="font-medium">Date of Birth:</span>{" "}
                    {new Date(user.profile.dateOfBirth).toLocaleDateString()}
                  </p>
                )}
                {user.profile.nationality && (
                  <p>
                    <span className="font-medium">Nationality:</span>{" "}
                    {user.profile.nationality}
                  </p>
                )}
                {user.profile.religion && (
                  <p>
                    <span className="font-medium">Religion:</span>{" "}
                    {user.profile.religion}
                  </p>
                )}
                {user.profile.currentLocation && (
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {user.profile.currentLocation}
                  </p>
                )}
                {user.profile.zip && (
                  <p>
                    <span className="font-medium">ZIP:</span> {user.profile.zip}
                  </p>
                )}
                {user.profile.hometown && (
                  <p>
                    <span className="font-medium">Hometown:</span>{" "}
                    {user.profile.hometown}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No profile information available
              </p>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-4">Manage User</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Change Role
              </label>
              <select
                value={user.role.id}
                onChange={(e) => updateUserRole(e.target.value)}
                disabled={updating}
                className="px-4 py-2 border rounded-md"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                onClick={toggleUserStatus}
                disabled={updating}
                className={`px-4 py-2 rounded-md text-white ${
                  user.isActive
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {user.isActive ? "Deactivate User" : "Activate User"}
              </button>
            </div>

            <div>
              <button
                onClick={deleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
