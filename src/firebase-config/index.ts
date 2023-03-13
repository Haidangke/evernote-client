import firebase from 'firebase/app';

import 'firebase/messaging';

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

export const messaging = firebase.messaging();

export const getFCMToken = async () => {
    const token = await messaging.getToken({
        vapidKey:
            'BFYBpp_9jheqBmfZbYVTF30kswxxSJGV-Yogy-wcQsmHcbbUjLmEo-3vkimpf_0cbYxMEWE0RiqfMZk_nZWEM3I',
    });
    return token;
};
