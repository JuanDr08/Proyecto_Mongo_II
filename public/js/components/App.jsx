import { HomeComponent } from './pages/HomeComponent.jsx'
import { MoviesDescComponent } from './pages/MoviesDescComponent.jsx'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeComponent/>
    },
    {
        path: '/movie/:id',
        element: <MoviesDescComponent/>
    }
])

export const App = () => {

    return (
        <RouterProvider router={router} />
    )

}