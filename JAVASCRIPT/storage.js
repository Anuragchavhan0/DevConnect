// Save profile to LocalStorage
function saveProfile(profileData) {
    localStorage.setItem("devProfile", JSON.stringify(profileData));
}

// Get profile from LocalStorage
function getProfile() {
    return JSON.parse(localStorage.getItem("devProfile"));
}
