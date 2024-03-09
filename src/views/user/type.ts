export type ConfigTypeItem = {
  name: string,
  options: any[]
}
export interface ConfigType {
  data: ConfigTypeItem[],
  code: number | null,
  [propName: string]: any
}

export interface DictType {
  status: any[]
}

export interface UserListItem {
  id: number,
  username: string,
  state: string,
  statusDesc: string,
  [propName: string]: any
}
export interface UserListRespone {
  data: UserListItem[],
  code: number | null,
  [propName: string]: any
}