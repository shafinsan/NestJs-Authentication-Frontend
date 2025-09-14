"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { User } from "@/lib/types";
import { imageLink } from "@/lib/util";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let url = `/admin/users?limit=10&offset=${(currentPage - 1) * 10}`;
      
 
      if (isSearching && searchEmail) {
        url = `/admin/users/search-by-email?email=${encodeURIComponent(searchEmail)}&limit=10&offset=${
          (currentPage - 1) * 10
        }`;
      }

      const response = await api.get(url);
      console.log("Users API response:", response.data);

   
      let usersData = [];
      let totalCount = 0;

      if (Array.isArray(response.data)) {
       
        usersData = response.data;
        totalCount = usersData.length;
      } else if (response.data && Array.isArray(response.data.users)) {
       
        usersData = response.data.users;
        totalCount = response.data.totalCount || usersData.length;
      } else if (response.data && Array.isArray(response.data.data)) {
   
        usersData = response.data.data;
        totalCount = response.data.total || usersData.length;
      } else {
  
        usersData = response.data || [];
        totalCount = usersData.length;
      }

      setUsers(usersData);
      setTotalUsers(totalCount);
      setTotalPages(Math.ceil(totalCount / 10));
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
      setTotalUsers(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setCurrentPage(1);
    fetchUsers();
  };

  const handleClearSearch = () => {
    setSearchEmail("");
    setIsSearching(false);
    setCurrentPage(1);
    fetchUsers();
  };

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      await api.put(`/admin/users/${userId}/status`, { isActive: !isActive });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Error updating user status");
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">User Management</h1>

      <div className="mb-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="px-4 py-2 border rounded-md flex-grow"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex-1"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 flex-1"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {users.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600">
            {isSearching && searchEmail 
              ? `No users found matching "${searchEmail}"` 
              : "No users found."
            }
          </p>
        </div>
      ) : (
        <>
          <div className="block md:hidden space-y-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="h-12 w-12 flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={user.profileImage || "/default-avatar.png"}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-md font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      @{user.username}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm truncate">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="text-sm">{user.role?.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-3 border-t border-gray-100">
                  <Link
                    href={`/dashboard/users/${user.id}`}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => toggleUserStatus(user.id, user.isActive)}
                    className={`text-sm font-medium ${
                      user.isActive
                        ? "text-yellow-600 hover:text-yellow-900"
                        : "text-green-600 hover:text-green-900"
                    }`}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={imageLink+user.profileImage || "/default-avatar.png"}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/dashboard/users/${user.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => toggleUserStatus(user.id, user.isActive)}
                        className={`mr-3 ${
                          user.isActive
                            ? "text-yellow-600 hover:text-yellow-900"
                            : "text-green-600 hover:text-green-900"
                        }`}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-700">
              Showing {users.length} of {totalUsers} users
              {isSearching && searchEmail && (
                <span className="ml-2 text-blue-600">
                  (Search: "{searchEmail}")
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-200 rounded-md disabled:opacity-50 text-sm"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages || users.length < 10}
                className="px-3 py-2 bg-gray-200 rounded-md disabled:opacity-50 text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}