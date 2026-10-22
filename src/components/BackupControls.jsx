import { useState } from 'react';
import { exportData, importData } from '../utils/storage';

export default function BackupControls({ data, onImport }) {
  const [message, setMessage] = useState('');

  const handleExport = () => {
    exportData(data);
    setMessage('✅ Backup downloaded!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const importedData = await importData(file);
      if (window.confirm('This will replace all current data. Continue?')) {
        onImport(importedData);
        setMessage('✅ Data imported successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ Invalid backup file');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="backup-controls">
      <button onClick={handleExport}>📥 Export Backup</button>
      <label className="import-label">
        📤 Import Backup
        <input type="file" accept=".json" onChange={handleImport} hidden />
      </label>
      {message && <div className="backup-message">{message}</div>}
    </div>
  );
}