import {
  View,
  Text,  
  StyleSheet
} from "react-native";

import { check, request, PERMISSIONS, RESULTS, checkNotifications } from 'react-native-permissions';

// Hooks
import { useEffect, useState } from "react";

// Components
import { PrimaryModal } from "@components";

// Utils
import { lightTheme, defaultTheme } from "src/utils/theme";

// Hooks
import { useSelector } from "react-redux";

const Home = () => {
  const { localDefined } = useSelector((state: any) => state.pedal);
  const [locationEnabled, setLocationEnabled] = useState(false);
  
  useEffect(() => {
    // const checkLocationPermission = async () => {
      
    // };

    // checkLocationPermission();
    
    
  }, []);

  return (
    <View style={[styles.outterContainer,]}>
      <View style={[styles.container, defaultTheme.container]}>
        {localDefined === undefined && (
          <PrimaryModal />
        )}

        {localDefined === false && (
          <Text>oie</Text>
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