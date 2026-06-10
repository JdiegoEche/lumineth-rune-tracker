/* ═══════════════════════════════════════
   LUMINETH REALM-LORDS — BATTLE SCRIPTURE
   Application Logic + i18n (ES / EN)
   ═══════════════════════════════════════ */

// ── Translations ──
const LANG = {
    es: {
        tagline: 'Sistema de Runas — Depict Rune Tracker',
        round: 'Ronda',
        hint: '💡 Haz clic en un diamante para inscribir una runa',
        synergyTitle: '⚡ Mapa de Sinergias',
        effectsTitle: '📜 Efectos Activos',
        uniqueRunes: 'Runas únicas',
        totalInscribed: 'Total inscritas',
        zenithActive: '✧ Cénit Activo',
        critsOn5: 'Crits en 5+',
        targets: 'Objetivos: hasta',
        units: 'unidades',
        synergyWith: 'Sinergia con',
        requires: 'Requiere',
        uniqueRunesReq: 'runas únicas',
        active: 'activas',
        selectRune: 'Seleccionar Runa',
        clearSlot: 'Vaciar Espacio',
        cancel: 'Cancelar',
        resetScripture: 'Reiniciar Scripture',
        inscribed: 'inscrita en la scripture',
        slotCleared: 'Espacio vaciado',
        scriptureReset: 'Scripture reiniciada',
        emptyTitle: 'Tu Battle Scripture está vacía',
        emptySub: 'Selecciona una runa en los diamantes de arriba para comenzar',
        runeSubtitles: {
            varinor: 'Runa de la Fuerza',
            alaithi: 'Runa de la Montaña',
            ydriliqi: 'Runa del Río',
            oreali: 'Runa del Viento',
            thalari: 'Runa del Cénit'
        },
        baseEffects: {
            varinor: '+1 a tiradas de carrera y carga para los objetivos.',
            alaithi: 'Los objetivos tienen Salvaguardia (5+).',
            ydriliqi: '-2 a tiradas de carga de enemigos a 12" de los objetivos.',
            oreali: '-1 a tiradas de impacto de enemigos en combate con los objetivos.',
            thalari: '+2 a tiradas de lanzamiento para unidades LUMINETH REALM-LORDS amigas.'
        },
        conditionalEffects: {
            thalari: [
                '4+ runas únicas: +4" al Movimiento de unidades LUMINETH amigas y sus ataques impactan críticamente en 5+ sin modificar.'
            ]
        },
        enhancedEffects: {
            varinor: [
                '+1 a tiradas de herida en ataques de combate de los objetivos.',
                'Los objetivos pueden usar DISPARAR y/o CARGAR incluso si usaron RETIRADA en el mismo turno.'
            ],
            alaithi: [
                'Las armas cuerpo a cuerpo de los objetivos tienen Anti-carga (+1 Penetración).',
                '-1 a tiradas de herida para ataques de unidades enemigas en combate con los objetivos.'
            ],
            ydriliqi: [
                'Ignorar modificadores negativos a tiradas de impacto y herida de los ataques de los objetivos.',
                'Los objetivos pueden moverse 3" inmediatamente, pasando a través de rangos de combate enemigos.'
            ],
            oreali: [
                '+4" al Movimiento de los objetivos.',
                '+5 a la puntuación de control de los objetivos.'
            ],
            thalari: []
        }
    },
    en: {
        tagline: 'Rune System — Depict Rune Tracker',
        round: 'Round',
        hint: '💡 Click a diamond to inscribe a rune',
        synergyTitle: '⚡ Synergy Map',
        effectsTitle: '📜 Active Effects',
        uniqueRunes: 'Unique runes',
        totalInscribed: 'Total inscribed',
        zenithActive: '✧ Zenith Active',
        critsOn5: 'Crits on 5+',
        targets: 'Targets: up to',
        units: 'units',
        synergyWith: 'Synergy with',
        requires: 'Requires',
        uniqueRunesReq: 'unique runes',
        active: 'active',
        selectRune: 'Select Rune',
        clearSlot: 'Clear Slot',
        cancel: 'Cancel',
        resetScripture: 'Reset Scripture',
        inscribed: 'inscribed on the scripture',
        slotCleared: 'Slot cleared',
        scriptureReset: 'Scripture reset',
        emptyTitle: 'Your Battle Scripture is empty',
        emptySub: 'Select a rune in the diamonds above to begin',
        runeSubtitles: {
            varinor: 'Rune of Strength',
            alaithi: 'Rune of the Mountain',
            ydriliqi: 'Rune of the River',
            oreali: 'Rune of the Wind',
            thalari: 'Rune of the Zenith'
        },
        baseEffects: {
            varinor: '+1 to run rolls and charge rolls for the targets.',
            alaithi: 'Targets have Ward (5+).',
            ydriliqi: '-2 to charge rolls for enemy units within 12" of the targets.',
            oreali: '-1 to hit rolls for attacks made by enemy units in combat with the targets.',
            thalari: '+2 to casting rolls for friendly LUMINETH REALM-LORDS units.'
        },
        conditionalEffects: {
            thalari: [
                '4+ unique runes: +4" to the Move characteristic of friendly LUMINETH units and their attacks score critical hits on unmodified hit rolls of 5+.'
            ]
        },
        enhancedEffects: {
            varinor: [
                '+1 to wound rolls for each target\'s combat attacks.',
                'Targets can use SHOOT and/or CHARGE abilities even if they used a RETREAT ability in the same turn.'
            ],
            alaithi: [
                'The targets\' melee weapons have Anti-charge (+1 Rend).',
                '-1 to wound rolls for attacks made by enemy units in combat with the targets.'
            ],
            ydriliqi: [
                'Ignore negative modifiers to hit rolls and wound rolls for attacks made by the targets.',
                'Targets can immediately move up to 3". They can pass through the combat ranges of enemy units.'
            ],
            oreali: [
                '+4" to each target\'s Move characteristic.',
                '+5 to each target\'s control score.'
            ],
            thalari: []
        }
    }
};

