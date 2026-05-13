import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = (): React.JSX.Element => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export default MainLayout;