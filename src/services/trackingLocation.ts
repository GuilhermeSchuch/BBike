// Location
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { PermissionsAndroid } from "react-native";

// FileSystem
import * as FileSystem from "expo-file-system";

// Redux
import { useDispatch } from "react-redux";

import * as Sentry from "@sentry/react-native";

// Storage
import { storePedalData, getStoredPedalData } from "./storage";

const BACKGROUND_LOCATION = "background-location-task";

TaskManager.defineTask(BACKGROUND_LOCATION, ({ data, error }) => {
  console.log("chamaste");
  
  if(error) {
    console.error("Error in location task:", error);
    return;
  }

  if(data) {
    Sentry.captureMessage("Task called");
    const { locations }: any = data;

    getStoredPedalData().then((pedalData) => {
      Sentry.captureMessage("getPedalData in task called");

      if (locations && locations.length > 0) {
        const location = locations[0];
        Sentry.captureMessage("Storing data...");
        storePedalData([...pedalData, location]);
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

    if (foregroundStatus === "granted" && backgroundStatus === "granted" && writeStorageStatus === "granted") {
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(BACKGROUND_LOCATION);

      if(!hasStarted) {
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
        
        console.info("Service Started");
        Sentry.captureMessage("Service Started");
      }

    }

    getStoredPedalData().then(async (data) => {
      // const CURRENT_TRACK = `${FileSystem.documentDirectory}currentTrack.json`;
      // if(CURRENT_TRACK) await FileSystem.deleteAsync(CURRENT_TRACK, { idempotent: true });

      if(data.length === 0) {
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation
        }).then((location) => {
          console.log("chamou");
          storePedalData([location]);
        })
      }
    })
  })
}