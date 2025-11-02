import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, Box, Grid, Typography } from '@mui/material';
import {Link} from 'react-router-dom'
import { CallLogContext } from '../../ContextPage/Context';

const buttonData = [
  { label: 'Start QA', icon: <PlayArrowIcon />, to: "/capture-form" },
  { label: 'View', icon: <VisibilityIcon /> , to: "/view-options" },
  { label: 'COMMERCIAL CBI', icon: <AccountBalanceIcon />, to: "/commercial-cbi"  },
  { label: 'Dashboard', icon: <DashboardIcon />, to: "/dashboard"  },
];

const Homebuttons = () => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: { xs: 2, sm: 4, md: 6 }, // smaller margin on small screens
        px: 2,
        width: '100%',
      }}
    >
      <Grid container spacing={3}>
        {buttonData.map(({ label, icon, to }) => (
          <Grid item size={{ xs:12, sm:6}} key={label}>
            <Button
              variant="contained"
              fullWidth
              startIcon={icon}
              LinkComponent={Link}
              to={to}
              sx={{
                py: { xs: 1.5, md: 2.5 },   // smaller padding on small screens
                fontSize: { xs: '0.9rem', md: '1.1rem' }, // responsive text size
                borderRadius: 2,
                backgroundColor: 'white',
                color: 'black',
                boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgb(116, 111, 121)',
                  transform: 'translateY(-4px)',
                  color: 'white',
                  boxShadow: '0 8px 20px rgba(52, 53, 54, 0.5)',
                },
              }}
              aria-label={label}
            >
              {label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default Homebuttons