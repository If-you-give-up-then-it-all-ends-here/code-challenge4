
const button = document.getElementById("button");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const username = document.getElementById("username");
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // 正規表現を変数に格納
const errorText = document.getElementById("error-text");
const fileInput = document.getElementById("fileInput");
const uploadIcon = document.getElementById("uploadIcon");
const errorUploadText = document.getElementById("error-upload__caption")
const uploadText = document.getElementById("upload__text");
const changeImg = document.getElementById("change-img");
const remove = document.getElementById("remove");
const topPage = document.getElementById("top_wrapper");
const thanksPage = document.getElementById("thanks_wrapper");

fileInput.addEventListener("change", (event) => { //change イベントは、ユーザーがファイルを選択した後に発火する
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader(); //インスタンス（オブジェクト）を作成
        reader.onload = (e) => {
            uploadIcon.src = e.target.result;
            uploadIcon.style.width = "80px"; // 固定サイズ
            uploadIcon.style.height = "80px";
            uploadIcon.style.objectFit = "cover";
            uploadIcon.classList.add("upload-icon-img-active");
            uploadText.classList.add("hidden");
            changeImg.classList.remove("hidden")
        } 
        reader.readAsDataURL(file);
        }
});

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


button.addEventListener("click", ()=>{
    let isValid = true;
    
    if (fileInput.files.length === 0) {
        errorUploadText.classList.add("upload__caption-error");
        errorUploadText.textContent = "File too large. please upload a photo under 500KB."
        isValid = false;
    } else {
        errorUploadText.classList.remove("upload__caption-error");
        errorUploadText.textContent = "Upload your photo (JPG or PNG, max size: 500KB)."
    }
    
    if(fullName.value.trim() === ""){
        fullName.classList.add("input-active");
        isValid = false;
    } else {
        fullName.classList.remove("input-active");
    }

    if(email.value.trim() === "" || !emailPattern.test(email.value)){
        email.classList.add("input-active");
        errorText.classList.remove("hidden");
        isValid = false;
    } else {
        email.classList.remove("input-active");
        errorText.classList.add("hidden");
    }

    if(username.value.trim() === ""){
        username.classList.add("input-active");
        isValid = false;
    } else {
        username.classList.remove("input-active");
    }

    
    //すべてエラーがなければtopが非表示+thanksが表示
    if (isValid){
        topPage.classList.add("hidden");
        thanksPage.classList.remove("hidden");
    }
    
});