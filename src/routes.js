import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';

import { getItem } from './utils/storage';

function MainRoutes() {
    function ProtectedRoutes({ redirectTo }) {
        const token = getItem('token');

        return token ? <Outlet /> : <Navigate to={redirectTo} />
    }

    return (
        <Routes>
            <Route path='/' element={<Main />} />

            <Route element={<ProtectedRoutes redirectTo='/' />} >
                <Route path='/Home' element={<Home />} />
            </Route>

        </Routes>
    )
}

export default MainRoutes;