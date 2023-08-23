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

    /********************* LOGIN *****************/

    function clearSessionStorage(){
        sessionStorage.clear();
        document.location.href ="login.html";
    }

    sessionStorage.clear();

    //récupération du formulaire dans le DOM
    const formulaire= document.getElementById("loginForm");

    // écoute du bouton submit
    formulaire.addEventListener("submit", event=>{
        //empecher le rechargement de la page
        event.preventDefault();

        //récupération de la valeur des input
        const email=document.getElementById("email").value;
        const password=document.getElementById("password").value;

        // connexion à la base de données
        fetch('http://localhost:5678/api/users/login', {
            methode:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(response => response.json())
        .then(data =>{
            let userId= data.useId;
            if (userId == 1){
                let token= data;
                sessionStorage.setItem("token", token.token);

                document.location.href="index.html";
            } else {
                let errorMessage= document.getElementById("error-message");
                errorMessage.textContent="Identifiant ou mot de passe incorrect"
            }
        })
        .catch(error =>{
            console.error(error)
        })

    })
