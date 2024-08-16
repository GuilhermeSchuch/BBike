import { Text, View, StyleSheet, Dimensions } from "react-native";

// Modal
import Modal from "react-native-modal";

// Components
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import TertiaryButton from "./TertiaryButton";

// Hooks
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// Utils
import { lightTheme, defaultTheme } from "src/utils/theme";

// Redux
import { setLocalDefined } from "src/features/pedalSlice";

const { width, height } = Dimensions.get('window');

interface Props {
  size?: String,
}

const PrimaryModal = ({ size="medium" }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState({});

  const dispatch = useDispatch();

  const handleModal = (granted: String) => {
    dispatch(setLocalDefined({
      isLocalDefined: granted === "yes" ? true : false
    }))

    setModalVisible(!isModalVisible);
  }

  useEffect(() => {
    const handleOptions = () => {
      switch (size) {
        case "medium":
          setOptions({
            ...options,
            height: height / 2,
            padding: 20
          })
          break;
      
        default:
          break;
      }
    }
    handleOptions();
  }, [])

  return (
    <View>
      <PrimaryButton onPress={() => setModalVisible(true)} size={"large"}>
        <Text style={styles.buttonText}>Começar pedal</Text>
      </PrimaryButton>

      <Modal
        isVisible={isModalVisible}
        hasBackdrop={false}
        animationIn={"bounceIn"}
        animationOut={"bounceOut"}
      >
        <View style={[{...options}, styles.innerModal]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Já possui local de destino?</Text>
          </View>

          <View style={styles.modalButtonsContainer}>
            <TertiaryButton size={"medium"} onPress={() => handleModal("no")}>
              <Text style={[defaultTheme.fontLarge, {color: lightTheme.primaryColor}]}>Não</Text>
            </TertiaryButton>

            <SecondaryButton size={"medium"} onPress={() => handleModal("yes")}>
              <Text style={[defaultTheme.fontLarge, {color: lightTheme.secondaryColor}]}>Sim</Text>
            </SecondaryButton>
          </View>

        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  innerModal: {
    backgroundColor: lightTheme.secondaryColor,
    borderRadius: 20
  },

  modalHeader: {
    marginTop: height / 30
  },

  modalHeaderText: {
    color: lightTheme.primaryColor,
    fontSize: width / 10,
    textAlign: "center"
  },

  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto"
  },

  buttonText: {
    color: lightTheme.primaryColor,
    fontSize: width / 15
  }
})

export default PrimaryModal