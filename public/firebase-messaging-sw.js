/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCaM-ahhx-0fe3tl5u-sz6hsyhDbqRLEus",
    authDomain: "noteke-c125a.firebaseapp.com",
    projectId: "noteke-c125a",
    storageBucket: "noteke-c125a.appspot.com",
    messagingSenderId: "930063917161",
    appId: "1:930063917161:web:d2eb64e7a3fcebcf0242f8",
    measurementId: "G-XK93TGJ00X"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});