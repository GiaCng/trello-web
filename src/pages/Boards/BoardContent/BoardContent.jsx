import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/ultils/sorts'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'

import Columns from './ListColumns/Columns/Columns'
import Card from './ListColumns/Columns/ListCards/Cards/Cards'

const ACTIVE_DRAG_ITEM_TYPE ={
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {

  // Nếu dùng PointerSensor mặc định thì phải kết hợp với thuộc tính Css touch-action: none ở những phần tử kéo thả nhưng có bug
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // Nhấn giữ 250ms và dung sai của cảm ứng( dễ hiểu là di chuyển/ chênh lệch 5px) thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  // ưu tiên sử dụng kết hợp hai loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)

  const [activeDragItemType, setActiveDragItemType] = useState(null)

  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver chúng ta sẽ
    // làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo cardOrderIds mới
    return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  // Cập nhật lại state trong trường hợp di chuyển card giữa các Columns khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDragginhCardId,
    activeDraggingCardData
  ) => {

    setOrderedColumns(prevColumns => {
      // Tìm vị trí (index) của cái overCard trong column đích (nơi mà activeCard dc kéo đến)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      // Logic tính toán "cardIndex mới " (trên hoặc dưới của overCard) lấy chuẩn ra từ code cua thư viện
      let newCardIndex
      const isBelowOverItem= active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      //Clone
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // nextActiveColumn: Column cũ
      if (nextActiveColumn) {
        // Xóa card ở cái column  (cũng có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDragginhCardId)

        // Cập nhật lại mảng cardOderIds cho chuẩn dữ liệu
        nextActiveColumn.cardsOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // nextOverColumn: Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần phải xóa nó trước đi
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragginhCardId)

        // Đới với trường hợp DragEnd thì phải cập nhật lại chuẩn dữ liệu columnId trong card
        // sau khi kéo card giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // console.log(rebuild_activeDraggingCardData)

        // Tiếp theo là thêm cái card đag kéo vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

      }

      // console.log('nextColumns', nextColumns)

      return nextColumns
    })
  }

  // Trigger khi bat dau keo mot phan tu
  const handleDragStart =(event) => {
    // console.log(event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }
  // console.log(activeDragItemData)
  //Trigger trong qua trinh keo mot phan tu
  const handleDragOver =(event) => {

    // Khong lam gi khi dang keo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // console.log('handleDragOver:', event)
    // Còn nếu kéo card thì xử lý thêm để có thể kéo card qua các column
    const { active, over } = event

    // Kiểm tra nếu ko tồn tại over hay active (kéo linh tinh ra ngoài thì return luôn)
    if (!active || !over) return

    // acvtiveDragging là cái card đang được kéo
    const { id : activeDragginhCardId, data: { current: activeDraggingCardData } } =active
    // overCard là cái đang được tương tác trên hoặc dưới so với cái đang dc kéo
    const { id: overCardId } = over

    // Tìm 2 cái columns theo cardId
    const activeColumn =findColumnByCardId(activeDragginhCardId)
    const overColumn = findColumnByCardId(overCardId)
    // console.log('activeColumn', activeColumn)
    // console.log('overColumn', overColumn)

    // Nếu không tồn tại 1 trong 2 column thì ko làm gì hết tránh crash
    if (!activeColumn || !overColumn) return

    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu
    // của nó thì ko làm gì
    //Vì đây là đoạn xử lý lúc kéo (handleDragOver), còn xử lý lúc kéo xog xuôi thì nó lại là vấn đề khác ở (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDragginhCardId,
        activeDraggingCardData
      )

    }
  }

  // Trigger khi ket thuc keo mot phan tu

  const handleDragEnd = (event) => {
    // console.log('handleDragEnd:', event)
    const { active, over } = event

    // Kiểm tra nếu ko tồn tại over (kéo linh tinh ra ngoài thì return luôn)
    if (!active || !over) return

    // Xử lý kéo thả Cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Hanh dong keo tha card')
      // acvtiveDragging là cái card đang được kéo
      const { id : activeDragginhCardId, data: { current: activeDraggingCardData } } =active
      // overCard là cái đang được tương tác trên hoặc dưới so với cái đang dc kéo
      const { id: overCardId } = over

      // Tìm 2 cái columns theo cardId
      const activeColumn =findColumnByCardId(activeDragginhCardId)
      const overColumn = findColumnByCardId(overCardId)
      // console.log('activeColumn', activeColumn)
      // console.log('overColumn', overColumn)

      // Nếu không tồn tại 1 trong 2 column thì ko làm gì hết tránh crash
      if (!activeColumn || !overColumn) return

      // Hành động kéo thả giữa hai column khác nhau
      // Phải dùng tới activeDragItemData.columnId hoặc oldColumnWhenDraggingCard._id ( set vào state từ bước handleDragStart) chứ ko phải
      // activeData trong scope handleDragEnd này vì sau khi đi qua onDragOver tới đây là state của card đã được cập nhật
      // một lần rồi
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDragginhCardId,
          activeDraggingCardData
        )
      } else {
        // Hành động kéo thả card trong cùng cái column
        //lấy vị trí cũ từ thằng oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        //lấy vị trí mới từ thằng overColumn
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        // Dùng arrayMove vì kéo card trong cùng column giống như kéo column trong một cái boardContent
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {

          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới Column đag thả
          const targetColumn = nextColumns.find(column => column._id === overColumn._id )

          //Cập nhật lại 2 giá trị mới là card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds= dndOrderedCards.map( card => card._id)
          // console.log(targetColumn)

          // Trả về giá trị mới chuẩn vị trí
          return nextColumns
        })
      }
    }

    // Xử lý kéo thả Columns trong boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
      if (active.id !== over.id) {
        //lấy vị trí cũ từ thằng active
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        //lấy vị trí mới từ thằng over
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)

        //Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
        // Code của thằng arrayMove ở đây: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // 2 cai console.log dữ liệu này để sau này xử lý API
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log('dndOrderedColumns', dndOrderedColumns)
        // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)

        setOrderedColumns(dndOrderedColumns)
      }
    }
    //Nếu vị trí sau khi kéo thả khác vị trí ban đầu

    // Những giá trị này luôn phải đưa về null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)

  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles : { active:{ opacity: '0.5' } } })
  }
  return (
    <DndContext
      sensors={sensors}
      // cảm biến (video 30)
      collisionDetection={closestCorners}
      // thuật toán phát hiện va chạm ( nếu ko có nó thì card với cover lớn thì sẽ ko kéo qua
      // Column được vì lúc này nó đang bị conflict giữa card và column), chúng ta sẽ dùng closestCorners thay vì closetCenter
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#34495e' : '#1976b2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>

        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Columns column={activeDragItemData} /> }
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} /> }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
