import { ReactNode, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import { lightTheme } from "src/utils/theme";

const { width, height } = Dimensions.get('window');

interface Props {
  children?: ReactNode,
  size?: String,
  onPress?: VoidFunction
}

const SecondaryButton = ({ children, size, onPress }: Props) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const handleOptions = () => {
      switch (size) {
        case "medium":
          setOptions({
            ...options,
            width: width / 3,
            paddingHorizontal: width / 20,
            paddingVertical: width / 15,
          })
          break;
      
        default:
          break;
      }
    }

    handleOptions();
  }, [])


  return (
    <TouchableOpacity
      style={[styles.button, {...options}]}
      onPress={onPress}
    >
      { children }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: lightTheme.primaryColor,
    borderRadius: 20,
    alignItems: "center"
  }
})

export default SecondaryButton