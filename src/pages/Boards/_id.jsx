// Board Details
import Container from '@mui/material/Container'
import BoardBar from './Boardbar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import BoardContent from './BoardContent/BoardContent'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
