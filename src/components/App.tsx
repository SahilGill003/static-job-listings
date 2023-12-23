import data from '../data.json'
import Job, * as types from './Job';
import { useEffect, useState } from 'react'

const FilterTag = ({ filter, removeFilter }: { filter: string, removeFilter: Function }) =>
  <div className='remove-filter' onClick={() => removeFilter(filter)}><span className="filter-tag">{filter}</span>
    <img className='icon-remove' src="../src/images/icon-remove.svg" alt="" /></div>

export default () => {
  const [filters, setFilters] = useState<Array<string>>([]);
  const [jobs, setJobs] = useState<types.Job[]>(data);


  useEffect(() => {
    const filterBy = () => {
      console.log(filters, jobs);
      let prevJob: Array<types.Job> = data;
      filters.forEach(filter => {
        const newJobs: Array<types.Job> = [];
        prevJob.forEach(job => {
          const localFilters = [job.level, job.role, ...job.languages, ...job.tools];
          if (localFilters.includes(filter))
            newJobs.push(job);
        })
        prevJob = newJobs;
        console.log(prevJob);
      })
      setJobs([...prevJob])
    }

    filterBy();
  }, [filters]);

  const addFilter = (filter: string) => {
    if (filters.includes(filter))
      return;
    setFilters([...filters, filter]);
  }

  const removeFilter = (filter: string) => {
    if (!filters.includes(filter))
      return;
    setFilters(filters.filter(f => f != filter));
  }

  const clearFilters = () => {
    setFilters([]);
  }

  return (
    <main>
      <div className={`header card flex ${filters.length ? "" : "nothing"}`}>
        <div className='active-filters flex'>
          {filters.map((filter, i) => <FilterTag key={i} filter={filter} removeFilter={removeFilter} />)}
        </div>
        <div className='clear-filter' onClick={clearFilters}>clear</div>
      </div>
      {jobs.map((job, i) => <Job key={i} job={job} addFilter={addFilter} />)}
    </main>
  )
}