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

export default function MoistureCard() {

    const [refresh, setRefresh] = useState(0);
    const [moisture, setMoisture] = useState();
    const [axis, setAxis] = useState();
    const [loading, setLoading] = useState(true);

    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        fetch("/api/findLatest?" + new URLSearchParams({
            typeFilter: 0
        }))
            .then((res) => res.json())
            .then((data) => setMoisture(data))
    }, [refresh])

    useEffect(() => {
        fetch("/api/generateLineAxis?" + new URLSearchParams({
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
                label: "Moisture%",
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
            text: 'Average soil moisture per time interval',
          },
        },
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      };

  return (
    <div className="bg-zinc-800 p-6 rounded-md w-full">
        <p className="text-zinc-300 text-2xl mb-2">Current soil moisture:</p>
        <p className="text-4xl inline">{ moisture?.Value }</p>
        <p className="text-teal-500 inline ml-2">%</p>
        <button className="p-4" onClick={() => setRefresh(refresh + 1)}>
            <i class="fa-solid fa-arrows-rotate text-zinc-300 fa-lg"></i>
        </button>
        <div className='mt-4'>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='text-zinc-900 text-center py-1 bg-teal-400 bg-opacity-40 rounded-xl border-zinc-900' />
        </div>
        {!loading &&
            <div className='relative w-[800px] h-full'>
                <Line data={data} options={options} />
            </div>
        }
        <Expand>
            <Table typeFilter={0} rows={10} />
        </Expand>
    </div>
  )
}