// ── Rune Data (language-independent) ──
const RUNES = {
    varinor: {
        id: 'varinor',
        name: 'Varinor',
        symbol: 'V',
        color: '#ff6b35',
        perInstance: true,
        unitsPerInstance: 2,
        enhanced: [
            { requiredRune: 'ydriliqi', textIndex: 0 },
            { requiredRune: 'oreali', textIndex: 1 }
        ]
    },
    alaithi: {
        id: 'alaithi',
        name: 'Alaithi',
        symbol: 'A',
        color: '#daa520',
        perInstance: true,
        unitsPerInstance: 2,
        enhanced: [
            { requiredRune: 'varinor', textIndex: 0 },
            { requiredRune: 'ydriliqi', textIndex: 1 }
        ]
    },
    ydriliqi: {
        id: 'ydriliqi',
        name: 'Ydriliqi',
        symbol: 'Y',
        color: '#4fc3f7',
        perInstance: true,
        unitsPerInstance: 2,
        enhanced: [
            { requiredRune: 'alaithi', textIndex: 0 },
            { requiredRune: 'oreali', textIndex: 1 }
        ]
    },
    oreali: {
        id: 'oreali',
        name: 'Oreali',
        symbol: 'O',
        color: '#66bb6a',
        perInstance: true,
        unitsPerInstance: 2,
        enhanced: [
            { requiredRune: 'varinor', textIndex: 0 },
            { requiredRune: 'alaithi', textIndex: 1 }
        ]
    },
    thalari: {
        id: 'thalari',
        name: 'Thalari',
        symbol: 'T',
        color: '#ce93d8',
        perInstance: false,
        enhanced: [],
        conditionals: [
            { requiredUnique: 4, textIndex: 0 }
        ]
    }
};

