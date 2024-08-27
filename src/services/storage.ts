import * as FileSystem from 'expo-file-system';
import * as Sentry from "@sentry/react-native";

export const CURRENT_TRACK = `${FileSystem.documentDirectory}currentTrack.json`;

export const storePedalData = async (pedalData: any[]) => {
  Sentry.captureMessage("pedalData:");
  console.log(pedalData);

  try {
    const fileExists = await FileSystem.getInfoAsync(CURRENT_TRACK);

    let existingData = [];

    if (fileExists.exists) {      
      const fileContents = await FileSystem.readAsStringAsync(CURRENT_TRACK);      
      existingData = JSON.parse(fileContents);
    }

    existingData.push(pedalData);
    Sentry.captureMessage("existingData:");
    console.log(existingData);

    await FileSystem.writeAsStringAsync(CURRENT_TRACK, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error storing currentTrack data:', error);
  }
};

export const getStoredPedalData = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(CURRENT_TRACK);

    if (!fileExists.exists) {
      return [];
    }

    const fileContents = await FileSystem.readAsStringAsync(CURRENT_TRACK);

    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error retrieving currentTrack data:', error);
    return [];
  }
};