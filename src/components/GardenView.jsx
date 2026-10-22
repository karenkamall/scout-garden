import React from 'react';
import FlowerCard from './FlowerCard';

export default function GardenView({ girls, onFlowerClick }) {
  console.log("GardenView received girls:", girls);

  return (
    <div className="garden-container">
      <div className="garden-ground">
        {/* أزهار الجنينة */}
        {girls.length === 0 ? (
          <div className="empty-garden-message">
          </div>
        ) : (
          girls.map((girl, index) => {
            // حساب زاوية العمق ومكان الوردة
            const posY = girl.positionY ?? 50;
            const scaleFactor = 0.8 + (posY / 100) * 0.4;
            const depthZIndex = Math.floor(posY + 10);

            return (
              <div
                key={girl.id || index}
                className="flower-in-garden"
                style={{
                  left: `${girl.positionX}%`,
                  top: `${girl.positionY}%`,
                  transform: `scale(${scaleFactor})`,
                  zIndex: depthZIndex,
                }}
                onClick={() => onFlowerClick(girl)}
              >
                <div className="flower-inner">
                  <FlowerCard girl={girl} onClick={() => onFlowerClick(girl)} />
                  {girl.attendance >= 20 && (
                    <div className="bloom-badge">✨</div>
                  )}
                </div>
                
                {/* ظل الوردة على العشب */}
                <div className="flower-shadow"></div>

                {/* الاسم فقط بدون أرقام الجلسات */}
                <div className="flower-label">{girl.name}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}