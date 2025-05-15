"use client"

import { useSettingsContext } from "@/lib/context/settings/setting-context";
import { ToastContainer } from "react-toastify"

const ToastProvider = () => {
    const settings = useSettingsContext();

    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            limit={4}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={settings.theme === 'dark' ? 'dark' : 'light'}
        />
    )
}

export default ToastProvider