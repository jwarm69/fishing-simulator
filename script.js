// =====================================
// ENDLESS WATERS - ULTIMATE FISHING SIMULATOR
// =====================================

// Canvas and UI Elements
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// UI Elements
const realmButtons = document.querySelectorAll('.realm-btn');
const currentRealmName = document.getElementById('current-realm-name');
const currentRealmIcon = document.getElementById('current-realm-icon');
const fishCountEl = document.getElementById('fish-count');
const rareCountEl = document.getElementById('rare-count');
const collectionGrid = document.getElementById('collection-grid');
const catchesList = document.getElementById('catches-list');
const storyContainer = document.getElementById('story-container');
const castingUI = document.getElementById('casting-ui');
const powerBar = document.getElementById('power-bar');
const biteIndicator = document.getElementById('bite-indicator');
const shareBtn = document.getElementById('share-btn');
const storyBtn = document.getElementById('story-btn');

// Game State
let currentRealm = 'tropical';
let gameStats = {
    fishCaught: 0,
    rareCaught: 0,
    totalCasts: 0,
    timeInCurrentRealm: 0
};

let player = {
    x: 500, // Will be set properly in initGame
    y: 80,
    width: 60,
    height: 40,
    speed: 6
};

let fishingLine = {
    x: 0,
    y: 0,
    length: 0,
    maxLength: 400,
    isCasting: false,
    isReeling: false,
    hookedFish: null,
    castPower: 0,
    castDirection: 0
};

let fish = [];
let collection = new Set();
let recentCatches = [];
let fishingStories = [];

// Mouse/Touch State
let isMouseDown = false;
let mouseStartX = 0;
let mouseStartY = 0;
let currentMouseX = 0;
let currentMouseY = 0;

// Keyboard State
let keys = {
    left: false,
    right: false,
    space: false
};

// =====================================
// REALM DEFINITIONS
// =====================================

const realms = {
    tropical: {
        name: 'Tropical Paradise',
        icon: '🌴',
        background: 'tropical',
        fishSpawnRate: 0.025,
        fishTypes: [
            { name: 'Clownfish', emoji: '🐠', color: '#FF6B35', rarity: 'common', size: 25, speed: 2, points: 10 },
            { name: 'Angelfish', emoji: '🐟', color: '#FFD700', rarity: 'uncommon', size: 30, speed: 2.5, points: 25 },
            { name: 'Parrotfish', emoji: '🦜', color: '#32CD32', rarity: 'uncommon', size: 35, speed: 1.8, points: 30 },
            { name: 'Sea Turtle', emoji: '🐢', color: '#228B22', rarity: 'rare', size: 50, speed: 1, points: 100 },
            { name: 'Dolphin', emoji: '🐬', color: '#4169E1', rarity: 'legendary', size: 70, speed: 4, points: 500 }
        ]
    },
    arctic: {
        name: 'Arctic Wilderness',
        icon: '❄️',
        background: 'arctic',
        fishSpawnRate: 0.02,
        fishTypes: [
            { name: 'Arctic Char', emoji: '🐟', color: '#B0E0E6', rarity: 'common', size: 30, speed: 2, points: 15 },
            { name: 'Ice Salmon', emoji: '🐠', color: '#FF69B4', rarity: 'uncommon', size: 40, speed: 3, points: 35 },
            { name: 'Frost Cod', emoji: '🐟', color: '#E0E0E0', rarity: 'uncommon', size: 35, speed: 2.2, points: 40 },
            { name: 'Seal Pup', emoji: '🦭', color: '#696969', rarity: 'rare', size: 55, speed: 1.5, points: 150 },
            { name: 'Narwhal', emoji: '🦄', color: '#F0F8FF', rarity: 'legendary', size: 80, speed: 2.5, points: 750 }
        ]
    },
    space: {
        name: 'Space Station',
        icon: '🚀',
        background: 'space',
        fishSpawnRate: 0.018,
        fishTypes: [
            { name: 'Nebula Guppy', emoji: '✨', color: '#9370DB', rarity: 'common', size: 20, speed: 3, points: 20 },
            { name: 'Cosmic Goldfish', emoji: '⭐', color: '#FFD700', rarity: 'uncommon', size: 28, speed: 2.8, points: 45 },
            { name: 'Plasma Eel', emoji: '⚡', color: '#00FFFF', rarity: 'uncommon', size: 45, speed: 4, points: 60 },
            { name: 'Void Manta', emoji: '🛸', color: '#4B0082', rarity: 'rare', size: 65, speed: 1.8, points: 200 },
            { name: 'Galaxy Whale', emoji: '🌌', color: '#191970', rarity: 'legendary', size: 90, speed: 1.5, points: 1000 }
        ]
    },
    forest: {
        name: 'Mystical Forest',
        icon: '🧚',
        background: 'forest',
        fishSpawnRate: 0.022,
        fishTypes: [
            { name: 'Fairy Tetra', emoji: '🧚', color: '#FF69B4', rarity: 'common', size: 22, speed: 3.5, points: 18 },
            { name: 'Moss Bass', emoji: '🍃', color: '#228B22', rarity: 'uncommon', size: 38, speed: 2.3, points: 42 },
            { name: 'Crystal Carp', emoji: '💎', color: '#E6E6FA', rarity: 'uncommon', size: 42, speed: 2, points: 55 },
            { name: 'Forest Dragon', emoji: '🐉', color: '#8B4513', rarity: 'rare', size: 60, speed: 2.8, points: 250 },
            { name: 'Phoenix Fish', emoji: '🔥', color: '#FF4500', rarity: 'legendary', size: 75, speed: 3.5, points: 1200 }
        ]
    },
    ocean: {
        name: 'Deep Ocean',
        icon: '🌊',
        background: 'ocean',
        fishSpawnRate: 0.015,
        fishTypes: [
            { name: 'Lanternfish', emoji: '💡', color: '#00CED1', rarity: 'common', size: 26, speed: 2.5, points: 22 },
            { name: 'Viper Fish', emoji: '🐍', color: '#8B0000', rarity: 'uncommon', size: 35, speed: 3.2, points: 48 },
            { name: 'Gulper Eel', emoji: '🐍', color: '#2F4F4F', rarity: 'uncommon', size: 50, speed: 1.8, points: 65 },
            { name: 'Giant Squid', emoji: '🦑', color: '#800080', rarity: 'rare', size: 70, speed: 2.2, points: 300 },
            { name: 'Leviathan', emoji: '🐙', color: '#000080', rarity: 'legendary', size: 100, speed: 1.2, points: 2000 }
        ]
    }
};

