import { daysLeft, riskLevel, assessDeadlineRisk } from "../src/lib/intelligence/risk";

const now = new Date("2026-10-24T08:00:00Z");
console.log(daysLeft("2026-10-30", now));
console.log(daysLeft("2026-10-20", now));
console.log(riskLevel(-1));
console.log(riskLevel(2));
console.log(riskLevel(5));
console.log(riskLevel(30));

const apps = [
    { id: 1, title: "A overdue", status: "Saved", deadline: "2026-10-20" },
    { id: 2, title: "B soon", status: "Saved", deadline: "2026-10-26" },
    { id: 3, title: "C next week", status: "Planning", deadline: "2026-10-30" },
    { id: 4, title: "D later", status: "Saved", deadline: "2026-12-01" },
    { id: 5, title: "E already applied", status: "Applied", deadline: "2026-10-27" },
    { id: 6, title: "F no deadline", status: "Saved", deadline: null },
];
console.table(assessDeadlineRisk(apps, now));