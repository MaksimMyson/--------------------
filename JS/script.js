document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

function loadUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '<h2>Копірайтери:</h2>';
            users.forEach(user => {
                const userElement = document.createElement('div');
                userElement.classList.add('user');
                userElement.textContent = user.name;
                userElement.onclick = () => showUserDetails(user.id);
                userList.appendChild(userElement);
            });
        });
}

function showUserDetails(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            const userDetails = document.getElementById('userDetails');
            userDetails.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                <button onclick="showUserPosts(${user.id})">Show posts</button>
            `;
        });
}

function showUserPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            const userPosts = document.getElementById('userPosts');
            userPosts.innerHTML = '<h3>Пости:</h3>';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `<h4>${post.title}</h4><p>${post.body}</p>`;
                userPosts.appendChild(postElement);
            });
        });
}
