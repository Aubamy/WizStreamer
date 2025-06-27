import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
 
  const callpageClick = () => {
    console.log('Navigating to callpage');
    navigate('/callpage');
  };

  const audioroomClick = () => {
    console.log('Navigating to audioroom');
    navigate('/audioroom');
  };
  
  const livestreamClick = () => {
    console.log('Navigating to livestream');
    navigate('/livestream');
  };

  const chartClick = () => {
    console.log('Navigating to chart');
    navigate('/chart');
  };
   const dashboardClick = () => {
    console.log('Navigating to dashboard');
    navigate('/dashboard');
  };

  const overviewClick = () => {
    console.log('Navigating to overview');
    navigate('/overview');
  };

  return{
    callpageClick,
    audioroomClick,
    livestreamClick,
    chartClick,
    dashboardClick,
    overviewClick,
  }
}