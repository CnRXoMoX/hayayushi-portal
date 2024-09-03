
async function CalculateBonusSalary(totalSales) {
    if(totalSales >= 500000) {
        const calculatedSales = totalSales * 0.15;
        return calculatedSales;
    }
    return 0;
}

export default CalculateBonusSalary