// =====================================
// UTILITY FUNCTIONS
// =====================================

function getRandomFish(realm) {
    const realmData = realms[realm];
    const rand = Math.random();
    
    // Rarity probabilities
    if (rand < 0.6) {
        // Common fish (60%)
        const commonFish = realmData.fishTypes.filter(f => f.rarity === 'common');
        return commonFish[Math.floor(Math.random() * commonFish.length)];
    } else if (rand < 0.85) {
        // Uncommon fish (25%)
        const uncommonFish = realmData.fishTypes.filter(f => f.rarity === 'uncommon');
        return uncommonFish[Math.floor(Math.random() * uncommonFish.length)];
    } else if (rand < 0.98) {
        // Rare fish (13%)
        const rareFish = realmData.fishTypes.filter(f => f.rarity === 'rare');
        return rareFish[Math.floor(Math.random() * rareFish.length)];
    } else {
        // Legendary fish (2%)
        const legendaryFish = realmData.fishTypes.filter(f => f.rarity === 'legendary');
        return legendaryFish[Math.floor(Math.random() * legendaryFish.length)];
    }
}

function updateUI() {
    fishCountEl.textContent = gameStats.fishCaught;
    rareCountEl.textContent = gameStats.rareCaught;
    
    // Update collection grid
    updateCollectionGrid();
    updateRecentCatches();
}

function updateCollectionGrid() {
    collectionGrid.innerHTML = '';
    
    if (collection.size === 0) {
        const emptySlot = document.createElement('div');
        emptySlot.className = 'collection-slot empty';
        emptySlot.innerHTML = '<span class="slot-text">Cast your first line!</span>';
        collectionGrid.appendChild(emptySlot);
        return;
    }
    
    Array.from(collection).forEach(fishName => {
        const slot = document.createElement('div');
        slot.className = 'collection-slot filled';
        
        // Find the fish emoji
        let fishEmoji = '🐟';
        Object.values(realms).forEach(realm => {
            const fish = realm.fishTypes.find(f => f.name === fishName);
            if (fish) fishEmoji = fish.emoji;
        });
        
        slot.textContent = fishEmoji;
        slot.title = fishName;
        collectionGrid.appendChild(slot);
    });
}

