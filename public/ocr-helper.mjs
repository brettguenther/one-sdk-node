export default async function checkAndRequestCameraPermissions() {
    // Check if the Permissions API is supported
    if (!navigator.permissions || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Permissions API or getUserMedia not supported in this browser.");
      return;
    }

    try {
      // Check current camera permission state
      const cameraPermission = await navigator.permissions.query({ name: 'camera' });

      if (cameraPermission.state === 'granted') {
        console.log("Camera permission already granted.");
      } else if (cameraPermission.state === 'prompt') {
        console.log("Camera permission needs to be requested.");
        await requestCameraPermission();
      } else if (cameraPermission.state === 'denied') {
        console.log("Camera permission denied.");
        await requestCameraPermission();
      }

      cameraPermission.onchange = () => {
        console.log(`Camera permission state changed to: ${cameraPermission.state}`);
        if (cameraPermission.state === 'granted') {
          console.log("Camera permission granted.");
        } else if (cameraPermission.state === 'denied') {
          console.log("Camera permission denied.");
        }
      };
    } catch (error) {
      console.error("Error checking camera permissions:", error);
    }
}

async function requestCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera permission granted by user.");
      // Stop the stream immediately after permission is granted to avoid keeping the camera on
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error("Error requesting camera permission:", error);
    }
  }

// module.exports = { checkAndRequestCameraPermissions };