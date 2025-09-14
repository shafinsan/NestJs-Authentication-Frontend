"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

interface Stats {
  users: number;
  roles: number;
  activeUsers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, rolesRes] = await Promise.all([
          api.get("/admin/users?limit=10&offset=0").catch((err) => {
            console.warn("Failed to fetch users:", err);
            return { data: { total: 0, activeCount: 0 } };
          }),
          api.get("/role/data/count").catch((err) => {
            console.warn("Failed to fetch roles:", err);
            return { data: { data: { count: 0 } } };
          }),
        ]);

        setStats({
          users: usersRes.data.total || 0,
          roles: rolesRes.data.data?.count || 0,
          activeUsers: usersRes.data.activeCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center text-red-600">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium mb-2">{error}</p>
          <p className="text-sm text-gray-600">
            Please check your admin privileges.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm md:text-base font-medium text-gray-600">Total Users</h2>
              <p className="text-2xl md:text-3xl font-bold text-blue-600">
                {stats?.users || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c极 0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm md:text-base font-medium text-gray-600">Total Roles</h2>
              <p className="text-2xl md:text-3xl font-bold text-green-600">
                {stats?.roles || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm md:text-base font-medium text-gray-600">Active Users</h2>
              <p className="text-2xl md:text-3xl font-bold text-purple-600">
                {stats?.activeUsers || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/users"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Manage Users</h3>
                <p className="text-sm text-gray-500">
                  View, edit, and delete users
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/roles"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-green-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.极 37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Manage Roles</h3>
                <p className="text-sm text-gray-500">
                  View, create, edit, and delete roles
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}