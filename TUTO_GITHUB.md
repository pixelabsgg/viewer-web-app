# 🎮 TUTO BÉBÉ : Mettre la Web App sur GitHub Pages

## ✅ CE QUE VOUS AVEZ DÉJÀ FAIT

Vous avez créé le repository `viewer-web-app` sur GitHub. Parfait ! 👍

Maintenant, on va **pousser les fichiers** de votre PC vers GitHub.

---

## 📝 ÉTAPE 1 : Ouvrir PowerShell dans le bon dossier

1. **Ouvrir l'Explorateur Windows**
2. Aller dans ce dossier :
   ```
   C:\Users\waeld\OneDrive\Documents\pklauncher\pixelabs-viewer-web
   ```
3. Dans la barre d'adresse en haut, cliquer dedans et taper : `powershell`
4. Appuyer sur **Entrée**

➡️ Une fenêtre bleue PowerShell s'ouvre dans ce dossier !

---

## 📝 ÉTAPE 2 : Copier-Coller ces commandes UNE PAR UNE

### Commande 1 : Initialiser Git
```powershell
git init
```
➡️ Appuyer sur Entrée. Vous devez voir : "Initialized empty Git repository"

### Commande 2 : Ajouter tous les fichiers
```powershell
git add .
```
➡️ Appuyer sur Entrée. (Aucun message = c'est bon !)

### Commande 3 : Créer le premier commit
```powershell
git commit -m "Initial commit: PixeLabs Viewer Web"
```
➡️ Appuyer sur Entrée. Vous devez voir des lignes vertes avec les fichiers ajoutés.

### Commande 4 : Renommer la branche
```powershell
git branch -M main
```
➡️ Appuyer sur Entrée. (Aucun message = c'est bon !)

### Commande 5 : Connecter à GitHub
```powershell
git remote add origin https://github.com/pixelabsgg/viewer-web-app.git
```
➡️ Appuyer sur Entrée. (Aucun message = c'est bon !)

### Commande 6 : POUSSER vers GitHub 🚀
```powershell
git push -u origin main
```
➡️ Appuyer sur Entrée. 

**SI on vous demande username/password** :
- Username : `pixelabsgg`
- Password : Votre **Personal Access Token** GitHub (PAS votre mot de passe !)

➡️ Vous devez voir des lignes qui défilent et à la fin : "Branch 'main' set up to track..."

---

## 📝 ÉTAPE 3 : Activer GitHub Pages

1. Retourner sur GitHub : https://github.com/pixelabsgg/viewer-web-app
2. Cliquer sur l'onglet **"Settings"** (en haut, à droite)
3. Dans le menu de gauche, descendez et cliquez sur **"Pages"**
4. Vous voyez "Source" :
   - Sélectionner **"Deploy from a branch"**
5. Juste en dessous "Branch" :
   - Sélectionner **"main"** (au lieu de None)
   - Laisser **"/ (root)"**
6. Cliquer sur le bouton bleu **"Save"**

⏰ **Attendre 1-2 minutes**

7. Rafraîchir la page (F5)
8. En haut, vous devriez voir un bandeau vert :
   ```
   ✅ Your site is live at https://pixelabsgg.github.io/viewer-web-app/
   ```

---

## 🎉 C'EST FINI !

Votre site est en ligne à l'adresse :
```
https://pixelabsgg.github.io/viewer-web-app/
```

Ouvrez ce lien dans votre navigateur et vous verrez votre boutique PixeLabs ! 🚀

---

## ⚠️ SI VOUS ÊTES BLOQUÉ

**Erreur "git not found"** :
- Installer Git : https://git-scm.com/download/win
- Relancer PowerShell après installation

**Erreur lors du push (mot de passe refusé)** :
- Il faut créer un Personal Access Token sur GitHub :
  1. GitHub > Settings (votre profil) > Developer settings > Personal access tokens > Tokens (classic)
  2. Generate new token (classic)
  3. Cocher "repo"
  4. Copier le token et l'utiliser comme "password"

**Le site ne s'affiche pas** :
- Attendre 2-3 minutes après avoir activé Pages
- Vérifier que la branche "main" est bien sélectionnée dans Settings > Pages

---

🆘 **DITES-MOI À QUELLE ÉTAPE VOUS BLOQUEZ ET JE VOUS AIDE !**
