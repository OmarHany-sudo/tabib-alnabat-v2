import { useState, useCallback } from "react";

const STORAGE_KEY = "plant_doctor_usage";
const DAILY_LIMIT = 2;

interface UsageData {
  date: string;
  count: number;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getStoredUsage(): UsageData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: UsageData = JSON.parse(stored);
      if (data.date === getToday()) {
        return data;
      }
    }
  } catch {
    // ignore parse errors
  }
  return { date: getToday(), count: 0 };
}

export function useUsageLimit() {
  const [usage, setUsage] = useState<UsageData>(getStoredUsage);

  const remaining = Math.max(0, DAILY_LIMIT - usage.count);
  const hasReachedLimit = usage.count >= DAILY_LIMIT;

  const incrementUsage = useCallback(() => {
    const newData = {
      date: getToday(),
      count: usage.count + 1,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setUsage(newData);
  }, [usage.count]);

  return { remaining, total: DAILY_LIMIT, hasReachedLimit, incrementUsage };
}
