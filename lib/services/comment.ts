import { API_CONFIG } from "@/config/api";

export interface User {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  blog_id: number;
  parent_id: number | null;
  user_id?: number | null;
  user?: User | null;
  name: string;
  email: string | null;
  comment: string;
  status?: string;
  created_at: string;
  replies?: Comment[];
}

export interface CommentInput {
  blog_id: number;
  parent_id: number | null;
  name: string;
  email: string;
  comment: string;
}

interface CommentApiResponse {
  data: Comment[] | { data: Comment[] };
}

export async function getComments(blogId: number): Promise<Comment[]> {
  const res = await fetch(`${API_CONFIG.endpoints.comments.getByBlog}/${blogId}`, {
    headers: API_CONFIG.defaultOptions.headers as Record<string, string>,
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json: CommentApiResponse = await res.json();
  const raw = Array.isArray(json.data)
    ? json.data
    : (json.data as { data: Comment[] }).data ?? [];

  // Group replies under their parent client-side (handles flat API responses)
  const topLevel = raw.filter((c) => !c.parent_id);
  const replies   = raw.filter((c) => !!c.parent_id);
  for (const top of topLevel) {
    top.replies = replies.filter((r) => r.parent_id === top.id);
  }
  return topLevel;
}

export async function postComment(input: CommentInput): Promise<Comment> {
  const res = await fetch(API_CONFIG.endpoints.comments.create, {
    method: "POST",
    headers: API_CONFIG.defaultOptions.headers as Record<string, string>,
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? `HTTP ${res.status}`);
  }
  const json = await res.json();
  return (json.data ?? json) as Comment;
}
