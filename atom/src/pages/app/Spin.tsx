import React, { useState } from 'react';
import bottle from "../../assets/bottle.webp";
import { MdMovie } from 'react-icons/md';
import { RiCopperCoinFill } from "react-icons/ri";

function random() {
    const rawRotate = Math.floor(Math.random() * (1000 - 600 + 1) + 600);

    let rotate;
    if (rawRotate < 700) {
        rotate = 600;
    } else if (rawRotate < 800) {
        rotate = 700;
    } else if (rawRotate < 900) {
        rotate = 800;
    } else {
        rotate = 1000;
    }
    return rotate;
}

const Spin = () => {
    const [rotated, setRotated] = useState(false);
    const [rotationValue, setRotationValue] = useState(0);

    const handleSpin = () => {
        const rotate = random(); // Get new rotate value
        setRotationValue(rotate); // Save it in state
        setRotated(prev => !prev); // Trigger animation
        console.log("Rotated Degree:", rotate); // Log it
    };

    return (
        <div className='p-3 min-h-[85vh] font-montserrat relative flex items-center justify-center flex-col gap-10'>
            <div className="size-72 relative border-2 border-white/10 anim_bg flex items-center rounded-full justify-center text-xs font-medium text-white">
                <p className='absolute z-50 top-0'>500</p>
                <p className='absolute z-50 right-0 rotate-90'>1000</p>
                <p className='absolute z-50 bottom-0'>1500</p>
                <p className='absolute z-50 left-0 rotate-90'>2000</p>

                <img
                    onClick={handleSpin}
                    style={{
                        transform: `rotate(${rotated ? 0 : rotationValue}deg)`,
                        transition: "transform 3s ease-in-out",
                    }}
                    className="size-60 border-2 border-white/20 bg-black rounded-full relative"
                    src={bottle}
                />
            </div>
            <div className="flex items-center justify-between gap-3 w-full">
                <button className='w-full flex-1 bg-yellow-600 text-white p-2 rounded-lg mt-5 font-semibold flex items-center gap-2 justify-center'><MdMovie />Ads</button>
                <button className='w-full flex-1 bg-blue-600 text-white p-2 rounded-lg mt-5 font-semibold flex items-center gap-2 justify-center'><RiCopperCoinFill />100 Coin</button>
            </div>
        </div>
    );
};

export default Spin;
