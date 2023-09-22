	/****************************************
     * AFFICHAGE DES CATEGORIES
     * *************************************/
    
    const getCatApi = async()=>{
        try{
            const reponse= await fetch("http://localhost:5678/api/categories");
            const data= await reponse.json();
            return data;
        } catch (error){
            console.log(error);
        }
    }

    getCatApi().then((categories) => {
      console.log(" J'affiche les catégories")
        const buttonBar= document.querySelector(`#buttonBar`);
        categories.forEach((categorie)=>{
            const button = document.createElement("button");
            button.innerText= categorie.name;
            button.classList.add("FilterButton");
            buttonBar.appendChild(button);

            button.addEventListener("click", async () =>{
              console.log("J'affiche les catégories filtrés")
                const getData= await getWorkApi();
                const filteredData = getData.filter((data)=> data.categoryId === categorie.id);   
                dynamicGallery(filteredData);          
            });
            
        });
    
    });

    const buttonAll = document.createElement('button');
    buttonAll.innerText = 'Tous';
    buttonBar.appendChild(buttonAll);
    buttonAll.classList.add("FilterButton");

    buttonAll.addEventListener("click",async()=>{
      console.log("Je rajoute la catégorie tous")
        getWorkApi().then((data)=>{
            dynamicGallery(data);
        })
    })

    /**************************************************
     * AFFICHAGE DES WORKS 
     * ************************************************/
   
    // Connexion à l'api en async pour que le programme continue à fonctionner pendant le chargement. Une fois que l'image est chargée , la fonction async renvoie les données que je peux utiliser pour afficher l'image correctement sur le site
    const getWorkApi = async()=>{
        try{
            const response= await fetch("http://localhost:5678/api/works");
            const data= await response.json();
            return data;
        }catch (error){
            console.log(error);
        }
    };
    // fonction pour créer les cards des works
    const dynamicGallery = (cards) => {
      console.log("J'affiche les cards dans la galerie")
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML="";
        cards.forEach((card)=> {
            const galleryCard=document.createElement("galleryCard");
            gallery.appendChild(galleryCard);
            galleryCard.innerHTML = `
            <img src="${card.imageUrl}" alt="${card.title}">
            <h3 class="cardTitle">${card.title}</h3>
            `;
        });
    };

    //affichage des cards des works
    getWorkApi().then((data)=>{
        dynamicGallery(data);
    });
/***********************************************
 * INTERFACE ADMIN
 ***********************************************/
  const token=sessionStorage.getItem("token")

  const isLogged=() =>(token? true:false);
    console.log("Je verifie si mon admin est connecté")
  const logOut=() =>{
    sessionStorage.clear("token");
    console.log("disconnected");
   window.location.reload();
  }

  const updateLoginButton =() =>{
    console.log("Je met a jour le bouton login")
    const loginBtn=document.querySelector("#ButtonLogin");
    if(isLogged()){
      loginBtn.href='#';
      loginBtn.innerText="logout";
      loginBtn.addEventListener("click", () =>{
        console.log("Je me deconnecte")
        logOut();
        loginBtn.innerText="login";
      });
    }
  };

  const updateInterface= () =>{
    console.log("J'affiche les boutons d'administration...")
    const filter=document.querySelector(".js-filter-box");
    const editBar=document.querySelector("#js-edit-mode");
    const alignItems=document.querySelector("#introduction");
    const editGalleryButton=document.querySelector("#js-button-edit-gallery");
    if(isLogged()) {
      console.log("... quand je suis connecté avec le compte admin")
      filter.style.display="none";
      editBar.style.display="flex";
      editGalleryButton.style.display="inline-flex";
      alignItems.style.alignItems="inherit";
    }
  };

   window.addEventListener("load", () =>{
    updateLoginButton();
    updateInterface();
  }) 



/***********************************************
 * MODALE 1
 * ********************************************/
// création d'une constante pour ouvrir la modale qui sera une fonction qui prend en paramètre l'évenement
const openModal= function (e) {
  e.preventDefault()
  //pour chaque cible je selectionne l'attribut href
  const target= document.querySelector(e.target.getAttribute('href'))
  // j'enlève l'attribut aria-hiden qui était à true pour afficher la modale
  target.removeAttribute(`aria-hidden`)
  target.setAttribute(`aria-modal`, `true`)
}

// Je vais sur les éléments qui ont la class js modale et sur chaque élément je place un écouteur d'évenement sur le clique qui lance la fonction openModal
document.querySelectorAll(`.js-modal`).forEach(button=>{
  console.log("J'ouvre la modale autrement")
  button.addEventListener('click',openModal)
  
})


