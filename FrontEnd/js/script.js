	/****** AFFICHAGE DES CATEGORIES************/
    
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
        const buttonBar= document.querySelector(`#buttonBar`);
        categories.forEach((categorie)=>{
            const button = document.createElement("button");
            button.innerText= categorie.name;
            button.classList.add("FilterButton");
            buttonBar.appendChild(button);

            button.addEventListener("click", async () =>{
                const getData= await getWorkApi();
                const filteredData = getData.filter((data)=> data.categoryId === categorie.id);   
                dynamicGallery(filteredData);          
            });
            
        });
    
    });

    const btnAll = document.createElement('button');
    btnAll.innerText = 'Tous';
    buttonBar.appendChild(btnAll);
    btnAll.classList.add("FilterButton");

    btnAll.addEventListener("click",async()=>{
        getWorkApi().then((data)=>{
            dynamicGallery(data);
        })
    })

    /********** AFFICHAGE DES WORKS ***************/
   
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

/********************** MODALE 1************************/
const gallery = document.querySelector(".gallery");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalGrid = document.querySelector("#modalGrid");
const preventCloseModal = document.getElementById("preventCloseModal");
const BtnModificationWorks = document.querySelector("#js-button-edit-gallery");
const btnAddPic = document.querySelector(".btnAddPic");
const modalFooter = document.querySelector("#modalFooter");
const titleModal = document.querySelector("#titleModal");
const arrow = document.querySelector("#arrow");
const modalForm = document.querySelector("dialog form");
const hr1 = document.querySelector("#hr1");
const hr2 = document.querySelector("#hr2");

//Ouverture de la modale sur le clic "modifier"
BtnModificationWorks.addEventListener("click", () => {
    modalWrapper.showModal();
    //apparition des works
    preventCloseModal.style.display = "block";
    modalGrid.style.display = "grid";
    modalGrid.style.alignItems = "center";
    modalGrid.style.gridGap = "10px 10px";
    modalGrid.style.gridTemplateColumns = "auto auto auto auto auto";
    modalGrid.style.gridTemplateRow = "300px 300px 300px ";
    // on évite l'apparition du formulaire d'ajout 
    arrow.style.display = "none";
    modalForm.style.display = "none";
    modalWrapper.classList.add("mystyle");
    modalWrapper.display = "none";
    // apparition de la barre horizontale, des boutons ajouter une photo et supprimer la galerie, ainsi que du titre
    btnAddPic.style.display = "flex";
    modalFooter.style.display = "flex";
    titleModal.textContent = "Galerie photo";
    modalGrid.style.display = "grid";
    hr1.style.display = "flex";

    titleModal.textContent = "Galerie photo";
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
    const modalGrid= document.querySelector("#modalGrid");
    modalGrid.innerHTML="";
    cards.forEach((card)=>{
        const adminCard=document.createElement("adminCard")
        const imageElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        captionElement.textContent = "éditer";
        const trash = document.createElement("i");
        const cross = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        cross.classList.add("fa-solid", "fa-arrows-up-down-left-right");
        imageElement.src = card.imageUrl;
        adminCard.setAttribute("data-id", card.id);
        adminCard.appendChild(cross);
        adminCard.appendChild(trash);
        adminCard.appendChild(imageElement);
        adminCard.appendChild(captionElement);
        modalGrid.appendChild(adminCard);
    })
    imageElement=document.querySelector("img");
    imageElement.addEventListener("mouseover", (event) => {
        event.target.nextElementSibling.style.display = "block";
      });
  
      imageElement.addEventListener("mouseout", (event) => {
        event.target.nextElementSibling.style.display = "none";
      });
  /* 
      cross.style.display = "none";

      cross.addEventListener("mouseover", (event) => {
        event.target.style.display = "block";
      });
  
      cross.addEventListener("mouseout", (event) => {
        event.target.style.display = "block";
      }); */

}
getWorkAdminApi().then((data)=>{
    adminGallery(data);
})


/********** SUPPRESSION TRAVAIL ***************/
 modalGrid.addEventListener('click', function (event){
    event.preventDefault();
    event.stopPropagation();
    const token=sessionStorage.getItem("token");
    if(event.target.classList.contains('fa-trash-can')){
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
                response.preventDefault();
                response.stopPropagation();
                const removedCard = modalGrid.querySelector('adminCard[data-id="' + adminCardId + '"]');
                modalGrid.removeChild(removedCard);
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

const stopPropagation= function(e){
    e.stopPropagation()
}

document.getElementById("btnAddWork").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    modalWrapper.showModal();
    console.log("J'ai cliqué");
    btnAddPic.style.display = "none";
    modalFooter.style.display = "none";
    titleModal.textContent = "Ajout photo";
    modalGrid.style.display = "none";
    hr1.style.display = "none";
  
      // ajout de fleche gauche
    arrow.style.display = "flex";
    modalForm.style.display = "flex";
    modalForm.style.flexDirection = "column";
    
  });


  arrow.addEventListener("click", () => {
    if (modalWrapper.open) {
      arrow.style.display = "none";
      modalForm.style.display = "none";
      modalWrapper.classList.add("mystyle");
      modalWrapper.display = "none";
  
      btnAddPic.style.display = "flex";
      modalFooter.style.display = "flex";
      titleModal.textContent = "Galerie photo";
      modalGrid.style.display = "grid";
      hr1.style.display = "flex";
  
      titleModal.textContent = "Galerie photo";
    }
  });
  


  /******* FERMETURE DE LA MODALE ****************/
    // fermer la modale avec la croix
const x = document.querySelector(".fa-xmark");

x.addEventListener("click", () => {
  modalWrapper.close();
  addWorkForm.reset();
  preventCloseModal.style.display = "none";
  modalForm.reset();
/*   imageInput.value = "";
  imagePreview.style.display = "none";
  faImg.style.display = "flex";
  addPic.style.display = "flex";
  formatImag.style.display = "flex"; */
});

// fermer la modale en cliquant en dehors de la modale
modalWrapper.addEventListener("click", () => {
    modalWrapper.close();
    preventCloseModal.style.display = "none";
    addWorkForm.reset();
    modalForm.reset();
   /*  imageInput.value = "";
    imagePreview.style.display = "none";
    faImg.style.display = "flex";
    addPic.style.display = "flex";
    formatImag.style.display = "flex"; */
  });

  

    


    
      