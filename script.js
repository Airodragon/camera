let video = document.querySelector("video");

let recorder;
let chunks;

let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");

let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");

let recordFlag = false;

let transparentcolor = "transparent";

let constraints = {
    video: true,
    audio: true
}

// navigator = > global, browser info
navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        video.srcObject = stream;
        recorder = new MediaRecorder(stream)
        recorder.addEventListener("start", (e) => {
            chunks = [];
        })
        recorder.addEventListener("dataavailable", (e) => {
            chunks.push(e.data);
        })
        recorder.addEventListener("stop", (e) => {
            //Conversion of chunks to video
            let blob = new Blob(chunks, { type: "video/mp4" });
            let videoURL = URL.createObjectURL(blob);

            if (db) {
                let videoID = shortid();
                let dbTransaction = db.transaction("video", "readwrite");
                let videoStore = dbTransaction.objectStore("video");
                var currentdate = new Date();
                var datetime = "Recorded at : " + currentdate.getDate() + "/"
                    + (currentdate.getMonth() + 1) + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();
                let videoEntry = {
                    id: `vid-${videoID}`,
                    time: datetime,
                    blobData: blob,
                }
                videoStore.add(videoEntry);
            }
            // let a = document.createElement("a");
            // a.href = videoURL;
            // a.download = "stream.mp4";
            // let confirmation = confirm("Do you want to download the captured video: ")
            // if(confirmation){
            //     a.click();
            // }

        })
    })

recordBtnCont.addEventListener("click", (e) => {
    if (!recorder) return;
    recordFlag = !recordFlag;
    if (recordFlag) { //Start
        recorder.start();
        recordBtn.classList.add("scale-record");
        startTimer();
    }
    else { //Stop
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();
    }
})



captureBtn.addEventListener("click", (e) => {
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0, 0, canvas.width, canvas.height);


    //FILTER IMG 
    tool.rect = (0, 0, canvas.width, canvas.height);
    tool.fillStyle = transparentcolor;
    // console.log(transparentcolor);
    tool.fill()

    let imageURL = canvas.toDataURL();

    if (db) {
        let imageID = shortid();
        let dbTransaction = db.transaction("image", "readwrite");
        let imageStore = dbTransaction.objectStore("image");
        var currentdate = new Date();
        var datetime = "Clicked at : " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        let imageEntry = {
            id: `img-${imageID}`,
            time: datetime,
            url: imageURL,
        }
        imageStore.add(imageEntry);
    }


    //  let a = document.createElement("a");
    //  a.href = imageURL;
    //  a.download = "capture.png";
    //  a.click();
})


let timerID;
let counter = 0; //REPRESENTS Total MiliSeconds
let timer = document.querySelector(".timer")
function startTimer() {
    timer.style.display = "block";
    function displayTimer() {
        let totalMiliSeconds = counter;
        let hours = Number.parseInt(totalMiliSeconds / 3600000);
        totalMiliSeconds = totalMiliSeconds % 3600000;
        let minutes = Number.parseInt(totalMiliSeconds / 60000);
        totalMiliSeconds = totalMiliSeconds % 60000;
        let seconds = Number.parseInt(totalMiliSeconds / 1000);
        totalMiliSeconds = totalMiliSeconds % 1000;
        let miliseconds = totalMiliSeconds;
        // totalMiliSeconds%1000;
        hours = (hours < 10) ? `0${hours}` : hours
        minutes = (minutes < 10) ? `0${minutes}` : minutes
        seconds = (seconds < 10) ? `0${seconds}` : seconds
        miliseconds = (miliseconds < 10) ? `0${miliseconds}` : miliseconds
        timer.innerText = `${hours}:${minutes}:${seconds}:${miliseconds}`;
        counter++;
    }
    timerID = setInterval(displayTimer, 1)
}
function stopTimer() {
    clearInterval(timerID);
    timer.innerText = "00:00:00:00";
    timer.style.display = "none";
    counter = 0;
}

let allfilter = document.querySelectorAll(".filter");
let filterLayer = document.querySelector(".filter-layer")
allfilter.forEach((filterElem) => {
    filterElem.addEventListener("click", (e) => {
        // transparentColor = filterElem.style.backgroundColor;
        transparentcolor = getComputedStyle(filterElem).getPropertyValue("background-color");
        filterLayer.style.backgroundColor = transparentcolor;
        console.log(transparentcolor);

    })
})
