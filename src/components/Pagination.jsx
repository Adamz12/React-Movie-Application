import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme with the desired color for the pagination numbers
const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        ul: {
          '& .MuiPaginationItem-root': {
            color: 'white', // Replace 'red' with your desired color
          },
        },
      },
    },
  },
});

// Inside your component, wrap the pagination component with the custom theme provider
function MyComponent() {
    
  return (
    <ThemeProvider theme={theme}>
      <Pagination count={5} />
    </ThemeProvider>
  );
}

export default MyComponent;
