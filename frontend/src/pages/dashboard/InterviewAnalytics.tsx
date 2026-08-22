import { useEffect, useState } from "react";
import { ContentHeader } from "../../components/ContentHeader";
import type { interviewFilter, InterviewType } from "../../types/interview.types";
import { apis } from "../../api/api";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";

export default function InterviewAnalytics() {
  const [rows, setRows] = useState<InterviewType[]>([]);
  const [filter, setFilter] = useState<interviewFilter>({ status: 'completed', limit: 10, page: 1, count: 0 });
  useEffect(() => {
    const fetchActiveInterviews = async () => {
      try {
        const res = await apis.getActiveInterviews({ status: filter.status, page: filter.page, limit: filter.limit, count: 10 });
        const interviews = res.data?.interviews
        setFilter((prev) => ({ ...prev, count: res.data?.rows_count }))
        if (interviews) {
          setRows(interviews);
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchActiveInterviews();
  }, [])
  return (
    <div className="h-full bg-white rounded-md p-3 grid grid-rows-[auto_auto_1fr_auto]">
      <ContentHeader name={"Interview Analytics"} />
      <div className="w-full p-3">
        <table className="">
          <thead>
            <tr>
              <th className="text-center">SLNo</th>
              <th className="text-center">Role</th>
              <th className="text-center">Technology</th>
              <th className="text-center">Experience</th>
              <th className="text-center">Difficulty</th>
              <th className="text-center">Question Type</th>
              <th className="text-center">Attended At</th>
              <th className="text-center">Analytical Information</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 && rows.map((item: InterviewType, i: number) => <tr className="text-center" key={item.id}>
              <td>{i + 1}</td>
              <td>{item.role}</td>
              <td>{item.technology}</td>
              <td>{item.experience}</td>
              <td>{item.difficulty}</td>
              <td>{item.question_type}</td>
              <td>{new Date(item.created_at)
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-")}</td>
              {/* <td>{item.status}</td> */}
              <td className="text-center align-middle">
                <a href={`/interview_start/${item.id}`} className="flex items-center justify-center text-blue-400">
                  <IoMdAnalytics />
                </a>
              </td>
                {/* {item.interview_topic} */}
            </tr>)}
          </tbody>
        </table>
        <div className="border-1 mt-1 p-1 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-400">rows: {filter.count}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaChevronCircleLeft className="text-gray-400 hover:text-black" onClick={() => setFilter((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))} />
            <span>{filter?.page}</span>
            <FaChevronCircleRight className="text-gray-400 hover:text-black" onClick={() => setFilter((prev) => ({ ...prev, page: Math.min(prev.page + 1, Math.ceil(prev.count / prev.limit)) }))} />
          </div>
        </div>
      </div>
    </div>
  )
}
