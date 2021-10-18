export type Page = {
  page: number,
  size: number,
  total ?: number
}

export type GetListDataParams = {
  form ?: object,
  limit ?: Page
}