import React, { useEffect, useState } from 'react'
import Expand from './Expand';
import Table from '@/components/Table';
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function LightCard() {

    const [axis, setAxis] = useState();
    const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        fetch("/api/generateLineAxisLight?" + new URLSearchParams({
          day: startDate.getDate(),
          month: startDate.getMonth() + 1,
          year: startDate.getFullYear(),
        }))
            .then((res) => res.json())
            .then((data) => setAxis(data))
            .finally(() => setLoading(false))
    }, [startDate])

    var data = {};
    if (!loading) {
        data = {
            type: "line",
            labels: axis.x,
            datasets: [
            {
                label: "Light (Lux)",
                data: axis.y,
                borderColor: "rgb(45,212,191)",
            }
        ]
      };
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Average light intensity (Lux) per time interval',
          },
        },
        scales: {
          y: {
            suggestedMin: 0,
          }
        }
      };

  return (
    <div className="bg-zinc-800 p-6 rounded-md w-full">
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='text-zinc-900 text-center py-1 bg-teal-400 bg-opacity-40 rounded-xl border-zinc-900' />
        {!loading &&
            <div className='relative w-[800px] h-full'>
                <Line data={data} options={options} />
            </div>
        }
        <Expand>
            <Table typeFilter={1} rows={10} />
        </Expand>
    </div>
  )
}
