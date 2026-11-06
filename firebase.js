/* Configuração compartilhada do Firebase — usada por index.html e admin.html. */
const firebaseConfig = {
  apiKey: "AIzaSyAQIXi3xWamLNW6wJRzQT9Ky7tXQJZDY5s",
  authDomain: "lef-os-a8aff.firebaseapp.com",
  projectId: "lef-os-a8aff",
  storageBucket: "lef-os-a8aff.firebasestorage.app",
  messagingSenderId: "437363191998",
  appId: "1:437363191998:web:946fa1688bfc7e9469eeef"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
