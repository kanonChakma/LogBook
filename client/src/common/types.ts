export interface CategoryType {
  id: number;
  name: string;
}

export interface SinglePostType {
  author?: number;
  content: string;
  excerpt: string;
  slug: string;
  status?: string;
  title: string;
  category?: number;
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
