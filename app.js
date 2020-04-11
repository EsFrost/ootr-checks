//File manager
function readSingleFile(e) {
  let file = e.target.files[0];
  if (!file) {
    return;
  }

  let reader = new FileReader();
  reader.onload = function(e) {
    let contents = $.parseJSON(e.target.result);

    sessionStorage.clear();

    location.reload();

    sessionStorage.setItem('contents', JSON.stringify(contents));

	$('#seed-name').html('');
	let elem = `<h1>Seed name = ${cashedObj[':seed']}</h1>`;
	$('#seed-name').html(elem);

  }
  reader.readAsText(file);
}

document.getElementById('file-input').addEventListener('change', readSingleFile, false);

function leButton() {

	// DOM element selection
	let entranceBoxes = document.getElementsByName('entrances');
	let locationBoxes = document.getElementsByName('locations');
	let itemBoxes = document.getElementsByName('items');

	// Arrays to populate with selections
	let entrancesSelected = [];
	let locationsSelected = [];
	let itemsSelected = [];

	// Populating arrays
	function populateArrays(domElems, popArray) {
		domElems.forEach((domElem) => {
			if (domElem.checked) {
				popArray.push(domElem.value);
			}
		});
	}

	//populateArrays(entranceBoxes, entranceBox, entrancesSelected);
	populateArrays(entranceBoxes, entrancesSelected);
	populateArrays(locationBoxes, locationsSelected);
	populateArrays(itemBoxes, itemsSelected);

	// Link's house is a special check
	let linksHouseBox = document.getElementById('links-house-box');
	let linksHouseCheck;

	if (linksHouseBox.checked) {
		linksHouseCheck = linksHouseBox.value;
	}
	else {
		linksHouseCheck = '';
	}

	function logicChecks(checkName, yourObject, yourString) {
		$.each(yourObject, (key, val) => {
			if (val == yourString) {
				output += `<li class="${checkName}">` + key + " : " + val + '</li>';
			}
		});
	}

	let output = '<ul>';

	if (linksHouseCheck !== '') {

		output += `<h1>Link's House</h1>`;


		let flag = 0;
		$.each(cashedObj.entrances, (key, val) => {
			
			if (key == linksHouseCheck) {
				flag++;
				output += '<li class="links-house">' + key + " : " + val + '</li>';
			}
		});
		if (flag === 0) {
			output += `<l1 class="links-house">Link's house was not shuffled.</li>`
		}
	}

	if (typeof entrancesSelected[0] !== 'undefined') {

		output += `<hr/> <h1>Entrances</h1>`;

		$.each(entrancesSelected, (index, val) => {
			logicChecks('entrances', cashedObj.entrances, val);
		});
	}


	if (typeof locationsSelected[0] !== 'undefined') {

		output += `<hr/> <h1>Medallions, songs and required locations</h1>`;

		$.each(locationsSelected, (index, val) => {
			logicChecks('locations', cashedObj.locations, val);
		});
	}

	
	if (typeof itemsSelected[0] !== 'undefined') {
		output += `<hr/> <h1>Items</h1>`;

		$.each(itemsSelected, (index, val) => {
			logicChecks('items', cashedObj.locations, val);
		});
	}
	
	if ((linksHouseCheck === '') && (typeof entrancesSelected[0] == 'undefined') && (typeof locationsSelected[0] == 'undefined') && (typeof itemsSelected[0] == 'undefined')) {

		output += `<h1>Nothing was selected</h1>`;

	}

	output += '<hr/> </ul>';
	$('#update').html(output);

	window.location.hash = ('update');

}


let cashedObj = sessionStorage.getItem('contents');

cashedObj = JSON.parse(cashedObj);

if (cashedObj == null) {
	let elem = `<h1>No spoiler log was uploaded.</h1>`;
	$('#seed-name').html(elem);
}
else {
	$('#seed-name').html('');
	let elem = `<h1>Seed name = ${cashedObj[':seed']}</h1>`;
	$('#seed-name').html(elem);
}

function clearAll() {

	let entranceBoxes = document.getElementsByName('entrances');
	let locationBoxes = document.getElementsByName('locations');
	let itemBoxes = document.getElementsByName('items');
	let linksHouseBox = document.getElementById('links-house-box');

	function clearChecked(domElems) {
		domElems.forEach((domElem) => {
			if (domElem.checked) {
				domElem.checked = false;
			}
		});
	}

	if (linksHouseBox.checked) {
		linksHouseBox.checked = false;
	}

	clearChecked(entranceBoxes);
	clearChecked(locationBoxes);
	clearChecked(itemBoxes);
}

function selectAll() {

	let entranceBoxes = document.getElementsByName('entrances');
	let locationBoxes = document.getElementsByName('locations');
	let itemBoxes = document.getElementsByName('items');
	let linksHouseBox = document.getElementById('links-house-box');

	function clearChecked(domElems) {
		domElems.forEach((domElem) => {
			if (!domElem.checked) {
				domElem.checked = true;
			}
		});
	}

	if (!linksHouseBox.checked) {
		linksHouseBox.checked = true;
	}

	clearChecked(entranceBoxes);
	clearChecked(locationBoxes);
	clearChecked(itemBoxes);

}

let topButton = document.getElementById("topBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}


function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}