import { useEffect, useState } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';
import type { Job } from '../types/job';

const JobListings = ({ isHome = false }: { isHome?: boolean }): React.JSX.Element => {
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchJobs = async () => {
      
      const jobsApiUrl = isHome ? 'jobs?_page=1&_per_page=3' : 'jobs';

      try {
        const response = await fetch(`/api/${jobsApiUrl}`);
        
        if (!response.ok) 
          throw new Error('Failed to fetch jobs!');
        
        const fetchedJobs = await response.json();
        setJobs(isHome ? fetchedJobs.data : fetchedJobs);
      }
      catch (error) {
        console.error('Error fetching jobs:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  
  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

        {loading 
          ? (<Spinner loading={loading} />) 
          : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))}
            </div>
          )
        }
      </div>
    </section>
  )
}
export default JobListings;