import { useState } from 'react';
import FlowerIllustration from './FlowerIllustration';
import { getGrowthStage, getUnlockedCustomizationLevel } from '../utils/growthStages';

export default function GirlProfile({ girl, onUpdate, onClose, onWaterFlower, onDelete, onOpenCustomize }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(girl.name);

  const stage = getGrowthStage(girl.attendance);
  const customizationLevel = getUnlockedCustomizationLevel(girl.attendance);

  const handleSaveName = () => {
    if (editName.trim()) {
      onUpdate({ ...girl, name: editName.trim() });
      setIsEditing(false);
    }
  };

  const captions = {
    0: " A new seed waiting to grow",
    1: "💧 The seed is awakening",
    2: " A tiny sprout emerges",
    3: "🌱 Growing stronger each day",
    4: "🍃 First leaves appear",
    5: "🌿 Reaching for the sun",
    6: " A little plant taking shape",
    7: "🌿 Getting taller and stronger",
    8: "🌷 A bud begins to form",
    9: "🌷 The bud is growing",
    10: "🎨 Time to customize! Unlock colors",
    11: "🌸 Almost ready to bloom",
    12: "🌺 First petals peeking out",
    13: "🌺 Opening up beautifully",
    14: "💐 Halfway to full bloom",
    15: "💐 So close to perfection",
    16: "✨ Almost there",
    17: "✨ Nearly complete",
    18: "🌟 Full bloom achieved",
    19: "🌟 One more water to complete!",
    20: "🏆 Glow Up Complete! Beautiful! ✨"
  };

  return (
    <div className="girl-profile-overlay" onClick={onClose}>
      <div className="girl-profile" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="profile-flower">
          <FlowerIllustration attendance={girl.attendance} customization={girl.customization} />
        </div>

        <div className="profile-info">
          {isEditing ? (
            <div className="edit-name">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                autoFocus
              />
              <button onClick={handleSaveName}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <h2 className="profile-name">
              {girl.name}
              <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️</button>
            </h2>
          )}

          <div className="caption-box">
            <p>{captions[girl.attendance]}</p>
          </div>

          <div className="progress-info">
            <span className="attendance-count">{girl.attendance} / 20</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(girl.attendance / 20) * 100}%` }}></div>
            </div>
            <span className="stage-name">{stage.name}</span>
          </div>

          {girl.attendance < 20 ? (
            <button 
              className="water-btn" 
              onClick={() => onWaterFlower(girl.id)}
            >
              💧 Water the Flower ({20 - girl.attendance} more to go)
            </button>
          ) : (
            <div className="completed-badge">
              🌟 Fully Bloomed! 🌟
            </div>
          )}

          {customizationLevel !== 'locked' && (
            <button className="customize-btn" onClick={() => onOpenCustomize(girl)}>
              🎨 Customize My Flower
            </button>
          )}

          <button className="delete-btn" onClick={() => onDelete(girl)}>
            🗑️ Remove this flower
          </button>
        </div>
      </div>
    </div>
  );
}