// Input month number in string format
let monthStr = "1"; // represents April

// Convert month string to integer
let monthInt = parseInt(monthStr);

// Get the current date
let today = new Date();

// Calculate date 6 months later
let date = new Date();
date.setFullYear(today.getFullYear(), monthInt - 1, 1);
date.setMonth(date.getMonth() + 6);

// Calculate remaining months from current date to end of 6 month period
let remainingMonths =
  (date.getFullYear() - today.getFullYear()) * 12 +
  date.getMonth() -
  today.getMonth();

// Output result
console.log(
  `6 months after month number ${monthStr} is month number ${
    date.getMonth() + 1
  }`
);
console.log(
  `There are ${remainingMonths} remaining months from current month to the end of the 6 month period.`
);
