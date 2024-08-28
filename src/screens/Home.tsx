import {
  View,
  Text,  
  StyleSheet,
  Image
} from "react-native";

// Services
import { startForegroundService } from "src/services/trackingLocation";

// Hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import { PrimaryModal } from "@components";

// Utils
import { lightTheme, defaultTheme } from "src/utils/theme";
import { getDimensions } from "@utils";

// Config
import { CONFIG } from "src/config/config"

import { getStoredPedalData } from "src/services/storage";

// import * as FileSystem from "expo-file-system";
// const PEDAL_DATA_FILE = `${FileSystem.documentDirectory}pedal.json`;

interface Location {
  coords: {
    latitude: 0,
    longitude: 0
  }
}

const { width, height } = getDimensions();

const Home = () => {
  const { localDefined } = useSelector((state: any) => state.pedal);  
  const [currentTrack, setCurrentTrack] = useState<Location[]>([]);
  const [currentCity, setCurrentCity] = useState<String>("Igrejinha");

  const { GEO_API_KEY } = CONFIG;

  useEffect(() => {  
    startForegroundService();

    getStoredPedalData().then((data) => {
      setCurrentTrack(data[0]);
      console.log("sem array[0]");
      console.log(data);

      console.log("com array[0]");
      console.log(data[0]);

      // const { latitude, longitude } = data[0][0].coords;
      // getCurrentCity(latitude, longitude);
    })

    const getCurrentCity = async (lat: number, lon: number) => {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lon}&key=${GEO_API_KEY}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          console.error(`Response status: ${response.status}`)
        }
    
        const json = await response.json();

        const { city_district, state_code } = json.results[0].components;
        setCurrentCity(`${city_district}, ${state_code}`);
      }
      catch (error) {
        console.error(error)
      }
    }  
    
  }, []);

  return (
    <View style={[styles.outterContainer]}>
      <View style={[styles.container, defaultTheme.container]}>
        <View style={localDefined === undefined && styles.modalContainer}>
          {localDefined === undefined && (
            <PrimaryModal />
          )}
        </View>

        {localDefined === false && (
          currentTrack ? (
            <>
              <View style={styles.currentCityContainer}>
                <Image style={styles.mapPinImage} source={require("src/assets/images/map-pin.png")} />
                <Text style={[styles.currentCity]}>{ currentCity }</Text>
              </View>

              {currentTrack.map((track: any, index) => (
                <Text key={index}>Lat: { track.coords.latitude } Lon: { track.coords.longitude }</Text>
              ))}
            </>
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
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  currentCityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3
  },

  currentCity: {
    fontSize: defaultTheme.fontLarge,    
    color: lightTheme.secondaryColor
  },

  mapPinImage: {
    width: defaultTheme.fontExtraLarge,
    height: defaultTheme.fontExtraLarge,
  },
})

export default Home