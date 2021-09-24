require("../api/main");
import {isEmpty, parseJson} from './utils';

// global variables
let dogBreeds;

function init() {
    getDogBreeds();

    window.filterDogBreeds = filterDogBreeds;
    window.onClickABreed = onClickABreed;
    window.onClickASubBreed = onClickASubBreed;
    window.saveInLocalStorage = saveInLocalStorage;
}

function getDogBreeds() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadDataInDogDropDown(this.responseText);
        }
    };
    xhttp.open("GET", "https://dog.ceo/api/breeds/list/all", true);
    xhttp.send();
}

function loadDataInDogDropDown(response) {
    var htmlContent = '<input class="form-control" id="ddlDogsFilter" type="text" placeholder="Filter..." onkeyup="filterDogBreeds()">';
    var jsonObj = parseJson(response);
    if(jsonObj !== null) {
        dogBreeds = jsonObj;
        for (var key in jsonObj.message) {
            htmlContent = htmlContent + '<li><a class="dropdown-item" href="#" onclick="onClickABreed(\''+ key +'\')">'+ key +'</a></li>';
        }
    }
    document.getElementById('dropdownDogBreed').innerHTML = htmlContent;
}

function loadSubBreedsInDropDown(breedName, subBreeds) {
    if(subBreeds.length !== 0) {
        var htmlContent = '';
        subBreeds.forEach(function(item, index, array) {
            htmlContent = htmlContent + '<li><a class="dropdown-item" href="#" onclick="onClickASubBreed(\''+ item +'\', \''+ breedName +'\')">' + item + '</a></li>';
          });
        let div = document.getElementById("subBreeds");
        document.getElementById('dropdownSubBreed').innerHTML = htmlContent;
        div.classList.remove("d-none");
        div.getElementsByTagName("button")[0].innerText = breedName;
    }
}

function filterDogBreeds() {
    let dropdown = document.getElementById("dropdownDogBreed");
    let input = document.getElementById("ddlDogsFilter");
    input = input.value.toUpperCase();
    var liTags = dropdown.getElementsByTagName("li");
    for (var i = 0; i < liTags.length; i++) {
        let txtValue = liTags[i].textContent || liTags[i].innerText;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
            liTags[i].style.display = "";
        } else {
            liTags[i].style.display = "none";
        }
    }
}

function onClickABreed(breedName) {
    for (var key in dogBreeds.message) {
        var value = dogBreeds.message[key];
        if(key === breedName) {
            if(!isEmpty(value)){
                loadSubBreedsInDropDown(key, value);
                document.getElementById('gallery').innerHTML = "";
            } else {
                document.getElementById("subBreeds").classList.add("d-none");
                document.getElementById('dropdownSubBreed').innerHTML = "";
                
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        showBreedsContent(this.responseText);
                    }
                };
                xhttp.open("GET", "https://dog.ceo/api/breed/"+ breedName +"/images", true);
                xhttp.send();
            }
            break;
        }
    }
}

function onClickASubBreed(subBreedName, breedName) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showBreedsContent(this.responseText);
        }
    };
    xhttp.open("GET", "https://dog.ceo/api/breed/"+ breedName +"/"+ subBreedName +"/images", true);
    xhttp.send();
}

function showBreedsContent(dogImageData) {
    let htmlContent = "";
    var jsonObj = parseJson(dogImageData);
    if(jsonObj !== null) {
        jsonObj.message.forEach(function(imgUrl, index, array) {
            let cssClass = "bi bi-bookmark";
            if(existInBookmarks(imgUrl)) {
                cssClass = "bi bi-bookmark-fill";
            }

            htmlContent += `
                <div class="img col-md-4 mt-1 mb-1">
                    <div class="thumbnail">
                        <i class="`+ cssClass +`" onclick="saveInLocalStorage(this, \'`+ imgUrl +`\')"></i>
                        <a href="`+ imgUrl +`" target="_blank">
                            <img class="gallary-img" src="`+ imgUrl +`" alt="Lights">
                        </a>
                    </div>
                </div>
            `;
        });
    }
    document.getElementById('gallery').innerHTML = htmlContent;
}

function saveInLocalStorage(self, imgUrl) {
    let isAdd = true;
    let bookmarks = parseJson(localStorage.getItem("bookmarks"));
    if(bookmarks !== null) {
        const isExistCondition = (element) => element === imgUrl;
        let index = bookmarks.findIndex(isExistCondition);
        if(index === -1) {
            bookmarks.push(imgUrl);
            isAdd = true;
        } else {
            bookmarks.splice(index, 1);
            isAdd = false;
        }
    } else {
        bookmarks = new Array(imgUrl);
        isAdd = true;
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    setBookmark(self, isAdd);
}

function setBookmark(self, marked) {
    if(marked) {
        self.classList.remove("bi-bookmark");
        self.classList.add("bi-bookmark-fill");
    } else {
        self.classList.remove("bi-bookmark-fill");
        self.classList.add("bi-bookmark");
    }
}

function existInBookmarks(imgUrl) {
    const isExistCondition = (element) => element === imgUrl;
    let bookmarks = parseJson(localStorage.getItem("bookmarks"));
    if(bookmarks != null) {
        let index = bookmarks.findIndex(isExistCondition);
        if(index === -1) {
            return false;
        } else {
            return true;
        }
    }
    return false;
}

// run api
init();