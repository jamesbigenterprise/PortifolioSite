//grab the button

const addItemButton = document.querySelector("#add-item-button");
addItemButton.addEventListener('click', () => {

    const itemSelected = document.querySelector("#add-item").value;
    addItem(itemSelected);
    
});

document.querySelector('#save').addEventListener('click', () =>{
    save();
});
function save (){

    const currentItems = document.querySelectorAll(".element");

    let position = 0;
    let objectsArray = [];

    console.log('currentItems', currentItems);
    
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

    console.log(jsonArray, objectsArray);
    
    const blob = new Blob([jsonArray],{type : 'application/json'});
    formData.append('objectsArray',blob);


    
    //example 
    fetch('http://localhost:7000/admin/article', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(res => {
        //show the message and update the view
        
      });
}

//add to form
//function addElements
//create element
function addItem(name){

    const currentItems = document.querySelectorAll(".element");
    const allItemsConteiner = document.querySelector("#allItemsConteiner");
    const inputType = getType(name)
    const newItem = createSingleElement(name, inputType);
    allItemsConteiner.appendChild(newItem);

    let position = 0;
    let objectsArray = [];
    let container = document.querySelector('#allItemsConteiner');

    currentItems.forEach(item => {

        //gather the information to rebuild
        //name
    
        const name = item.children[1].attributes[0].value;
        //input type
        const type = item.children[1].attributes[1].nodeValue;
        //current value *if any
        const value = item.children[1].value;
        //create a json with the new element
        

        //recreate the element
        let container = createSingleElement(name);
 
        //add to the json
        const singleObject = {
            name: name,
            value: value,
            position:position,
            name: name
        }
        objectsArray.push(singleObject);
        position++;
    });
  
    
}

function createSingleElement (name){
    //recreate the element
    let container = document.createElement('div');
    container.setAttribute('class', 'element');
    let label = document.createElement('label');
    label.setAttribute('for', name);
    label.innerHTML  = name + ':';
    let input = document.createElement('input');
    if(name === 'paragraph'){
        input = document.createElement(getType(name));  
        input.setAttribute('name', name);  
        input.setAttribute('rows', 10);
        input.setAttribute('cols', 50);
    }else{
        
        input.setAttribute('type', getType(name));
        input.setAttribute('name', name);
    }

    container.appendChild(label);
    container.appendChild(input);

    return container;
}

function getType(name){
    switch (name){
        case 'paragraph':
            return 'textarea'
        case 'image':
            return 'file';
        case 'youtube-video':
            return 'text';
        case 'subheading':
        return 'text'
        default:
            return;
    }
}
