// main.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
// Import QR code generator function
import { generateQRCode } from "./qr.js";

// Your Firebase configuration (replace with your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyBkhEqivOcbkzd1MySLaNCRuSyeWbEz4UQ",
  authDomain: "simplixliftandearn.firebaseapp.com",
  databaseURL: "https://simplixliftandearn-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "simplixliftandearn",
  storageBucket: "simplixliftandearn.firebasestorage.app",
  messagingSenderId: "901097563834",
  appId: "1:901097563834:web:7639d8d3eca0f986f34483",
  measurementId: "G-T680ZGWH3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Determine if this instance is a Controller based on the query parameter.
const urlParams = new URLSearchParams(window.location.search);
const isController = urlParams.has('controller');
console.log("Is Controller:", isController);

// On the Display, generate a QR code pointing to the Controller URL.
if (!isController) {
  console.log("Display: Generating QR code");
  generateQRCode("qrContainer", window.location.href + "?controller");
} else {
  console.log("Controller: Hiding QR code container");
  const qrContainer = document.getElementById("qrContainer");
  if (qrContainer) {
    qrContainer.style.display = "none";
  }
}

// On the Display, listen for control messages from Firebase.
if (!isController) {
  const controlRef = ref(db, "liftandearn/control");
  onValue(controlRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Display received control message:", data);
    if (data && data.message === "control-taken") {
      const qrContainer = document.getElementById("qrContainer");
      if (qrContainer) {
        qrContainer.style.display = "none";
      }
      document.getElementById("displayArea").innerText = "Control taken by Controller.";
    }
  });
}

// Function for the Controller to send a control message via Firebase.
function sendControlMessage(message) {
  set(ref(db, "liftandearn/control"), {
    message: message,
    timestamp: Date.now()
  })
  .then(() => {
    console.log("Controller: Sent message:", message);
  })
  .catch((error) => {
    console.error("Controller: Error sending message:", error);
  });
}

// Button event listeners.
document.getElementById("shakeButton").addEventListener("click", () => {
  if (isController) {
    console.log("Controller: Shake button pressed");
    sendControlMessage("control-taken");
    document.getElementById("displayArea").innerText = "Shake action received on Controller!";
  } else {
    console.log("Display: Shake button pressed");
    document.getElementById("displayArea").innerText = "Shake action received on Display!";
  }
});

document.getElementById("tiltButton").addEventListener("click", () => {
  if (isController) {
    console.log("Controller: Tilt button pressed");
    sendControlMessage("control-taken");
    document.getElementById("displayArea").innerText = "Tilt action received on Controller!";
  } else {
    console.log("Display: Tilt button pressed");
    document.getElementById("displayArea").innerText = "Tilt action received on Display!";
  }
});

document.getElementById("logPointsButton").addEventListener("click", () => {
  if (isController) {
    console.log("Controller: Log Points button pressed");
    sendControlMessage("control-taken");
    document.getElementById("displayArea").innerText = "Log Points action received on Controller!";
  } else {
    console.log("Display: Log Points button pressed");
    document.getElementById("displayArea").innerText = "Log Points action received on Display!";
  }
});
