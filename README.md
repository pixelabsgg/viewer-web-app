# 🎮 PixeLabs Viewer Web

Application web pour les viewers mobiles et desktop - Boutique virtuelle PixeLabs.

## 📋 Fonctionnalités

✅ Design Windows 95 (identique au launcher desktop)  
✅ Catalogue complet (Items, Pokémon 1-386, Malus)  
✅ Panier avec génération de commande IRC  
✅ Sprites Pokémon via PokeAPI CDN  
✅ Responsive mobile-first  
✅ localStorage (panier persistant)  
✅ Copier-coller en un clic  

## 🚀 Déploiement GitHub Pages

### Étape 1 : Créer le Repository

1. Aller sur https://github.com/new
2. Repository name: `pixelabs-viewer-web`
3. Public
4. Cliquer **Create repository**

### Étape 2 : Upload les fichiers

```bash
cd pixelabs-viewer-web
git init
git add .
git commit -m "Initial commit: PixeLabs Viewer Web"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/pixelabs-viewer-web.git
git push -u origin main
```

### Étape 3 : Activer GitHub Pages

1. Aller dans **Settings** > **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / folder: **/ (root)**
4. Cliquer **Save**

⏰ Attendre 1-2 minutes

### Étape 4 : Accéder au site

URL: `https://VOTRE_USERNAME.github.io/pixelabs-viewer-web/`

## 📁 Structure

```
pixelabs-viewer-web/
├── index.html          (Structure UI)
├── styles.css          (Design Win95)
├── app.js              (Logique panier)
└── data/
    ├── items.json      (7 items)
    ├── pokemon.json    (386 Pokémon)
    └── malus.json      (5 malus)
```

## 🎨 Sprites Pokémon

Chargés dynamiquement via :
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/
sprites/pokemon/versions/generation-iii/emerald/{id}.png
```

## 📊 Taille Totale

- **~8 MB** (sans sprites locaux)
- Chargement: **<2 secondes** (4G)
- Compatible: **GitHub Pages / Netlify / Cloudflare Pages**

## 🛠️ Développement Local

```bash
# Serveur HTTP simple
python -m http.server 8000

# OU avec Node.js
npx serve
```

Ouvrir: http://localhost:8000

## 📝 Notes

- Pas d'authentification Twitch (copier-coller manuel)
- Pas de solde en temps réel (à implémenter côté backend)
- Multiling FR/EN (placeholder)

---

**PixeLabs © 2025** • Design Windows 95 Edition
