import React from "react";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  TextInput,
  View
} from "react-native";
// Redux
import { connect } from "react-redux";
import { updateName } from "../redux/actions/userReducer";

import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import materialTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {
  render() {
    const { navigation, name, updateName } = this.props;
    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={{ uri: Images.Onboarding }}
            style={{
              height: height,
              width: width,
              marginTop: "-55%",
              zIndex: 1
            }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block>
              <Block>
                <Text color="white" size={60} style={styles.centerText}>
                  COVID-19
                </Text>
              </Block>
              <Block>
                <Text color="white" size={40} style={styles.centerText}>
                  Resources and Data App
                </Text>
              </Block>
            </Block>
            <Block center>
              <TextInput
                style={styles.textInput}
                placeholder="Please key in your name!"
                onChangeText={name => updateName(name)}
                value={name}
              />
              <Button
                shadowless
                style={styles.button}
                color={
                  name
                    ? materialTheme.COLORS.BUTTON_COLOR
                    : materialTheme.COLORS.MUTED
                }
                onPress={() => navigation.navigate("App")}
                disabled={name ? false : true}
              >
                GET STARTED
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const mstp = ({ userReducer }) => ({
  name: userReducer.name
});

const mdtp = {
  updateName
};

export default connect(mstp, mdtp)(Onboarding);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  centerText: {
    textAlign: "center"
  },
  textInput: {
    height: 40,
    color: "#fff",
    textAlign: "center"
  }
});
