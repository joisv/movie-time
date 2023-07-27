import useHooks from '@/hooks/useHooks';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PostIssue() {

  const { data:reports, err, get } = useHooks();

  useEffect(() => {

    get(route('reportstatus'),{
      onSuccess: () => {
        
      },
      onError: () => {

      }
    })
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
      <div className='bg-gray-800 p-1 text-white rounded-md font-medium w-fit'>
        Post issue
      </div>
       <Doughnut data={data} />;
    </div>
  )
}