const RUNE_IDS = ['varinor', 'alaithi', 'ydriliqi', 'oreali', 'thalari'];

// ── State ──
let state = {
    slots: [null, null, null, null, null],
    teclis: null,
    selectedSlotIndex: null,
    lang: 'es'
};

// ── Translation helper ──
function t(key) {
    return LANG[state.lang][key];
}

function tSub(runeId) {
    return LANG[state.lang].runeSubtitles[runeId];
}

function tBase(runeId) {
    return LANG[state.lang].baseEffects[runeId];
}

function tEnhanced(runeId, index) {
    return LANG[state.lang].enhancedEffects[runeId][index];
}

function tConditional(runeId, index) {
    return LANG[state.lang].conditionalEffects[runeId][index];
}

// ── DOM References ──
const roundsRow = document.getElementById('rounds-row');
const teclisRow = document.getElementById('teclis-row');
const effectsGrid = document.getElementById('effects-grid');
const effectsStats = document.getElementById('effects-stats');
const emptyState = document.getElementById('empty-state');
const synergyMatrix = document.getElementById('synergy-matrix');
const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const runeOptions = document.getElementById('rune-options');
const btnClear = document.getElementById('btn-clear');
const btnCancel = document.getElementById('btn-cancel');
const btnReset = document.getElementById('btn-reset');
const modalClose = document.getElementById('modal-close');
const toast = document.getElementById('toast');
const langToggle = document.getElementById('lang-toggle');
const tagline = document.getElementById('tagline');

// ── Initialize ──
function init() {
    renderAll();
    bindEvents();
}

function renderAll() {
    updateStaticText();
    renderDiamonds();
    renderSynergyMap();
    renderEffects();
}

function updateStaticText() {
    tagline.textContent = t('tagline');
    document.querySelector('.scripture-hint').innerHTML = t('hint');
    document.querySelector('#synergy-section .section-title').innerHTML = `<span class="section-icon">⚡</span> ${t('synergyTitle')}`;
    document.querySelector('#effects-section .section-title').innerHTML = `<span class="section-icon">📜</span> ${t('effectsTitle')}`;
    document.getElementById('btn-reset').innerHTML = `<span class="btn-icon">↺</span> ${t('resetScripture')}`;
    document.getElementById('btn-clear').innerHTML = `<span class="btn-icon">✕</span> ${t('clearSlot')}`;
    document.getElementById('btn-cancel').textContent = t('cancel');
}

// ── Language Toggle ──
function setLanguage(lang) {
    state.lang = lang;

    // Update toggle UI
    langToggle.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    langToggle.classList.toggle('en', lang === 'en');

    renderAll();
}

// ── Render Diamonds ──
function renderDiamonds() {
    roundsRow.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const runeId = state.slots[i];
        const rune = runeId ? RUNES[runeId] : null;
        roundsRow.appendChild(createDiamondElement(i, `${t('round')} ${i + 1}`, rune, false));
    }

    teclisRow.innerHTML = '';
    const teclisRune = state.teclis ? RUNES[state.teclis] : null;
    teclisRow.appendChild(createDiamondElement('teclis', 'Teclis', teclisRune, true));
}

