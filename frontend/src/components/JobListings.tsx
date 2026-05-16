import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import JobListing from './JobListing';
import Spinner from './Spinner';
import type { Job } from '../types/job';
import { fetchJobs } from '../services/jobService';

interface JobListingsProps{
  isHome?: boolean;
  jobs?: Job[];
}

const JobListings = ({ isHome = false, jobs: initialJobs }: JobListingsProps): React.JSX.Element => {
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(!initialJobs); // = true if initialJobs is empty
  
  useEffect(() => {
    if (initialJobs)
      return;

    const loadJobs = async () => {
      try {
        const fetchedJobs = await fetchJobs(isHome);
        setJobs(fetchedJobs);
      }
      catch (error) {
        toast.error('Failed to fetch jobs!', { autoClose: 2000 });
        console.error('Error fetching jobs:', error);
      }
      finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [isHome, initialJobs]);

  const displayedJobs = initialJobs ?? jobs;

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
              {displayedJobs.map((job) => (
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