import { getGrowthStage } from '../utils/growthStages';

export default function FlowerIllustration({ attendance, customization = {} }) {
  const stage = getGrowthStage(attendance);
  const petalColor = customization.petalColor || '#FFB6C1';
  const centerColor = customization.centerColor || '#FFD700';
  const leafColor = customization.leafColor || '#90EE90';
  const showButterfly = customization.butterfly && attendance >= 10;
  const showSparkles = attendance >= 20;

  return (
    <svg viewBox="0 0 200 250" className="flower-svg">
      {/* Pot */}
      <path d="M 70 180 L 130 180 L 125 220 L 75 220 Z" fill="#D4A574" stroke="#8B6F47" strokeWidth="2"/>
      <rect x="65" y="175" width="70" height="8" fill="#D4A574" stroke="#8B6F47" strokeWidth="2"/>
      
      {/* Soil */}
      <ellipse cx="100" cy="180" rx="30" ry="5" fill="#6B4423"/>

      {/* Stage 0: Seed */}
      {stage.id === 0 && (
        <ellipse cx="100" cy="175" rx="4" ry="3" fill="#8B6F47"/>
      )}

      {/* Stage 1: First Sprout */}
      {stage.id >= 1 && (
        <>
          <line x1="100" y1="175" x2="100" y2="160" stroke={leafColor} strokeWidth="3"/>
          <ellipse cx="95" cy="158" rx="6" ry="4" fill={leafColor} transform="rotate(-20 95 158)"/>
        </>
      )}

      {/* Stage 2: Growing Leaves */}
      {stage.id >= 2 && (
        <>
          <ellipse cx="105" cy="150" rx="8" ry="5" fill={leafColor} transform="rotate(20 105 150)"/>
          <line x1="100" y1="160" x2="100" y2="140" stroke={leafColor} strokeWidth="3"/>
        </>
      )}

      {/* Stage 3: Little Plant */}
      {stage.id >= 3 && (
        <>
          <ellipse cx="90" cy="135" rx="10" ry="6" fill={leafColor} transform="rotate(-30 90 135)"/>
          <ellipse cx="110" cy="130" rx="10" ry="6" fill={leafColor} transform="rotate(30 110 130)"/>
          <line x1="100" y1="140" x2="100" y2="120" stroke={leafColor} strokeWidth="3"/>
        </>
      )}

      {/* Stage 4: The Bud */}
      {stage.id >= 4 && stage.id < 6 && (
        <>
          <ellipse cx="100" cy="110" rx="8" ry="10" fill={petalColor} opacity="0.8"/>
          <path d="M 95 110 Q 100 105 105 110" stroke={leafColor} strokeWidth="2" fill="none"/>
        </>
      )}

      {/* Stage 5: Almost Blooming */}
      {stage.id === 5 && (
        <>
          <ellipse cx="100" cy="105" rx="12" ry="14" fill={petalColor} opacity="0.9"/>
          <path d="M 92 105 Q 100 95 108 105" stroke={petalColor} strokeWidth="3" fill="none"/>
        </>
      )}

      {/* Stage 6: First Petals */}
      {stage.id === 6 && (
        <>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 15;
            const y = 100 + Math.sin(rad) * 15;
            return (
              <ellipse key={i} cx={x} cy={y} rx="8" ry="12" fill={petalColor}
                transform={`rotate(${angle} ${x} ${y})`} opacity="0.85"/>
            );
          })}
          <circle cx="100" cy="100" r="6" fill={centerColor}/>
        </>
      )}

      {/* Stage 7: Half Bloom */}
      {stage.id === 7 && (
        <>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 18;
            const y = 100 + Math.sin(rad) * 18;
            return (
              <ellipse key={i} cx={x} cy={y} rx="10" ry="14" fill={petalColor}
                transform={`rotate(${angle} ${x} ${y})`} opacity="0.9"/>
            );
          })}
          <circle cx="100" cy="100" r="8" fill={centerColor}/>
        </>
      )}

      {/* Stage 8: Almost There */}
      {stage.id === 8 && (
        <>
          {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 22;
            const y = 100 + Math.sin(rad) * 22;
            return (
              <ellipse key={i} cx={x} cy={y} rx="12" ry="16" fill={petalColor}
                transform={`rotate(${angle} ${x} ${y})`} opacity="0.95"/>
            );
          })}
          <circle cx="100" cy="100" r="10" fill={centerColor}/>
        </>
      )}

      {/* Stage 9: Full Bloom */}
      {stage.id === 9 && (
        <>
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 25;
            const y = 100 + Math.sin(rad) * 25;
            return (
              <ellipse key={i} cx={x} cy={y} rx="14" ry="18" fill={petalColor}
                transform={`rotate(${angle} ${x} ${y})`}/>
            );
          })}
          <circle cx="100" cy="100" r="12" fill={centerColor}/>
          <circle cx="100" cy="100" r="8" fill={centerColor} opacity="0.7"/>
        </>
      )}

      {/* Stage 10: Celebration Bloom */}
      {stage.id === 10 && (
        <>
          <circle cx="100" cy="100" r="35" fill={petalColor} opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite"/>
          </circle>
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 28;
            const y = 100 + Math.sin(rad) * 28;
            return (
              <ellipse key={i} cx={x} cy={y} rx="16" ry="20" fill={petalColor}
                transform={`rotate(${angle} ${x} ${y})`}/>
            );
          })}
          <circle cx="100" cy="100" r="14" fill={centerColor}/>
          <circle cx="100" cy="100" r="10" fill={centerColor} opacity="0.8"/>
          
          {/* Sparkles */}
          {showSparkles && (
            <>
              <circle cx="70" cy="80" r="2" fill="#FFD700">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="130" cy="85" r="2" fill="#FFD700">
                <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="80" cy="120" r="2" fill="#FFD700">
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="120" cy="115" r="2" fill="#FFD700">
                <animate attributeName="opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite"/>
              </circle>
            </>
          )}
        </>
      )}

      {/* Butterfly */}
      {showButterfly && (
        <g transform="translate(140, 70)">
          <ellipse cx="0" cy="0" rx="6" ry="8" fill="#FF69B4" opacity="0.8"/>
          <ellipse cx="8" cy="-2" rx="5" ry="7" fill="#FF69B4" opacity="0.8"/>
          <ellipse cx="-8" cy="-2" rx="5" ry="7" fill="#FF69B4" opacity="0.8"/>
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#333" strokeWidth="1"/>
        </g>
      )}
    </svg>
  );
}