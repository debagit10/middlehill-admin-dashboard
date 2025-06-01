export const generateMonthData = (days: number) =>
  Array.from({ length: days }, (_, i) => ({
    x: i + 1,
    y: Math.floor(Math.random() * 30) + 5, // Simulate transactions
  }));

export const daysInMonth = {
  January: 31,
  February: 28, // ignoring leap years for simplicity
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

export const monthlyData = Object.fromEntries(
  Object.entries(daysInMonth).map(([month, days]) => [
    month,
    generateMonthData(days),
  ])
);
