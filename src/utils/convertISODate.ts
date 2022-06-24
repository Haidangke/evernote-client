function convertISODate(IOSDate: Date) {
    if (!IOSDate) return;

    const time = new Date(IOSDate).getTime();
    const currentTime = new Date().getTime();

    const seconds = Math.floor((currentTime - time) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const day = Math.floor(hours / 24);

    if (day > 0) {
        const date = new Date(IOSDate);
        return date.getDate() + ' thg ' + (date.getMonth() + 1);
    }

    if (hours > 0) {
        return hours + ' giờ trước';
    }
    if (minutes > 0) {
        return minutes + ' phút trước';
    }

    // return 'vài giây trước';
    return seconds;
}

export default convertISODate;
