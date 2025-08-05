export const launchFilterOptions = {
  all: "All Launches",
  upcoming: "Upcoming Launches",
  successful: "Successful Launches",
  failed: "Failed Launches",
};

export const filterLabels: Record<number, string> = {
  1: "Past Week",
  2: "Past Month",
  3: "Past 3 Months",
  4: "Past 6 Months",
  5: "Past Year",
  6: "Past 2 Years",
};

export const filterOptions = [
  { id: 1, label: "Past Week" },
  { id: 2, label: "Past Month" },
  { id: 3, label: "Past 3 Months" },
  { id: 4, label: "Past 6 Months" },
  { id: 5, label: "Past Year" },
  { id: 6, label: "Past 2 Years" },
];

export const daysMap: Record<number, number> = {
  1: 7,
  2: 30,
  3: 90,
  4: 180,
  5: 365,
  6: 730,
};