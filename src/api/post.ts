import { http } from '../utils/http';

export function createPost({ id, content, fileName, readingDate }: CreatePost) {
  return http.post('post', {
    id,
    content,
    fileName,
    readingDate,
  });
}


export function getPost({ id, page, size }: GetPost) {
  return http.get<GetPostResponse>('post', {
    params: {
      id,
      page,
      size,
    },
  });
}

export interface Post {
  id: string;
  content: string;
  fileName: string;
  insertDt: string;
  lockYn: string;
  nickname: string;
  readingDate: string;
}

export interface GetPost {
  id: string;
  page: number;
  size: number;
}

export interface CreatePost {
  id: string;
  content: string;
  fileName: string;
  readingDate: string;
}

interface CommonListResponse<T> {
  content: T[];
  total: number;
}

interface GetPostResponse extends CommonListResponse<Post> {
  nickname: string;
}