import type { Job, NewJob } from "../types/job";

export const fetchJobs = async (isHome: boolean = false): Promise<Job[]> => {
  const jobsApiUrl = isHome ? 'jobs?_page=1&_per_page=3' : 'jobs';
  const response = await fetch(`/api/${jobsApiUrl}`);

  if (!response.ok)
    throw new Error('Failed to fetch jobs!');

  const fetchedJobs = await response.json();
  return fetchedJobs;
}

export const addJob = async (newJob: NewJob): Promise<void> => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(newJob)
  });


  if (!response.ok) 
    throw new Error('Failed to add job!');
}

export const deleteJob = async (id: number): Promise<void> => {
  const response = await fetch(`/api/jobs/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) 
    throw new Error('Failed to delete job with id: ' + id);
}

export const updateJob = async (job: Job): Promise<void> => {
  const response = await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  });

  if (!response.ok)
    throw new Error('Failed to update job with id: ' + job.id);
}