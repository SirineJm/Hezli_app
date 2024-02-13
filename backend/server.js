const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('VOTRE_CLE_SECRETE_STRIPE');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// app.use(cors()); // Activez CORS pour toutes les routes
app.use(cors({
  origin: 'http://localhost:3000', // Remplacez par l'URL de votre application React
  credentials: true,
}));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'register',
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM estimation';
  con.query(sql, (err, data) => {
    if (err) return res.json('Error');
    return res.json(data);
  });
});

// Ajoutez cette route pour obtenir le totalCoût actuel
app.get('/obtenirTotalCout', (req, res) => {
  const sql = 'SELECT totalCoût FROM estimation WHERE id=1'; // Assurez-vous d'adapter la requête SQL en fonction de votre structure de base de données.

  con.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération du totalCoût.' });
    } else {
      if (data.length > 0) {
        res.json({ totalCoût: data[0].totalCoût });
      } else {
        res
          .status(404)
          .json({
            error:
              'Aucune entrée correspondante trouvée dans la base de données.',
          });
      }
    }
  });
});

app.post('/depart', (req, res) => {
  const { date, hour, minute, address, Accès_Dèpart } = req.body;
  const updateFields = {}; // Initialisez un objet pour stocker les champs à mettre à jour
  // Vérifiez quels champs sont inclus dans la requête et ajoutez-les à updateFields
  if (date) {
    updateFields.date = date;
  }
  if (hour) {
    updateFields.hour = hour;
  }
  if (minute) {
    updateFields.minute = minute;
  }
  if (address) {
    updateFields.address = address;
  }
  if (Accès_Dèpart) {
    updateFields.Accès_Dèpart = Accès_Dèpart;
  }
  const sql = 'UPDATE estimation SET ? WHERE id=1';
  con.query(sql, [updateFields], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour des données.' });
    } else {
      res.json({ message: 'Données mises à jour avec succès.' });
    }
  });
});

app.post('/arrive', (req, res) => {
  const { Adresse_arrivée, Accès_arrivée } = req.body;
  const updateFields = {}; // Initialisez un objet pour stocker les champs à mettre à jour
  // Vérifiez quels champs sont inclus dans la requête et ajoutez-les à updateFields
  if (Adresse_arrivée) {
    updateFields.Adresse_arrivée = Adresse_arrivée;
  }
  if (Accès_arrivée) {
    updateFields.Accès_arrivée = Accès_arrivée;
  }
  const sql = 'UPDATE estimation SET ? WHERE id=1';

  con.query(sql, [updateFields], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour des données.' });
    } else {
      res.json({ message: 'Données mises à jour avec succès.' });
    }
  });
});

app.post('/objet', (req, res) => {
  const { objets, totalCoût } = req.body;
  const sql = 'UPDATE estimation SET objets=?, totalCoût =? WHERE id=1';
  con.query(sql, [objets, totalCoût], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour des données.' });
    } else {
      res.json({ message: 'Données mises à jour avec succès.' });
    }
  });
});

/*..........récuperer les données dans historique de client ...........................................................................*/
// Créez une route pour récupérer les données depuis la table "estimation"
app.get('/historique', (req, res) => {
  // Sélectionnez toutes les colonnes que vous souhaitez récupérer depuis la table "estimation"
  const query = 'SELECT id, address, date,hour,minute,objets,Adresse_arrivée,totalCoût,Payer FROM estimation'  ;

  con.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
    } else {
      res.json(results);
    }
  });
});

/*....un exemple pour stocker les données dans valide ...............................*/
// app.post('/estimation', (req, res) => {
//   const {  address, date, hour, minute, Adresse_arrivée, objets, Accès_Dèpart, Accès_arrivée, totalCoût } = req.body;
  
//   console.log('Données reçues du client :', req.body);
//   con.query(
//     'INSERT INTO valide(address,date,hour,minute,Adresse_arrivée,objets,totalCoût,Accès_Dèpart,Accès_arrivée) VALUES(?,?,?,?,?,?,?,?,?)',
//        [address,date,hour,minute,Adresse_arrivée,objets, totalCoût, Accès_Dèpart, Accès_arrivée],(err, result) => {
//       if (result) {
//         res.send(result);
//       } else {
//         res.send({ message: 'Données insérées avec succès.' });
//       }
//     }
//   );
// });
/*.........................................................................................................*/

app.post('/payement', (req, res) => {
  const { Payer } = req.body;
  const sql = 'UPDATE estimation SET Payer=? WHERE id=1';
  con.query(sql, [Payer], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour des données.' });
    } else {
      res.json({ message: 'Données mises à jour avec succès.' });
    }
  });
});

