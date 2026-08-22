import { Outlet } from "react-router";
import { Sidepan } from "../components/Sidepan";
import { Navbar } from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { openSidebar } from "../redux/state/sidebarWidthSlice";

export function Layout() {
  const dispatch = useDispatch();

  const { isOpen, isExpand } = useSelector(
    (state: RootState) => state.sidebar
  );

  const closeSidebar = () => {
    dispatch(openSidebar());
  };

  return (
    <div
      className={`
        h-screen
        w-full
        overflow-hidden
        p-1
        gap-1
        grid
        grid-cols-1
        ${
          isExpand
            ? "md:grid-cols-[250px_1fr]"
            : "md:grid-cols-[60px_1fr]"
        }
      `}
    >
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          md:relative
          top-0
          left-0
          z-50
          h-full
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <div
          className={`
            h-full
            bg-white
            transition-all
            duration-300
            ${isExpand ? "w-[250px]" : "w-[60px]"}
          `}
        >
          <Sidepan />
        </div>
      </aside>

      {/* Main Content */}
      <section className="grid grid-rows-[60px_minmax(0,1fr)] min-h-0 gap-1">
        <Navbar />

        <main className="border rounded-md overflow-auto min-h-0 p-2">
          <Outlet />
        </main>
      </section>
    </div>
  );
}