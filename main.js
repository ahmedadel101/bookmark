document.getElementById("bmForm").addEventListener('submit', saveBookmark);

function saveBookmark(e) {

    let sitName = document.getElementById('siteName').value;
    let sitUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(sitName, sitUrl)){
        return false;
    }

    let bookmark = {
        name: sitName,
        url: sitUrl,

    }

/*
    localStorage.setItem('test', 'hello word');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test', 'hello word');

    console.log(localStorage.setItem('test'));
*/
//test if bookMaerk is null
if(localStorage.getItem('bookmarks') === null)
{
    //in it array
    let bookmarks = [];

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
}
    else
        {
            
            let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

            bookmarks.push(bookmark);

            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        }

        document.getElementById('bmForm').reset();

        fetchBookmark()    

        e.preventDefault();

    
}
//delelte bookmark

function deleteBookmark(url){

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // loop throught bookmarks
        for(var i =0;i<bookmarks.length;i++){
            if(bookmarks[i].url == url){
                // remove from array
                bookmarks.splice(i, 1);
            }
        }
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        fetchBookmark();
}




function fetchBookmark(){

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    let bookmarksResultes = document.getElementById('bmResults');

    bookmarksResultes.innerHTML = '';
for(let i = 0 ; i< bookmarks.length; i++){
let name = bookmarks[i].name;
let url = bookmarks[i].url;

bookmarksResultes.innerHTML += '<div class="mr-auto  py-3 well">'+
                                '<h3>'+name+
                                '<a class="btn py-2 px-3 mr-2  ml-2 btn-primary" target="_blank" href="'+url+'">Visit</a>'+
                                '<a onclick="deleteBookmark(\''+url+'\')" class="btn py-2 px-3 btn-danger" href="#">Delete</a>'+
                                '</h3>'+
                                '</div>';

}

}

function validateForm(sitName, sitUrl){
    if(!sitName || !sitUrl){
        alert('please fill the form');
        return false;
    }

    let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if(!sitUrl.match(regex)){
        alert('please use a valid URL');
        return false;
    }

    return true;
}











