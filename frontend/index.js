const userList = document.querySelector('.user-list');
const addUserForm = document.querySelector('.add-user-form');
const changeForm = document.getElementById('changeForm');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const age = document.getElementById('age');
const btnsubmit = document.querySelector('.btn');


const url = "https://tera-backend.herokuapp.com/api";
let output = '';

const renderPeopleList = (users) => {
    if(users.length<=0){
        output+=`<h6 class="">No users in the list!! Please add a user to view the list. </h6>`;
    }
    users.forEach(user => {
        output+=`<div class="card m-4 col-md-3 bg-light">
        <div class="card-body" data-id="${user.id}" data-name="${user.firstName}">
            FIRSTNAME:<h6 class="firstnamecard"> ${user.firstName}</h6>
            LASTNAME:<h6 class="lastnamecard"> ${user.lastName}</h6>
            AGE:<h6 class="agecard"> ${user.age}</h6>
          <a href="#" class="btn btn-outline-warning btn-sm" id="update-user">Update</a>
          <a href="#" class="btn btn-outline-danger btn-sm" id="delete-user">Delete</a>
        </div>
      </div>`
    });
    userList.innerHTML=output;
}

//GET to fetch all the users
fetch(`${url}/people`)
.then(res => res.json())
.then(data => renderPeopleList(data));




userList.addEventListener('click',(e)=>{
    e.preventDefault();
    let editButtonIsPressed = e.target.id === 'update-user';
    let delButtonIsPressed = e.target.id === 'delete-user';

    let id= e.target.parentElement.dataset.id;
    if(delButtonIsPressed){
        fetch(`${url}/remove/${id}`,{
            method: 'DELETE',
        })
        .then(res=>res.json())
        alert(`User with firstname ${e.target.parentElement.dataset.name} has been deleted!`)
        location.reload();
    }

    if(editButtonIsPressed){
        const parent = e.target.parentElement;
        let updatefirstname = parent.querySelector('.firstnamecard').textContent;
        let updatelastname = parent.querySelector('.lastnamecard').textContent;
        let updateage = parseInt(parent.querySelector('.agecard').textContent);
        
        firstname.value=updatefirstname;
        lastname.value=updatelastname;
        age.value=updateage;
    }
    btnsubmit.addEventListener('click',(e)=>{
        e.preventDefault();
        fetch(`${url}/people/${id}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: firstname.value,
                lastName: lastname.value,
                age: age.value
            })
        })
        .then(res => res.json())
        alert(`User ${firstname.value} has been updated`);
        location.reload();
    })
    

})

//POST to create a new user
addUserForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    fetch(`${url}/people`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: firstname.value,
            lastName: lastname.value,
            age: age.value
        })
    })
    .then(res => res.json())
    .then(data => {
            let dataArr = [];
            dataArr.push(data);
            renderPeopleList(dataArr);
    })
    alert(`User ${firstname.value} has been added`);
    location.reload();
})
