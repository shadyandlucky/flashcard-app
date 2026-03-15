import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import HomePage from './pages/HomePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import StudyPage from './pages/StudyPage';
import RedoPage from './pages/RedoPage';
import StatsPage from './pages/StatsPage';
import QuizSelectionPage from './pages/QuizSelectionPage';
import QuizPage from './pages/QuizPage';
import QuizCompletePage from './pages/QuizCompletePage';

/** Root router: home, category selection (study/quiz), study session, redo, stats, quiz selection, quiz session, quiz complete. */
function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.STUDY_CATEGORY} element={<CategorySelectionPage />} />
      <Route path={ROUTES.STUDY_CATEGORY_PARAM} element={<StudyPage />} />
      <Route path={ROUTES.STUDY_REDO} element={<RedoPage />} />
      <Route path={ROUTES.QUIZ_CATEGORY} element={<QuizSelectionPage />} />
      <Route path={ROUTES.QUIZ_SESSION} element={<QuizPage />} />
      <Route path={ROUTES.QUIZ_COMPLETE} element={<QuizCompletePage />} />
      <Route path={ROUTES.STATS} element={<StatsPage />} />
    </Routes>
  );
}

export default App;
