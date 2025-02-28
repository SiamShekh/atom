import { Outlet } from "react-router-dom";
import BottomNav from "../navigation/BottomNav";

const AppLayout = () => {
    return (
        <div>
            <Outlet />
            <BottomNav />
        </div>
    );
};

export default AppLayout;