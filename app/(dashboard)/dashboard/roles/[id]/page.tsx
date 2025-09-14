'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { Role } from '@/lib/types';

interface RoleFormData {
  name: string;
}

export default function RoleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(params.id === 'create');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RoleFormData>();

  useEffect(() => {
    if (params.id !== 'create') {
      fetchRole();
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const fetchRole = async () => {
    try {
      const response = await api.get(`/role/${params.id}`);
      setRole(response.data.data);
      setValue('name', response.data.data.name);
    } catch (error) {
      console.error('Error fetching role:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: RoleFormData) => {
    try {
      if (params.id === 'create') {
        await api.post('/role', data);
      } else {
        await api.put(`/role/${params.id}`, data);
      }
      router.push('/dashboard/roles');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error saving role');
    }
  };

  const deleteRole = async () => {
    if (!confirm('Are you sure you want to delete this role?')) return;
    
    try {
      await api.delete(`/role/${params.id}`);
      router.push('/dashboard/roles');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error deleting role');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditing ? (params.id === 'create' ? 'Create Role' : 'Edit Role') : 'Role Details'}
        </h1>
        <button
          onClick={() => router.push('/dashboard/roles')}
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Back to Roles
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Role Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { 
                  required: 'Role name is required',
                  minLength: { value: 5, message: 'Role name must be at least 5 characters' },
                  maxLength: { value: 50, message: 'Role name must be less than 50 characters' }
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {params.id === 'create' ? 'Create Role' : 'Update Role'}
              </button>
              {params.id !== 'create' && (
                <button
                  type="button"
                  onClick={deleteRole}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete Role
                </button>
              )}
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Role Information</h2>
              <p className="mt-2"><strong>Name:</strong> {role?.name}</p>
              <p className="mt-2"><strong>Created:</strong> {role && new Date(role.createdAt).toLocaleDateString()}</p>
              <p className="mt-2"><strong>Updated:</strong> {role && new Date(role.updatedAt).toLocaleDateString()}</p>
            </div>
            
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Role
            </button>
          </div>
        )}
      </div>
    </div>
  );
}