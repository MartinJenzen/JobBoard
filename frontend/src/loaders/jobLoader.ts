import type { LoaderFunctionArgs } from "react-router-dom";
import type { Job } from "../types/job";

export const jobsLoader = async (): Promise<Job[]> => {
  const response = await fetch('/api/jobs');

  if (!response.ok)
    throw new Error('Failed to fetch jobs!');

  return await response.json();
}

export const jobLoader = async ({ params }: LoaderFunctionArgs): Promise<Job> => {

  const id = params.id;
  
  if (!id)
    throw new Error('Job ID is missing!');

  const response = await fetch(`/api/jobs/${id}`);

  if (!response.ok)
    throw new Error(`Failed to fetch job with id: ${id}`);

  return await response.json();
}