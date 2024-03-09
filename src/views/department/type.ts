export interface DepartmentItem {
  code: string,
  department_name: string,
  [propName: string]: any
}

export interface DepartmentRespone {
  data: DepartmentItem[],
  code: number | null,
  [propName: string]: any
}