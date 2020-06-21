let next




//grab the button

const addItemButton = document.querySelector("#add-item-button");
addItemButton.addEventListener('click', () => {

    const itemSelected = document.querySelector("#add-item").value;
    addItem(itemSelected);
    
    //console.log('check the sequence', currentItems);
});


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
    let container = document.querySelector('')

    currentItems.forEach(item => {

        //gather the information to rebuild
        //name
        const name = item.children[1].attributes[0].value;
        //input type
        const type = item.children[1].attributes[1].nodeValue;
        //current value *if any
        const value = item.children[1].value;
        //create a json with the new element
        console.log('name', name, 'type', type);

        //recreate the element
        let container = createSingleElement(name, type);

        //add to the json
        const singleObject = {
            name: name,
            value: value,
            position:position
        }
        objectsArray.push(singleObject);
        position++;
    });
    console.log(objectsArray);
    
}

function createSingleElement (name, type){
    //recreate the element
    let container = document.createElement('div');
    container.setAttribute('class', 'element');
    let label = document.createElement('label');
    label.setAttribute('for', name);
    label.innerHTML  = name + ':';
    let input = document.createElement('input');
    input.setAttribute('type',type);
    input.setAttribute('name', name);

    container.appendChild(label);
    container.appendChild(input);

    return container;
}

function getType(name){
    switch (name){
        case 'paragraph':
            return 'text-area'
        case 'image':
            return 'file';
        case 'youtube-video':
            return 'subheading';
        default:
            return;
    }
}
