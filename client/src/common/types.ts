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
}

export interface AdminResponse {
  author: number;
  content: string;
  excerpt: string;
  id: number;
  slug: string;
  status: string;
  title: string;
}
