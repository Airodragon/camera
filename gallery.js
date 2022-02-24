setTimeout(() => {


    if (db) {
        //videos retrieval
        //images retrieval

        let videoTransaction = db.transaction("video", "readonly");
        let videoStore = videoTransaction.objectStore("video");
        let videoRequest = videoStore.getAll();
        // console.log(videoResult);
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");
            videoResult.forEach((videoObj) => {
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", videoObj.id);

                let url = URL.createObjectURL(videoObj.blobData)

                mediaElem.innerHTML = `
                <div class="media">
                <video src="${url}" autoplay loop></video>
                </div>
                <div class="download action-btn">Download</div>
                <div class="delete action-btn">Delete</div>
                `;
                galleryCont.appendChild(mediaElem);
            

                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click",(e)=>{
                    let id = e.target.parentElement.getAttribute("id");
                    // let id = mediaElem.id;
                    if(id.slice(0, 3)==="vid"){
                        let videoTransaction = db.transaction("video", "readwrite");
                        let videoStore = videoTransaction.objectStore("video");
                        videoStore.delete(id);
                    }
                    else if(id.slice(0, 3)==="img"){
                        let imageTransaction = db.transaction("image", "readwrite");
                        let imageStore = imageTransaction.objectStore("image");
                        imageStore.delete(id);
                    }
                
                    //UI REMOVAL
                    e.target.parentElement.remove()
                
                })
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click", downloadListener())
            
            
            })
        }

        // IMAGE RETRIEVE

        let imageTransaction = db.transaction("image", "readonly");
        let imageStore = imageTransaction.objectStore("image");
        let imageRequest = imageStore.getAll();
        // console.log(videoResult);
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");
            imageResult.forEach((imageObj) => {
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id",imageObj.id);

                let url = imageObj.url;
                console.log(imageObj);
                mediaElem.innerHTML = `
                <div class="media">
                <img src="${url}" />
                </div>
                <div class="download action-btn">Download</div>
                <div class="delete action-btn">Delete</div>
                `;






                galleryCont.appendChild(mediaElem);


                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click",(e)=>{
                    let id = e.target.parentElement.getAttribute("id");
                    // let id = mediaElem.id;
                    if(id.slice(0, 3)==="vid"){
                        let videoTransaction = db.transaction("video", "readwrite");
                        let videoStore = videoTransaction.objectStore("video");
                        videoStore.delete(id);
                    }
                    else if(id.slice(0, 3)==="img"){
                        let imageTransaction = db.transaction("image", "readwrite");
                        let imageStore = imageTransaction.objectStore("image");
                        imageStore.delete(id);
                    }
                
                    //UI REMOVAL
                    e.target.parentElement.remove()
                
                })
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click", downloadListener())
            })
        }


    }
}, 100)


// UI REMOVE 
function deleteListener(e){
  
}
function downloadListener(){

}