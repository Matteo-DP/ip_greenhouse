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

    useEffect(() => {
        fetch("/api/findLatest?" + new URLSearchParams({
            typeFilter: 0
        }))
            .then((res) => res.json())
            .then((data) => setMoisture(data))
    }, [refresh])

    useEffect(() => {
        fetch("/api/generateLineAxis")
            .then((res) => res.json())
            .then((data) => setAxis(data))
            .finally(() => setLoading(false))
    }, [])

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
      };

  return (
    <div className="bg-zinc-800 p-6 rounded-md w-full">
        <p className="text-zinc-300 text-2xl mb-2">Current soil moisture:</p>
        <p className="text-4xl inline">{ moisture?.Value }</p>
        <p className="text-teal-500 inline ml-2">%</p>
        <button className="p-4" onClick={() => setRefresh(refresh + 1)}>
            <i class="fa-solid fa-arrows-rotate text-zinc-300 fa-lg"></i>
        </button>
        {!loading &&
            <div className='w-[800px] relative'>
                <Line data={data} options={options} />
            </div>
        }
        <Expand>
            <Table typeFilter={0} rows={10} />
        </Expand>
    </div>
  )
}
