import {
    createMuiTheme,
  } from "@material-ui/core"

export const theme = createMuiTheme({
    overrides: {
      MuiIconButton: {
        root: {
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: "rgba(255,0,0,0.8)",
          },
        }
      }
    },
    palette: {
      primary: {
        main: '#74d14c' //green color
      },
      secondary: {
        main: "#06d8ef" //blue light
      }
    },
    props: {
      // Name of the component
      MuiButtonBase: {
        disableRipple: true // No more ripple, on the whole application!
      }
    },
  
  });