function updateRecentCatches() {
    catchesList.innerHTML = '';
    
    if (recentCatches.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'empty-state';
        empty.textContent = 'Your adventure begins here...';
        catchesList.appendChild(empty);
        return;
    }
    
    recentCatches.slice(-5).reverse().forEach(catch_ => {
        const li = document.createElement('li');
        li.innerHTML = `${catch_.emoji} <strong>${catch_.name}</strong> - ${catch_.points} pts`;
        catchesList.appendChild(li);
    });
}

function addCatch(fishType) {
    gameStats.fishCaught++;
    if (fishType.rarity === 'rare' || fishType.rarity === 'legendary') {
        gameStats.rareCaught++;
    }
    
    collection.add(fishType.name);
    recentCatches.push({
        name: fishType.name,
        emoji: fishType.emoji,
        points: fishType.points,
        realm: currentRealm,
        timestamp: Date.now()
    });
    
    updateUI();
    generateFishingStory(fishType);
}

function generateFishingStory(fishType) {
    const stories = [
        `After ${gameStats.totalCasts} casts in the ${realms[currentRealm].name}, you caught a magnificent ${fishType.name}!`,
        `The ${fishType.name} put up quite a fight before surrendering to your expert angling skills.`,
        `What a catch! The ${fishType.name} was hiding in the depths of ${realms[currentRealm].name}.`,
        `Your patience paid off - this ${fishType.name} is worth ${fishType.points} points!`
    ];
    
    const story = stories[Math.floor(Math.random() * stories.length)];
    fishingStories.unshift(story);
    
    if (fishingStories.length > 3) {
        fishingStories.pop();
    }
    
    updateStories();
}

function updateStories() {
    if (fishingStories.length === 0) {
        storyContainer.innerHTML = '<p class="empty-story">Your fishing stories will appear here as you explore the realms...</p>';
        return;
    }
    
    storyContainer.innerHTML = fishingStories.map(story => `<p>${story}</p>`).join('');
}

// =====================================
// REALM SYSTEM
// =====================================

function switchRealm(newRealm) {
    if (newRealm === currentRealm) return;
    
    currentRealm = newRealm;
    const realmData = realms[newRealm];
    
    // Update UI
    currentRealmName.textContent = realmData.name;
    currentRealmIcon.textContent = realmData.icon;
    
    // Update canvas background
    canvas.className = realmData.background;
    
    // Update active button
    realmButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-realm="${newRealm}"]`).classList.add('active');
    
    // Clear existing fish
    fish = [];
    
    // Reset fishing line
    if (fishingLine.isCasting || fishingLine.isReeling) {
        fishingLine.isCasting = false;
        fishingLine.isReeling = false;
        fishingLine.hookedFish = null;
        fishingLine.length = 0;
        hideCastingUI();
        hideBiteIndicator();
    }
    
    gameStats.timeInCurrentRealm = 0;
}

// =====================================
// ENHANCED CASTING SYSTEM
// =====================================

function startCasting(x, y) {
    if (fishingLine.isCasting || fishingLine.isReeling) return;
    
    fishingLine.isCasting = true;
    fishingLine.castPower = 0;
    fishingLine.x = player.x + player.width / 2;
    fishingLine.y = player.y + player.height;
    
    // Calculate direction based on mouse/touch position
    const rect = canvas.getBoundingClientRect();
    const canvasX = x - rect.left;
    const canvasY = y - rect.top;
    
    fishingLine.castDirection = Math.atan2(canvasY - fishingLine.y, canvasX - fishingLine.x);
    
    showCastingUI();
    gameStats.totalCasts++;
}

function updateCastPower() {
    if (!fishingLine.isCasting) return;
    
    fishingLine.castPower = Math.min(fishingLine.castPower + 2, 100);
    powerBar.style.width = fishingLine.castPower + '%';
}

function releaseCast() {
    if (!fishingLine.isCasting) return;
    
    fishingLine.maxLength = (fishingLine.castPower / 100) * 400 + 100;
    fishingLine.length = 0;
    fishingLine.hookedFish = null;
    
    hideCastingUI();
}

function showCastingUI() {
    castingUI.style.display = 'block';
    powerBar.style.width = '0%';
}

function hideCastingUI() {
    castingUI.style.display = 'none';
}

function showBiteIndicator() {
    biteIndicator.style.display = 'block';
}

function hideBiteIndicator() {
    biteIndicator.style.display = 'none';
}

// =====================================
// FISH SYSTEM
// =====================================

function spawnFish() {
    const realmData = realms[currentRealm];
    if (Math.random() < realmData.fishSpawnRate) {
        const fishType = getRandomFish(currentRealm);
        const side = Math.random() > 0.5 ? 1 : -1;
        
        fish.push({
            x: side > 0 ? -fishType.size : canvas.width,
            y: Math.random() * (canvas.height - 250) + 150,
            width: fishType.size,
            height: fishType.size * 0.6,
            speed: fishType.speed * side,
            type: fishType,
            swayOffset: Math.random() * Math.PI * 2,
            swaySpeed: 0.02 + Math.random() * 0.03
        });
    }
}

function updateFish() {
    fish.forEach((f, index) => {
        // Update position
        f.x += f.speed;
        
        // Add natural swimming motion
        f.swayOffset += f.swaySpeed;
        f.y += Math.sin(f.swayOffset) * 0.5;
        
        // Remove fish that swim off screen
        if (f.x + f.width < -100 || f.x > canvas.width + 100) {
            fish.splice(index, 1);
        }
    });
}

function drawFish() {
    fish.forEach(f => {
        // Draw fish as emoji
        ctx.font = `${f.width}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(f.type.emoji, f.x + f.width/2, f.y + f.height);
    });
}

