//OPEN DATABASE

let db;
let openRequest = indexedDB.open("myDatabase");
openRequest.addEventListener("success",(e)=>{
    console.log("DB Success");
    db = openRequest.result;
})
openRequest.addEventListener("error",(e)=>{
    console.log("DB ERROR");
})

openRequest.addEventListener("upgradeneeded",(e)=>{
    console.log("DB Upgraded");
    db = openRequest.result;
    
    

    db.createObjectStore("video",{ keyPath:"id" });
    db.createObjectStore("image",{ keyPath:"id" });

})