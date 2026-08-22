import { useEffect, useState } from "react";
import { ContentHeader } from "../../components/ContentHeader";
import type { InterviewType } from "../../types/interview.types";
import { apis } from "../../api/api";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
type interviewFilter = {
  status?: "active" | "pending";
  page: number;
  limit: number;
  count: number;
}
export default function InterviewActive() {
  const [rows, setRows] = useState<InterviewType[]>([]);
  const [filter, setFilter] = useState<interviewFilter>({status: 'active', limit: 10, page: 1, count: 0});
  useEffect(() => {
    const fetchActiveInterviews = async () => {
      try {
        const res = await apis.getActiveInterviews({ status: filter.status, page: filter.page, limit: filter.limit, count: 0 });
        const interviews = res.data?.interviews
        setFilter((prev) => ({...prev, count: res.data?.rows_count}));
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
      <ContentHeader name={"Active Interviews"} />
      <div className="w-full p-3">
        <table className="">
          <thead>
            <tr>
              <th className="text-center">SLNo</th>
              <th className="text-center">Interview Topic</th>
              <th className="text-center">Interview Topic</th>
              <th className="text-center">Status</th>
              <th className="text-center">Continue</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 && rows.map((item: InterviewType, i: number) => <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.technology}</td>
              <td>{item.role}</td>
              <td>{item.status}</td>
              <td>
                <a href={`/interview_start/${item.id}`} className="text-blue-400">continue...</a>
                {/* {item.interview_topic} */}
              </td>
            </tr>)}
          </tbody>
        </table>
        <div className="border-1 mt-1 p-1 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-400">rows: {filter.count}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaChevronCircleLeft className="text-gray-400 hover:text-black" onClick={() => setFilter((prev) => ({...prev, page: Math.max(prev.page-1, 1)} ))} />
            <span>{filter?.page}</span>
            <FaChevronCircleRight className="text-gray-400 hover:text-black" onClick={() => setFilter((prev) => ({...prev, page: Math.min(prev.page+1, Math.ceil(prev.count/prev.limit))} ))} />
          </div>
        </div>
      </div>
    </div>
  )
}