const gallery = document.querySelector(".gallery");
const modalWrapper = document.querySelector(".modal-wrapper");
const flexModal = document.querySelector("#modal-grid");
const preventCloseModal = document.getElementById("prevent-close-modal");
const modifyWorksButton = document.querySelector("#js-button-edit-gallery");
const addPictureButton = document.querySelector(".btn-add-picture");
const modalFooter = document.querySelector("#modal-footer");
const modalTitle = document.querySelector("#title-modal");
const arrow = document.querySelector("#arrow");
const formularModal = document.querySelector("dialog form");
const hr1 = document.querySelector("#hr1");
const hr2 = document.querySelector("#hr2");

const stopPropagation= function(e){
  e.stopPropagation()
}

//Ouverture de la modale sur le clic "modifier"
modifyWorksButton.addEventListener("click", () => {
  console.log("J'ouvre la modale")
    modalWrapper.showModal();
    //apparition des works
    preventCloseModal.style.display = "block";
    flexModal.style.display = "flex";
    flexModal.style.alignItems = "center";

    // on évite l'apparition du formulaire d'ajout 
    arrow.style.display = "none";
    formularModal.style.display = "none";
    modalWrapper.display = "none";
    // apparition de la barre horizontale, des boutons ajouter une photo et supprimer la galerie, ainsi que du titre
    addPictureButton.style.display = "flex";
    modalFooter.style.display = "flex";
    modalTitle.textContent = "Galerie photo";
    flexModal.style.display = "flex";
    hr1.style.display = "flex";

    modalTitle.textContent = "Galerie photo";
});

const getWorkAdminApi = async() => {
    try{
        const response= await fetch("http://localhost:5678/api/works");
        const data= await response.json();
        return data;
    }catch (error){
        console.log(error);
    }
}
// création des cards de la modale
const adminGallery = (cards) => {
  console.log("J'affiche les cards dans la modale")
    const flexModal= document.querySelector("#modal-grid");
    flexModal.innerHTML="";
    cards.forEach((card)=>{
      console.log("Je crée les cards de la modale")
        const adminCard=document.createElement("adminCard")
        const imageElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        captionElement.textContent = "éditer";
        const trash = document.createElement("i");
        adminCard.classList.add("flex-item")
        imageElement.classList.add("flex-item")
        captionElement.classList.add("caption-element")
        trash.classList.add("fa-solid", "fa-trash-can", "flex-item");
        imageElement.src = card.imageUrl;
        adminCard.setAttribute("data-id", card.id);
        adminCard.appendChild(trash);
        adminCard.appendChild(imageElement);
        adminCard.appendChild(captionElement);
        flexModal.appendChild(adminCard);
 /*     trash.addEventListener("click",(e)=>{
      e.preventDefault();
      e.stopPropagation();
      fetch(`http://localhost:5678/api/works/${card.id}` , {
        method: "DELETE",
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      }).then((response) => {
        if (response.ok) {
          preventDefault();
          stopPropagation();
          console.log("Je rentre dans le .then")
          const gallery = document.querySelector(".gallery");
          //const adminCardId=adminCard.dataset.id;
          const removedCard = modal-grid.querySelector('adminCard[data-id="' + card.id + '"]');
          flexModal.removeChild(removedCard);
          gallery.removeChild(removedCard);
          console.log("J'essaye de supprimer de la galerie")
        console.log("test");
        }
      });
     }) */
    })
 

}
getWorkAdminApi().then((data)=>{
    adminGallery(data);
})


/******************************************** 
 * *SUPPRESSION TRAVAIL 
 * ******************************************/
 flexModal.addEventListener('click', function (event){
    console.log("J'ai cliqué sur le bouton")
    event.preventDefault();
      event.stopPropagation();
    // const token=sessionStorage.getItem("token");
      if(event.target.classList.contains('fa-trash-can')){
        console.log("J'ai récupéré la carte a supprimer")
          const adminCard=event.target.closest('adminCard');
          const adminCardId=adminCard.dataset.id;
            fetch(`http://localhost:5678/api/works/${adminCardId}`, {
                  method:'DELETE',
                  headers: { 
                      Authorization: "Bearer " + sessionStorage.getItem("token") 
                  },
            })  
        
          .then(function(response) {
              if(response.ok){
                console.log("L'élément a été supprimé")
                  const removedCard = flexModal.querySelector('adminCard[data-id="' + adminCardId + '"]');
                  modal-grid.removeChild(removedCard);
                  gallery.removeChild(removedCard);
                  getWorkAdminApi().then((data)=>{
                      adminGallery(data);
                  })
              } else {
                  console.error(`Erreur lors de la suppression de l'élement`);
                }
          })
          .catch(function(error){
              console.error(`Erreur de la supression de l'élément`, error);
          }) 
      }
 }) 



