export function daysLeft(deadline: string, now: Date): number {
    const end = new Date(`${deadline}T23:59:59+02:00`);
    return (end.getTime() - now.getTime()) / 86_400_000;
}

export type RiskLevel = "overdue" | "high" | "medium" | "low";

export function riskLevel(days: number): RiskLevel {
    if (days < 0) {
        return "overdue";
    } else if(days < 3) {
        return "high";
    } else if(days < 7) {
        return "medium";
    }

    return "low";
}

export type AppInput = {
    id: number;
    title: string;
    status: string;
    deadline: string | null;
};

export type RiskItem = {
    id: number;
    title: string;
    daysLeft: number;
    level: RiskLevel;
    order: number;
};

export function assessDeadlineRisk(apps: AppInput[], now: Date): RiskItem[] {
    const items: RiskItem[] = [];

    for (const a of apps) {
        if (a.deadline === null) {
            continue;
        }
        if (a.status !== "Saved" && a.status !== "Planning") {
            continue;
        }
        const days = daysLeft(a.deadline, now);
        items.push({ id: a.id, title: a.title, daysLeft: days, level: riskLevel(days), order: 0 });
    }

    return items;
}