/*.........................................................................................................*/

app.get('/api/user/:userId', (req, res) => {
  const userId = req.params.userId; // Récupérez l'ID de l'utilisateur depuis les paramètres de la requête
  const sql = 'SELECT * FROM users WHERE id = ?';
  con.query(sql, [userId], (err, data) => {
    if (err) return res.json('Error');
    return res.json(data[0]); // Renvoie les données du premier utilisateur trouvé (l'ID doit être unique)
  });
});

app.post('/register', (req, res) => {
  const prenom = req.body.prenom;
  const nom = req.body.nom;
  const numero = req.body.numero;
  const email = req.body.email;
  const password = req.body.password;

  con.query(
    'INSERT INTO users(prenom,nom,numero,email,password) VALUES(?,?,?,?,?)',
    [prenom, nom, numero, email, password],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send({ message: 'ENTER CORRECT ASKED DETAILS!' });
      }
    }
  );
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  con.query(
    'SELECT * FROM users WHERE email= ? AND password = ?',
    [email, password],
    (err, result) => {
      if (err) {
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: 'E-mail ou mot de passe erroné' });
        }
      }
    }
  );
});


app.post('/MettreAJour', (req, res) => {
  const { updatedData } = req.body;
  const userId = updatedData.id; // Obtenez l'ID de l'utilisateur depuis les données mises à jour
  delete updatedData.id; // Supprimez l'ID des données mises à jour car nous n'avons pas besoin de le mettre à jour

  const sql = 'UPDATE users SET ? WHERE id = ?';
  con.query(sql, [updatedData, userId], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: 'Erreur lors de la mise à jour des données.' });
    } else {
      res.json({ message: 'Données mises à jour avec succès.' });
    }
  });
});

  app.post('/MettreAJourMotDePasse', (req, res) => {
    const { updatedPasswordData } = req.body;
    const userId = updatedPasswordData.id;
    const oldPassword = updatedPasswordData.oldPassword;
    const newPassword = updatedPasswordData.newPassword;
    const confirmPassword=updatedPasswordData.confirmPassword;
    // Effectuer une requête SQL pour obtenir le mot de passe actuel de l'utilisateur
    const getPasswordQuery = 'SELECT password FROM users WHERE id = ?';
    con.query(getPasswordQuery, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur lors de la récupération du mot de passe.' });
      }  
      const currentPassword = results[0].password;
  
      // Vérifier si l'ancien mot de passe correspond au mot de passe actuel
      if (oldPassword !== currentPassword) {
        return res.status(401).json({ error: 'Entrez un mot de passe valide et réessayez.' });
      }

      if (newPassword !== confirmPassword) {
        return res.status(402).json({ error: 'Entrez un mot de passe valide et réessayez.' });
      }
  
      // Mettre à jour le mot de passe dans la base de données (à remplacer par votre logique de mise à jour)
      const updatePasswordQuery = 'UPDATE users SET password = ? WHERE id = ?';
      con.query(updatePasswordQuery, [newPassword, userId], (updateErr) => {
        if (updateErr) {
          console.error(updateErr);
          return res.status(500).json({ error: 'Erreur lors de la mise à jour du mot de passe.' });
        }
  
        return res.json({ message: 'Mise à jour du mot de passe réussie.' });
      });
    });
  });
  
