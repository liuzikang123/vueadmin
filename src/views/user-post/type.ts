export interface UserPostItem {
  code: string,
  post_name: string,
  [propName: string]: any
}

export interface UserPostRespone {
  data: UserPostItem[],
  code: number | null,
  [propName: string]: any
}