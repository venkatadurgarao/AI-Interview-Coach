import { CiHome } from "react-icons/ci";
import { HiHome } from "react-icons/hi";
import { FaCirclePlay } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { IoMdAnalytics } from "react-icons/io";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { MdFeedback } from "react-icons/md";
import { FaRoad } from "react-icons/fa";




export const Sidepan = () => {
    return (
        <div className="border-1 rounded-md p-1 flex flex-col gap-3">
            <div className="border-1 text-center py-2 rounded-md">
                <h1>Ai Coach</h1>
            </div>
            <div className="border-1 p-2 rounded-sm">
                <ul className="flex flex-col gap-2 grow-1 h-[100%]">
                    <li className="border-1 py-2 px-2 rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out">
                        <a href="/dashboard" className="flex items-center gap-3">
                            <HiHome className="text-xl group-hover:text-white" />
                            <span className="md:block hidden">Dashboard</span>
                        </a>
                    </li>
                    <li className="relative border py-2 px-2 rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out group hover:mb-30">
                        <a href="#" className="flex items-center gap-3">
                            <FaCirclePlay className="text-xl" />
                            <span className="md:block hidden">Interviews</span>
                        </a>

                        <ul className="absolute left-0 top-full mt-0 hidden group-hover:block bg-white text-black shadow-md rounded-md w-40 overflow-hidden">
                            <li className="px-3 py-2 hover:bg-gray-200 cursor-pointer">
                                <a href="interview/start">
                                    Start Interview
                                </a>
                            </li>
                            <li className="px-3 py-2 hover:bg-gray-200 cursor-pointer">
                                <a href="interview/active">
                                    Active Interview
                                </a>
                            </li>
                            <li className="px-3 py-2 hover:bg-gray-200 cursor-pointer">
                                <a href="interview/history">
                                    Interview History
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="border-1 py-2 px-2 rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out">
                        <a href="/dashboard" className="flex items-center gap-3">
                            <IoMdAnalytics className="text-xl " />
                            <span className="md:block hidden">Analytics</span>
                        </a>
                    </li>

                    <li className="border-1 py-2 px-2 rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out">
                        <a href="/dashboard" className="flex items-center gap-3">
                            <FaFileCircleQuestion className="text-xl " />
                            <span className="md:block hidden">Practice Questions</span>
                        </a>
                    </li>
                    <li className="border-1 py-2 px-2 rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out">
                        <a href="/dashboard" className="flex items-center gap-3">
                            <MdFeedback className="text-xl " />
                            <span className="md:block hidden">AI Feedback</span>
                        </a>
                    </li>
                    <li className="border-1 py-2 px-2 rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out">
                        <a href="/dashboard" className="flex items-center gap-3">
                            <FaRoad className="text-xl " />
                            <span className="md:block hidden">Learning Roadmap</span>
                        </a>
                    </li>
                    <li className="border-1 py-2 px-2 rounded-md hover:bg-black hover:text-white transition duration-300 ease-in-out">
                        <a href="/dashboard" className="flex items-center gap-3">
                            <ImExit className="text-xl " />
                            <span className="md:block hidden">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
