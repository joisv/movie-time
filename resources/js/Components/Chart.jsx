import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom-left',
        },
    },
};

export function BarChart({ route }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMostMovie = async () => {
            setLoading(true)
            try {

                const response = await axios.get(route)
                setMovies(response.data)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getMostMovie();
    }, [])
    const labels = movies.dates;
    const data = {
        labels,
        datasets: [
            {
                label: 'views',
                data: movies.viewsData,
                backgroundColor: 'rgb(17 24 39',
            },
        ],
    };
    return (
        <Bar options={options} data={data} />
    );
}
