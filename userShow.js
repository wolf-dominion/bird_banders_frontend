console.log('Hello from user page');
const getWebPage = document.querySelector('.webpage')

user_query = new URLSearchParams(window.location.search)
userId = user_query.get('id')
console.log('id: ', userId);

userURL = `http://localhost:3000/users/${userId}`
fetch(userURL)
.then(parseJSON)
.then(displayUserInfo)

function parseJSON(response){
return response.json()
}

function displayUserInfo(user){
    const userInfoContainer = document.createElement('div')
    const birdInfoContainer = document.createElement('div')
    const capturesInfoContainer = document.createElement('div')
    const mainHeader = document.createElement('h3')
    mainHeader.textContent = `${user.username}'s page`

    const getTitleDiv = document.getElementById('title')
    getTitleDiv.textContent = user.username

    //getWebPage.append(userInfoContainer)
    getWebPage.append(birdInfoContainer)
    getWebPage.append(capturesInfoContainer)
    userInfoContainer.append(mainHeader)

    const getUserInfoTab = document.getElementById('user-info-list')
    

    displayName(user, getUserInfoTab)
    displayEmail(user, getUserInfoTab)
}

function displayName(user, userInfoContainer){
    const theirName = document.createElement('p')
    theirName.textContent = `Name: ${user.name}`
    userInfoContainer.append(theirName)
}

function displayEmail(user, userInfoContainer){
    const theirEmail = document.createElement('p')
    theirEmail.textContent = `Email: ${user.email}`
    userInfoContainer.append(theirEmail)
}

membershipsURL = 'http://localhost:3000/research_groups'
fetch(membershipsURL)
.then(parseJSON)
.then(displayGroups)

function displayGroups(researchGroups){
    
    const userGroupsDiv = createGroupsContainer()
    createGroupsTitle(userGroupsDiv)

    researchGroups.forEach(group => {
        const membershipsArray = group.memberships
        membershipsArray.forEach(membership => {

            if (membership.user_id == userId){
                const groupList = displayGroupNameAndCreateContainer(group, userGroupsDiv)
                displayBirdCaptures(membership, groupList)
            }
        });
    });
}

function createGroupsContainer(){
    const getGroupsList = document.getElementById('groups-list')
    //getGroupsList.append(groupName, birdCapTitle, groupList)
    const userGroupsDiv = document.createElement('div')
    getGroupsList.append(userGroupsDiv)
    return userGroupsDiv
}

function createGroupsTitle(userGroupsDiv){
    // const UserGroupsList = document.createElement('h3')
    // UserGroupsList.textContent = "Groups this user is part of: "
    // userGroupsDiv.append(UserGroupsList)
}

function displayGroupNameAndCreateContainer(group, userGroupsDiv){
    const groupName = document.createElement('h4')
    groupName.innerHTML = `<a href=research_group.html?id=${group.id}>${group.name}</a>`
    const groupList = document.createElement('ul')
    groupList.id = `group-${group.id}`
    userGroupsDiv.append(groupName, groupList)
    return groupList
}

function displayBirdCaptures(membership, groupList){
    const usersCaptures = membership.bird_captures

    usersCaptures.forEach(capture => {
        const captureListElement = document.createElement('li')
        captureListElement.textContent = `Bird capture info: ${capture.id}`
        groupList.append(captureListElement)
    });
}

const logoutButton = document.querySelector('.login-button')

function setIsLoggedIn(){
    console.log('token', localStorage.getItem("token"));

    if (localStorage.token){
        logoutButton.textContent = `(${localStorage.username}) logout`
    }
    else {
        logoutButton.textContent = "login"
    }
    
    // isLoggedIn.textContent = localStorage.getItem("token")
    // ? `Hello, ${localStorage.getItem('username')}, you are logged in`
    // : "You are not logged in"
}

setIsLoggedIn()

function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem('username')
}

logoutButton.addEventListener("click", ()=>{
    logout()
    setIsLoggedIn()
})