app.post('/reset-password', (req, res) => {
  const userEmail = req.body.email;

  // Générez un nouveau mot de passe aléatoire
  const newPassword = crypto.randomBytes(8).toString('hex');

  // Mettez à jour le mot de passe dans votre base de données
  con.query(
    'UPDATE users SET password = ? WHERE email = ?',
    [newPassword, userEmail],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          message:
            "Une erreur s'est produite lors de la réinitialisation du mot de passe.",
        });
      } else {
        // Envoyez le nouveau mot de passe à l'utilisateur par e-mail
        const transporter = nodemailer.createTransport({
          service: 'votre_service_de_messagerie',
          auth: {
            user: 'votre_email',
            pass: 'votre_mot_de_passe',
          },
        });

        const mailOptions = {
          from: 'votre_email',
          to: userEmail,
          subject: 'Réinitialisation de votre mot de passe',
          text: `Votre nouveau mot de passe est : ${newPassword}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).json({
              message: "Une erreur s'est produite lors de l'envoi de l'e-mail.",
            });
          } else {
            console.log('E-mail de réinitialisation envoyé : ' + info.response);
            res.json({
              message:
                'Un e-mail de réinitialisation a été envoyé à votre adresse e-mail.',
            });
          }
        });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Serveur en cours d'exécution sur le port 3001");
});

// ....... ADMIN .........................................................................................................
app.post('/admin', (req, res) => {
  const { email, password } = req.body;

  const sqlAdmin = "SELECT * FROM admins WHERE email = ? AND password = ?";
  con.query(sqlAdmin, [email, password], (err, adminResult) => {
    if (err) {
      console.error("Erreur lors de l'exécution de la requête :", err);
      return res.json({ Status: "Error", Error: "Erreur lors de l'exécution de la requête" });
    }

    if (adminResult.length > 0) {
      const id = adminResult[0].id;
      const token = jwt.sign({ role: "admin" }, "jwt-secret-key", { expiresIn: '1d' });
      res.cookie('token', token);
      return res.json({ Status: "admin" }); // Utilisez "admin" pour le rôle des administrateurs
    } else {
      return res.json({ Status: "Error", Error: "Email ou mot de passe incorrect" });
    }
  });
});


app.get('/adminCount', (req, res) => {
  const sql = "Select count(id) as admins from admins";
  con.query(sql, (err, result) => {
      if(err) return res.json({Error: "Error in runnig query"});
      return res.json(result);
  })
})
app.get('/clientCount', (req, res) => {
  const sql = "Select count(id) as users from users";
  con.query(sql, (err, result) => {
      if(err) return res.json({Error: "Error in runnig query"});
      return res.json(result);
  })
})

app.get('/countCommande', (req, res) => {
  const sql = "Select count(id) as estimation from estimation";
  con.query(sql, (err, result) => {
      if(err) return res.json({Error: "Error in runnig query"});
      return res.json(result);
  })
})
app.get('/countLivreur', (req, res) => {
  const sql = "Select count(id) as chauffeur from chauffeur";
  con.query(sql, (err, result) => {
      if(err) return res.json({Error: "Error in runnig query"});
      return res.json(result);
  })
})

/*.........................................................................................*/
app.get('/getchauffeurs', (req, res) => { 
  const sql = "SELECT * FROM chauffeur ";
  con.query(sql,  (err, result) => {
      if(err) return res.json({Error: "Get depart error in sql"});
      return res.json({Status: "Success", Result: result})
    
  })
});

app.get('/getChauffeurs/:id', (req, res) => {
const id = req.params.id;
const sql = "SELECT * FROM chauffeur where id = ?";
con.query(sql, [id], (err, result) => {
    if(err) return res.json({Error: "Get livreur error in sql"});
    return res.json({Status: "Success", Result: result})
})
})
app.post('/addChauff', (req, res) => {

const sql = "INSERT INTO chauffeur (`nomprénom`, `Numéro`, `numheurs`, `salaire`) VALUES (?, ?, ?, ?)";
const values = [
    req.body.nomprénom,
    req.body.Numéro,
    req.body.numheurs,
    req.body.salaire,
];

con.query(sql, values, (err, result) => {
    if (err) {
        console.error("Erreur lors de l'insertion dans la base de données :", err);
        return res.json({ Error: "Erreur lors de l'insertion dans la base de données" });
    }

    console.log("L'insertion dans la base de données a réussi.");
    return res.json({ Status: "Success" });
});
});
app.get('/getCommande', (req, res) => { 
const sql = "SELECT * FROM estimation ";
con.query(sql,  (err, result) => {
  if(err) return res.json({Error: "Get depart error in sql"});
  return res.json({Status: "Success", Result: result})

})
});
app.delete('/supp/:id', (req, res) => {
const id = req.params.id;
const sql = "DELETE FROM chauffeur WHERE id = ?";
con.query(sql, [id], (err, result) => {
if (err) return res.json({ Error: "Error in running query" });
return res.json({ Status: "Success" });
});
});

app.delete('/supp1/:id', (req, res) => {
const id = req.params.id;
const sql = "DELETE FROM estimation WHERE id = ?";
con.query(sql, [id], (err, result) => {
if (err) return res.json({ Error: "Error in running query" });
return res.json({ Status: "Success" });
});
});
app.put('/EditChauff/:id', (req, res) => {
const id = req.params.id;
const sql = "UPDATE Chauffeur set salaire = ? , numheurs=? WHERE id = ?";
con.query(sql, [req.body.salaire,req.body.numheurs , id], (err, result) => {
if(err) return res.json({Error: "update technicien error in sql"});
return res.json({Status: "Success"})
})
})
