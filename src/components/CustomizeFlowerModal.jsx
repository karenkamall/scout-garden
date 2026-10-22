import { useState } from 'react';
import FlowerIllustration from './FlowerIllustration';
import { PETAL_COLORS, CENTER_COLORS, LEAF_COLORS } from '../data/customization';

export default function CustomizeFlowerModal({ girl, attendance, onSave, onClose }) {
  // القراءة المباشرة لتشغيل الحالة الحالية للزهرة
  const currentAttendance = attendance ?? girl?.attendance ?? 1;

  const [customization, setCustomization] = useState({
    petalColor: girl?.customization?.petalColor || PETAL_COLORS[0],
    centerColor: girl?.customization?.centerColor || CENTER_COLORS[0],
    leafColor: girl?.customization?.leafColor || LEAF_COLORS[0],
    butterfly: girl?.customization?.butterfly || false,
    ...girl?.customization
  });

  const handleSave = () => {
    onSave(customization);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal customize-modal" onClick={(e) => e.stopPropagation()}>
        <h2>🎨 تخصيص شكل الزهرة</h2>
        
        {/* صندوق المعاينة المباشرة الحية للزهرة الحالية بمرحلتها الكاملة */}
        <div className="customize-preview">
          <FlowerIllustration 
            attendance={currentAttendance} 
            customization={customization} 
          />
        </div>

        <div className="customize-options">
          {/* لون البتلات */}
          <div className="option-group">
            <label>لون البتلات</label>
            <div className="color-options">
              {PETAL_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`color-swatch ${customization.petalColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCustomization(prev => ({ ...prev, petalColor: color }))}
                />
              ))}
            </div>
          </div>

          {/* لون مركز الزهرة */}
          <div className="option-group">
            <label>لون مركز الزهرة</label>
            <div className="color-options">
              {CENTER_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`color-swatch ${customization.centerColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCustomization(prev => ({ ...prev, centerColor: color }))}
                />
              ))}
            </div>
          </div>

          {/* لون أوراق الشجر */}
          <div className="option-group">
            <label>لون أوراق الشجر</label>
            <div className="color-options">
              {LEAF_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`color-swatch ${customization.leafColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCustomization(prev => ({ ...prev, leafColor: color }))}
                />
              ))}
            </div>
          </div>

          {/* الإكسسوارات */}
          <div className="option-group">
            <label>الإكسسوارات</label>
            <div className="toggle-options">
              <button
                type="button"
                className={`toggle-btn ${customization.butterfly ? 'active' : ''}`}
                onClick={() => setCustomization(prev => ({ ...prev, butterfly: !prev.butterfly }))}
              >
                🦋 فراشة
              </button>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>إلغاء</button>
          <button type="button" className="submit-btn" onClick={handleSave}>حفظ التخصيص ✨</button>
        </div>
      </div>
    </div>
  );
}