// listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
    //  PREVENT FORM FROM SUBMITTING
    e.preventDefault();

    // GET FORM VALUES
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }


    var bookmark = {
        name: siteName,
        url: siteUrl,
    }

    // LOCAL STORAGE TEST
    // localStorage.setItem("test", "Hello World")
    // console.log(localStorage.getItem("test"))
    // localStorage.removeItem("test");
    // console.log(localStorage.getItem("test"))

    //  TEST IF BOOKMARKS IS NULL
    if (localStorage.getItem("bookmarks") == null) {
        // INIT ARRAY
        var bookmarks = [];
        // ADD TO ARRAY
        bookmarks.push(bookmark);
        // SET TO LOCAL STORAGE
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        // JSON TO STRING
    } else {
        // GET BOOKMARKS FROM LOCAL STORAGE
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        // STRING TO JSON
        // ADD BOOKMARK TO ARRAY
        bookmarks.push(bookmark);
        // RESET BACK TO LOCALSTORAGE
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    // CLEAR FORM
    document.getElementById("myForm").reset();

    // REFETCH BOOKSMARKS
    fetchBookmarks();
}



// FETCH BOOKMARKS

function fetchBookmarks() {
    // GET BOOKMARKS FROM LOCAL STORAGE
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    // GET OUTPUT ID
    var bookmarksResults = document.getElementById("bookmarksResults");
    bookmarksResults.style.height = "auto"

    bookmarksResults.innerHTML = "";

    for (let index = 0; index < bookmarks.length; index++) {
        const name = bookmarks[index].name;
        const url = bookmarks[index].url;



        var div = document.createElement("div");
        div.style.minHeight = "10vh";
        div.style.width = "100%";
        div.style.margin = "auto";
        div.style.marginBottom = "2vh";
        div.style.display = "flex"
        div.style.alignItems = "center"
        // div.style.backgroundColor = "#5F5A5A"
        // div.style.backgroundColor = "#F5F4F6"
        div.style.backgroundColor = "#2C2424"
        // div.style.backgroundColor = "tranparent"
        bookmarksResults.appendChild(div)

        // <i class="fa-solid fa-arrow-right" style="color: #000000;"></i>

        var arrow = document.createElement("i")
        arrow.setAttribute("class", "fa-solid fa-arrow-right");
        arrow.style.color = "white"
        arrow.style.marginLeft = "0.3vw"
        arrow.style.fontSize = "x-large"
        div.appendChild(arrow)

        var heading = document.createElement("h4")
        heading.innerHTML = name
        heading.style.color = "white"
        heading.style.fontWeight = "400"
        heading.style.marginLeft = "2vw";
        div.appendChild(heading)

        var button = document.createElement("a")
        button.innerHTML = "Visit"
        button.style.marginLeft = "1vw";
        button.style.padding = "0.5vh 1vh";
        button.style.borderRadius = "10%"
        button.style.border = "1px solid black"
        button.style.color = "black"
        button.style.backgroundColor = "white"
        button.setAttribute("target", "_blank")
        button.setAttribute("href", url)
        div.appendChild(button)

        var deleteButton = document.createElement("a")
        deleteButton.innerHTML = "Delete"
        deleteButton.style.marginLeft = "1vw";
        deleteButton.style.padding = "0.3vh";
        deleteButton.style.borderRadius = "10%"
        deleteButton.style.border = "1px solid black"
        deleteButton.style.color = "white"
        deleteButton.style.backgroundColor = "#EF4553"
        deleteButton.setAttribute("href", "#")
        deleteButton.onclick = function () {
            deleteBookmark(url);
        }
        div.appendChild(deleteButton)
    }
}

// DELETE BOOKMARK
function deleteBookmark(url) {
    // GET BOOKMARKS FROM LOCAL STORAGE
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // LOOP THROUGH BOOKMARKS
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // REMOVE FROM ARRAY
            bookmarks.splice(i, 1);
        }
    }
    // RESET BACK TO LOCALSTORAGE
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // REFETCH BOOKSMARKS
    fetchBookmarks();
}

// VALIDATE FORM

function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert("Please Fill in the form");
        return false;
    }

    var expression = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert("Please Set a Valid URL");
        return false;
    }
    return true;
}
