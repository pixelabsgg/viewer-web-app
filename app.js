// ============================================================================
// PIXELABS VIEWER WEB - APPLICATION LOGIC
// ============================================================================

// === STATE ===
let cart = [];
let currentTab = 'items';
let itemsData = [];
let pokemonData = [];
let malusData = [];

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', async () => {
    // Load data
    await loadData();
    
    // Restore cart from localStorage
    loadCartFromStorage();
    
    // Render initial catalog
    renderCatalog();
    
    // Setup search
    setupSearch();
});

// === DATA LOADING ===
async function loadData() {
    try {
        // Load items
        const itemsRes = await fetch('data/items.json');
        itemsData = await itemsRes.json();
        
        // Load full pokemon data (1-386)
        const pokemonRes = await fetch('data/pokemon.json');
        pokemonData = await pokemonRes.json();
        
        // Load malus
        const malusRes = await fetch('data/malus.json');
        malusData = await malusRes.json();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// === TAB SWITCHING ===
function switchTab(tab) {
    currentTab = tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`tab-${tab}`).classList.add('active');
    
    // Show/hide search bar
    document.getElementById('pokemon-search').style.display = tab === 'pokemon' ? 'block' : 'none';
    
    renderCatalog();
}

// === CATALOG RENDERING ===
function renderCatalog() {
    if (currentTab === 'items') {
        renderItems();
    } else if (currentTab === 'pokemon') {
        renderPokemon();
    } else if (currentTab === 'malus') {
        renderMalus();
    }
}

function renderItems() {
    const container = document.getElementById('items-list');
    container.innerHTML = '';
    
    itemsData.forEach(item => {
        const card = createItemCard(item);
        container.appendChild(card);
    });
}

function renderPokemon(filter = '') {
    const container = document.getElementById('pokemon-list');
    container.innerHTML = '';
    
    let filtered = pokemonData;
    if (filter) {
        filtered = pokemonData.filter(p => 
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.id.toString() === filter
        );
    }
    
    filtered.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        container.appendChild(card);
    });
}

function renderMalus() {
    const container = document.getElementById('malus-list');
    container.innerHTML = '';
    
    malusData.forEach(malus => {
        const card = createMalusCard(malus);
        container.appendChild(card);
    });
}

// === CARD CREATION ===
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.onclick = () => addToCart({ type: 'item', data: item });
    
    card.innerHTML = `
        <div class="item-header">
            <span class="item-icon">🎁</span>
            <span class="item-name">${item.name}</span>
        </div>
        <div class="item-price">${item.price} coins</div>
        <div class="item-description">${item.description || ''}</div>
    `;
    
    return card;
}

function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.onclick = () => showPokemonModal(pokemon);
    
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${pokemon.id}.png`;
    
    card.innerHTML = `
        <div class="item-header">
            <img src="${spriteUrl}" class="item-icon" alt="${pokemon.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22><text y=%2220%22 font-size=%2220%22>?</text></svg>'">
            <span class="item-name">#${pokemon.id} ${pokemon.name}</span>
        </div>
        <div class="item-price">${pokemon.price} coins</div>
        <div class="item-description">${pokemon.types.join(', ')}</div>
    `;
    
    return card;
}

function createMalusCard(malus) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.onclick = () => addToCart({ type: 'malus', data: malus });
    
    card.innerHTML = `
        <div class="item-header">
            <span class="item-icon">${malus.icon || '💀'}</span>
            <span class="item-name">${malus.name}</span>
        </div>
        <div class="item-price">${malus.price} coins</div>
        <div class="item-description">${malus.description}</div>
    `;
    
    return card;
}

// === POKEMON MODAL ===
function showPokemonModal(pokemon) {
    const modal = document.getElementById('pokemon-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-pokemon-details');
    
    title.textContent = `#${pokemon.id} ${pokemon.name}`;
    
    const normalSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${pokemon.id}.png`;
    const shinySprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/shiny/${pokemon.id}.png`;
    
    body.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px;">
            <div style="display: inline-block; margin: 0 10px;">
                <img src="${normalSprite}" style="width: 64px; height: 64px; image-rendering: pixelated;">
                <div>Normal</div>
            </div>
            <div style="display: inline-block; margin: 0 10px;">
                <img src="${shinySprite}" style="width: 64px; height: 64px; image-rendering: pixelated;">
                <div>Shiny ✨</div>
            </div>
        </div>
        <div><strong>Types:</strong> ${pokemon.types.join(', ')}</div>
        <div><strong>Prix:</strong> ${pokemon.price} coins</div>
        <div style="margin-top: 15px;">
            <button class="win95-button" onclick="addToCart({type:'pokemon',data:${JSON.stringify(pokemon).replace(/"/g, '&quot;')},shiny:false}); closeModal();" style="width: 48%; margin-right: 2%;">
                SPAWN NORMAL
            </button>
            <button class="win95-button" onclick="addToCart({type:'pokemon',data:${JSON.stringify(pokemon).replace(/"/g, '&quot;')},shiny:true}); closeModal();" style="width: 48%; background: gold;">
                SPAWN SHINY ✨
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('pokemon-modal').style.display = 'none';
}

// === SEARCH ===
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        renderPokemon(e.target.value);
    });
}

// === CART MANAGEMENT ===
function addToCart(item) {
    const cartItem = {
        id: Date.now() + Math.random(),
        type: item.type,
        name: item.data.name,
        price: item.data.price,
        command: generateCommand(item),
        shiny: item.shiny || false,
        data: item.data
    };
    
    cart.push(cartItem);
    saveCartToStorage();
    renderCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCartToStorage();
    renderCart();
}

function clearCart() {
    if (confirm('Vider le panier ?')) {
        cart = [];
        saveCartToStorage();
        renderCart();
    }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const countEl = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');
    
    countEl.textContent = cart.length;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Panier vide</p>';
        totalEl.textContent = '0 coins';
        document.getElementById('generated-command').value = '';
        return;
    }
    
    container.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}${item.shiny ? ' ✨' : ''}</div>
                <div class="cart-item-price">${item.price} coins</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
        `;
        container.appendChild(cartItemEl);
    });
    
    totalEl.textContent = `${total} coins`;
    
    // Generate full command
    const fullCommand = cart.map(item => item.command).join(' ');
    document.getElementById('generated-command').value = fullCommand;
}

// === COMMAND GENERATION ===
function generateCommand(item) {
    if (item.type === 'item') {
        return `!buy ${item.data.key}`;
    } else if (item.type === 'pokemon') {
        let cmd = `!spawn ${item.data.id}`;
        if (item.shiny) cmd += ' shiny';
        return cmd;
    } else if (item.type === 'malus') {
        return `!${item.data.command}`;
    }
    return '';
}

// === COPY COMMAND ===
function copyCommand() {
    const textarea = document.getElementById('generated-command');
    if (!textarea.value) {
        alert('Panier vide !');
        return;
    }
    
    textarea.select();
    document.execCommand('copy');
    
    // Visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✅ COPIÉ !';
    btn.style.background = '#27AE60';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

// === STORAGE ===
function saveCartToStorage() {
    localStorage.setItem('pixelabs-cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const stored = localStorage.getItem('pixelabs-cart');
    if (stored) {
        cart = JSON.parse(stored);
        renderCart();
    }
}

// === LANGUAGE TOGGLE ===
function toggleLanguage() {
    // Placeholder for future i18n
    alert('Changement de langue bientôt disponible !');
}
