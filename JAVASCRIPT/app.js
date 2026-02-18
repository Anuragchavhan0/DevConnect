
document.addEventListener("DOMContentLoaded", function () {

    const createBtn = document.getElementById("createProfile");
    const profileCard = document.getElementById("profileCard");

    // Load existing profile on refresh
    const existingProfile = getProfile();
    if (existingProfile) {
        displayProfile(existingProfile);
        loadRepos(existingProfile.github)
    }

    createBtn.addEventListener("click", function () {

        const name = document.getElementById("name").value;
        const bio = document.getElementById("bio").value;
        const skills = document.getElementById("skills").value.split(",");
        const github = document.getElementById("github").value;

        const profileData = {
            name,
            bio,
            skills,
            github
        };

        saveProfile(profileData);
        loadRepos(github);

        displayProfile(profileData);
    });

    function displayProfile(profile) {
        profileCard.innerHTML = `
            <div class="card">
                <h3>${profile.name}</h3>
                <p>${profile.bio}</p>
                <p><strong>Skills:</strong> ${profile.skills.join(", ")}</p>
                <p><strong>GitHub:</strong> ${profile.github}</p>
            </div>
        `;
    }
    const searchInput = document.getElementById("skillSearch");



    async function loadRepos(username) {

    const reposContainer = document.getElementById("repos");
    reposContainer.innerHTML = "Loading repositories...";

    const repos = await fetchGitHubRepos(username);

    if (repos.length === 0) {
        reposContainer.innerHTML = "No repositories found.";
        return;
    }

    reposContainer.innerHTML = "";

    repos.slice(0, 5).forEach(repo => {
        reposContainer.innerHTML += `
            <div class="card">
                <h4>${repo.name}</h4>
                <p>⭐ Stars: ${repo.stargazers_count}</p>
                <p>🍴 Forks: ${repo.forks_count}</p>
            </div>
        `;
    });

    searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value.toLowerCase();
    const storedProfile = getProfile();

    if (!storedProfile) return;

    const matchedSkills = storedProfile.skills.filter(skill =>
        skill.trim().toLowerCase().includes(searchValue)
    );

    if (matchedSkills.length > 0) {
        displayProfile(storedProfile);
    } else {
        profileCard.innerHTML = "<p>No matching skills found.</p>";
    }

});


}


});