function createDiamondElement(slotIndex, label, rune, isTeclis) {
    const slot = document.createElement('div');
    slot.className = `diamond-slot${isTeclis ? ' teclis' : ''}`;
    slot.dataset.slot = slotIndex;
    slot.addEventListener('click', () => openModal(slotIndex));

    const diamond = document.createElement('div');
    diamond.className = `diamond ${rune ? 'filled' : 'empty'}`;
    if (rune) diamond.dataset.rune = rune.id;

    const inner = document.createElement('div');
    inner.className = 'diamond-inner';

    if (rune) {
        const symbol = document.createElement('span');
        symbol.className = 'diamond-symbol';
        symbol.textContent = rune.symbol;
        symbol.style.color = rune.color;
        inner.appendChild(symbol);
    } else {
        const icon = document.createElement('span');
        icon.className = 'diamond-empty-icon';
        icon.textContent = '+';
        inner.appendChild(icon);
    }

    diamond.appendChild(inner);
    slot.appendChild(diamond);

    const labelEl = document.createElement('div');
    labelEl.className = `diamond-label${rune ? ' filled' : ''}`;
    labelEl.textContent = label;
    slot.appendChild(labelEl);

    const nameEl = document.createElement('div');
    nameEl.className = 'diamond-rune-name';
    if (rune) {
        nameEl.textContent = `${rune.name}`;
        nameEl.style.color = rune.color;
    }
    slot.appendChild(nameEl);

    return slot;
}

// ── Modal ──
function openModal(slotIndex) {
    state.selectedSlotIndex = slotIndex;

    const currentRune = slotIndex === 'teclis' ? state.teclis : state.slots[slotIndex];
    const slotLabel = slotIndex === 'teclis' ? 'Teclis' : `${t('round')} ${slotIndex + 1}`;

    modalTitle.textContent = `${t('selectRune')} — ${slotLabel}`;
    btnClear.disabled = !currentRune;
    btnClear.innerHTML = `<span class="btn-icon">✕</span> ${t('clearSlot')}`;
    btnCancel.textContent = t('cancel');

    runeOptions.innerHTML = '';
    RUNE_IDS.forEach(runeId => {
        const rune = RUNES[runeId];
        const isSelected = currentRune === runeId;

        const option = document.createElement('div');
        option.className = `rune-option${isSelected ? ' selected' : ''}`;
        option.dataset.rune = runeId;
        option.addEventListener('click', () => selectRune(runeId));

        option.innerHTML = `
            <div class="rune-option-icon rune-card-icon" data-rune="${runeId}">${rune.symbol}</div>
            <div class="rune-option-info">
                <div class="rune-option-name">${rune.name}</div>
                <div class="rune-option-subtitle">${tSub(runeId)}</div>
                <div class="rune-option-desc">${tBase(runeId)}</div>
            </div>
            <div class="rune-option-arrow">→</div>
        `;

        runeOptions.appendChild(option);
    });

    modalOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('visible');
    document.body.style.overflow = '';
    state.selectedSlotIndex = null;
}

function selectRune(runeId) {
    const slot = state.selectedSlotIndex;
    if (slot === 'teclis') {
        state.teclis = runeId;
    } else {
        state.slots[slot] = runeId;
    }

    closeModal();
    renderDiamonds();
    renderSynergyMap();
    renderEffects();

    const rune = RUNES[runeId];
    showToast(`${rune.symbol} ${rune.name} ${t('inscribed')}`);
}

function clearSlot() {
    const slot = state.selectedSlotIndex;
    if (slot === 'teclis') {
        state.teclis = null;
    } else {
        state.slots[slot] = null;
    }

    closeModal();
    renderDiamonds();
    renderSynergyMap();
    renderEffects();
    showToast(t('slotCleared'));
}

function resetAll() {
    state.slots = [null, null, null, null, null];
    state.teclis = null;
    renderDiamonds();
    renderSynergyMap();
    renderEffects();
    showToast(t('scriptureReset'));
}

// ── Depicted Runes Helpers ──
function getDepictedRunes() {
    return [...state.slots, state.teclis].filter(Boolean);
}

function getUniqueRunes() {
    return new Set(getDepictedRunes());
}

function getRuneInstances() {
    const instances = {};
    getDepictedRunes().forEach(id => {
        instances[id] = (instances[id] || 0) + 1;
    });
    return instances;
}

