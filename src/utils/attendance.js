export function getAttendanceCount(girlId, attendanceRecords) {
  return attendanceRecords.filter(r => r.girlId === girlId).length;
}

export function isPresent(girlId, sessionNumber, attendanceRecords) {
  return attendanceRecords.some(
    r => r.girlId === girlId && r.sessionNumber === sessionNumber
  );
}

export function markPresent(girlId, sessionNumber, attendanceRecords) {
  if (isPresent(girlId, sessionNumber, attendanceRecords)) {
    return attendanceRecords;
  }
  return [...attendanceRecords, { girlId, sessionNumber }];
}

export function undoAttendance(girlId, sessionNumber, attendanceRecords) {
  return attendanceRecords.filter(
    r => !(r.girlId === girlId && r.sessionNumber === sessionNumber)
  );
}