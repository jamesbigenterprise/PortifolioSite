//let URL = 'http://localhost:7000';
let URL = 'https://thiago-alves-portifolio.herokuapp.com';


//grab the button


const addItemButton = document.querySelector("#add-item-button-c");
addItemButton.addEventListener('click', () => {
    const itemSelected = document.querySelector("#add-item-c").value;
    addItem(itemSelected);
});
document.querySelector('#save-c').addEventListener('click', () =>{
    save();
});
document.querySelector('#save').addEventListener('click', () =>{
    saveEdit();
});
function addItem(name){
    const allItemsConteiner = document.querySelector("#allItemsConteiner");
    const newItem = createInput(name);
    allItemsConteiner.appendChild(newItem);
}

function getType(name){
    switch (name){
        case 'paragraph':
            return 'textarea'
        case 'image':
            return 'file';
        case 'main-image':
            return 'file';
        case 'youtube-video':
            return 'text';
        case 'subheading':
            return 'text';
        case 'title':
            return 'text';
        default:
            return;
    }
}

function deleteElement (event){
    event.target.parentElement.remove();
}

function createInput(name){
    let container = document.createElement('div');
    container.setAttribute('class', 'element form-group');
    let label = document.createElement('label');
    label.setAttribute('for', name);
    label.innerHTML  = name + ':';
    let input = document.createElement('input');

    if(name === 'paragraph'){
        input = document.createElement(getType(name));  
        input.setAttribute('name', name);  
        input.setAttribute('rows', 10);
        input.setAttribute('cols', 50);
        input.setAttribute('class', 'form-control');
    }else{
        input.setAttribute('name', name);
        input.setAttribute('type', getType(name));
        input.setAttribute('class', 'form-control');
    }
    let icon  = document.createElement('i');
    icon.setAttribute('class', 'fa fa-trash-o');
    icon.addEventListener('click', deleteElement)
    container.appendChild(label);
    container.appendChild(input);
    if(!(name === 'title' || name === 'main-image')){
        container.appendChild(icon);
    }
    
    return container;
}





function save (){
    const currentItems = document.querySelectorAll("#allItemsConteiner .element");
    let position = 0;
    let objectsArray = [];
    //file handling
    const formData = new FormData();
    currentItems.forEach(item => {
        //gather the information to rebuild
        //name
        const name = item.children[1].attributes[0].value;
        //current value *if any
        const value = item.children[1].value;
        if(name === 'main-image'){
            formData.append('image', item.children[1].files[0])
        }

        //add to the json
        const singleObject = {
            name: name,
            value: value,
            position:position
        }

        objectsArray.push(singleObject);
        position++;
    });

    const jsonArray = JSON.stringify(objectsArray); 
    const blob = new Blob([jsonArray],{type : 'application/json'});
    formData.append('objectsArray',blob);

    fetch(URL + '/admin/article', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        //show the message and update the view
      });
}



//edit article

function editArticle(articleId){
    //fetch the article
    fetch(URL + '/article/' + articleId, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(res => {
          //fill the module with the article
          let modelBody = document.querySelector(`#allItemsConteinerEdit`);
          res.article.forEach(el =>{
            const newItem = createInput(el.name);
            if(newItem.children[1].attributes[1].textContent === 'file'){
                let fieldHelp = document.createElement('small');
                fieldHelp.setAttribute('class', 'form-text text-muted');
                fieldHelp.setAttribute('id','fieldHelp');
                fieldHelp.innerHTML = "Do not upload anything if you wish to keep the previous image";
                newItem.appendChild(fieldHelp);
                newItem.children[0].innerHTML = el.value;
            }else{
                newItem.children[1].value = el.value;
            }
            modelBody.appendChild(newItem);
            let articleIDcontainer = document.createElement('input');
            articleIDcontainer.setAttribute('type','hidden');
            articleIDcontainer.setAttribute('id', 'articleID');
            articleIDcontainer.value = res._id;
            modelBody.appendChild(articleIDcontainer);
    
          });
          //call the module 
          $('#editArticlemodal').modal();
          });
    //populate a mudule with it

    //overwrite the current article 
}

//save the edit
function saveEdit (){
    const currentItems = document.querySelectorAll("#allItemsConteinerEdit .element");
    console.log('testing if we got the data from the correct model', currentItems);
    let articleID = document.querySelector('#articleID');
    let position = 0;
    let objectsArray = [];
    //file handling
    const formData = new FormData();
    currentItems.forEach(item => {
        //gather the information to rebuild
        //name
        const name = item.children[1].attributes[0].value;
        //current value *if any
        const value = item.children[1].value;
        if(name === 'main-image'){
            formData.append('image', item.children[1].files[0])
        }

        //add to the json
        const singleObject = {
            name: name,
            value: value,
            position:position
        }

        objectsArray.push(singleObject);
        position++;
    });

    const jsonArray = JSON.stringify(objectsArray); 
    const blob = new Blob([jsonArray],{type : 'application/json'});
    formData.append('objectsArray',blob);

    fetch(URL + '/admin/article/articleID', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        //show the message and update the view
      });
}