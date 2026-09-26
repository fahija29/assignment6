import type { Workout } from "../app/page";

const PLAN_KEY = "fitlog_plan";
const SAVED_KEY = "fitlog_saved";

export function getPlan(): Workout[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(PLAN_KEY);

  return data ? JSON.parse(data) : [];
}

export function getSaved(): Workout[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(SAVED_KEY);

  return data ? JSON.parse(data) : [];
}

export function addToPlan(workout: Workout): boolean {
  const plan = getPlan();

  if (plan.length >= 5) return false;

  if (plan.some((item) => item.id === workout.id)) {
    return false;
  }

  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify([...plan, workout])
  );

  window.dispatchEvent(new Event("fitlog-update"));

  return true;
}

export function saveWorkout(workout: Workout): boolean {
  const saved = getSaved();

  if (saved.some((item) => item.id === workout.id)) {
    return false;
  }

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify([...saved, workout])
  );

  window.dispatchEvent(new Event("fitlog-update"));

  return true;
}

export function removeFromPlan(id: number) {
  const plan = getPlan().filter((item) => item.id !== id);

  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify(plan)
  );

  window.dispatchEvent(new Event("fitlog-update"));
}

export function removeSaved(id: number) {
  const saved = getSaved().filter((item) => item.id !== id);

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify(saved)
  );

  window.dispatchEvent(new Event("fitlog-update"));
}


