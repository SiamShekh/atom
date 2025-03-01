import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./component/layouts/AppLayout";
import Splash from "./pages/app/Splash";
import Spin from "./pages/app/Spin";
import Task from "./pages/app/Task";
import Invite from "./pages/app/Invite";
import TonTransection from "./pages/app/TonTransection";
import ProtectUser from "./utils/ProtectUser";
import App from "./pages/App";
import Home from "./pages/app/Home";

const route = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/app',
        element: <ProtectUser><AppLayout /></ProtectUser>,
        children: [
            {
                path: 'spin',
                element: <Spin />
            },
            {
                index: true, 
                element: <Home />
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