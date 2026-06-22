
import { Outlet } from "react-router";
import { RiMenu2Fill } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { Sidepan } from "../components/Sidepan";
import { Navbar } from "../components/Navbar";




// import { protectedRoute } from "../routes/protectedRoute";

// {/* <div><Outlet /></div> */}
export function Layout(){
    return (
        <div className="h-screen w-screen grid md:grid-cols-[250px_minmax(0,1fr)] grid-cols-[60px_minmax(0,1fr)] gap-1 p-1">
            <Sidepan />
            <div className="grid grid-rows-[60px_minmax(0,1fr)] gap-1">
                <Navbar />
                <div className="border-1 rounded-sm">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}