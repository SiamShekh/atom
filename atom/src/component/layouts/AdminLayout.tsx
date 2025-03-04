import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { CiBoxList, CiMap } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
const AdminLayout = () => {
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(window.matchMedia('(max-width: 800px)').matches);
    const navigate = useNavigate();

    const arr = [
        {
            label: "Dashboard",
            icon: <MdDashboard className="text-2xl" />,
            href: "/admin"
        },
        {
            label: "User",
            icon: <FaUser className="text-2xl" />,
            children: [
                {
                    label: "User Table",
                    href: "/admin/map"
                },
                {
                    label: "User Address",
                    href: "/admin/map"
                },
            ]
        },
        {
            label: "Task",
            icon: <CiBoxList className="text-2xl" />,
            children: [
                {
                    label: "Show Task",
                    href: "/admin/map"
                },
                {
                    label: "Create Task",
                    href: "/admin/map"
                },
            ]
        },
    ]

    return (
        <div className="">
            <div className={`flex items-center gap-3 px-4 py-2 bg-white/10 ${!broken && "hidden"}`}>
                <button onClick={() => setToggled(!toggled)} className="text-2xl text-white"><IoIosMenu /></button>
                <p className="font-montserrat font-medium">Admin</p>
            </div>
            <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
                <Sidebar
                    toggled={toggled}
                    backgroundColor="#000000"
                    breakPoint="all"
                    customBreakPoint="800px"
                    onBreakPoint={setBroken}
                    onBackdropClick={() => setToggled(!toggled)}
                >
                    <div className="w-full bg-white/10 p-3">
                        <div className="size-10 rounded-full bg-white/10"></div>
                        <div className="font-montserrat font-medium text-white mt-4">
                            <p>Siam Sheikh</p>
                            <p className="text-sm text-white/50">email@gmal.com</p>
                        </div>
                    </div>
                    <Menu
                        menuItemStyles={{
                            button: ({ level, active, disabled }) => {
                                // only apply styles on first level elements of the tree
                                if (level === 0)
                                    return {
                                        color: disabled ? '#f5d9ff' : '#6C0094',
                                        backgroundColor: active ? '#eecef9' : undefined,
                                    };
                            },
                        }}
                        className="font-montserrat font-medium"
                    >
                        {arr.map((nav,i) => (
                            nav.href ? <MenuItem key={i} onClick={() => navigate(nav.href)} icon={nav.icon} className="hover:text-black text-white bg-black"> {nav.label}</MenuItem> :
                                <SubMenu key={i} label={nav.label} icon={nav.icon} className="hover:text-black text-white">
                                    {
                                        nav?.children?.map((child, i) => (
                                            <MenuItem key={i} onClick={() => navigate(child.href)} className="hover:text-black text-white bg-black"> {child.label}</MenuItem>
                                        ))
                                    }
                                </SubMenu>
                        ))}
                    </Menu>
                </Sidebar>
                <main style={{ padding: 10 }}><Outlet /></main>
            </div>
        </div>
    );
};

export default AdminLayout;