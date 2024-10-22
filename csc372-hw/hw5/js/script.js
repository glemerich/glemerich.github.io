/*
Name: Garrett Emerich
Date: 10/22/2024
  CSC 372-01

This is the script for the github repos page, it fetches and displays a user's github repos.
*/

document.addEventListener('DOMContentLoaded', () => {
    const repoGallery = document.getElementById('repoGallery');
    const searchBtn = document.getElementById('searchBtn');
    const usernameInput = document.getElementById('username');

    const defaultUsername = 'glemerich'; 

    // Fetch and display repos when page loads
    fetchRepos(defaultUsername);

    // Search for repos when search button is clicked
    searchBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetchRepos(username);
        }
    });

    // Function to fetch repositories using the GitHub API
    function fetchRepos(username) {
        const url = `https://api.github.com/users/${username}/repos`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`User ${username} not found`);
                }
                return response.json();
            })
            .then(repos => {
                displayRepos(repos);
            })
            .catch(error => {
                repoGallery.innerHTML = `<p>${error.message}</p>`;
            });
    }

    // Function to display repositories in the gallery
    function displayRepos(repos) {
        repoGallery.innerHTML = ''; // Clear previous results

        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.classList.add('repo-card');

            repoCard.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description ? repo.description : 'No description available'}</p>
                <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
                <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
            `;

            repoGallery.appendChild(repoCard);
        });
    }
});
