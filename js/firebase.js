/* Firebase compat 9.22.0. A configuraÃ§Ã£o abaixo corresponde ao projeto presente nos HTMLs enviados.
   Confirme no Firebase Console se este Ã© o projeto correto antes da publicaÃ§Ã£o. */
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyAQIXi3xWamLNW6wJRzQT9Ky7tXQJZDY5s",
    authDomain: "lef-os-a8aff.firebaseapp.com",
    projectId: "lef-os-a8aff",
    storageBucket: "lef-os-a8aff.firebasestorage.app",
    messagingSenderId: "437363191998",
    appId: "1:437363191998:web:946fa1688bfc7e9469eeef"
  };
  if (!window.firebase) {
    console.error("Firebase SDK nÃ£o carregou.");
    return;
  }
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
  window.auth = firebase.auth();
  window.storage = firebase.storage();
  window.firebaseReady = true;
})();