/*******************************************
 * * MODALE 2  
 ******************************************/
document.getElementById("btn-add-work").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    modalWrapper.showModal();
    console.log("J'ai cliqué");
    addPictureButton.style.display = "none";
    modalFooter.style.display = "none";
    modalTitle.textContent = "Ajout photo";
    flexModal.style.display = "none";
    hr1.style.display = "none";
  
      // ajout de fleche gauche
    arrow.style.display = "flex";
    formularModal.style.display = "flex";
    formularModal.style.flexDirection = "column";
    
  });


  arrow.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (modalWrapper.open) {
      arrow.style.display = "none";
      formularModal.style.display = "none";
      modalWrapper.display = "none";
  
      addPictureButton.style.display = "flex";
      modalFooter.style.display = "flex";
      modalTitle.textContent = "Galerie photo";
      flexModal.style.display = "flex";
      hr1.style.display = "flex";
    }
  });
  
  //  * ajout image modal 2/2 <i class="fa-regular fa-image"></i>--------------------------------------------

let uploadInput = document.getElementById("file-upload");
const faImg = document.querySelector(".fa-image");
const addPic = document.querySelector("#add-pic");
const formatImag = document.querySelector("#format-image");
const imagePreview = document.querySelector("#image-preview");
uploadInput.onchange = function (e) {
    
  let image = new FileReader();

  image.onload = function (e) {
    imagePreview.src = e.target.result;
    faImg.style.display = "none";
    addPic.style.display = "none";
    formatImag.style.display = "none";
    imagePreview.style.display = "flex";
  };
  image.readAsDataURL(this.files[0]);
};
  const addWorkForm = document.querySelector("#add-work-form");
  const titleInput = document.getElementById("titre");
  const categoryInput = document.getElementById("catégorie");
  const imageInput = document.getElementById("file-upload");
  const btnValidate = document.getElementById("btn-validate");

  // si les inputs sont remplis correctement, le bouton validate devient vert
  function checkInputs() {
    if (titleInput.value && categoryInput.value && imageInput.value) {
      btnValidate.style.backgroundColor = "#1d6154";
      btnValidate.style.border = "#1d6154";
      btnValidate.style.color = "white";
    } else {
      btnValidate.style.backgroundColor = "grey";
    }
  }
  
  //éviter la disparition de la modale au click des inputs du formulaire
  titleInput.addEventListener("click", (e)=>{
    e.stopPropagation();
  })
  categoryInput.addEventListener("click", (e)=>{
    e.stopPropagation();
  })
  imageInput.addEventListener("click", (e)=>{
    e.stopPropagation();
  })
  btnValidate.addEventListener("click", (e)=>{
    e.stopPropagation();
  })
  addPic.addEventListener("click", (e)=>{
    e.stopPropagation();
  })
  faImg.addEventListener("click", (e)=>{
    e.stopPropagation();
  })
  preventCloseModal.addEventListener("click", (e)=>{
    e.stopPropagation();
  })

  // On verifie ce qu'il y a dans les inputs
  titleInput.addEventListener("input", checkInputs);
  categoryInput.addEventListener("input", checkInputs);
  imageInput.addEventListener("input", checkInputs);

  
  addWorkForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData();
    formData.append("image", document.getElementById("file-upload").files[0]);
    formData.append("title", document.getElementById("titre").value);
    formData.append("category", document.getElementById("catégorie").value);
    console.log(formData);
    event.preventDefault();
    event.stopPropagation();
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
            dynamicGallery(data);
            adminGallery(data);
        preventCloseModal.style.display = "flex";
        formularModal.reset();
        imageInput.value = "";
        imagePreview.style.display = "none";
        faImg.style.display = "flex";
        addPic.style.display = "flex";
        formatImag.style.display = "flex";
      })
      .catch((error) => alert(error.message));
  });

  /******* FERMETURE DE LA MODALE ****************/
    // fermer la modale avec la croix
const x = document.querySelector(".fa-xmark");

x.addEventListener("click", () => {
  modalWrapper.close();
  addWorkForm.reset();
  preventCloseModal.style.display = "none";
  formularModal.reset();
});

// fermer la modale en cliquant en dehors de la modale
modalWrapper.addEventListener("click", () => {
    modalWrapper.close();
    preventCloseModal.style.display = "none";
    addWorkForm.reset();
    formularModal.reset();
  });

  

    


    
      