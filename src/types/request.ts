export interface RequestResult<T = any> {
  code: number
  data: T
  message: string | null
}