const jobListing = document.querySelector(".job-portal-job-listings")
const jobDetailModal = document.querySelector(".job-portal-job-detail-modal")
const searchElement = document.querySelector(".navigation-bar-search")
const filterButton = document.querySelector(".job-pertal-filter-icon")
const filterModal = document.querySelector(".job-filter-modal")
const closeFilterBtn = document.querySelector(".job-filter-modal-close-btn")
const filterTypeJobType = document.getElementById("filterType1")
const filterTypeLocation = document.getElementById("filterType2")
const filterTypeExperience = document.getElementById("filterType3")
const addFiltersBtn = document.querySelector(".filter-add-button")

// console.log(filterOptions[0].innerHTML)

let jobs = []
let searchQuery = ""

const trimAndAppendString = function (name) {
    if (name.length > 50) {
        return name.slice(0, 80) + '...'
    }
    return name
}

const filterJobsByLocation = () => {
    if (filterTypeLocation.value === "") {
        return jobs
    }
    return jobs.filter((job) => job.location === filterTypeLocation.value)
}

const filterJobsByJobType = () => {
    if (filterTypeJobType.value === "") {
        return jobs
    }
    return jobs.filter((job) => job.jobType === filterTypeJobType.value)
}

const filterJobsByExperience = () => {
    if (filterTypeExperience.value === "") {
        return jobs
    }
    return jobs.filter((job) =>
        job.experienceRequired[0] >= filterTypeExperience.value[0] && job.experienceRequired[0] <= filterTypeExperience.value[1]
    )
}

const combineAllFilters = (locationFilteredJobs, jobTypeFilteredJobs, experienceFilteredJobs) => {
    return locationFilteredJobs.filter(job =>
        jobTypeFilteredJobs.includes(job) &&
        experienceFilteredJobs.includes(job)
    );
}

const applyFilterToJobs = () => {
    const locationFilteredJobs = filterJobsByLocation()
    const jobTypeFilteredJobs = filterJobsByJobType()
    const experienceFilteredJobs = filterJobsByExperience()
    const combinedFilters = combineAllFilters(locationFilteredJobs, jobTypeFilteredJobs, experienceFilteredJobs)
    console.log(combinedFilters)
    return combinedFilters
}

const openModal = (job) => {
    jobDetailModal.classList.remove("hidden")
    const detailedContent = document.querySelector(".job-detai-modal-content")
    detailedContent.innerHTML = ""
    detailedContent.innerHTML = `
    <div class="job-detail-modal-close-btn">&times;</div>
                <div class="job-detail-modal-title">Job Application Portal</div>
                <div class="job-detail-modal-job-title">${job.title}</div>
                <div class="job-detail-modal-job-location">${job.location}</div>
                <div class="job-detail-modal-job-description">${job.description}</div>
                <div class="job-detail-modal-job-apply"><button class="job-detail-modal-job-apply-button"> Apply
                        Now</button></div>
                <div class="job-detail-modal-specs">
                    <div class="job-detail-modal-specs-container">
                        <div class="job-detail-modal-specs-attribute">
                            <img src="building.png" class="job-detail-spcs-img"/>
                            Company Name :<br/> ${job.company}
                        </div>
                    </div>
                    <div class="job-detail-modal-specs-container">
                        <div class="job-detail-modal-specs-attribute">
                            <img src="briefcase.png" class="job-detail-spcs-img"/>
                            Job Type :<br/> ${job.jobType}
                        </div>
                    </div>
                    <div class="job-detail-modal-specs-container">
                        <div class="job-detail-modal-specs-attribute">
                            <img src="travel-agency.png" class="job-detail-spcs-img"/>
                            Experience Required :<br/> ${job.experienceRequired}
                        </div>
                    </div>
                </div>
    `
    const closeJobDetailModal = detailedContent.querySelector(".job-detail-modal-close-btn")
    closeJobDetailModal.addEventListener("click", function () {
        closeModal()
    })
}

filteredData = () => {
    const query = searchQuery.toLowerCase()
    const applyFilter = jobs.filter((job) => {
        return job.title.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.jobType?.toLowerCase().includes(query)
    })
    // console.log(applyFilter)
    return applyFilter
}

const clearFilters = () => {
  filterTypeJobType.selectedIndex = 0;
  filterTypeLocation.selectedIndex = 0;
  filterTypeExperience.selectedIndex = 0;
}

const renderSearchedJobs = (jobs) => {
    jobListing.innerHTML = ""
    if (jobs.length === 0) {
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
    renderSearchedJobs(filteredJobs)
})

filterButton.addEventListener("click", () => {
    filterModal.classList.remove("hideFilters")
})

closeFilterBtn.addEventListener("click", () => {
    filterModal.classList.add("hideFilters")
})

addFiltersBtn.addEventListener("click", () => {
    // console.log(filterTypeJobType.value,filterTypeExperience.value,filterTypeLocation.value)
    const filteredJobs = applyFilterToJobs()
    filterModal.classList.add("hideFilters")
    clearFilters();
    renderSearchedJobs(filteredJobs)
})

// filterTypeJobType.addEventListener("change", (e) => {
//   console.log("Selected job type:", e.target.value);
// });

// filterTypeExperience.addEventListener("change", (e) => {
//   console.log("Selected job type:", e.target.value);
// });

// filterTypeLocation.addEventListener("change", (e) => {
//   console.log("Selected job type:", e.target.value);
// });

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !filterModal.classList.contains("hideFilters")) {
        filterModal.classList.add("hideFilters")
    }
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !jobDetailModal.classList.contains("hidden")) {
        jobDetailModal.classList.add("hidden")
    }
})

const closeModal = () => {
    jobDetailModal.classList.add("hidden")
}

