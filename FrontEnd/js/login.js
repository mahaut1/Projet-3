/************** CREATION DE LA PAGE D'ADMINISTRATION  **********************/
const createAdmin = (data = null) => {
   
 }
 
 const deleteAdmin = () => {
    document.querySelectorAll(".authComponent").forEach((component)=> component.remove());
 }
 
 
 
  
 
 
 /********************** LOGIN ***************************/
   // sessionStorage.clear();
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
                        }
                        
                        })
                        .catch(error => {
                        console.error(error);
                        
                    });
                 if(sessionStorrage.token){
                    let ButtonLogin = document.querySelector('#ButtonLogin')
                    ButtonLogin.removeAttribute("href")
                    ButtonLogin.innerText="logout"
                 
                    const editTextBtn= document.createElement("button")
                    const editImageBtn= document.createElement("button")
                    const modifyWorkBtn= document.createElement("a")
                    editTextBtn.classList.add("btnEditor", "authComponent")
                    editImageBtn.classList.add("btnEditor", "authComponent")
                    modifyWorkBtn.classList.add("btnEditor", "authComponent", "jsWorkdEdit","jsModal")
                    modifyWorkBtn.setAttribute("href","#modal1")
                 
                    const btnPattern= `
                        <div class="icon">
                            <figure>
                                <svg width="100%" height="100%" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.90827 5.6194L7.0677 7.45996C6.3896 8.13807 5.70762 8.81617 5.03339 9.50203C4.87452 9.66477 4.7544 9.88177 4.7079 10.0949C4.46378 11.2147 4.22741 12.3346 3.99104 13.4544L3.8593 14.0744C3.7973 14.3766 3.87867 14.6789 4.08404 14.8842C4.24291 15.0431 4.46378 15.1322 4.69627 15.1322C4.76214 15.1322 4.82802 15.1245 4.89389 15.1129L5.57587 14.9695C6.66084 14.7409 7.74968 14.5084 8.83465 14.2836C9.08652 14.2294 9.29963 14.117 9.48175 13.9349C12.5274 10.8854 15.5731 7.8397 18.6187 4.79792C18.8435 4.57318 18.9675 4.30581 18.9985 3.97645C19.0023 3.9222 18.9985 3.86795 18.9868 3.81758C18.9675 3.74008 18.952 3.65871 18.9326 3.58121C18.89 3.38359 18.8435 3.15885 18.7505 2.94185C18.1809 1.63989 17.2354 0.709921 15.9412 0.186812C15.6816 0.0821901 15.4065 0.0473162 15.1662 0.0163172L15.1003 0.00856739C14.7516 -0.0340563 14.4339 0.0821901 14.1587 0.361182C12.415 2.11263 10.6597 3.86795 8.90827 5.6194ZM14.9725 0.942414C14.9802 0.942414 14.9841 0.942414 14.9918 0.942414L15.0577 0.950164C15.2592 0.973413 15.4452 0.996662 15.5924 1.05866C16.6464 1.4849 17.4214 2.24437 17.8903 3.31384C17.9445 3.43784 17.9794 3.59671 18.0142 3.76333C18.0259 3.82533 18.0414 3.88732 18.053 3.94932C18.0375 4.01907 18.0104 4.06557 17.9561 4.11594C14.9066 7.15772 11.8609 10.2073 8.81527 13.2529C8.7649 13.3033 8.7184 13.3265 8.64865 13.342C7.55981 13.5707 6.47484 13.7993 5.386 14.0279L4.81252 14.148L4.92102 13.6404C5.15738 12.5244 5.39375 11.4046 5.63399 10.2886C5.64174 10.2538 5.67274 10.1995 5.70762 10.1608C6.38185 9.47878 7.05608 8.80067 7.73418 8.12644L9.57475 6.28588C11.3301 4.53055 13.0854 2.77523 14.8368 1.01604C14.9105 0.954039 14.9453 0.942414 14.9725 0.942414Z"/>
                                    <path d="M1.50733 4.22446H8.27287C8.53637 4.22446 8.74949 4.01134 8.74949 3.74785C8.74949 3.48436 8.53637 3.27124 8.27287 3.27124H1.50733C0.67423 3.27124 0 3.94934 0 4.77857V17.4649C0 18.298 0.678105 18.9723 1.50733 18.9723H14.1898C15.0229 18.9723 15.6972 18.2942 15.6972 17.4649V10.9745C15.6972 10.711 15.484 10.4979 15.2205 10.4979C14.957 10.4979 14.7439 10.711 14.7439 10.9745V17.4649C14.7439 17.7711 14.4921 18.0229 14.1859 18.0229H1.50733C1.20121 18.0229 0.949346 17.7711 0.949346 17.4649V4.78244C0.949346 4.47633 1.20121 4.22446 1.50733 4.22446Z"/>
                                </svg>
                            </figure>
                        </div>
                        <span>Modifier</span>
                    `
                    editTextBtn.innerHTML=btnPattern;
                    editImageBtn.innerHTML=btnPattern;
                    modifyWorkBtn.innerHTML=btnPattern;
                    const introPresentation=document.querySelector("#introPresentation")
                    const introImage=document.querySelector("#introImage")
                    const works =document.querySelector('.projectTitle')
                    introPresentation.prepend(editTextBtn)
                    introImage.append(editImageBtn)
                    works.append(modifyWorkBtn)
                 
                    let adminBanner = document.createElement('div')
                    adminBanner.classList.add("adminBanner")
                    adminBanner.classList.add("authComponent")
                    const bannerPattern = `
                        <div class="centered-wrapper">
                            <div class="icon">
                                <figure>
                                    <svg width="100%" height="100%" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.90827 5.6194L7.0677 7.45996C6.3896 8.13807 5.70762 8.81617 5.03339 9.50203C4.87452 9.66477 4.7544 9.88177 4.7079 10.0949C4.46378 11.2147 4.22741 12.3346 3.99104 13.4544L3.8593 14.0744C3.7973 14.3766 3.87867 14.6789 4.08404 14.8842C4.24291 15.0431 4.46378 15.1322 4.69627 15.1322C4.76214 15.1322 4.82802 15.1245 4.89389 15.1129L5.57587 14.9695C6.66084 14.7409 7.74968 14.5084 8.83465 14.2836C9.08652 14.2294 9.29963 14.117 9.48175 13.9349C12.5274 10.8854 15.5731 7.8397 18.6187 4.79792C18.8435 4.57318 18.9675 4.30581 18.9985 3.97645C19.0023 3.9222 18.9985 3.86795 18.9868 3.81758C18.9675 3.74008 18.952 3.65871 18.9326 3.58121C18.89 3.38359 18.8435 3.15885 18.7505 2.94185C18.1809 1.63989 17.2354 0.709921 15.9412 0.186812C15.6816 0.0821901 15.4065 0.0473162 15.1662 0.0163172L15.1003 0.00856739C14.7516 -0.0340563 14.4339 0.0821901 14.1587 0.361182C12.415 2.11263 10.6597 3.86795 8.90827 5.6194ZM14.9725 0.942414C14.9802 0.942414 14.9841 0.942414 14.9918 0.942414L15.0577 0.950164C15.2592 0.973413 15.4452 0.996662 15.5924 1.05866C16.6464 1.4849 17.4214 2.24437 17.8903 3.31384C17.9445 3.43784 17.9794 3.59671 18.0142 3.76333C18.0259 3.82533 18.0414 3.88732 18.053 3.94932C18.0375 4.01907 18.0104 4.06557 17.9561 4.11594C14.9066 7.15772 11.8609 10.2073 8.81527 13.2529C8.7649 13.3033 8.7184 13.3265 8.64865 13.342C7.55981 13.5707 6.47484 13.7993 5.386 14.0279L4.81252 14.148L4.92102 13.6404C5.15738 12.5244 5.39375 11.4046 5.63399 10.2886C5.64174 10.2538 5.67274 10.1995 5.70762 10.1608C6.38185 9.47878 7.05608 8.80067 7.73418 8.12644L9.57475 6.28588C11.3301 4.53055 13.0854 2.77523 14.8368 1.01604C14.9105 0.954039 14.9453 0.942414 14.9725 0.942414Z" fill="white"/>
                                        <path d="M1.50733 4.22446H8.27287C8.53637 4.22446 8.74949 4.01134 8.74949 3.74785C8.74949 3.48436 8.53637 3.27124 8.27287 3.27124H1.50733C0.67423 3.27124 0 3.94934 0 4.77857V17.4649C0 18.298 0.678105 18.9723 1.50733 18.9723H14.1898C15.0229 18.9723 15.6972 18.2942 15.6972 17.4649V10.9745C15.6972 10.711 15.484 10.4979 15.2205 10.4979C14.957 10.4979 14.7439 10.711 14.7439 10.9745V17.4649C14.7439 17.7711 14.4921 18.0229 14.1859 18.0229H1.50733C1.20121 18.0229 0.949346 17.7711 0.949346 17.4649V4.78244C0.949346 4.47633 1.20121 4.22446 1.50733 4.22446Z" fill="white"/>
                                    </svg>
                                </figure>
                            </div>
                            <span>Mode édition</span>
                            <button>Publier les changements</button>
                        </div>
                    `
                 adminBanner.innerHTML=bannerPattern
                 document.body.prepend(adminBanner)
                 }
                 
     })
   
    
 
  
 