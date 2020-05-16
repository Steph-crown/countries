window.addEventListener('load', start, false);

function start()
{
	//The default country
	url = " https://restcountries.eu/rest/v2/name/nigeria"
	display(url)
	
	//Gets the flag and country name of all countries
	fetch('https://restcountries.eu/rest/v2/all').then(response => response.json())
	.then(data => {
		markup = "<ul id='myUL'>"
		
		//Displays the flags and country names
		for (var i in data)
		{
			markup += "<li onclick= update(this)>"+
						"<img src = '" + data[i].flag + "'>"+
						"<span>" + data[i].name + "</span></li>"
		}
		markup += "</ul>"
		document.getElementById('rest').innerHTML = markup
		})
	.catch(err => {alert(err)})
}

function display(url)
{
	document.getElementById('right').innerHTML = ''
	
	//Gets parameters for selected country
	url += "?fields=name;capital;currencies;callingCodes;flag;languages"
	
	//Fetches those parameters
	fetch(url).then(responses => responses.json())
	.then(data => {
		name = data[0].name;
		capital = data[0].capital;
		symbol = data[0].currencies[0].symbol
		code = data[0].callingCodes
		flag = data[0].flag
		lang = data[0].languages[0].name
		document.getElementById('right').style.backgroundSize = "140px"
		document.getElementById('right').style.backgroundImage = "linear-gradient(rgba(10,31,68,0.52), rgba(10,31,68,0.73)),url('" + flag + "')"
		//Processes the mark up
		markup = "<div class='res'><b>Country:</b><span>" + name + "</span></div>" +
				"<div class='res'><b>Capital:</b><span>" + capital + "</span></div>" +
				"<div class='res'><b>Currency:</b><span>" + symbol + "</span></div>" +
				"<div class='res'><b>Calling code:</b><span>" + code + "</span></div>" +
				"<div class='res'><b>Flag:</b><img src='" + flag + "'></div>" +
				"<div class='res'><b>Language:</b><span>" + lang + "</span></div>" ;
		
		//Displays it
		document.getElementById('right').innerHTML = markup;
		})
}
function update(x)
{
	//Updates url for any selected country
	display("https://restcountries.eu/rest/v2/name/" + x.innerText)
}
function searching() {
  /*Searching function*/
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  
  //Input of search
  input = document.getElementById('search');
  
  //Makes case uniform
  filter = input.value.toUpperCase();
  
  //Gets Ul and li objects
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}