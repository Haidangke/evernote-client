import { useEffect } from 'react';
import { messaging } from 'firebase-config';

function usePushMessage() {
    useEffect(() => {
        async function requestPermission() {
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    messaging.onMessage((payload) => {
                        console.log('Message received. ', payload);
                        // ...
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        requestPermission();
    }, []);
}

export default usePushMessage;
