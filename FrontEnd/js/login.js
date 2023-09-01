
 /********************** LOGIN ***************************/
   // sessionStorage.clear();
   const filter = document.querySelector("buttonBar");
   const editBar = document.querySelector("#js-edit-mode");
   const alignItems = document.querySelector("#introduction");
   const buttonEditGallery = document.querySelector("#js-button-edit-gallery");
   const buttonEditProfil = document.querySelector("#js-button-edit-profil");
   const buttonEditDescription = document.querySelector("#js-button-edit-description");

   const loginForm = document.querySelector('#submit')
   loginForm.addEventListener('click', function(e){
       e.preventDefault();
       const user= {
           email:document.getElementById("email").value,
           password:document.getElementById("password").value
       
       };
      
       const newUser= JSON.stringify(user);
           fetch ('http://localhost:5678/api/users/login',  {
                   method:"POST",
                   mode:"cors",
                   headers: {
                       "Content-Type": "application/json",
                       "accept": "application/json",
                       'Access-Control-Allow-Origin':'*',
                       "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                       "Access-Control-Allow-Headers": "origin, x-requested-with, content-type, Authorization"
                   },
                   body: newUser
               })
                  .then(response => response.json())
                  .then(data => {
                      let userId = data.userId;
                      if (userId == 1){
                          let token = data;
                          sessionStorage.setItem('token', token.token);
                          //redirection vers l'index.html
                          document.location.href="index.html";                      
                      }else{
                          let errorMsg = document.getElementById('error-message');
                          errorMsg.textContent="Identifiant ou mot de passe incorrect !";
                          if (!id.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
                            const p = document.createElement("p");
                            p.innerHTML = "Veuillez entrer une addresse mail valide";
                            loginEmailError.appendChild(p);
                            return;
                        }
                        // vérifcation du mot de passe
                        if (id.password.length < 5 && !id.password.match(/^[a-zA-Z0-9]+$/g)) {
                            const p = document.createElement("p");
                            p.innerHTML = "Veuillez entrer un mot de passe valide";
                            loginMdpError.appendChild(p);
                            return;
                        }
                      }
                      })
                     
                      .catch(error => {
                      console.error(error);
                      
                  });
             
   })
 
/************** CREATION DE LA PAGE D'ADMINISTRATION  **********************/



 const token=localStorage.getItem("token");
 const authButton = document.getElementById("ButtonLogin");

 if(token !==null) {
    filter.style.display = "none";
    editBar.style.display = "flex";
    alignItems.style.alignItems = "inherit";
    buttonEditDescription.style.display = "inline-flex";
    buttonEditGallery.style.display = "inline-flex";
    buttonEditProfil.style.display = "inline-flex";
    authButton.innerText = "logout";
 }


     
    
 
  
 