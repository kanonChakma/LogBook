export interface CategoryType {
  id: number;
  name: string;
}
export interface ReactionType {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}
export interface SinglePostType {
  id?: number;
  author?: number;
  author_name?: string;
  content: string;
  excerpt: string;
  slug: string;
  status?: string;
  title: string;
  category?: number;
  category_name?: string;
  post_image: string;
  author_profile_image?: string;
  published: Date;
}

export interface AdminResponse {
  author: number;
  content: string;
  excerpt: string;
  id: number;
  slug: string;
  status: string;
  title: string;
  author_name: string;
  author_profile_image: string;
  category_name: string;
}

export interface CommentType {
  content: string;
  created_at: string;
  id: number;
  post: number;
  user: number;
  user_profile_image: string;
  user_username: string;
}
export interface TokenType {
  access: string;
  refresh: string;
}

export interface ProfileType {
  about: string;
  email: string;
  id: number;
  profile_image?: string;
  start_date: string;
  user_name: string;
  gender?: string;
  birth_date?: string;
  first_name?: string;
  last_name?: string;
  contact_number?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  userId: string;
  access: string;
  username: string;
  refresh: string;
}

export interface ApiError {
  message: string;
  code: number;
}

export interface authType {
  loading: boolean;
  userInfo: ProfileType;
  userCredentials: LoginResponse;
  error: ApiError | null;
  success: boolean;
}
