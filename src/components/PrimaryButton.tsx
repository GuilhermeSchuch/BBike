import { ReactNode, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import { lightTheme } from "src/utils/theme";

const { width, height } = Dimensions.get('window');

interface Props {
  children?: ReactNode,
  size?: String,
  color?: String,
  onPress?: VoidFunction
}

const PrimaryButton = ({ children, size, color, onPress }: Props) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const handleOptions = () => {
      switch (size) {
        case "large":
          setOptions({
            ...options,
            width: width / 1.5,
            padding: width / 15
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
    backgroundColor: lightTheme.secondaryColor,
    borderRadius: 20,
    alignItems: "center"
  }
})

export default PrimaryButton