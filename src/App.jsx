import { useState, useEffect } from 'react';
import GardenHeader from './components/GardenHeader';
import GardenView from './components/GardenView';
import GirlProfile from './components/GirlProfile';
import AddGirlModal from './components/AddGirlModal';
import CustomizeFlowerModal from './components/CustomizeFlowerModal';
import ConfirmDialog from './components/ConfirmDialog';
import BackupControls from './components/BackupControls';
import { loadData, saveData } from './utils/storage';
import './App.css';

function App() {
  const [data, setData] = useState(loadData());
  const [selectedGirl, setSelectedGirl] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(null);

  useEffect(() => {
    saveData(data);
  }, [data]);

  // دالة عدم تداخل الأماكن عند الإضافة التلقائية
  const getSafePosition = (existingGirls) => {
    const MIN_DISTANCE = 11;
    let attempts = 0;
    let maxAttempts = 150;
    let safePosFound = false;

    let posX = 50;
    let posY = 50;

    while (!safePosFound && attempts < maxAttempts) {
      posX = Math.random() * 66 + 17;
      posY = Math.random() * 45 + 28;

      safePosFound = existingGirls.every((girl) => {
        const dx = (girl.positionX ?? 50) - posX;
        const dy = (girl.positionY ?? 50) - posY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance >= MIN_DISTANCE;
      });

      attempts++;
    }

    return { posX, posY };
  };

  const handleAddGirl = (girlData) => {
    const { posX, posY } = getSafePosition(data.girls || []);

    const newGirl = {
      id: Date.now(),
      name: girlData.name,
      note: girlData.note || '',
      attendance: 0,
      customization: {},
      positionX: posX,
      positionY: posY,
      createdAt: new Date().toISOString()
    };

    const newData = { ...data, girls: [...data.girls, newGirl] };
    setData(newData);
  };

  const handleUpdateGirl = (updatedGirl) => {
    setData({
      ...data,
      girls: data.girls.map(g => g.id === updatedGirl.id ? updatedGirl : g)
    });
    setSelectedGirl(updatedGirl);
  };

  // دالة حديثة لتعديل موقع الوردة فوراً بالسحب والإفلات
  const handleUpdateGirlPosition = (girlId, newX, newY) => {
    setData(prevData => ({
      ...prevData,
      girls: prevData.girls.map(g => 
        g.id === girlId ? { ...g, positionX: newX, positionY: newY } : g
      )
    }));
  };

  const handleWaterFlower = (girlId) => {
    const girl = data.girls.find(g => g.id === girlId);
    if (girl && girl.attendance < 20) {
      const updatedGirl = { ...girl, attendance: girl.attendance + 1 };
      handleUpdateGirl(updatedGirl);
    }
  };

  const handleDeleteGirl = (girl) => {
    setConfirmDialog({
      message: `Are you sure you want to remove ${girl.name}?`,
      onConfirm: () => {
        setData({
          ...data,
          girls: data.girls.filter(g => g.id !== girl.id)
        });
        setSelectedGirl(null);
        setConfirmDialog(null);
      },
      onCancel: () => setConfirmDialog(null)
    });
  };

  const handleOpenCustomize = (girl) => {
    setSelectedGirl(girl);
    setShowCustomizeModal(true);
  };

  const handleSaveCustomization = (customization) => {
    const updatedGirl = { ...selectedGirl, customization };
    handleUpdateGirl(updatedGirl);
  };

  return (
    <div className="app">
      <GardenHeader girlsCount={data.girls.length} />

      <div className="garden-main">
        <GardenView
          girls={data.girls}
          onFlowerClick={setSelectedGirl}
          onWaterFlower={handleWaterFlower}
          onUpdateGirlPosition={handleUpdateGirlPosition}
        />
      </div>

      <button className="add-flower-btn" onClick={() => setShowAddModal(true)}>
        🌱 Add a Flower
      </button>

      {selectedGirl && !showCustomizeModal && (
        <GirlProfile
          girl={selectedGirl}
          onUpdate={handleUpdateGirl}
          onClose={() => setSelectedGirl(null)}
          onWaterFlower={handleWaterFlower}
          onDelete={handleDeleteGirl}
          onOpenCustomize={handleOpenCustomize}
        />
      )}

      {showAddModal && (
        <AddGirlModal
          onAdd={handleAddGirl}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showCustomizeModal && selectedGirl && (
        <CustomizeFlowerModal
          girl={selectedGirl}
          attendance={selectedGirl.attendance}
          onSave={handleSaveCustomization}
          onClose={() => setShowCustomizeModal(false)}
        />
      )}

      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}

      <BackupControls data={data} onImport={setData} />
    </div>
  );
}

export default App;