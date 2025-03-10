
const button = document.getElementById("button");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const username = document.getElementById("username");
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 正規表現を変数に格納
const nameErrorText = document.getElementById("nameError-text");
const emailErrorText = document.getElementById("emailError-text");
const githubErrorText = document.getElementById("githubError-text");
const fileInput = document.getElementById("fileInput");
const uploadIcon = document.getElementById("uploadIcon");
const errorUploadText = document.getElementById("error-upload__caption")
const uploadText = document.getElementById("upload__text");
const changeImg = document.getElementById("change-img");
const remove = document.getElementById("remove");
const topPage = document.getElementById("top_wrapper");
const thanksPage = document.getElementById("thanks_wrapper");
const inputs = document.querySelectorAll (".js_fullName, .js_email, .js_username");// .js_avatar, 
const errorText = document.querySelectorAll (".js_nameError-text, .js_emailError-text, .js_githubError-text");
const dropArea = document.getElementById("dropArea");



button.addEventListener("click", ()=>{
    let isValid = true;
    inputs.forEach((input, index)=>{
        if(input.value.trim() === "" || (input === email && !emailPattern.test(email.value))){
            displayError(input, errorText[index]);
            isValid = false;
        } else {
            clearError(input, errorText[index]);
        }
    })

    if (fileInput.files.length === 0) {
        errorUploadText.classList.add("upload__caption-error");
        errorUploadText.textContent = "Upload an image, or File too large. please upload a photo under 500KB."
        isValid = false;
    } else {
        errorUploadText.classList.remove("upload__caption-error");
        errorUploadText.textContent = "Upload your photo (JPG or PNG, max size: 500KB)."
    }
        
    //すべてエラーがなければtopが非表示+thanksが表示
    if (isValid){
        topPage.classList.add("hidden");
        thanksPage.classList.remove("hidden");
    }
    
});

const displayError = (input, txt)=>{
    input.classList.add("input-active");
    txt.classList.remove("hidden");
}
const clearError = (input, txt)=>{
    input.classList.remove("input-active");
    txt.classList.add("hidden");
}



// デフォルトの動作を無効化
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
    });
});
// ドロップ時の処理
dropArea.addEventListener("drop", (event) => {
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);//選択したファイルを適切に処理する関数
    }
});


// `fileInput` の変更を監視
fileInput.addEventListener("change", (event) => { //change イベントは、ユーザーがファイルを選択した後に発火する
    if (event.target.files.length > 0) {
        handleFile(event.target.files[0]);
    }
});

// ファイルを処理して画像表示
function handleFile(file) {
    //fileがjpegかpng且つ画像サイズが500KB以下の時
    if ((file.type === "image/jpeg" || file.type === "image/png") && file.size <= 500*1024 ) { // 500KB（1KB = 1024B）
        const reader = new FileReader(); //インスタンス（オブジェクト）を作成
        reader.onload = (e) => {
            uploadIcon.src = e.target.result;
            uploadIcon.style.width = "80px";
            uploadIcon.style.height = "80px";
            uploadIcon.style.objectFit = "cover";
            uploadText.classList.add("hidden");
            changeImg.classList.remove("hidden");
        };
        reader.readAsDataURL(file); //fileをURLに変更
    }
}

// Remove imageを押したら初期設定になる
remove.addEventListener("click", ()=>{
    uploadIcon.src = "img/icon-upload.svg"; 
    uploadIcon.style.width = "";
    uploadIcon.style.height = "";
    uploadIcon.style.objectFit = "";
    uploadIcon.classList.remove("upload-icon-img-active");
    uploadText.classList.remove("hidden");
    changeImg.classList.add("hidden");
    fileInput.value = "";
})
remove.addEventListener("click", (event) => {
    event.preventDefault();  // <label> のfileInputの動作を無効化
    event.stopPropagation(); // クリックイベントの伝播を防ぐ
});