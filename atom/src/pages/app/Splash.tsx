import { useEffect } from "react";
import icon from "../../assets/icon.webp";
import WebApp from "@twa-dev/sdk";
import { userLogin } from "../../api/user";
import { useNavigate } from "react-router-dom";

const Splash = () => {
    const [mutation, { data, status }] = userLogin();
    const navigate = useNavigate();

    useEffect(() => {
        mutation({
            user: WebApp.initDataUnsafe.user,
            init: WebApp.initData,
            startApp: WebApp.initDataUnsafe.start_param
        });
    }, [mutation]);

    useEffect(() => {
        if (status === "fulfilled" && data?.token) {
            sessionStorage.setItem("token", data?.token);
            navigate("/app", {
                replace: true
            });
        }
    }, [status, data?.token, navigate])

    return (
        <div className="min-h-screen flex justify-center items-center">
            <img src={icon} alt="" />
        </div>
    );
};

export default Splash;