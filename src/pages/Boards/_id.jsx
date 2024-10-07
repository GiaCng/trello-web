// Board Details
import Container from '@mui/material/Container'
import BoardBar from './Boardbar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'
// import {mockData} from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'


function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Tạm thời fix cứng boardId, flow chuẩn chỉnh là sử dụng react-router-dom để lấy chuẩn boardId từ URL về. 
    const boardId ='67035569d3b1aa0a58edc33c'
    //Call API
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })

  }, [])
  console.log(board)

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
