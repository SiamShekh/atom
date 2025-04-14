import { createContext, ReactNode, useEffect } from "react";
import { useSettingQuery } from "../api/setting";
import { setting, user } from "../types";
import { MyUser } from "../api/user";

interface default_value {
    setting: undefined | setting,
    user: undefined | user
}

export const Provider = createContext<default_value>({
    setting: undefined,
    user: undefined
});

const ContextUri = ({ children }: { children: ReactNode }) => {
    const { data, isLoading } = useSettingQuery(undefined);
    const [query, { data: user }] = MyUser();

    useEffect(() => {
        query(undefined);
    }, [query])

    const value: default_value = {
        setting: data,
        user: user
    }

    return (
        <Provider.Provider value={value}>
            <div className="relative">
                {
                    isLoading &&
                    <div className="fixed z-50 min-h-screen flex items-center justify-center w-full ">
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                }
                {children}
            </div>
        </Provider.Provider>
    );
};

export default ContextUri;