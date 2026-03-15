import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import HomePage from './pages/HomePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import StudyPage from './pages/StudyPage';
import RedoPage from './pages/RedoPage';
import StatsPage from './pages/StatsPage';

/** Root router: home, category selection (study/quiz), study session, redo, stats, and quiz placeholder. */
function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.STUDY_CATEGORY} element={<CategorySelectionPage />} />
      <Route path={ROUTES.STUDY_CATEGORY_PARAM} element={<StudyPage />} />
      <Route path={ROUTES.STUDY_REDO} element={<RedoPage />} />
      <Route path={ROUTES.QUIZ_CATEGORY} element={<CategorySelectionPage />} />
      <Route path={ROUTES.QUIZ_CATEGORY_PARAM} element={<div>Quiz session — Phase 4</div>} />
      <Route path={ROUTES.STATS} element={<StatsPage />} />
    </Routes>
  );
}

export default App;
