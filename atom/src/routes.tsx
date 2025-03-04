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
import AdminLayout from "./component/layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddNewTask from "./pages/admin/AddNewTask";
import TaskManagement from "./pages/admin/Task";

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
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "task/new",
                element: <AddNewTask/>
            },
            {
                path: "task",
                element: <TaskManagement/>
            },
        ]
    },
    {
        path: 'splash',
        element: <Splash />
    },
]);

export default route;