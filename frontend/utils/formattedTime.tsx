function formatTotalMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const formattedTime = `${hours}h ${minutes}m`;

    return formattedTime;
}

export default formatTotalMinutes;