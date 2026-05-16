import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import JobPage from './pages/JobPage';
import EditJobPage from './pages/EditJobPage';
import AddJobPage from './pages/AddJobPage';
import NotFoundPage from './pages/NotFoundPage';
import { addJob, deleteJob, updateJob } from './services/jobService';
import { jobsLoader, jobLoader } from './loaders/jobLoader';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        
        <Route 
          path='/jobs' 
          element={<JobsPage />} 
          loader={jobsLoader} 
        />
        
        <Route 
          path='/jobs/:id' 
          element={<JobPage deleteJob={deleteJob} />} 
          loader={jobLoader} 
        />

        <Route 
          path='/edit-job/:id' 
          element={<EditJobPage updateJobSubmit={updateJob} />} 
          loader={jobLoader} 
        />

        <Route 
          path='/add-job' 
          element={<AddJobPage addJobSubmit={addJob} />} 
        />
        
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />
}
export default App;