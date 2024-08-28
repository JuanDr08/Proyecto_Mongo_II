import { HomeComponent, moviesLoader } from './pages/HomeComponent.jsx'
import { MoviesDescComponent, movieLoader } from './pages/MoviesDescComponent.jsx'
import { SeatsSelection } from './pages/SeatsSelectionComponent.jsx'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeComponent/>,
        loader: moviesLoader
    },
    {
        path: '/movie/:id',
        element: <MoviesDescComponent/>,
        loader: movieLoader
    },
    {
        path: '/movie/:id/seats',
        element: <SeatsSelection />
    }
])

export const App = () => {

    return (
        <RouterProvider router={router} />
    )

}