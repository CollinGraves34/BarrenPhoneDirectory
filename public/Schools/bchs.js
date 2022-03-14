//Firebase configuration
/* firebase method => init
const firebaseConfig = {
  apiKey: "AIzaSyCCbmvnPwbCUW6fx5fwRQQcIv89lNBgK3w",
  authDomain: "phonefinder10000.firebaseapp.com",
  projectId: "phonefinder10000",
  storageBucket: "phonefinder10000.appspot.com",
  messagingSenderId: "808109984322",
  appId: "1:808109984322:web:3e492283552aa7e63abbdb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

*/
/* firebase method => read database
var ref = database.ref();
ref.on("value", function(snapshot) {
  let contacts = snapshot.val();
  contacts.forEach(contact => {
    loadContact(contact);
    console.log("read finished...Appending Data!")
  });
});
*/


//------------//------------//------------//------------//


/* object model
Building: "Annex"
Extention: 11203
First: "Shawna "
Last: "Shartzer"
Room: 203
*/
/*
function loadContact(contact) {
  /* Table Structure */
  /* <table id="myTable">
    <thead>
      <tr>
        <th>Last</th>
        <th>First</th>
        <th>Room #</th>
        <th>Building</th>
        <th>Extension</th>
      </tr>
    </thead>
    <tbody id="myTableBody" />
  </table>; */
/*
  let table = document.getElementById("myTable");

  let row = table.insertRow(-1);

  let lastCell = row.insertCell(0);
  let firstCell = row.insertCell(1);
  let roomCell = row.insertCell(2);
  let buildingCell = row.insertCell(3);
  let extensionCell = row.insertCell(4);

  lastCell.innerText = contact.Last;
  firstCell.innerText = contact.First;
  buildingCell.innerText = contact.Building;
  roomCell.innerText = contact.Room;
  extensionCell.innerText = contact.Extention;
}
*/

function filter() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
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
  
      range: 'MasterList!A118:214',  // Range of Data. //change to use as filter by school
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
  
          console.log(element);
  
          // Insert a cell at the end of the row
          var newCell = newRow.insertCell();
  
          // Append a text node to the cell
          var newText = document.createTextNode(element);
          newCell.appendChild(newText);
  
          //table.insertRow(table.rows.length - 1);
  
        })
      });
  
      var obj = response.result.values[0]; // Row Array [0]-controls row#
      console.log(obj); //log data
      obj.forEach(element => { // forEach element in Row Array
        console.log(element);
      });
  
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
    if (isSignedIn) {
      console.log('Signed in!')
      toggleSignInOn();
      toggleSignOutOff();
      makeApiCall();
    }else if (!isSignedIn){
      console.log('Signed out!')
      toggleSignOutOn();
      toggleSignInOff();
    }
  }
  
  function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }
  
  function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
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
  
  // toggle sign IN btn ON
  function toggleSignInOn() {
    var button = document.getElementById('signin-button');
    toggleButtonOn(button);
  }
  // toggle sign out btn ON
  function toggleSignOutOn() {
    var button = document.getElementById('signout-button');
    toggleButtonOn(button);
  }
  // toggle sign in btn OFF
  function toggleSignInOff() {
    var button = document.getElementById('signin-button');
    toggleButtonOff(button);
  }
  // toggle sign out btn OFF
  function toggleSignOutOff() {
    var button = document.getElementById('signout-button');
    toggleButtonOff(button);
  }
  
  
  
  //hide Reload div
  
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
  
  