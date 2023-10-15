import moment from "moment/moment";
import { typeMap } from "@/static/config";
import { useEffect, useState } from "react";
import TableSkeleton from "@/components/TableSkeleton";


export default function Table({ typeFilter = undefined, rows}) {
    
  const [loading, setLoading] = useState(true);
  const [sensorData, setSensorData] = useState();
  
  useEffect(() => {
    setLoading(true);

    fetch("/api/findMany?" + new URLSearchParams({
      typeFilter: typeFilter,
      rows: rows,
    }))
      .then((res) => res.json())
      .then((data) => setSensorData(data))
      .then(() => setLoading(false))

  }, [rows, typeFilter]);

  if(!loading) {
    return (
      <>
        <table className="min-w-max w-full h-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Time</th>
                  <th scope="col" className="px-6 py-4">Type</th>
                  <th scope="col" className="px-6 py-4">Value</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.map((sensor) => 
                <tr key={sensor.id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{sensor.id}</td>
                    <td className="whitespace-nowrap px-6 py-4">{moment(sensor.datetime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td className="whitespace-nowrap px-6 py-4">{typeMap[sensor.Type]}</td>
                    <td className="whitespace-nowrap px-6 py-4">{sensor.Value}</td>
                </tr>
              )}
            </tbody>
        </table>
      </>
    )
  } else{
    return (
      <TableSkeleton />
    )
  }
}
