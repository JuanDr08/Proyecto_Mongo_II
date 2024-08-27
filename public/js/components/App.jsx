import { HomeComponent } from './pages/HomeComponent.jsx'
import { MoviesDescComponent } from './pages/MoviesDescComponent.jsx'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'

const movieDescription = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. In quidem dolores sequi expedita aliquam. Illum, similique soluta dolor quidem, inventore iure ipsam repellat enim dolore repudiandae quo perferendis, reprehenderit corrupti!'
const img = 'https://w0.peakpx.com/wallpaper/292/886/HD-wallpaper-puss-in-boots-dreamworks.jpg'
const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeComponent/>
    },
    {
        path: '/movie/:id',
        element: <MoviesDescComponent title='Puss in boots the last wish' genre={['Action', 'Adventure']} description={movieDescription} img={img}/>
    }
])

export const App = () => {

    return (
        <RouterProvider router={router} />
    )

}