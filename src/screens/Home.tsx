import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";

// Components
import { PrimaryModal } from "@components";

// Utils
import { lightTheme, defaultTheme } from "src/utils/theme";

// Hooks
import { useSelector, UseSelector } from "react-redux";

const { width, height } = Dimensions.get('window');

const Home = () => {
  const { localDefined } = useSelector((state: any) => state.pedal);
  console.log(localDefined)

  return (
    <View style={[styles.outterContainer,]}>
      <View style={[styles.container, defaultTheme.container]}>
        {localDefined === undefined && (
          <PrimaryModal />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
    backgroundColor: lightTheme.primaryColor
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Home