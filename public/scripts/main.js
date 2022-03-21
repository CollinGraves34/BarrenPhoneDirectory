function filter() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  if (input.value == !null || input.value.length > 3) {
    easterEgg(input);
  }
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
          }
        }       
      }
    }
  }       
}

//google API -->

function makeApiCall() {
  var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1KmUnPK0dtOy5HzwZdMbhTYVI6A7fHJezLn_LsbZbfOU',  // Spreadsheet ID.

    range: 'MasterList!A2:E869',  // Range of Data. //change to use as filter by school
  };

  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {

    // response.result = JSON Data
    var dataLength = response.result.values.length; //get data length of rows
    console.log('Length: ' + dataLength); 

    //for each row in spreadsheet add row to table then read each cell 
    //of spreadsheet and append to each cell of the table in sequence.
    var fullData = response.result.values;

    fullData.forEach( set => { //find row and assign row# as 'set'

      var table = document.getElementById('tableBody');
      var newRow = table.insertRow();

      set.forEach(element => { // forEach of 'set' row



        // Insert a cell at the end of the row
        var newCell = newRow.insertCell();

        // Append a text node to the cell
        var newText = document.createTextNode(element);
        newCell.appendChild(newText);

        //table.insertRow(table.rows.length - 1);

      })
    })
  }, function(reason) {
    console.error('error: ' + reason.result.error.message); //error handle
  });
}

function initClient() {
  var API_KEY = 'AIzaSyD32mwtuUMIi1qOg_kXQGS671vhcXCbaao';  // API key.

  var CLIENT_ID = '547780337263-lprm6rd0p9v5lb3e9g2s38kc10t22a47.apps.googleusercontent.com';  // client ID.

  // scope:
  //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

  gapi.client.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
  isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
  hideReloadButton();
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function easterEgg(poppy) {
  var cmdList = ['!help', '!admin'];
  switch(poppy.value) {
    case "!help":
      console.log('Developer Commands\n------------------\n');
      cmdList.forEach( cmd => {
        console.log(cmd);
      });
      break;
    case "!admin":
      console.log('You have unlocked the universe!');
      window.open('./admin.html');
      break;
    case "!rick":
      window.open('https://youtu.be/dQw4w9WgXcQ'); //  XD LMAO
    default:
      break;
  }
  
}

function toggleButtonOn(button) {
  switch(button.classList) //switch to test 'case' against classes of element
  {
    case "hidden": //if hidden =>
      button.style.display = 'inline-block'; //show
      break;
    default:
      button.style.display = 'none'; //hide
    break;
  }
}

function toggleButtonOff(button) {
  switch(button.classList) //switch to test 'case' against classes of element
  {
    case "hidden":
      button.style.display = 'none';//hide
      break;
    default:
      button.style.display = 'inline-block';//show
    break;
  }
}

var button = document.getElementById('reloadBTN'); //find reload btn
button.addEventListener("click", hideReloadButton); //add listener to reload btn

function hideReloadButton() { // hide reload func
  makeApiCall(); //loads data to table from spreadSheets (Fix:for weird bug of data not wanting to append on load)
  var container = document.getElementsByClassName('notLoaded')[0]; // get first div of notLoaded class

  if (container.classList.contains('hidden') == false) { // if to hide div
    container.classList.add('hidden');
  }else {
    console.log("Reload Already hidden");
  }
};