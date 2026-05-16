import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import type { Job } from '../types/job';

const JobListing = ({ job }: { job: Job }): React.JSX.Element => {

  const [showFullDescription, setShowFullDescription] = useState(false);
  let description: string = job?.description || '';

  if (!showFullDescription) {
    description = description.substring(0, 90) + '...';
  }

  return (
    <div className='bg-white rounded-xl shadow-md relative h-full flex flex-col'>
      <div className='p-4 flex h-full flex-col'>
        <div className='mb-6 md:min-h-20'>
          
          {/* Type */}
          <div className='text-gray-600 my-2'>{job.type}</div>
          
          {/* Title */}
          <h3 className='text-xl font-bold'>{job.title}</h3>
        </div>

        <div className='mb-5 flex-1'>{description}</div>

        {/* Read More/Less */}
        <button
          onClick={() => setShowFullDescription((prevState) => !prevState)}
          className='self-start text-indigo-500 mb-5 hover:text-indigo-600 cursor-pointer'
        >
          {showFullDescription ? 'Less' : 'More'}
        </button>

        <h3 className='text-indigo-500 mb-2'>{job.salary} / Year</h3>

        <div className='border border-gray-100 mb-5'></div>

        <div className='mt-auto flex flex-col lg:flex-row justify-between mb-4'>
          
          {/* Location */}
          <div className='text-orange-700 mb-3'>
            <FaMapMarker className='inline text-lg mb-1 mr-1' />
            {job.location}
          </div>
          
          {/* Read More */}
          <Link
            to={`/jobs/${job.id}`}
            className='h-9 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
export default JobListing;