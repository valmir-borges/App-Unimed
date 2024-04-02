import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Camera } from 'expo-camera';

export default function CameraModal({ isVisible, onClose, onTakePicture }) {
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back); // Estado para controlar o tipo da câmera

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      onTakePicture(photo.uri);
    }
  };

  const toggleCameraType = () => {
    // Alternar entre a câmera traseira e frontal
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Camera
          style={styles.camera}
          type={cameraType} // Tipo da câmera definido pelo estado cameraType
          ref={ref => setCameraRef(ref)}
        />
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Tirar foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
          <Text style={styles.buttonText}>Alternar Câmera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  camera: {
    width: "80%",
    height: "50%",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#00975C",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  toggleButton: { // Estilo do botão para alternar a câmera
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  closeButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});
