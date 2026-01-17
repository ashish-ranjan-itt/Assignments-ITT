const jobListing = document.querySelector(".job-portal-job-listings")
const jobDetailModal = document.querySelector(".job-portal-job-detail-modal")
const searchElement = document.querySelector(".navigation-bar-search")

let jobs = []
let searchQuery = ""

const trimAndAppendString = function (name) {
    if (name.length > 50) {
        return name.slice(0, 80) + '...'
    }
    return name
}

const openModal = (job) => {
    jobDetailModal.classList.remove("hidden")
    const detailedContent = document.querySelector(".job-detai-modal-content")
    // detailedContent.innerHTML =
    // `<div></div>`
}

filteredData = () => {  
    const query = searchQuery.toLowerCase()
    const applyFilter = jobs.filter((job) => {
        return job.title.toLowerCase().includes(query)||
        job.location.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.jobType?.toLowerCase().includes(query)
    })
    // console.log(applyFilter)
    return applyFilter
}

const renderJobs = (jobs) => {
    jobListing.innerHTML = ""
    if(jobs.length === 0) {
        jobListing.innerHTML = `<div class="no-jobs-container">
        <img src="image3.png" class="no-jobs-illustration"/>
        No jobs available for this keyword
        </div>`
    }
    jobs.map((job) => {
        const jobCard = document.createElement("div")
        jobCard.classList.add("job-card")
        jobListing.append(jobCard)
        jobCard.innerHTML = `
        <div class="job-card-title">${job.title}</div>
            <div class="job-card-description">${trimAndAppendString(job.description)}</div>
            <ul>
                <li class="job-specs-list">Company Name: ${job.company}</li>
                <li class="job-specs-list">Job Location: ${job.location}</li>
                <li class="job-specs-list">Job Type: ${job?.jobType}</li>
            </ul>
            <div class="job-card-exprience-section">
                <p>${job.experienceRequired}</p>
                <p>${job.experience}</p>
            </div>
        <button class="job-view-button">Click to view Job</button>
`
        const button = jobCard.querySelector(".job-view-button")
        button.addEventListener("click", () => {
            console.log(job)
            openModal(job)
        })
    })
}

fetch('jobs.json').then((res) => {
    console.log(res)
    return res.json()
}
).then((data) => {
    console.log(data)
    jobs = data
    data.map((job, index) => {
        const jobCard = document.createElement("div")
        jobCard.classList.add("job-card")
        // jobCard.append(`${job.title}`)
        jobListing.append(jobCard)
        jobCard.innerHTML = `
        <div class="job-card-title">${job.title}</div>
            <div class="job-card-description">${trimAndAppendString(job.description)}</div>
            <ul>
                <li class="job-specs-list">Company Name: ${job.company}</li>
                <li class="job-specs-list">Job Location: ${job.location}</li>
                <li class="job-specs-list">Job Type: ${job?.jobType}</li>
            </ul>
            <div class="job-card-exprience-section">
                <p>${job.experienceRequired}</p>
                <p>${job.experience}</p>
            </div>
        <button class="job-view-button">Click to view Job</button>
`
        const button = jobCard.querySelector(".job-view-button")
        button.addEventListener("click", () => {
            console.log(job)
            openModal(job)
        })
    })
}).catch((err) => console.log(err))

searchElement.addEventListener("input", (e) => {
    searchQuery = e.target.value
    // console.log(searchQuery)
    const filteredJobs = filteredData()
    renderJobs(filteredJobs)
})

