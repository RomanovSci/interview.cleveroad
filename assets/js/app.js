$('document').ready(function(){
	if(!window.localStorage.getItem('token')){
		window.localStorage.setItem('token', 'empty');
	}
	/*
	 * Hiden elements
	*/
	var unauthorizedElems = document.getElementsByClassName('unauthorized');
	var authorizedElems = document.getElementsByClassName('authorized');

	if(window.localStorage.getItem('token').length === 16){
		for(key in unauthorizedElems){
			if(unauthorizedElems[key] instanceof HTMLElement){
				unauthorizedElems[key].style.display = 'none';
			}
		}
	} else {
		for(key in authorizedElems){
			if(authorizedElems[key] instanceof HTMLElement){
				authorizedElems[key].style.display = 'none';
			}
		}
	}

	/*
	 * Logout
	*/
	$('#logout').on('click', function(e){
		console.log('click');
		window.localStorage.setItem('token', '');
	});
});
