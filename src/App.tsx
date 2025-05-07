import { MainLayout } from './components/MainLayout';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { QuestionPage } from './pages/QuestionPage';
import { AddQuestionPageLazy } from './pages/AddQuestionPage';
import { EditQuestionPageLazy } from './pages/EditQuestionPage';
import { AuthProvider } from './auth/AuthProvider';
import { useAuth } from './hooks/useAuth.ts';
import { ForbiddenPage } from './pages/ForbiddenPage';

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={'/forbidden'} state={{ from: location.pathname }} replace />
    );
};

export function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/forbidden" element={<ForbiddenPage />} />
                        <Route path="/question/:id" element={<QuestionPage />} />

                        <Route element={<ProtectedRoutes />}>
                            <Route path="/addquestion" element={<AddQuestionPageLazy />} />
                            <Route path="/editquestion/:id" element={<EditQuestionPageLazy />} />
                        </Route>

                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
