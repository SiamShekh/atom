import { useEffect } from "react";
import icon from "../../assets/icon.webp";
import WebApp from "@twa-dev/sdk";

const Splash = () => {
    
    useEffect(()=>{
        fetch('http://localhost:3000/user', {
            method: "POST",
            body: JSON.stringify({
                user: WebApp.initDataUnsafe.user
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    },[])

    return (
        <div className="min-h-screen flex justify-center items-center">
            <img src={icon} alt="" />
        </div>
    );
};

export default Splash;