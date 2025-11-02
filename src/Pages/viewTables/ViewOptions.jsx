import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Button, Box, Grid, Card, CardActions, CardMedia, CardContent } from '@mui/material';
import {Link} from 'react-router-dom'
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

const buttonData = [
  { label: 'QA RESULTS', icon: <InsertChartOutlinedIcon />, to: "/view-data" },
  { label: 'FINDINGS', icon: <VisibilityIcon /> , to: "/view-findings" },
];

const ViewOptions = () => {
  return (
    <Box
      sx={{
        minWidth:'50%',
        mx: 'auto',
        mt: 50,
        px: 2
      }}
    >
      <Grid container spacing={3}>
        {buttonData.map(({ label, icon, to}) => (

          <Grid item size={{xs:12, md:12,lg:6}} key={label}>
            <Button
              variant="contained"
              
              fullWidth
              startIcon={icon}

              LinkComponent={Link}
              to={to}

              sx={{
                py: 2.5,
                fontSize: '1.1rem',
                borderRadius: 2,
                backgroundColor:"white",
                color:"black",
                boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgb(116, 111, 121)',
                  transform: 'translateY(-4px)',
                  color:"White",
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

export default ViewOptions;