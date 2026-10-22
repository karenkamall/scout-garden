import FlowerIllustration from './FlowerIllustration';

export default function FlowerCard({ girl, onClick }) {
  return (
    <div className="flower-card" onClick={onClick}>
      <div className="flower-visual">
        <FlowerIllustration 
          attendance={girl.attendance} 
          customization={girl.customization} 
        />
      </div>
    </div>
  );
}