const STORAGE_KEY = 'glowUpGarden_v1';

export function loadData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return getDefaultData();
    const parsed = JSON.parse(data);
    return validateData(parsed);
  } catch (error) {
    console.error('Error loading data:', error);
    return getDefaultData();
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

export function getDefaultData() {
  return {
    girls: [],
    sessions: Array.from({ length: 20 }, (_, i) => ({
      number: i + 1,
      date: null
    })),
    attendanceRecords: []
  };
}

function validateData(data) {
  if (!data || typeof data !== 'object') return getDefaultData();
  if (!Array.isArray(data.girls)) data.girls = [];
  if (!Array.isArray(data.sessions)) data.sessions = getDefaultData().sessions;
  if (!Array.isArray(data.attendanceRecords)) data.attendanceRecords = [];
  return data;
}

export function exportData(data) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `glow-up-garden-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const validated = validateData(data);
        resolve(validated);
      } catch (error) {
        reject(new Error('Invalid backup file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}