import { FaDiscord, FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiCursorClick } from "react-icons/hi";

const TaskTypeIconGenarator = ({ type }: { type: "telegram" | "x" | "visit" | "youtube" | "discord" }) => {
    // const typeArray = ["telegram", "x", "visit", "youtube", "discord"];

    switch (type) {
        case "x":
            return <FaXTwitter className="text-4xl text-white" />

        case "discord":
            return <FaDiscord className="text-4xl text-white" />

        case "telegram":
            return <FaTelegramPlane className="text-4xl text-white" />

        case "visit":
            return <HiCursorClick className="text-4xl text-white" />

        case "youtube":
            return <FaYoutube className="text-4xl text-white" />
    }
};

export default TaskTypeIconGenarator;