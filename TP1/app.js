const express = require('express');
const app = express();
const port = 3000;

// Routes
app.get('/', (req, res) => {
  console.log('[%s]: /', new Date().toISOString());
  res.send('Hello World!');
});

app.get('/welcome', (req, res) => {
  console.log('[%s]: /welcome', new Date().toISOString());
  res.send('Bienvenue sur le TP 1 du cours d\'architecture logicielle');
});

app.get('/secret', (req, res) => {
  console.log('[%s]: /secret', new Date().toISOString());
  res.status(401).send('Vous ne possédez pas les droits pour accéder à ma page secrète');
});

app.get('/error', (req, res) => {
  console.log('[%s]: /error', new Date().toISOString());
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

app.get('/img', (req, res) => {
  console.log('[%s]: /img', new Date().toISOString());
  // Code pour télécharger l'image de votre choix
  res.send('Téléchargement de l\'image');
});

app.get('/redirectMe', (req, res) => {
  console.log('[%s]: /redirectMe', new Date().toISOString());
  res.redirect('https://www.example.com'); 
});

app.get('/users/:name', (req, res) => {
  console.log('[%s]: /users/%s', new Date().toISOString(), req.params.name);
  res.send(`Bienvenue sur la page de ${req.params.name}`);
});

app.get('/somme', (req, res) => {
  console.log('[%s]: /somme', new Date().toISOString());
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  const sum = a + b;
  res.send(`Le résultat de la somme entre ${a} et ${b} est ${sum}`);
});

// Middleware pour afficher l'heure de chaque appel
app.use((req, res, next) => {
  console.log('[%s]: %s', new Date().toISOString(), req.originalUrl);
  next();
});

// Middleware pour les routes non supportées
app.use((req, res) => {
  console.log('[%s]: Route non supportée - %s', new Date().toISOString(), req.originalUrl);
  res.status(404).send('Cette page n\'existe pas!');
});

// Route /metrics
app.get('/metrics', (req, res) => {
  console.log('[%s]: /metrics', new Date().toISOString());
  // Code pour collecter et fournir les métriques demandées
  res.json({
    status: 'healthy',
    requestsCount: {}, // Remplacez par les données réelles
    uptime: process.uptime(),
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
