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

BtnModificationWorks.addEventListener("click", () => {
    modalWrapper.showModal();
    preventCloseModal.style.display = "block";
    modalGrid.style.display = "grid";
    modalGrid.style.alignItems = "center";
    modalGrid.style.gridGap = "10px 10px";
    modalGrid.style.gridTemplateColumns = "auto auto auto auto auto";
    modalGrid.style.gridTemplateRow = "300px 300px 300px ";

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
   // const adminCard=document.querySelector("#adminCard");
    modalGrid.innerHTML="";
    cards.forEach((card)=>{
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        const adminCard=document.createElement("adminCard")
        modalGrid.appendChild(adminCard);
        modalGrid.appendChild(trash);
        adminCard.innerHTML= `
       
        <svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
        </svg>
       
        <img src="${card.imageUrl}" alt="${card.title}">
        <h3 class="cardTitle">Editer </h3>
        `
    })
}
getWorkAdminApi().then((data)=>{
    adminGallery(data);
})


const token = localStorage.getItem("token");
const authButton = document.getElementById("ButtonLogin");
if (token !== null) {
  // changer la class .adminPrivilege afin de faire apparaitre les elements de DOM permettant les modifications | masquer les boutons de filtres | changer login en logout
  let adminPrivilege = document.querySelectorAll(".button-admin");
  let maskbuttons = document.querySelector(".buttonBar");

  adminPrivilege.style.display="flex";
  maskbuttons.style.display = "none";
  authButton.innerHTML = "logout";
}