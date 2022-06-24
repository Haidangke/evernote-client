import { useEffect, useState } from 'react';

function useConvertISODate(IOSDate: string) {
    const time = new Date(IOSDate).getTime();
    const [curTime, setCurTime] = useState(new Date().getTime());

    useEffect(() => {
        let interval = setInterval(() => {
            const currentTime = new Date().getTime();
            setCurTime(currentTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const seconds = Math.floor((curTime - time) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const day = Math.floor(hours / 24);

    if (day > 1) {
        const date = new Date(IOSDate);
        return date.getDate() + ' thg ' + (date.getMonth() + 1);
    }
    if (day > 0) {
        return 'Hôm qua';
    }

    if (hours > 0) {
        return hours + ' giờ trước';
    }
    if (minutes > 0) {
        return minutes + ' phút trước';
    }
    if (seconds <= 20) {
        return 'Ngay bây giờ';
    }

    return 'vài giây trước';
}

export default useConvertISODate;
