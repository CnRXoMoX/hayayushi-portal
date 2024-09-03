async function CalculateAttendancePay(rank, totalMinutes) {
    var salaryPerMinute;
    switch (rank) {
        case "Manager":
            salaryPerMinute = 53;
            break;
        case "Executive Chef":
            salaryPerMinute = 50;
            break;
        case "Second Chef":
            salaryPerMinute = 46;
            break;
        case "Station Chef":
            salaryPerMinute = 41;
            break;
        case "Line Chef":
            salaryPerMinute = 33;
            break;
        case "Line Cook":
            salaryPerMinute = 25;
            break;
        case "Commis Chef":
            salaryPerMinute = 21;
            break;
        case "Kitchen Porter":
            salaryPerMinute = 16;
            break;
        default:
            salaryPerMinute = 16;
            break;
    }

    return salaryPerMinute * totalMinutes;
}

export default CalculateAttendancePay;