import { Routes, Route } from 'react-router-dom';
import { CharacterProvider } from './context/CharacterContext';
import { ClassStep } from './components/steps/ClassStep';
import { SubclassStep } from './components/steps/SubclassStep';
import { HeritageStep } from './components/steps/HeritageStep';
import { TraitsStep } from './components/steps/TraitsStep';
import { DomainsStep } from './components/steps/DomainsStep';
import { EquipmentStep } from './components/steps/EquipmentStep';
import { BackgroundStep } from './components/steps/BackgroundStep';
import { ExperiencesStep } from './components/steps/ExperiencesStep';
import { ReviewStep } from './components/steps/ReviewStep';

export default function App() {
  return (
    <CharacterProvider>
      <Routes>
        <Route path="/" element={<ClassStep />} />
        <Route path="/subclass" element={<SubclassStep />} />
        <Route path="/heritage" element={<HeritageStep />} />
        <Route path="/traits" element={<TraitsStep />} />
        <Route path="/domains" element={<DomainsStep />} />
        <Route path="/equipment" element={<EquipmentStep />} />
        <Route path="/background" element={<BackgroundStep />} />
        <Route path="/experiences" element={<ExperiencesStep />} />
        <Route path="/review" element={<ReviewStep />} />
      </Routes>
    </CharacterProvider>
  );
}
