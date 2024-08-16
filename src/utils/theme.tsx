import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const lightTheme = {
  primaryColor: "#F1E8D9",
  secondaryColor: "#434341",
  tertiaryColor: "#C7B575",
}

export const darkTheme = {
  primaryColor: "#434341",
  secondaryColor: "#F1E8D9",
  tertiaryColor: "#C7B575"
}

export const defaultTheme = {
  container: {
    marginTop: height / 20
  },

  border: {
    borderWidth: 1,
    borderColor: "#F00"
  },

  fontLarge: {
    fontSize: width / 15
  }
}