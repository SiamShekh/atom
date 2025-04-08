import { createContext, ReactNode } from "react";
import { useSettingQuery } from "../api/setting";
import { setting } from "../types";

interface default_value {
    setting: undefined | setting
}

export const Provider = createContext<default_value>({
    setting: undefined
});

const ContextUri = ({ children }: { children: ReactNode }) => {
    const { data, isLoading } = useSettingQuery(undefined);

    const value: default_value = {
        setting: data
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