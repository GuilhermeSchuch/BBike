import * as FileSystem from 'expo-file-system';

export const PEDAL_DATA_FILE = `${FileSystem.documentDirectory}pedal.json`;

export const storePedalData = async (pedalData: Object) => {
  try {
    const fileExists = await FileSystem.getInfoAsync(PEDAL_DATA_FILE);

    let existingData = [];

    if (fileExists.exists) {      
      const fileContents = await FileSystem.readAsStringAsync(PEDAL_DATA_FILE);
      existingData = JSON.parse(fileContents);
    }

    existingData.push(pedalData);

    await FileSystem.writeAsStringAsync(PEDAL_DATA_FILE, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error storing barcode data:', error);
  }
};

export const getStoredPedalData = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(PEDAL_DATA_FILE);

    if (!fileExists.exists) {
      return [];
    }

    const fileContents = await FileSystem.readAsStringAsync(PEDAL_DATA_FILE);

    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error retrieving barcode data:', error);
    return [];
  }
};