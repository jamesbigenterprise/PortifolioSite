displayArticle();


function displayArticle(){
    //fetch the article
    fetch('http://localhost:7000/articleID', {
        method: 'GET',
        headers:{
        'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(result => {
        //loop and create elements to display
        const allItemsConteiner = document.querySelector("#allItemsConteiner");

       
        
        result.article.forEach(element => {
            allItemsConteiner.appendChild(createSingleElement(element))            
        });

    });

    //retrieve the container
    
    //loop the article and build it to display
    
}


function createSingleElement (element){
    //recreate the element
   
    const htmlTag = getType(element.name);

    console.log('creating a ' +  htmlTag + ' name ' + element.name);
    
    let htmlElement = document.createElement( htmlTag );
    if (htmlTag == 'img'){
        htmlElement.setAttribute('src', element.value);
        htmlElement.setAttribute('class', 'img-fluid');   
       
        console.log('image created');
    }else{
        htmlElement.innerHTML = element.value;
    }
    
 

    return htmlElement;
}

function getType(name){

    
    switch (name){
        case 'paragraph':
     
            return 'p';
        case 'title':
       
                return 'h1';
        case 'image':
            console.log('should return img');
            return 'img';
        case 'main-image':
           console.log('should return img');
                return 'img';    
        case 'youtube-video':
            return 'a';
        case 'text': 
        return 'h2';
        default:
            
            return;
    }
}