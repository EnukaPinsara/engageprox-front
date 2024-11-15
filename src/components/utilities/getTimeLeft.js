export function getTimeLeft(targetDate) {
  const now = new Date(); // Current date and time
  const target = new Date(targetDate); // Target date and time

  const timeDiff = target - now; // Difference in milliseconds

  if (timeDiff <= 0) {
    return 'The date has passed.';
  }

  // Calculate days and hours only
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Days
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  ); // Hours

  return `${days} days, ${hours} hours left`;
}
