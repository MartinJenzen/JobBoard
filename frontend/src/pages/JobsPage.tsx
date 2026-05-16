import JobListings from '../components/JobListings';
import { useLoaderData } from 'react-router-dom';
import type { Job } from '../types/job';

const JobsPage = (): React.JSX.Element => {
  const jobs = useLoaderData<Job[]>();

  return (
    <section className='bg-blue-50 px-4 py-6'>
        <JobListings jobs={jobs} />
    </section>
  );
}
export default JobsPage;