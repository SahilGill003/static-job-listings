export interface Job {
  "id": number,
  "company": string,
  "logo": string,
  "new": boolean
  "featured": boolean
  "position": string,
  "role": string,
  "level": string,
  "postedAt": string,
  "contract": string,
  "location": string,
  "languages": Array<string>,
  "tools": Array<string>
}

const NewTag = () => <span className="title-tag new-tag">New!</span>

const FeatureTag = () => <span className="title-tag featured-tag">Featured</span>

const FilterTag = ({ filter, addFilter }: { filter: string, addFilter: Function }) => <span className="filter-tag" onClick={() => addFilter(filter)}>{filter}</span>


export default ({ job, addFilter }: { job: Job, addFilter: Function }) => {
  const value = 'src/' + job.logo;
  const allTags = [job.level, job.role, ...job.languages, ...job.tools];


  return <div className="card grid">
    {job.featured ? <div className="flex featured">
    </div> : null}
    <img className="company-logo" src={value} />
    <div className="company-details flex">
      <div className="title flex">
        <p className="company-name">{job.company}</p>
        <div>
          {job.new ? <NewTag /> : null}
          {job.featured ? <FeatureTag /> : null}
        </div>
      </div>
      <p className="job-position">{job.position}</p>
      <div className="job-description flex">
        <p>{job.postedAt}</p>
        <div className="divider-dot"></div>
        <p>{job.contract}</p>
        <div className="divider-dot"></div>
        <p>{job.location}</p>
      </div>
    </div>
    <div className="flex filters">
      {allTags.map((filter, i) => <FilterTag key={i} filter={filter} addFilter={addFilter} />)}
    </div>
  </div>
}