function checkCollision() {
    if (!fishingLine.isCasting || fishingLine.isReeling) return;

    const hookX = fishingLine.x + Math.cos(fishingLine.castDirection) * fishingLine.length;
    const hookY = fishingLine.y + Math.sin(fishingLine.castDirection) * fishingLine.length;

    for (let i = 0; i < fish.length; i++) {
        const f = fish[i];
        const distance = Math.sqrt(
            Math.pow(hookX - (f.x + f.width/2), 2) + 
            Math.pow(hookY - (f.y + f.height/2), 2)
        );
        
        if (distance < f.width/2 + 10) {
            fishingLine.hookedFish = f;
            fishingLine.isCasting = false;
            fish.splice(i, 1);
            showBiteIndicator();
            break;
        }
    }
}

// =====================================
// DRAWING FUNCTIONS
// =====================================

function drawPlayer() {
    // Draw simple boat/fisher
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(player.x, player.y, player.width, player.height/2);
    
    // Draw fisher
    ctx.fillStyle = '#FFE4B5';
    ctx.fillRect(player.x + 15, player.y - 15, 20, 15);
    
    // Draw fishing rod
    ctx.strokeStyle = '#D2691E';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(player.x + player.width/2, player.y);
    ctx.lineTo(player.x + player.width/2 - 10, player.y - 30);
    ctx.stroke();
    
    // Draw simple text to verify rendering
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText('🎣', player.x + player.width/2 - 8, player.y - 35);
}

