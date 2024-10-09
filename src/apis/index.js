import axios from 'axios'
import Board from '~/pages/Boards/_id'
import { API_ROOT } from '~/ultils/constants'

/**
 * Lưu ý: Đối với việc sử dụng axios ở đây
 * Tất cả các function ở bên dưới thì mình chỉ request và lấy data từ response luôn, mà ko có try
 * catch hay then catch gì để bắt lỗi
 * Lý do là vì ở phía Frontend chúng ta ko cần thiết phải làm như vậy đối với các request bởi nó sẽ gây ra việc dư
 * thừa code catch lỗi quá nhiều
 * Giải pháp Clean Code gọn gàng đó là chúng ta catch lỗi tập trung tại một nơi bằng cách tận dụng một thứ cực kỳ mạnh mẽ
 * trong axios đó là Interceptors
 * Hiểu đơn giản Interceptors là cách mà chúng ta sẽ đánh chặn giữa request hoặc response để xử lý logic mà chúng ta muốn.
 */

/** Boards */
export const fetchBoardDetailsAPI = async (boardId) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  //Lưu ý: axios sẽ trả về kết quả qua property của nó là data
  return request.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return request.data
}

/** Columns */
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}


/** Cards */
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
