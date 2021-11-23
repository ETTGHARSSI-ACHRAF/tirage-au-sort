// inscription des condidature
var id = 0;
var dayPlus = 0;
document.getElementById("submit").addEventListener("click", function (event) {

  event.preventDefault();
  var nom = document.getElementById('nom').value;
  var sujet = document.getElementById('sujet').value;
  id++;
  var obj = {
    'id': id,
    'nom': nom,
    'sujet': sujet,
    'date': null
  }
  if (localStorage.getItem('condidats') == null) {
    localStorage.setItem('condidats', JSON.stringify([]));

  }
  var old_condidats = JSON.parse(localStorage.getItem('condidats'));
  old_condidats.push(obj);
  localStorage.setItem('condidats', JSON.stringify(old_condidats));
  document.getElementById('table').innerHTML += '<tr><th scope="row">' + obj.id + '</th><td>' + obj.nom + '</td><td>' + obj.sujet + '</td></tr>';
});



//   remplire le tableau des condidature onloud
function viderLocalstorage() {
  localStorage.clear();
}

//   le trie
document.getElementById("tirage-btn").addEventListener("click", function (event) {
  event.preventDefault();
 
  

  // console.log(date);
  
  if (localStorage.getItem('condidats') == null) {
    alert("nexiste acaune condidature");
  } else {
    var old_condidats = JSON.parse(localStorage.getItem('condidats'));
    var nombreCondidats = old_condidats.length;
    if (nombreCondidats != 0) {
      var condidat = Math.floor(Math.random() * nombreCondidats);
     
     
      dayPlus++;
      var date = new Date();
      date.setDate(date.getDate() + dayPlus);
      if(date.getDay()<5){
        var date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        var dataCodidatSelection = {
          'id': old_condidats[condidat].id,
          'nom': old_condidats[condidat].nom,
          'sujet': old_condidats[condidat].sujet,
          'date': date
        }
      }else{
        dayPlus=dayPlus+2;
        var date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        var dataCodidatSelection = {
            'id': old_condidats[condidat].id,
            'nom': old_condidats[condidat].nom,
            'sujet': old_condidats[condidat].sujet,
            'date': date
        }
      }
      
      if (localStorage.getItem('result') == null) {
        localStorage.setItem('result', JSON.stringify([]));
      }

      var resultCondidats = JSON.parse(localStorage.getItem('result'));
      resultCondidats.push(dataCodidatSelection);
      localStorage.setItem('result', JSON.stringify(resultCondidats));
      document.getElementById('table-resule').innerHTML += '<tr><th scope="row">' + old_condidats[condidat].id + '</th><td>' + old_condidats[condidat].nom + '</td><td>' + old_condidats[condidat].sujet + '</td><td>' + date + '</td></tr>';
      old_condidats.splice(condidat, 1);
      localStorage.setItem('condidats', JSON.stringify(old_condidats));


      // var rest = JSON.parse(localStorage.getItem('condidats'));
      // document.getElementById('table').innerHTML = "";
      // for (var i = 0; i <= rest.length; i++) {
      //   document.getElementById('table').innerHTML += '<tr><th scope="row">' + rest[i].id + '</th><td>' + rest[i].nom + '</td><td>' + rest[i].sujet + '</td></tr>';
      // }

    } else {
      alert('tous les condidat est passer dans le trie');
      document.getElementById('tirage-btn').style.display = "none";
      document.getElementById('save-btn').style.display = "block";
    }
  }

});
function exportResult() {
  var Results = JSON.parse(localStorage.getItem('result'));
  filename='les Sujets de Veille.xlsx';
   var ws = XLSX.utils.json_to_sheet(Results);
   var wb = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, "People");
   XLSX.writeFile(wb,filename);
}

