const gitForm = docuent.querySelector('github-form')
//add event listener for the DOM
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('#github-form').addEventListener('submit',searchGitHubUser)

})
//fetches the ithub users details from the url
function searchGitHubUser(e){
  e.preventDefault()
  const username = document.querySelector('#serch').Value;
  fetch(`https://api.github.com/search/users?q=${username}`)
  .then(res=>res.json())
  .then(users=>renderUserDetails(users.items))
  .catch(error=>{
    alert('Ooops my bad!')
    console.log(error.message)
  })
}

//render github users details for each of the retrieved from the response
let renderUserDetails=users=>{
  users.forEach(user=> {createGitHubUserCardElement(user)
     });
}

//create the card and its child elements
let createGitHubUserCardElement=user=>{
  const gitUserCard=document.createElement('div');
  gitUserCard.className='user-card';
  document.querySelector('#user-list').appendChild(gitUserCard);
  gitUserCard.innerHTML= `<img src= '${user.avatar_url}'>`
                         +`<h2>${user.login}<h2>`
                         +`<a class=fs11" href="${user.html_url}" target="_blank">Go To GitHub<a/><br>`
                         +`<button class=submit-btn fs11">view ${user.login}s Respos<button/>`
  gitUserCard.querySelector('.submit-btn').addEventListener('click',()=>{
    fetchRepositories(user)
  })
}

//fetch repos
let fetchRepositories = username =>{
  fetch(`https://api.github.com/users/${username.login}/repos`)
  .then(res=>res.json())
  .then(repos=>renderRepositoriesDetails(repos))
  .catch(error=>alert('NO NO NO'))

}

//render repos for each user
let renderRepositoriesDetails=repos=>{
  repos.forEach(repo=>createReposCardElement(repo))
}
 let createReposCardElement=repo=>{
  const repositoryCard=document.createElement('div')
  repositoryCard.className='repo card'
  document.querySelector('#repos-list').appendChild(repositoryCard);
  repositoryCard.innerHTML=`<h2 class = 'margin-none'>${repo.name}<h2/>`
                           +`<p class=fs14 margin-none'>${repo.description}</p>`
 }
