const ENDPOINT = "https://jsonplaceholder.typicode.com";

fetch(`${ENDPOINT}/users`)
  .then((res) => res.json())
  .then((users) => {
    const usersList = document.querySelector(".users");
    users.forEach(({ id, name, email }) => {
      let output = document.createElement("div");
      let userInfo = document.createElement("div");
      let userPost = document.createElement("div");
      let getPostsButton = document.createElement("button");

      userInfo.innerHTML = `
      <h3>${name}</h3>
      <p>${email}</p>
      `;

      getPostsButton.innerText = "Get User's Posts";
      getPostsButton.dataset.id = id;
      getPostsButton.dataset.name = name;
      getPostsButton.addEventListener("click", (e) => setActive(e));

      output.classList.add("user");
      userInfo.classList.add("user__info");
      userPost.style.display = 'none';
      userPost.classList.add("user__post",`post--${id}`);
      userInfo.appendChild(getPostsButton);
      output.appendChild(userInfo);
      output.appendChild(userPost);
      usersList.appendChild(output);
    });
  })
  .catch((err) => console.log(err));

function setActive(e) {
  const { id } = e.target.dataset;
  let userPost = document.querySelector(`.post--${id}`);
  if (userPost.style.display === 'none') {
    getPosts(e)
    return userPost.style.display = 'block'
  } else if (userPost.style.display === 'block') {
    return userPost.style.display = 'none'
  }
}

function getPosts(e) {
  const { id, name } = e.target.dataset;
  fetch(`${ENDPOINT}/posts?userId=${id}`)
    .then((res) => res.json())
    .then((posts) => {
      let output = "";
      posts.forEach((post) => {
        output += `
                    <p class="post__title">${post?.title}</li>
                    <p>${post?.body}</p>
                    <i><b>Posted by: </b>${name}</i>
                    <hr>
              `;
      });
      document.querySelector(`.post--${id}`).innerHTML = output;
    })
    .catch((err) => console.log(err));
}
