
let etudiants = JSON.parse(localStorage.getItem('etudiants')) ;

function afficherEtudiants() {
  const cardEtudiants = document.getElementById('card-etudiants');
 
  cardEtudiants.innerHTML = '';
  etudiants.forEach(function(etudiant) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-header">
        ${etudiant.nom} ${etudiant.prenom}
      </div>
      <div class="card-body">
        <p>Classe: ${etudiant.classe}</p>
        <p>Identifiant: ${etudiant.id}</p>
        <button class="btn-modifier" onclick="modifierEtudiant('${etudiant.id}')">
         
          <i class="fa fa-cog"></i>
        </button>
        <button class="btn-supprimer" onclick="supprimerEtudiant('${etudiant.id}')">
          
          <i class="fa fa-close	"></i>
        </button>
      </div>
    `;
    cardEtudiants.appendChild(card);
  });
  
}

function trierParNom(etudiants) {
    return etudiants.sort(function(a, b) {
      return a.nom.localeCompare(b.nom);
    });
  }
  function estValideNom(texte) {
  for (let i = 0; i < texte.length; i++) {
    const charCode = texte.charCodeAt(i);
    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
      return false;
    }
  }
  return true;
}

function estValideId(texte) {
  for (let i = 0; i < texte.length; i++) {
    const charCode = texte.charCodeAt(i);
    if (!(charCode >= 48 && charCode <= 57)) {
      return false;
    }
  }
  return true;
}


  function ajouterModifierEtudiant() {
  const nom = document.getElementById('input-nom').value.trim();
  const prenom = document.getElementById('input-prenom').value.trim();
  const classe = document.getElementById('input-classe').value.trim();
  const id = document.getElementById('input-id').value.trim();
  if (!estValideNom(nom)) {
    alert("Le nom ne doit contenir que des lettres.");
    return;
  }

  if (!estValideNom(prenom)) {
    alert("Le prénom ne doit contenir que des lettres.");
    return;
  }



  if (!estValideId(id)) {
    alert("L'identifiant ne doit contenir que des chiffres.");
    return;
  }

  const etudiantExist = etudiants.find(function(etudiant) {
    return etudiant.id === id;
  });

 

  if (nom && prenom && classe && id) {
    if (etudiantExist) {
      etudiantExist.nom = nom;
      etudiantExist.prenom = prenom;
      etudiantExist.classe = classe;
    } else {
      const nouvelEtudiant = {
        nom: nom,
        prenom: prenom,
        classe: classe,
        id: id
      };
      etudiants.push(nouvelEtudiant);
    }
    localStorage.setItem('etudiants', JSON.stringify(etudiants));
    afficherEtudiants();
    $('#ajouterEtudiantModal').modal('hide');
    resetModalInputs();
  }
}

      function modifierEtudiant(id) {
        const etudiant = etudiants.find(function(etudiant) {
          return etudiant.id === id;
        });
        if (etudiant) {
          document.getElementById('input-nom').value = etudiant.nom;
          document.getElementById('input-prenom').value = etudiant.prenom;
          document.getElementById('input-classe').value = etudiant.classe;
          document.getElementById('input-id').value = etudiant.id;
          $('#ajouterEtudiantModal').modal('show');
        }
      }

function supprimerEtudiant(id) {
  const etudiantIndex = etudiants.findIndex(function(etudiant) {
    return etudiant.id === id;
  });
  if (etudiantIndex !== -1) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?');
    if (confirmation) {
      etudiants.splice(etudiantIndex, 1);
      localStorage.setItem('etudiants', JSON.stringify(etudiants));
      afficherEtudiants();
    }
  }
}

      function effacerListe() {
  const confirmation = confirm("Êtes-vous sûr de vouloir effacer la liste des étudiants ?");
  if (confirmation) {
    etudiants = [];
    localStorage.setItem('etudiants', JSON.stringify(etudiants));
    afficherEtudiants();
  }
}

function rechercherEtudiant() {
  const rechercheId = document.getElementById('input-recherche').value.trim();
  if (rechercheId) {
    const etudiant = etudiants.find(function(etudiant) {
      return etudiant.id === rechercheId;
    });
    if (etudiant) {
      const cardEtudiants = document.getElementById('card-etudiants');
      cardEtudiants.innerHTML = '';
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-header">
          ${etudiant.nom} ${etudiant.prenom}
        </div>
        <div class="card-body">
          <p>Classe: ${etudiant.classe}</p>
          <p>Identifiant: ${etudiant.id}</p>
          <button class="btn-modifier" onclick="modifierEtudiant('${etudiant.id}')">Modifier</button>
          <button class="btn-supprimer" onclick="supprimerEtudiant('${etudiant.id}')">Supprimer</button>
        </div>
      `;
      cardEtudiants.appendChild(card);
    } else {
      afficherEtudiants();
    }
  } else {
    afficherEtudiants();
  }
}

      function resetModalInputs() {
        document.getElementById('input-nom').value = '';
        document.getElementById('input-prenom').value = '';
        document.getElementById('input-classe').value = '';
        document.getElementById('input-id').value = '';
      }
     
      etudiants = trierParNom(etudiants);
      afficherEtudiants();