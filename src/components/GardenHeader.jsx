export default function GardenHeader({ girlsCount, currentSession, presentCount }) {
  return (
    <header className="garden-header">
      <div className="header-content">
        <h1 className="garden-title">🌷 The Glow Up Garden</h1>
        <div className="garden-stats">
          <span className="stat">🌸 {girlsCount} flowers</span>
          {currentSession && (
            <span className="stat">✓ {presentCount} present in Session {currentSession}</span>
          )}
        </div>
      </div>
    </header>
  );
}