import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'


const MENU_STYLE ={
  color: 'white',
  bgcolor:'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root':{
    color: 'white'
  },
  '&:hover':{
    bgcolor:'primary.50'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#34495e' : '#1976b2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label="CuongCoder"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
        Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap:'10px',
            '& .MuiAvatar-root':{
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none'
            }
          }}
        >
          <Tooltip title="CuongCoder">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/422665151_1133924447812912_5860005939907968790_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGEXDYdZbvr_BdAj990OX_LzARdLemOm4DMBF0t6Y6bgFaYByP4bcxy-lLYC8dHVkB_KpifO_vMoIzvgOF39DbX&_nc_ohc=_9QlFVKNAmMQ7kNvgFIKOOT&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AnklSyu4dUN64Anb_gdL3mj&oh=00_AYCXMx9aey2tiWXoJM8AjFmJ5BtKfckZ2bLMafgzAL5AcA&oe=66F0718E"
            />
          </Tooltip>
          <Tooltip title="CuongCoder">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/369009075_2000783996946299_2043674034863674412_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHq4YVrM1UbCZEI9T8p4PAh6KZNvc2A4Y7opk29zYDhjg1UqKa_Ukp22Dp8ARNQvfDRKooKumA6aBtjhp1-rgzf&_nc_ohc=enMZ62LtfP8Q7kNvgH_8NkR&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AywglA9Bv1qmkrzJjmXnRGS&oh=00_AYCahhjyzbobe3V3A1wwuYaJ1QNMUIQfu26bmm5SVlnF2Q&oe=66F1D5AB"
            />
          </Tooltip>
          <Tooltip title="CuongCoder">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/413800570_2077838915907473_6377802117651788616_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFM8XVafo3UEGSnSkoh-J1CUoYAbB4c-2dShgBsHhz7Z3C9puuaeLLKIraWAb4lfRrOw2klpyAo4O3LhjPy0Uo6&_nc_ohc=kqWZqB6HLGoQ7kNvgE9RENw&_nc_ht=scontent.fhan15-2.fna&oh=00_AYDlBlW37whcUL2KugJVRntgpqFNJ6v3gcUCyCyG7hR5Tg&oe=66F1D0C6"
            />
          </Tooltip>
          <Tooltip title="CuongCoder">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/422665151_1133924447812912_5860005939907968790_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGEXDYdZbvr_BdAj990OX_LzARdLemOm4DMBF0t6Y6bgFaYByP4bcxy-lLYC8dHVkB_KpifO_vMoIzvgOF39DbX&_nc_ohc=_9QlFVKNAmMQ7kNvgFIKOOT&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AnklSyu4dUN64Anb_gdL3mj&oh=00_AYCXMx9aey2tiWXoJM8AjFmJ5BtKfckZ2bLMafgzAL5AcA&oe=66F0718E"
            />
          </Tooltip>
          <Tooltip title="CuongCoder">
            <Avatar
              alt="Remy Sharp"
              src="https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/422665151_1133924447812912_5860005939907968790_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGEXDYdZbvr_BdAj990OX_LzARdLemOm4DMBF0t6Y6bgFaYByP4bcxy-lLYC8dHVkB_KpifO_vMoIzvgOF39DbX&_nc_ohc=_9QlFVKNAmMQ7kNvgFIKOOT&_nc_ht=scontent.fhan15-2.fna&_nc_gid=AnklSyu4dUN64Anb_gdL3mj&oh=00_AYCXMx9aey2tiWXoJM8AjFmJ5BtKfckZ2bLMafgzAL5AcA&oe=66F0718E"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
