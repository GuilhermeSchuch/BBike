import {
  View,
  Text,  
  StyleSheet
} from "react-native";

// Locartion
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";


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
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);

  const BACKGROUND_LOCATION = "background-location-task";

  TaskManager.defineTask(BACKGROUND_LOCATION, ({ data, error }) => {
    if (error) {
      console.error("Error in location task:", error);
      return;
    }
    if (data) {
      const { locations }: any = data;
      if (locations && locations.length > 0) {
        const location = locations[0];        
        handleLocation(location);
      }
    }
  });

  const handleLocation = (location: Location.LocationObject) => {
    console.log(location);
    setCurrentLocation(location);
  }

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      
      return { foregroundStatus, backgroundStatus }
    }
    
    requestPermissions().then(async (response) => {
      const { foregroundStatus, backgroundStatus } = response;
      console.info(`foregroundStatus: ${foregroundStatus}`);
      console.info(`backgroundStatus: ${backgroundStatus}`);

      if (foregroundStatus === "granted" && backgroundStatus === "granted") {
        await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION, {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 60000, 
          distanceInterval: 0,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: "Localicação sendo compartilhada.",
            notificationBody: "Sua localização está sendo utilizada em segundo plano por esse aplicativo.",
          },
        });
      }

      if(!currentLocation) {
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation
        }).then((response) => {
          setCurrentLocation(response);
        })
      }
    })
  }, []);

  return (
    <View style={[styles.outterContainer,]}>
      <View style={[styles.container, defaultTheme.container]}>
        {localDefined === undefined && (
          <PrimaryModal />
        )}

        {localDefined === false && (
          currentLocation ? (
            <Text>Lat: {currentLocation.coords.latitude}, Lon: {currentLocation.coords.longitude}</Text>
          ) : (
            <Text>oie</Text>
          )
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