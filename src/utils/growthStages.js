// Growth stages based on attendance count
export const GROWTH_STAGES = [
  { id: 0, name: 'Seed', minAttendance: 0, maxAttendance: 1 },
  { id: 1, name: 'First Sprout', minAttendance: 2, maxAttendance: 3 },
  { id: 2, name: 'Growing Leaves', minAttendance: 4, maxAttendance: 5 },
  { id: 3, name: 'Little Plant', minAttendance: 6, maxAttendance: 7 },
  { id: 4, name: 'The Bud', minAttendance: 8, maxAttendance: 9 },
  { id: 5, name: 'Almost Blooming', minAttendance: 10, maxAttendance: 11 },
  { id: 6, name: 'First Petals', minAttendance: 12, maxAttendance: 13 },
  { id: 7, name: 'Half Bloom', minAttendance: 14, maxAttendance: 15 },
  { id: 8, name: 'Almost There', minAttendance: 16, maxAttendance: 17 },
  { id: 9, name: 'Full Bloom', minAttendance: 18, maxAttendance: 19 },
  { id: 10, name: 'Celebration Bloom', minAttendance: 20, maxAttendance: 20 }
];

export function getGrowthStage(attendanceCount) {
  const stage = GROWTH_STAGES.find(
    s => attendanceCount >= s.minAttendance && attendanceCount <= s.maxAttendance
  );
  return stage || GROWTH_STAGES[0];
}

export function getUnlockedCustomizationLevel(attendanceCount) {
  if (attendanceCount >= 20) return 'advanced';
  if (attendanceCount >= 10) return 'basic';
  return 'locked';
}