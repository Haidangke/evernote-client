/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: 'AIzaSyCaM-ahhx-0fe3tl5u-sz6hsyhDbqRLEus',
    authDomain: 'noteke-c125a.firebaseapp.com',
    projectId: 'noteke-c125a',
    storageBucket: 'noteke-c125a.appspot.com',
    messagingSenderId: '930063917161',
    appId: '1:930063917161:web:d2eb64e7a3fcebcf0242f8',
    measurementId: 'G-XK93TGJ00X',
};

firebase.initializeApp(firebaseConfig);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}

firebase.messaging();
