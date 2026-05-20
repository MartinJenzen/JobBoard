import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Job } from '../types/job';

type AddJobPageProps = {
  addJobSubmit: (job: Job) => Promise<void>;
};

const AddJobPage = ({ addJobSubmit }: AddJobPageProps): React.JSX.Element => {
  
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<string>('Full-Time');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [salary, setSalary] = useState<string>('Under $50K');
  const [companyName, setCompanyName] = useState<string>('');
  const [companyDescription, setCompanyDescription] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');

  const navigate = useNavigate();

  const autoFillTestData = (): void => {
    setTitle('Tester');
    setType('Full-Time');
    setLocation('Testville, TS');
    setDescription('This is a sample job listing used for testing purposes. It includes all the necessary details about the job, such as responsibilities, requirements, and benefits. This description is meant to provide a comprehensive overview of what the job entails and what candidates can expect when applying for this position.');
    setSalary('$125K - 150K');
    setCompanyName('Test Company Inc.');
    setCompanyDescription('Test company description goes here. This is a sample company listing used for testing purposes.');
    setContactEmail('test@test.com');
    setContactPhone('(555) 123-4567');
  }

  const submitForm = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const newJob: Job = {
      id: '', // This will be replaced by the backend with the actual ID
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      }
    };

    try {
      await addJobSubmit(newJob);
      toast.success('Job added successfully!', { autoClose: 2000 });
      navigate('/jobs');
    }
    catch (error) {
      toast.error('Failed to add job!', { autoClose: 2000 });
      console.error(`Error adding job (ID: ${newJob.id}): `, error);
    }
  }
  
  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Add Job</h2>

            {/* Auto-fill */}
            <button
              type='button'
              onClick={autoFillTestData}
              className='bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full w-full focus:shadow-outline mb-6 text-sm cursor-pointer'
            >
              Auto-fill with Test Data
            </button>

            {/* Type */}
            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Job Type
              </label>
              <select
                id='type'
                name='type'
                className='border rounded w-full py-2 px-3'
                required
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value='Full-Time'>Full-Time</option>
                <option value='Part-Time'>Part-Time</option>
                <option value='Remote'>Remote</option>
                <option value='Internship'>Internship</option>
              </select>
            </div>

            {/* Title */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Job Listing Name
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Beautiful Apartment In Miami'
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            {/* Description */}
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows={4}
                placeholder='Add any job duties, expectations, requirements, etc'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>

            {/* Salary */}
            <div className='mb-4'>
              <label
                htmlFor='salary'
                className='block text-gray-700 font-bold mb-2'
              >
                Salary
              </label>
              <select
                id='salary'
                name='salary'
                className='border rounded w-full py-2 px-3'
                required
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
              >
                <option value='Under $50K'>Under $50K</option>
                <option value='$50K - 60K'>$50K - $60K</option>
                <option value='$60K - 70K'>$60K - $70K</option>
                <option value='$70K - 80K'>$70K - $80K</option>
                <option value='$80K - 90K'>$80K - $90K</option>
                <option value='$90K - 100K'>$90K - $100K</option>
                <option value='$100K - 125K'>$100K - $125K</option>
                <option value='$125K - 150K'>$125K - $150K</option>
                <option value='$150K - 175K'>$150K - $175K</option>
                <option value='$175K - 200K'>$175K - $200K</option>
                <option value='Over $200K'>Over $200K</option>
              </select>
            </div>

            {/* Location */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Location'
                required
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>

            <h3 className='text-2xl mb-5'>Company Info</h3>

            {/* Company Name */}
            <div className='mb-4'>
              <label
                htmlFor='company'
                className='block text-gray-700 font-bold mb-2'
              >
                Company Name
              </label>
              <input
                type='text'
                id='company'
                name='company'
                className='border rounded w-full py-2 px-3'
                placeholder='Company Name'
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
              />
            </div>

            {/* Company Description */}
            <div className='mb-4'>
              <label
                htmlFor='company_description'
                className='block text-gray-700 font-bold mb-2'
              >
                Company Description
              </label>
              <textarea
                id='company_description'
                name='company_description'
                className='border rounded w-full py-2 px-3'
                rows={4}
                placeholder='What does your company do?'
                value={companyDescription}
                onChange={(event) => setCompanyDescription(event.target.value)}
              ></textarea>
            </div>

            {/* Contact Email */}
            <div className='mb-4'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Email
              </label>
              <input
                type='email'
                id='contact_email'
                name='contact_email'
                className='border rounded w-full py-2 px-3'
                placeholder='Email address for applicants'
                required
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
              />
            </div>

            {/* Contact Phone */}
            <div className='mb-4'>
              <label
                htmlFor='contact_phone'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Phone
              </label>
              <input
                type='tel'
                id='contact_phone'
                name='contact_phone'
                className='border rounded w-full py-2 px-3'
                placeholder='Optional phone for applicants'
                value={contactPhone}
                onChange={(event) => setContactPhone(event.target.value)}
              />
            </div>

            {/* Add Job */}
            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:shadow-outline cursor-pointer'
                type='submit'
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default AddJobPage;