// Listen for the form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e){
	var siteName = document.getElementById('siteName').value; //.value get the data entered into the form
	var siteURL = document.getElementById('siteURL').value;

	if(!validateForm(siteName, siteURL)){
		return false;
	}

	//object
	var bookmark = { 
		name: siteName,
		url: siteURL
	}

	//Local storage test
	// localStorage.setItem('test', 'Hello World'); //'test' = key	
	// console.log(localStorage.getItem('test'));	
	// localStorage.removeItem('test');
	// console.log(localStorage.getItem('test'));

	//test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		//init array
		var bookmarks = [];
		//Add to array
		bookmarks.push(bookmark);
		//Set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); //JSON stringify turns data into a string
	} else {
		//Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Add bookmark to array
		bookmarks.push(bookmark);
		//Reset back to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//Clear form
	document.getElementById('myForm').reset();

	//refetch bookmarks
	fetchBookmarks();

	//Prevent form from submitting
	e.preventDefault(); //prevents the form from flashing the data, keeps it on screen
}

	//Delete bookmark
	function deleteBookmark(url){
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Loop through bookmarks
		for(var i = 0; i < bookmarks.length; i++){
			if(bookmarks[i].url == url){
				//Remove from array
				bookmarks.splice(i, 1);
			} //end if
		}//end of for loop
		//Reset back to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

		//refetch bookmarks
		fetchBookmarks();
	}//end of deleteBookmark func

	//Fetch bookmarks
	function fetchBookmarks(){
		//Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//Get output id
		var bookmarksResults = document.getElementById('bookmarksResults');

			//Build output
		bookmarksResults.innerHTML = ''; //creates empty area for html to go
		for(var i = 0; i < bookmarks.length; i++){
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;

			//prints the HTML and variables results to screen (appends to empty area above)
			bookmarksResults.innerHTML += '<div class="well">'+
										  '<h3>' +name+
										  ' <a class="btn btn-secondary" target="_blank" href="'+url+'">Visit</a> ' +
										  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
										  '</h3>'+
										  '</div>';
		}//end for loop
	}// end fetchBookmarks func

	//Validation

	function validateForm(siteName, siteURL){	
		//Code below prevents the user from entering a blank form
		if(!siteName || !siteURL){
			alert('Please fill in the form');
			return false;
		}//end if

		//regular expression to set a url
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression); //passes in the 'expression'

		if(!siteURL.match(regex)){
			alert('Please use a valid URL');
			return false;
		}//end if
		return true;
	}//end of validateForm func