// ── Calculate & Render Effects ──
function calculateEffects() {
    const instances = getRuneInstances();
    const uniqueRunes = getUniqueRunes();
    const effects = [];

    for (const [runeId, count] of Object.entries(instances)) {
        const rune = RUNES[runeId];
        const runeEffects = {
            rune: rune,
            instances: count,
            enhancedEffects: rune.enhanced.map(ee => ({
                ...ee,
                active: uniqueRunes.has(ee.requiredRune)
            })),
            conditionalEffects: (rune.conditionals || []).map(ce => ({
                ...ce,
                active: uniqueRunes.size >= ce.requiredUnique
            }))
        };
        effects.push(runeEffects);
    }

    return {
        effects,
        uniqueCount: uniqueRunes.size,
        totalRunes: getDepictedRunes().length
    };
}

function renderEffects() {
    const { effects, uniqueCount, totalRunes } = calculateEffects();
    const uniqueRunes = getUniqueRunes();

    // Stats badges (always show)
    let statsHTML = `
        <div class="stat-badge">
            <span>${t('uniqueRunes')}:</span>
            <span class="stat-value">${uniqueCount}/5</span>
        </div>
        <div class="stat-badge">
            <span>${t('totalInscribed')}:</span>
            <span class="stat-value">${totalRunes}/6</span>
        </div>
    `;

    if (uniqueCount >= 4 && uniqueRunes.has('thalari')) {
        statsHTML += `
            <div class="stat-badge capstone-active">
                <span>${t('zenithActive')}:</span>
                <span class="stat-value">${t('critsOn5')}</span>
            </div>
        `;
    }

    effectsStats.innerHTML = statsHTML;

    // Empty state
    if (effects.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.querySelector('p:first-of-type').textContent = t('emptyTitle');
        emptyState.querySelector('.empty-sub').textContent = t('emptySub');
        effectsGrid.innerHTML = '';
        return;
    }

    emptyState.classList.add('hidden');

    // Sort cards in canonical order
    const order = ['varinor', 'alaithi', 'ydriliqi', 'oreali', 'thalari'];
    effects.sort((a, b) => order.indexOf(a.rune.id) - order.indexOf(b.rune.id));

    // Inscribed runes line
    const depicted = getDepictedRunes();
    let headerHTML = '';
    if (depicted.length > 0) {
        const runeLine = depicted.map(id => {
            const r = RUNES[id];
            return `<span style="color:${r.color};font-weight:600">${r.symbol} ${r.name}</span>`;
        }).join(' · ');
        headerHTML = `<div style="font-size:0.8rem;color:var(--text-secondary);padding:0.5rem 0.75rem;margin-bottom:0.75rem;background:var(--bg-card);border-radius:8px;border:1px solid rgba(212,168,67,0.1)">${runeLine}</div>`;
    }

    effectsGrid.innerHTML = headerHTML;
    effects.forEach(({ rune, instances, enhancedEffects, conditionalEffects }) => {
        const card = document.createElement('div');
        card.className = 'rune-card';
        card.dataset.rune = rune.id;

        const unitsInfo = rune.perInstance
            ? `<div class="effect-units">▸ ${t('targets')} 2 ${t('units')}</div>`
            : '';

        let enhancedHTML = '';
        enhancedEffects.forEach(ee => {
            const isActive = ee.active;
            const statusClass = isActive ? 'enhanced-active' : 'enhanced-locked';
            const icon = isActive ? '⚡' : '🔒';

            const reqRune = RUNES[ee.requiredRune];
            const requirement = isActive
                ? `<div class="effect-requirement">✓ ${t('synergyWith')} ${reqRune.name}</div>`
                : `<div class="effect-requirement">${t('requires')} ${reqRune.name} (${tSub(ee.requiredRune)})</div>`;

            enhancedHTML += `
                <div class="effect-item ${statusClass}">
                    <span class="effect-icon">${icon}</span>
                    <div class="effect-text">
                        ${tEnhanced(rune.id, ee.textIndex)}
                        ${requirement}
                    </div>
                </div>
            `;
        });

        let conditionalHTML = '';
        conditionalEffects.forEach(ce => {
            const isActive = ce.active;
            const statusClass = isActive ? 'enhanced-active' : 'enhanced-locked';
            const icon = isActive ? '★' : '☆';

            conditionalHTML += `
                <div class="effect-item ${statusClass}">
                    <span class="effect-icon">${icon}</span>
                    <div class="effect-text">
                        ${tConditional(rune.id, ce.textIndex)}
                    </div>
                </div>
            `;
        });

        card.innerHTML = `
            <div class="rune-card-header">
                <div class="rune-card-icon" data-rune="${rune.id}">${rune.symbol}</div>
                <div class="rune-card-title-group">
                    <div class="rune-card-name">${rune.name}</div>
                    <div class="rune-card-subtitle">${tSub(rune.id)}</div>
                </div>
            </div>
            <div class="effect-list">
                <div class="effect-item base">
                    <span class="effect-icon">✦</span>
                    <div class="effect-text">
                        ${tBase(rune.id)}
                        ${unitsInfo}
                    </div>
                </div>
                ${conditionalHTML}
                ${enhancedHTML}
            </div>
        `;

        effectsGrid.appendChild(card);
    });
}

