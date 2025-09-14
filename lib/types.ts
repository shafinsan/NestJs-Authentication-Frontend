export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isActive: boolean;
  profileImage: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  profile?: Profile; 
  roleId: string; 
  resetPasswordOtp?: string | null; 
  resetPasswordOtpExpires?: Date | null; 
}
export interface Profile {
  id: string;
  bio?: string;
  dateOfBirth?: Date | string;
  gender?: string;
  phoneNumber?: string;
  nationality?: string;
  religion?: string;
  currentLocation?: string;
  zip?: string;
  hometown?: string;
}

export interface Role {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  status: boolean;
  error?: string;
  data?: {
    accessToken: string;
    id: string;
    email: string;
    username: string;
    role: string;
  };
  statusCode?: number;
  message?: string;
}

export interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
  bio?: string;
  dateOfBirth?: Date;
  gender?: string;
  phoneNumber?: string;
  nationality?: string;
  religion?: string;
  currentLocation?: string;
  zip?: string;
  hometown?: string;
  role: string;
}

export interface UpdateProfileDto {
  bio?: string;
  dateOfBirth?: Date;
  gender?: string;
  phoneNumber?: string;
  nationality?: string;
  religion?: string;
  currentLocation?: string;
  zip?: string;
  hometown?: string;
}