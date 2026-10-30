import FlowerIllustration from './FlowerIllustration';

export default function GardenView({ girls, onFlowerClick, onWaterFlower, onUpdateGirlPosition }) {
  
  // دالة استقبال السحب فوق الجنينة
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // دالة إفلات الوردة وحساب إحداثيات المكان الجديد بالـ %
  const handleDrop = (e) => {
    e.preventDefault();
    const girlId = e.dataTransfer.getData('text/plain');
    if (!girlId) return;

    const gardenRect = e.currentTarget.getBoundingClientRect();
    
    // حساب الموضع الجديد كنسبة مئوية
    const x = ((e.clientX - gardenRect.left) / gardenRect.width) * 100;
    const y = ((e.clientY - gardenRect.top) / gardenRect.height) * 100;

    // قيود للبقاء بداخل المساحة الخضراء
    const boundedX = Math.max(12, Math.min(88, x));
    const boundedY = Math.max(18, Math.min(82, y));

    if (onUpdateGirlPosition) {
      onUpdateGirlPosition(Number(girlId), boundedX, boundedY);
    }
  };

  return (
    <div className="garden-container">
      <div 
        className="garden-ground"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {girls.map((girl) => {
          const attendance = girl.attendance || 0;
          const isBloom = attendance >= 20;

          return (
            <div
              key={girl.id}
              className="flower-in-garden"
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', girl.id.toString());
              }}
              style={{
                left: `${girl.positionX ?? 50}%`,
                top: `${girl.positionY ?? 50}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => onFlowerClick(girl)}
            >
              <div className="flower-inner">
                {isBloom && <div className="bloom-badge">⭐</div>}
                <div className="flower-visual">
                  <FlowerIllustration attendance={attendance} customization={girl.customization} />
                </div>
                <div className="flower-shadow"></div>
              </div>
              <span className="flower-label">{girl.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}