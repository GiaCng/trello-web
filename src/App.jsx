

import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Typography from '@mui/material/Typography'

function App() {
  return (
    <>
      <div>Cuongdeptrai</div>
      
      <Typography variant='body2' color='text.secondary'>Test Typography</Typography>

      <Button variant="text">Text</Button>
      <Button variant="contained" color='success'>Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <br />
      <AccessAlarmIcon></AccessAlarmIcon>
      <ThreeDRotation />
    </>
  )
}

export default App
