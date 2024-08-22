// Locartion
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { PermissionsAndroid } from "react-native";

// Storage
import { storePedalData, getStoredPedalData } from "./storage";

const BACKGROUND_LOCATION = "background-location-task";

TaskManager.defineTask(BACKGROUND_LOCATION, ({ data, error }) => {
  if(error) {
    console.error("Error in location task:", error);
    return;
  }

  if(data) {
    const { locations }: any = data;

    getStoredPedalData().then((pedalData) => {
      const previousTracks = pedalData[0].currentTrack;

      if (locations && locations.length > 0) {
        const location = locations[0];
        storePedalData({currentTrack: [...previousTracks, location]});
      }
    })
  }
});

export const requestPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

  let granted;

  await PermissionsAndroid.check("android.permission.WRITE_EXTERNAL_STORAGE").then(async (isGranted) => {
    if(!isGranted) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permitir Bbike gerenciar seu armazenamento",
          message: "Bbike gostaria de armazenar dados dos pedals em seu celular.",
          buttonNegative: "Negar",
          buttonPositive: "Permitir",
        }
      );

      granted = "granted";
    }
    else {
      granted = "granted";
    }
  })
  
  return { foregroundStatus, backgroundStatus, writeStorageStatus: granted }
}

export const startForegroundService = () => {
  requestPermissions().then(async (response) => {
    const {
      foregroundStatus,
      backgroundStatus,
      writeStorageStatus
    } = response;

    console.info(`foregroundStatus: ${foregroundStatus}`);
    console.info(`backgroundStatus: ${backgroundStatus}`);
    console.info(`writeStorageStatus: ${writeStorageStatus}`);

    if (foregroundStatus === "granted" && backgroundStatus === "granted") {
      await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 5000,
        // timeInterval: 60000,
        distanceInterval: 0,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: "Localicação sendo compartilhada.",
          notificationBody: "Sua localização está sendo utilizada em segundo plano por esse aplicativo.",
        },
      });
    }

    getStoredPedalData().then(async (data) => {
      if(data.length === 0) {
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation
        }).then((location) => {
          console.log(location);
          storePedalData({currentTrack: [location]});
        })
      }
      else {
        console.log("maior que 0");
        console.log(data);
        // const PEDAL_DATA_FILE = `${FileSystem.documentDirectory}pedal.json`;
        // await FileSystem.deleteAsync(PEDAL_DATA_FILE, { idempotent: true });
      }
    })
  })
}