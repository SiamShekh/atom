import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./component/layouts/AppLayout";
import Splash from "./pages/app/Splash";
import App from "./pages/app";
import Spin from "./pages/app/Spin";
import Task from "./pages/app/Task";
import Invite from "./pages/app/Invite";
import TonTransection from "./pages/app/TonTransection";

const route = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/app',
        element: <AppLayout />,
        children: [
            {
                path: 'spin',
                element: <Spin />
            },
            {
                path: 'task',
                element: <Task />
            },
            {
                path: 'invite',
                element: <Invite />
            },
            {
                path: 'ton',
                element: <TonTransection />
            },
        ]
    },
    {
        path: 'splash',
        element: <Splash />
    },
]);

export default route;