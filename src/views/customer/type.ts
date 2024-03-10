export interface CustomertItem {
  id: number,
  name: string,
  phone: number,
  [propName: string]: any
}

export interface CustomertRespone {
  data: CustomertItem[],
  code: number | null,
  [propName: string]: any
}