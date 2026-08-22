import { CiUser } from "react-icons/ci";
import { RiMenu2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { expandSidebar, openSidebar } from "../redux/state/sidebarWidthSlice";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const dispatch = useDispatch();

  const [profileOptions, setProfileOptions] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const handleSidebar = () => {
    if (window.innerWidth <= 768) {
      dispatch(openSidebar());
    } else {
      dispatch(expandSidebar());
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="border rounded-md flex items-center justify-between px-4 py-2 bg-white">
      <button
        onClick={handleSidebar}
        className="p-2 rounded hover:bg-gray-100"
      >
        <RiMenu2Fill className="text-xl" />
      </button>

      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setProfileOptions((prev) => !prev)}
          className="border rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
        >
          <CiUser className="text-2xl" />
        </button>

        {profileOptions && (
          <div className="absolute right-0 top-12 w-44 bg-white border rounded-md shadow-lg z-50">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>

              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>

              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};