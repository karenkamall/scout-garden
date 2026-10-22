import { useState } from 'react';

export default function AddGirlModal({ onAdd, onClose }) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      console.log("Submitting:", { name: name.trim(), note: note.trim() });
      onAdd({ name: name.trim(), note: note.trim() });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>🌱 Add a New Flower</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Flower Name (Girl's Name)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter her name"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Note (Optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any special notes..."
              rows="3"
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Add Flower 🌸</button>
          </div>
        </form>
      </div>
    </div>
  );
}