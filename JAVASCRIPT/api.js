async function fetchGitHubRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching repos:", error);
        return [];
    }
}
