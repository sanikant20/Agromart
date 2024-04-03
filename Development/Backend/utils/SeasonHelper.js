
// Define the seasons and their respective months
const seasons = [
    { name: 'Winter', startMonth: 1, endMonth: 3 },
    { name: 'Spring', startMonth: 4, endMonth: 6 },
    { name: 'Summer', startMonth: 7, endMonth: 9 },
    { name: 'Autumn', startMonth: 10, endMonth: 12 }
];

// Function to get the current season based on the current month
const getCurrentSeason = () => {
    const currentMonth = new Date().getMonth() + 1; 
    for (const season of seasons) {
        if (currentMonth >= season.startMonth && currentMonth <= season.endMonth) {
            return season.name;
        }
    }
    return 'Unknown'; // If no season is found
};

module.exports = { getCurrentSeason };
