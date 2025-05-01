import { MainLayout } from './components/MainLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPAge';
import { QuestionPage } from './pages/QuestionPage';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/forbidden" element={<div>Forbidden!!!</div>} />
                    <Route path="/addquestion" element={<div>Adding question</div>} />
                    <Route path="/question/:id" element={<QuestionPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
