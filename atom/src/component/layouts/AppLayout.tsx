import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../navigation/BottomNav";
import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

const AppLayout = () => {
    const {pathname} = useLocation();
    useEffect(()=>{
        if (pathname==="/app") {
            WebApp.setHeaderColor("#1AE01A");
        }else{
            WebApp.setHeaderColor("#000000");
        }
    },[pathname])
    return (
        <div>
            <Outlet />
            <BottomNav />
        </div>
    );
};

export default AppLayout;