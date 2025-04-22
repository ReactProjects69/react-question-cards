import { MainLayout } from './components/MainLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<div>home</div>} />
                    <Route path="/forbidden" element={<div>Forbidden!!!</div>} />
                    <Route path="/addquestion" element={<div>Adding question</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
