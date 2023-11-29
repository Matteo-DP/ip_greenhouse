import React from 'react'
import { useState } from "react";
import ActualLogsTable from "@/components/ActualLogsTable";

export default function LogsTable() {
    const [rows, setRows] = useState(100);

    const onSelectRows = (e) => {
        setRows(e.target.value);
    }

  return (
    <>
        <div>
            <p className="inline">Rows: </p>
            <select className="text-zinc-900" onChange={(e) => onSelectRows(e)}>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={300}>300</option>
            <option value={400}>400</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
            </select>
        </div>
        <ActualLogsTable rows={rows} />
    </>
  )
}