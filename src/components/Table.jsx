import { useEffect, useState } from "react";
import ActualTable from "@/components/ActualTable"

export default function Table({ typeFilter }) {
    const [rows, setRows] = useState(5);

    const onSelectRows = (e) => {
        setRows(e.target.value);
    }

  return (
    <>
        <div>
            <p className="inline">Rows: </p>
            <select className="text-zinc-900" onChange={(e) => onSelectRows(e)}>
            <option value={10}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
            </select>
        </div>
        <ActualTable typeFilter={typeFilter} rows={rows} />
    </>
  )
}
