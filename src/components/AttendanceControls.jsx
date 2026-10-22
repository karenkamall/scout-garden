import { isPresent, getAttendanceCount } from '../utils/attendance';

export default function AttendanceControls({ girl, currentSession, attendanceRecords, onMarkPresent, onUndo }) {
  const attendance = getAttendanceCount(girl.id, attendanceRecords);
  const present = currentSession ? isPresent(girl.id, currentSession, attendanceRecords) : false;
  const maxed = attendance >= 20;

  return (
    <div className="attendance-controls">
      <div className="attendance-info">
        <span className="attendance-count">{attendance} / 20</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(attendance / 20) * 100}%` }}></div>
        </div>
      </div>

      {currentSession && (
        <div className="session-attendance">
          {present ? (
            <div className="present-badge">
              ✓ Present in Session {currentSession}
              <button onClick={() => onUndo(girl.id, currentSession)} className="undo-btn">
                Undo
              </button>
            </div>
          ) : maxed ? (
            <div className="maxed-badge">🌟 Maximum attendance reached!</div>
          ) : (
            <button onClick={() => onMarkPresent(girl.id, currentSession)} className="mark-present-btn">
              Mark Present for Session {currentSession}
            </button>
          )}
        </div>
      )}
    </div>
  );
}