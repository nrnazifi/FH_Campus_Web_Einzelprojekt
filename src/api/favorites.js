require("../api/main");
import {isEmpty, parseJson} from './utils';

function init() {
    showBreedsContent();

    window.removeFromLocalStorage = removeFromLocalStorage;
}

function showBreedsContent() {
    let htmlContent = "";
    let bookmarks = parseJson(localStorage.getItem("bookmarks"));
    if(bookmarks !== null) {
        bookmarks.forEach(function(imgUrl, index, array) {
            htmlContent += `
                <div class="img col-md-4 mt-1 mb-1">
                    <div class="thumbnail">
                        <i class="bi bi-bookmark-fill" onclick="removeFromLocalStorage(this, \'`+ imgUrl +`\')"></i>
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

function removeFromLocalStorage(self, imgUrl) {
    let bookmarks = parseJson(localStorage.getItem("bookmarks"));
    if(bookmarks !== null) {
        const isExistCondition = (element) => element === imgUrl;
        let index = bookmarks.findIndex(isExistCondition);
        if(index !== -1) {
            bookmarks.splice(index, 1);
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    self.closest("div.img").remove(); 
}

// run api
init();