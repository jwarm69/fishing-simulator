# Endless Waters - Ultimate Fishing Simulator

## Project Overview
Building the ultimate browser-based fishing simulator using vanilla JavaScript, HTML5 Canvas, and CSS3. The game features 5 distinct fishing realms with instant teleportation, procedural fish generation, and viral social sharing capabilities.

## Core Design Philosophy
**Simple to learn, impossible to master** - Combine zen-like simplicity with infinite discovery and emergent storytelling.

## The 5 Fishing Realms

### 1. Tropical Paradise 🌴
- **Environment**: Crystal clear lagoons with coral reefs
- **Visual Style**: Bright gradients, animated palm silhouettes, coral layers
- **Fish Species**: Colorful tropical fish, sea turtles, dolphins
- **Atmosphere**: Gentle waves, steel drum ambient music, sunset lighting

### 2. Arctic Wilderness ❄️
- **Environment**: Ice fishing through frozen lakes
- **Visual Style**: Cool color palette, aurora CSS animations
- **Fish Species**: Arctic char, salmon, seals, whales
- **Atmosphere**: Wind sounds, cracking ice, northern lights

### 3. Space Station Aquarium 🚀
- **Environment**: Zero-gravity contained habitats
- **Visual Style**: Dark star field, neon fish, futuristic UI
- **Fish Species**: Alien species with bioluminescent effects
- **Atmosphere**: Space ambient sounds, Earth view through windows

### 4. Mystical Forest Lake 🧚
- **Environment**: Enchanted woodland pond
- **Visual Style**: Layered tree depths, firefly particles, magical glow
- **Fish Species**: Magical creatures with glowing patterns, dragons
- **Atmosphere**: Hidden fairy tale ambience, mysterious music

### 5. Deep Ocean Abyss 🌊
- **Environment**: Dark depths with bioluminescent creatures
- **Visual Style**: Gradient darkness, bio-luminescent CSS animations
- **Fish Species**: Anglerfish, giant squid, prehistoric species
- **Atmosphere**: Haunting whale songs, pressure effects

## Technical Architecture

### Frontend (Pure Browser)
- **HTML5 Canvas**: Smooth 60fps graphics with 2D rendering
- **CSS3**: Responsive design, realm transitions, UI animations
- **Vanilla JavaScript**: ES6 modules, no frameworks
- **Web Audio API**: Immersive 3D soundscapes for each realm
- **LocalStorage**: Save progression, fish collection
- **Progressive Web App**: Install-able, works offline

### Performance Targets
- **60 FPS**: Smooth gameplay on all devices
- **Instant Loading**: Zero download friction
- **Responsive**: Perfect on mobile, tablet, desktop
- **Lightweight**: <2MB total assets
- **Battery Efficient**: 2D optimized for mobile devices

## Core Gameplay Mechanics

### Enhanced Casting System
- **Mouse/Touch**: Click-drag for power and direction
- **Visual Feedback**: Rod bending animations, trajectory preview
- **Physics**: Realistic casting arc with wind effects
- **Precision**: Accuracy affects fish attraction

### Fish AI & Behavior
- **Personality Types**: Aggressive, Curious, Scared, Feeding
- **Environmental Factors**: Time, weather, location depth
- **Procedural Generation**: Infinite unique fish combinations
- **Learning System**: Fish remember player patterns

### Progression Without Complexity
- **Intuitive Equipment**: Better rods = longer casts, better lures = rarer fish
- **Knowledge Accumulation**: Learn through experience, not menus
- **Photo Collection**: Instagram-style fish photography system
- **Achievement System**: Natural milestones, no grind

## Browser-Exclusive Features

### Viral Social Mechanics
- **URL Fishing**: `fishgame.com/catch/legendary-phoenix-forest-storm`
- **Ghost Fishing**: Real-time translucent shadows of other players
- **Auto-Story Generation**: "After 23 casts during thunderstorm..."
- **Instant Sharing**: One-click social media with game previews

### Advanced Web Features
- **Tab Fishing**: Background notifications for rare fish
- **Picture-in-Picture**: Mini fishing window while browsing
- **WebRTC Multiplayer**: Real-time co-op via link sharing
- **Offline Mode**: Core game works without internet

## Atmospheric Immersion

### Visual Style
- **Low-Poly Aesthetic**: Timeless art style, high performance
- **Parallax Layers**: Depth without 3D complexity
- **Dynamic Lighting**: CSS filters for time-of-day effects
- **Particle Systems**: Canvas-based atmospheric effects

### Audio Design
- **Procedural Soundscapes**: Unique ambience for each realm
- **3D Audio**: Directional fish sounds, environmental effects
- **Adaptive Music**: Responds to player actions and catches
- **Accessibility**: Visual cues for audio-impaired players

## Development Standards

### Code Organization
```
fishing-simulator/
├── index.html              # Main game page
├── js/
│   ├── game.js             # Core game engine
│   ├── realms.js           # Realm management system
│   ├── fish.js             # Fish AI and generation
│   ├── audio.js            # Web Audio API integration
│   ├── social.js           # Sharing and multiplayer
│   └── utils.js            # Helper functions
├── css/
│   ├── style.css           # Main stylesheet
│   ├── realms.css          # Realm-specific styling
│   └── responsive.css      # Mobile optimization
├── assets/
│   ├── sounds/             # Audio files
│   └── images/             # UI elements
├── CLAUDE.md               # This configuration file
└── todo.md                 # Task management
```

### Performance Guidelines
- **60 FPS Target**: Optimize all animations and updates
- **Memory Management**: Object pooling for fish/particles
- **Asset Optimization**: Compressed audio, minimal images
- **Responsive Design**: Mobile-first, progressive enhancement

### Quality Standards
- **Cross-Browser**: Chrome, Firefox, Safari, Edge support
- **Accessibility**: WCAG 2.1 AA compliance
- **Progressive Enhancement**: Core features work everywhere
- **Error Handling**: Graceful degradation for missing features

## Viral Potential Strategy

### Discovery Mechanics
- **Procedural Surprises**: Always something new to catch
- **Rare Events**: Special fish during storms, eclipses
- **Hidden Secrets**: Easter eggs discoverable through exploration
- **Community Challenges**: Daily goals shared across players

### Sharing Incentives
- **Beautiful Screenshots**: Auto-captured memorable moments
- **Story Generation**: Shareable fishing tales with humor
- **Achievement Unlocks**: Unique catches worth showing off
- **Leaderboards**: Friendly competition without pressure

## Launch Strategy

### Phase 1: Core Experience
- Single realm (Tropical) with full feature set
- Perfect the core mechanics and feel
- Mobile optimization and testing

### Phase 2: Realm Expansion
- Add remaining 4 realms with unique fish/atmosphere
- Implement teleportation system
- Cross-realm achievements

### Phase 3: Social Features
- Ghost fishing and multiplayer elements
- URL sharing and story generation
- Community challenges and events

### Phase 4: Viral Optimization
- Analytics and A/B testing
- Performance optimization
- Social media integration polish

---

*Endless Waters - The Browser Fishing Simulator That Never Ends*
*Simple. Beautiful. Infinite. Shareable.*