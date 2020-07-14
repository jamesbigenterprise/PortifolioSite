//URL = 'http://localhost:7000';
URL = 'https://thiago-alves-portifolio.herokuapp.com';

function displayArticle(){
    //fetch the article
    fetch(URL + '/articleID', {
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
   
    const htmlTag = getTypeDisplay(element.name);
    let htmlElement = document.createElement(htmlTag);
    if (htmlTag == 'img'){
        htmlElement.setAttribute('src', element.value);
        htmlElement.setAttribute('class', 'img-fluid');   
    }else{
        htmlElement.innerHTML = element.value;
    }
    return htmlElement;
}

function getTypeDisplay(name){
    switch (name){
        case 'paragraph':
            return 'p';
        case 'title':
                return 'h1';
        case 'image':
            return 'img';
        case 'main-image':
                return 'img';    
        case 'youtube-video':
            return 'a';
        case 'subheading': 
        return 'h2';
        default:
            return;
    }
}


function displayArticles(){
    //fetch the article
    fetch(URL + '/article', {
        method: 'GET',
        headers:{
        'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(result => {
        //loop and create elements to display
        let row = document.querySelector('#homerow');
        result.forEach( element =>{
            let b = document.createElement('button');
            b.setAttribute('class', 'text-center rounded float-left col-sm-6 btn btn-outline-light');
            b.setAttribute('style','background-image: url(\'\\' + element.article[0].value.replace('images\\','images\\\\') +'\');' );
            b.innerHTML = element.article[1].value;
            b.setAttribute('onclick', 'openArticle(\''+ element._id+'\')');
            row.appendChild(b);
        });   
    });
}

function openArticle(articleId){

    fetch(URL + '/article/' + articleId, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(res => {
          
          //erase everything and fill with the article
          document.querySelector('#home').innerHTML =  '';
          let container = document.createElement('div');
          //-----------------------------------------------------
          let editButton = document.createElement('button');
          editButton.setAttribute('class', 'btn');
          editButton.innerHTML = 'Edit Article';
          editButton.addEventListener('click', ()=>{
            editArticle(res._id);
          });
          container.appendChild(editButton);
          //-------------------------------------------
          container.setAttribute('class', 'container');
          res.article.forEach(element => {
              container.appendChild(createSingleElement(element));  

          });

        document.querySelector('#home').appendChild(container);
        
      });
}
displayArticles();
