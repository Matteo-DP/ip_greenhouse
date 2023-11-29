import moment from "moment/moment";
import { logTypeMap } from "@/static/config";
import { useEffect, useState } from "react";
import TableSkeleton from "@/components/TableSkeleton";


export default function Table({ rows }) {
    
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState();
  const [refresh, setRefresh] = useState(0);
  
  useEffect(() => {
    setLoading(true);

    fetch("/api/findManyLogs?" + new URLSearchParams({
      rows: rows,
    }))
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .then(() => setLoading(false))

  }, [rows, refresh]);

  if(!loading) {
    return (
      <>
        <button className="p-4" onClick={() => setRefresh(refresh + 1)}>
          <i class="fa-solid fa-arrows-rotate text-zinc-300 fa-lg"></i>
        </button>
        <table className="min-w-max w-full h-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Time</th>
                  <th scope="col" className="px-6 py-4">Type</th>
                  <th scope="col" className="px-6 py-4">Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => 
                <tr key={log.id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{log.id}</td>
                    <td className="whitespace-nowrap px-6 py-4">{moment(log.datetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td className="whitespace-nowrap px-6 py-4">{logTypeMap[log.type]}</td>
                    <td className="whitespace-nowrap px-6 py-4">{log.message}</td>
                </tr>
              )}
            </tbody>
        </table>
      </>
    )
  } else{
    return (
      <TableSkeleton isLogs={true} loops={20} />
    )
  }
}