// ── Render Synergy Matrix ──
function renderSynergyMap() {
    const uniqueRunes = getUniqueRunes();

    // Build synergy lookup: synergies[row][col] = { textIndex }
    const synergies = {};
    RUNE_IDS.forEach(runeId => {
        synergies[runeId] = {};
        RUNES[runeId].enhanced.forEach(ee => {
            synergies[runeId][ee.requiredRune] = ee.textIndex;
        });
    });

    const matrixRunes = ['varinor', 'alaithi', 'ydriliqi', 'oreali'];

    let html = `
        <div class="synergy-title-row">
            <h2 class="section-title" style="margin-bottom:0">${t('synergyTitle')}</h2>
        </div>
        <table class="synergy-table">
        <thead><tr><th></th>`;

    matrixRunes.forEach(colId => {
        const rune = RUNES[colId];
        const isActive = uniqueRunes.has(colId);
        const style = isActive ? `color: ${rune.color}; opacity: 1;` : 'opacity: 0.5;';
        html += `<th class="rune-header" style="${style}">${rune.name}</th>`;
    });

    html += `</tr></thead><tbody>`;

    matrixRunes.forEach(rowId => {
        const rowRune = RUNES[rowId];
        const rowActive = uniqueRunes.has(rowId);
        const rowStyle = rowActive ? `color: ${rowRune.color}; opacity: 1;` : 'opacity: 0.5;';

        html += `<tr><td class="row-header" style="${rowStyle}">${rowRune.name}</td>`;

        matrixRunes.forEach(colId => {
            if (rowId === colId) {
                html += `<td><div class="synergy-cell diagonal">—</div></td>`;
            } else {
                const textIndex = synergies[rowId]?.[colId];
                if (textIndex !== undefined) {
                    const isActive = uniqueRunes.has(rowId) && uniqueRunes.has(colId);
                    const cellClass = isActive ? 'active' : 'inactive';
                    const text = tEnhanced(rowId, textIndex);
                    html += `<td><div class="synergy-cell ${cellClass}">${text}</div></td>`;
                } else {
                    html += `<td><div class="synergy-cell no-synergy">—</div></td>`;
                }
            }
        });

        html += `</tr>`;
    });

    html += `</tbody></table>`;
    synergyMatrix.innerHTML = html;
}

// ── Toast ──
let toastTimeout = null;
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2500);
}

// ── Event Bindings ──
function bindEvents() {
    btnCancel.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    btnClear.addEventListener('click', clearSlot);
    btnReset.addEventListener('click', resetAll);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('visible')) {
            closeModal();
        }
    });

    // Language toggle
    langToggle.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
}

// ── Start ──
init();
