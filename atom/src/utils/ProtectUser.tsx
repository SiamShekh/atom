import { jwtDecode } from "jwt-decode";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface decode {
    _id: string
    uid: number
    iat: number
}

const ProtectUser = ({ children }: { children: ReactNode }) => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const decode: decode = jwtDecode(token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    console.log(decode);

    useEffect(() => {
        if (!decode?.uid || !decode?._id) {
            navigate("/splash", { replace: true })
        }
    }, [navigate, decode])

    useEffect(() => {
        if (!token) {
            navigate("/splash", { replace: true })
        }
    }, [token, navigate]);

    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectUser;