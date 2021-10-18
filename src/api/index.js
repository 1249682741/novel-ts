const baseUrl = process.env.VUE_APP_BASE_API

export const Login = `${baseUrl}/user/login`
// book
export const Book_Add = `${baseUrl}/book/add`
export const Book_Del = `${baseUrl}/book/del`
export const Book_List = `${baseUrl}/book/list`
export const Book_Update = `${baseUrl}/book/update`
export const Book_Catalog = `${baseUrl}/book/catalog`
export const Book_Read = `${baseUrl}/book/read`
export const Book_Sort = `${baseUrl}/book/sort`