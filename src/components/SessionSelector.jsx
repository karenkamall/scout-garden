export default function SessionSelector({ sessions, currentSession, onSelectSession }) {
  return (
    <div className="session-selector">
      <label>Current Session:</label>
      <select 
        value={currentSession || ''} 
        onChange={(e) => onSelectSession(e.target.value ? parseInt(e.target.value) : null)}
        className="session-select"
      >
        <option value="">Select a session</option>
        {sessions.map(session => (
          <option key={session.number} value={session.number}>
            Session {session.number}
          </option>
        ))}
      </select>
    </div>
  );
}