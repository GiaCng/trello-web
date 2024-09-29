import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>

        <CardContent sx={{
          p: 1.5,
          '&:last-child': { p: 1.5 }
        }}>
          <Typography >Card test</Typography>
        </CardContent>

      </MuiCard>

    )
  }

  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/252769605_581457299726299_5355217570540925881_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGTmoYhzP9ZPx4uBLYuDe43ka2p6aM9FdiRranpoz0V2Bzlfju3rzpgTN0sV8apy7tRaMY2Oic-RhIdT9TdKCNC&_nc_ohc=cLSqU4omNV8Q7kNvgGM2WUl&_nc_ht=scontent.fhan5-6.fna&_nc_gid=AbC5LYlzCcNpQqaGHw2MSHi&oh=00_AYCydWDUaDT8ewPyYtq8tOFD28I5DDFMQolfZBjimFnQFw&oe=66F5E426"
        title="green iguana"
      />
      <CardContent sx={{
        p: 1.5,
        '&:last-child': { p: 1.5 }
      }}>
        <Typography >CuongCoder MERN</Typography>

      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>20</Button>
        <Button size="small" startIcon={<CommentIcon />}>15</Button>
        <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card