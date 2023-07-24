import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PostIssue() {

  const [ reports, setReports ] = useState([]);

  useEffect(() => {
    const getReportStatus = async () => {
      try {
        
        const response =  await axios.get(route('reportstatus'))
        setReports(response.data)
        
      } catch (error) {
        console.log(error);
      }
    }
    getReportStatus(); 
  }, [])
  
  const data = {
    labels: reports.report_status?.map(report => report.status),
    datasets: [
      {
        label: 'issue',
        data: reports.report_status?.map(report => report.count),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className='w-full h-full'>
       <Doughnut data={data} />;
    </div>
  )
}
