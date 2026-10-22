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

  const handleAddGirl = (girlData) => {
    console.log("Adding new girl:", girlData); // للتأكد من أن الزرار يعمل
    const newGirl = {
      id: Date.now(),
      name: girlData.name,
      note: girlData.note || '',
      attendance: 0,
      customization: {},
      positionX: Math.random() * 70 + 10, 
      positionY: Math.random() * 60 + 20, // جعلنا المكان في النصف السفلي ليكون منطقياً كعشب
      createdAt: new Date().toISOString()
    };
    
    const newData = { ...data, girls: [...data.girls, newGirl] };
    setData(newData);
    console.log("New data saved:", newData);
  };

  const handleUpdateGirl = (updatedGirl) => {
    setData({
      ...data,
      girls: data.girls.map(g => g.id === updatedGirl.id ? updatedGirl : g)
    });
    setSelectedGirl(updatedGirl);
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
        />
      </div>

      <button className="add-flower-btn" onClick={() => {
        console.log("Add button clicked!");
        setShowAddModal(true);
      }}>
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