export interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
  categoryId: number;
  tags: string[];
  status: "draft" | "published";
  coverImage: string;
  createdAt: string;
}

export interface Author {
  id: number;
  name: string;
  avatar: string; 
  bio: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}
