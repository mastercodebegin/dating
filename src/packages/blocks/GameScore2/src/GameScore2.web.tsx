import React from "react";

import {
  Container,
  Box,
  Typography,
  // Customizable Area Start
  Avatar,
  Modal,
  Grid
  // Customizable Area End
} from "@material-ui/core";

// Customizable Area Start
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { winAward, user1, user2 } from "./assets"

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

import GameScore2Controller, {
  Props,
  configJSON,
} from "./GameScore2Controller";

export default class GameScore2 extends GameScore2Controller {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  determineWinner() {
    const { firstUserName, secondUserName, score } = this.state;
    
    if (score.first_user_score > score.second_user_score) {
      const winnerName = firstUserName.length > 15 ? `${firstUserName.slice(0, 15)}...` : firstUserName;
      const loserName = secondUserName.length > 15 ? `${secondUserName.slice(0, 15)}...` : secondUserName;
      return `${winnerName} has won by ${loserName}`;
    } else if (score.first_user_score < score.second_user_score) {
      const winnerName = secondUserName.length > 15 ? `${secondUserName.slice(0, 15)}...` : secondUserName;
      const loserName = firstUserName.length > 15 ? `${firstUserName.slice(0, 15)}...` : firstUserName;
      return `${winnerName} has won by ${loserName}`;
    } else {
      return "Game Tied";
    }
  }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Box sx={webStyle.mainWrapper}>
          <Grid container>
            <Grid item sm={12} md={5} style={{ textAlign: "center" }}>
              {/* @ts-expect-error */}
              <Typography variant="h4" component="div" style={webStyle.scoreTitle}>
                {configJSON.scoreTitle}
              </Typography>
              <Box>
                {/* @ts-expect-error */}
                <Avatar src={winAward} style={webStyle.awardImage} />
              </Box>
            </Grid>
            <Grid item sm={12} md={7}>
              {/* @ts-expect-error */}
              <Typography variant="subtitle1" component="div" style={webStyle.gameResult}>
                {this.determineWinner()}
              </Typography>
              <Box style={{ display: "flex", justifyContent: "space-around", marginBottom: "50px" }}>
                <Box data-test-id="showModal" onClick={this.handleAvatarClick}>
                  {/* @ts-expect-error */}
                  <Avatar src={user1} style={webStyle.userProfile} />
                </Box>
                <Box onClick={this.handleAvatarClick}>
                  {/* @ts-expect-error */}
                  <Avatar src={user2} style={webStyle.userProfile} />
                </Box>
              </Box>
              <Box sx={webStyle.gameUserData}
                style={{
                  margin: 0,
                  justifyContent: "space-between"
                }}
              >
                <Box sx={webStyle.gameUserDetails}>
                  <Typography style={{
                    fontWeight: 600,
                    fontSize: "1.3rem"
                  }}>{this.state.score.first_user_score}</Typography>
                  <Typography variant="h6" style={{ fontWeight: 600 }}>{this.state.firstUserName.length > 15 ? this.state.firstUserName.slice(0, 15) + "..." : this.state.firstUserName}</Typography>
                </Box>
                <Box sx={webStyle.gameUserDetails}>
                  <Typography style={{
                    fontWeight: 600,
                    fontSize: "1.3rem"
                  }}>{this.state.score.second_user_score}</Typography>
                  <Typography variant="h6" style={{ fontWeight: 600 }}>{this.state.secondUserName.length > 15 ? this.state.secondUserName.slice(0, 15) + "..." : this.state.secondUserName}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Modal
            open={this.state.isModalOpen}
            onClose={this.handleAvatarClick}
            aria-labelledby="modal-title"
          >
            <Box sx={webStyle.showModal}>
              <h2 id="modal-title">{configJSON.avatarModal}</h2>
              <button onClick={this.handleAvatarClick}>Close</button>
            </Box>
          </Modal>
        </Box>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const webStyle = {
  mainWrapper: {
    fontFamily: "Roboto-Medium",
    padding: "60px 30px",
    background: "rgb(223 223 223)",
  },
  scoreTitle: {
    fontWeight: "700",
    margin: "0 0 20px",
    fontSize: "60px"
  },
  awardImage: {
    maxWidth: '250px',
    height: 'auto',
    maxHeight: '250px',
    width: '100%',
    objectFit: 'contain',
    margin: "0 auto 30px"
  },
  gameResult: {
    fontSize: '34px',
    fontWeight: 600,
    color: 'gray',
    textAlign: 'center',
    marginBottom: '40px',
    lineHeight: 1.3,
    marginTop: 0
  },
  userProfile: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '50%',
    border: '2px solid #1cf50e85',
    cursor: 'pointer'
  },
  gameUserData: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    marginBottom: '30px',
  },
  gameUserDetails: {
    width: '100%',
    flex: "0 0 calc(50% - 30px)",
    background: '#edededa3',
    padding: '7px',
    border: '1px solid green',
    color: '#3b3939',
  },
  showModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  }
};
// Customizable Area End