function drawFishingLine() {
    if (fishingLine.isCasting || fishingLine.isReeling || fishingLine.hookedFish) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const startX = player.x + player.width/2;
        const startY = player.y + player.height;
        const endX = fishingLine.x + Math.cos(fishingLine.castDirection) * fishingLine.length;
        const endY = fishingLine.y + Math.sin(fishingLine.castDirection) * fishingLine.length;
        
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Draw hook
        ctx.fillStyle = '#C0C0C0';
        ctx.beginPath();
        ctx.arc(endX, endY, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawHookedFish() {
    if (fishingLine.hookedFish) {
        const f = fishingLine.hookedFish;
        const hookX = fishingLine.x + Math.cos(fishingLine.castDirection) * fishingLine.length;
        const hookY = fishingLine.y + Math.sin(fishingLine.castDirection) * fishingLine.length;
        
        ctx.font = `${f.width}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(f.type.emoji, hookX, hookY);
    }
}

// =====================================
// INPUT HANDLING
// =====================================

// Mouse Events
canvas.addEventListener('mousedown', (e) => {
    if (fishingLine.hookedFish) {
        // Hook the fish
        addCatch(fishingLine.hookedFish.type);
        fishingLine.hookedFish = null;
        fishingLine.isReeling = false;
        fishingLine.length = 0;
        hideBiteIndicator();
    } else {
        isMouseDown = true;
        startCasting(e.clientX, e.clientY);
    }
});

canvas.addEventListener('mouseup', () => {
    if (isMouseDown) {
        isMouseDown = false;
        releaseCast();
    }
});

canvas.addEventListener('mousemove', (e) => {
    currentMouseX = e.clientX;
    currentMouseY = e.clientY;
});

// Touch Events
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (fishingLine.hookedFish) {
        addCatch(fishingLine.hookedFish.type);
        fishingLine.hookedFish = null;
        fishingLine.isReeling = false;
        fishingLine.length = 0;
        hideBiteIndicator();
    } else {
        isMouseDown = true;
        startCasting(touch.clientX, touch.clientY);
    }
});

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    if (isMouseDown) {
        isMouseDown = false;
        releaseCast();
    }
});

// Keyboard Events
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            keys.left = true;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            keys.right = true;
            break;
        case ' ':
            e.preventDefault();
            keys.space = true;
            if (!fishingLine.isCasting && !fishingLine.isReeling && !fishingLine.hookedFish) {
                startCasting(player.x + player.width/2, canvas.height/2);
            }
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            keys.left = false;
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            keys.right = false;
            break;
        case ' ':
            keys.space = false;
            if (isMouseDown) {
                isMouseDown = false;
                releaseCast();
            }
            break;
    }
});

// Realm Button Events
realmButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const realm = btn.dataset.realm;
        switchRealm(realm);
    });
});

// Social Button Events
shareBtn.addEventListener('click', () => {
    if (recentCatches.length > 0) {
        const lastCatch = recentCatches[recentCatches.length - 1];
        const shareText = `Just caught a ${lastCatch.name} ${lastCatch.emoji} in ${realms[currentRealm].name}! 🎣 #EndlessWaters`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Endless Waters - Fishing Catch!',
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText);
            alert('Catch details copied to clipboard!');
        }
    }
});

storyBtn.addEventListener('click', () => {
    if (recentCatches.length > 0) {
        const lastCatch = recentCatches[recentCatches.length - 1];
        generateFishingStory(lastCatch);
    }
});

// =====================================
// GAME LOOP
// =====================================

function updateGame() {
    // Update player movement
    if (keys.left && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.right && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
    
    // Update casting power
    if (isMouseDown && fishingLine.isCasting) {
        updateCastPower();
    }
    
    // Update fishing line
    if (fishingLine.isCasting && !isMouseDown) {
        if (fishingLine.length < fishingLine.maxLength) {
            fishingLine.length += 8;
            checkCollision();
        } else {
            fishingLine.isCasting = false;
            fishingLine.isReeling = true;
        }
    }
    
    if (fishingLine.isReeling && !fishingLine.hookedFish) {
        fishingLine.length -= 6;
        if (fishingLine.length <= 0) {
            fishingLine.isReeling = false;
            fishingLine.length = 0;
        }
    }
    
    // Update fish
    updateFish();
    spawnFish();
    
    // Update realm time
    gameStats.timeInCurrentRealm++;
}

function drawGame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Test drawing - simple background elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
    
    // Draw game elements
    drawFish();
    drawPlayer();
    drawFishingLine();
    drawHookedFish();
    
    // Draw debug info
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText(`Canvas: ${canvas.width}x${canvas.height}`, 10, 20);
    ctx.fillText(`Player: ${Math.round(player.x)}, ${player.y}`, 10, 35);
    ctx.fillText(`Fish: ${fish.length}`, 10, 50);
}

function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

// =====================================
// INITIALIZATION
// =====================================

function initGame() {
    // Set canvas size
    canvas.width = 1000;
    canvas.height = 600;
    
    // Set player position after canvas is sized
    player.x = canvas.width / 2 - player.width / 2;
    
    // Initialize UI
    updateUI();
    switchRealm('tropical');
    
    // Start game loop
    gameLoop();
    
    // Debug log
    console.log('Game initialized:', {
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        playerX: player.x,
        playerY: player.y
    });
}

// Start the game when page loads
window.addEventListener('load', initGame);
