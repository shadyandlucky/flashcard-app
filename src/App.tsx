import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/study/category" element={<CategorySelectionPage />} />
      <Route path="/quiz/category" element={<CategorySelectionPage />} />
      <Route path="/stats" element={<StatsPage />} />
      {/* Placeholder routes for Phase 2+ (category selection navigates here) */}
      <Route path="/study/category/:category" element={<div>Study session — Phase 2</div>} />
      <Route path="/quiz/category/:category" element={<div>Quiz session — Phase 4</div>} />
    </Routes>
  );
}

export default App;
