export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/**
 * Cách xử lý bug logic thư viện Dnd-kit khi Column là rỗng:
 * phía FE sẽ tự tạo ra một cái card đặc biệt: Placeholder Card, ko liên quan tới Back-end
 * Card đặc biệt này sẽ được ẩn ở giao diện UI người dùng
 * Cấu trúc Id của cái card này để Unique rất đơn giản, ko cần phải làm random phức tạp:
 * "columnId-placeholder-card" (mỗi column chỉ có thể có tối đa một cái Placeholder Card)
 * Quan trọng khi tạo: phải đầy đủ: (_id, boardId, columnId, FE_PlaceholderCard)
 */

export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}