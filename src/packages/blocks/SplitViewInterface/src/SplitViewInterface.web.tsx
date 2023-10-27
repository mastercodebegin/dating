import React from "react";

import {
  Container,
  Box,
  Button,
  Typography,
  // Customizable Area Start
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Snackbar
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { userAvatar } from "./assets";
import Alert from '@material-ui/lab/Alert';

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

// Customizable Area End

import SplitViewInterfaceController, {
  Props,
  configJSON,
} from "./SplitViewInterfaceController";

export default class SplitViewInterface extends SplitViewInterfaceController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Box style={{ background: '#a9a4a4' }}>
          <Container maxWidth={"sm"}>
            <Box sx={webStyle.mainWrapper}>
              <Box style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '550px',
                height: 'auto',
              }}>
                <Box>
                  <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '30px',
                    maxWidth: '325px',
                    width: '100%',
                  }}>
                    <Box style={{ flex: '0 0 45%' }}>
                      <Box style={webStyle.userData} data-test-id="showprofiledetail" onClick={this.handleProfileImageClick}>
                        <Avatar src={userAvatar} style={webStyle.userAvatar} />
                        <Typography component="span" style={{ fontSize: '30px' }} >{this.state.myInfo.attributes.score}</Typography>
                      </Box>
                      <Typography
                        component="p"
                        style={{
                          maxWidth: '130px',
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          padding: '10px 0'
                        }}>{this.state.myInfo.attributes.user_name}</Typography>
                    </Box>
                    <Box style={{ flex: '0 0 10%', fontWeight: 600, fontSize: "20px" }}>
                      VS
                    </Box>
                    <Box style={{ flex: '0 0 45%' }}>
                      <Box
                        onClick={this.handleProfileImageClick}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '30px',
                          justifyContent: 'flex-end'
                        }}>
                        <Typography component="span" style={{ fontSize: '30px' }} >{this.state.opponentsInfo.attributes.score}</Typography>
                        <Avatar src={userAvatar} style={webStyle.userAvatar} />
                      </Box>
                      <Typography
                        component="p"
                        style={{
                          margin: '0',
                          textAlign: 'right',
                          padding: '10px 0',
                          wordBreak: 'break-word'
                        }}>
                        {this.state.opponentsInfo.attributes.user_name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box style={{ background: '#ffd67b', padding: '12px', borderRadius: '15px', width: '100%', maxWidth: '300px', minWidth: '300px' }}>
                  <Box>
                    <Typography component="span" style={{ fontSize: '12px' }}>{`Question ${this.state.questionIndex + 1} of ${this.state.questionData.length} (Level 1)`}</Typography>
                    <Typography variant="h5" component="p" style={{ fontSize: '18px' }}>{this.state.currentQuestion.attributes.question}</Typography>
                  </Box>
                  <Box>
                    <FormControl component="fieldset" style={{ width: '100%', marginTop: '10px' }}>
                      <RadioGroup aria-label="options" name="options" value={this.state.selectedOption}>
                        {
                          this.state.options.map((option, index) => (
                            <FormControlLabel
                              key={index}
                              style={webStyle.radiostyle}
                              value={option}
                              data-test-id={`selectOption${index}`}
                              control={<Radio color="primary" />}
                              label={option}
                              onClick={() => {
                                this.onRadioBtnClick(option);
                              }} />
                          ))
                        }
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        {this.state.gameMessage && (
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            style={webStyle.anchorOriginTopCenter}
            open={this.state.toggleSnackbar}
            data-test-id="closeToast"
            onClose={this.onCloseMessage}
            autoHideDuration={3000}
          >
            <Alert severity="info">{this.state.gameMessage}</Alert>
          </Snackbar>
        )}
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    maxWidth: '400px',
    margin: 'auto',
    background: '#e9e4e4',
  },
  inputStyle: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
  userData: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  userAvatar: {
    border: '3px solid #ffd67b',
    borderRadius: '10px',
    width: '60px',
    height: '60px',
    margin: '0 10px',
    cursor: 'pointer'
  },
  anchorOriginTopCenter: {
    marginTop: "45px",
  },
  radiostyle: {
    margin: 0,
    border: '1px solid #000',
    borderRadius: '12px',
    marginBottom: '10px'
  }
};
// Customizable Area End