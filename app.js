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
const CARD_ORDER = ['varinor', 'alaithi', 'ydriliqi', 'oreali', 'thalari'];

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
    const depictedRunes = getDepictedRunes();
    const uniqueRunes = getUniqueRunes();
    const hint = document.querySelector('.scripture-hint');
    hint.classList.toggle('hidden', depictedRunes.length > 0);
    renderDiamonds();
    renderSynergyMap(uniqueRunes);
    renderEffects(depictedRunes, uniqueRunes);
}

function updateStaticText() {
    tagline.textContent = t('tagline');
    document.querySelector('.hint-text').textContent = t('hint');
    document.querySelector('#synergy-section .section-text').textContent = t('synergyTitle');
    document.querySelector('#effects-section .section-text').textContent = t('effectsTitle');
    document.querySelector('#btn-reset .btn-label').textContent = t('resetScripture');
    document.querySelector('#btn-clear .btn-label').textContent = t('clearSlot');
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
    btnClear.querySelector('.btn-label').textContent = t('clearSlot');
    btnCancel.textContent = t('cancel');

    runeOptions.innerHTML = '';
    const optTemplate = document.getElementById('rune-option-template');
    RUNE_IDS.forEach(runeId => {
        const rune = RUNES[runeId];
        const isSelected = currentRune === runeId;

        const clone = optTemplate.content.cloneNode(true);
        const option = clone.querySelector('.rune-option');
        option.dataset.rune = runeId;
        if (isSelected) option.classList.add('selected');
        option.addEventListener('click', () => selectRune(runeId));

        clone.querySelector('.rune-option-icon').textContent = rune.symbol;
        clone.querySelector('.rune-option-icon').dataset.rune = runeId;
        clone.querySelector('.rune-option-name').textContent = rune.name;
        clone.querySelector('.rune-option-subtitle').textContent = tSub(runeId);
        clone.querySelector('.rune-option-desc').textContent = tBase(runeId);

        runeOptions.appendChild(clone);
    });

    modalOverlay.classList.add('visible');
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = scrollBarWidth + 'px';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('visible');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
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
    renderAll();

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
    renderAll();
    showToast(t('slotCleared'));
}

function resetAll() {
    state.slots = [null, null, null, null, null];
    state.teclis = null;
    renderAll();
    showToast(t('scriptureReset'));
}

// ── Depicted Runes Helpers ──
function getDepictedRunes() {
    return [...state.slots, state.teclis].filter(Boolean);
}

function getUniqueRunes() {
    return new Set(getDepictedRunes());
}

// ── Calculate & Render Effects ──
function calculateEffects(depictedRunes, uniqueRunes) {
    const instances = {};
    depictedRunes.forEach(id => {
        instances[id] = (instances[id] || 0) + 1;
    });
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
        totalRunes: depictedRunes.length
    };
}

function renderEffects(depictedRunes, uniqueRunes) {
    const { effects, uniqueCount, totalRunes } = calculateEffects(depictedRunes, uniqueRunes);

    // Stats badges (always show)
    const badgeTemplate = document.getElementById('stat-badge-template');
    effectsStats.innerHTML = '';

    const uniqueBadge = badgeTemplate.content.cloneNode(true);
    uniqueBadge.querySelector('.stat-label').textContent = t('uniqueRunes') + ':';
    uniqueBadge.querySelector('.stat-value').textContent = uniqueCount + '/5';
    effectsStats.appendChild(uniqueBadge);

    const totalBadge = badgeTemplate.content.cloneNode(true);
    totalBadge.querySelector('.stat-label').textContent = t('totalInscribed') + ':';
    totalBadge.querySelector('.stat-value').textContent = totalRunes + '/6';
    effectsStats.appendChild(totalBadge);

    if (uniqueCount >= 4 && uniqueRunes.has('thalari')) {
        const capstoneBadge = badgeTemplate.content.cloneNode(true);
        capstoneBadge.querySelector('.stat-badge').classList.add('capstone-active');
        capstoneBadge.querySelector('.stat-label').textContent = t('zenithActive') + ':';
        capstoneBadge.querySelector('.stat-value').textContent = t('critsOn5');
        effectsStats.appendChild(capstoneBadge);
    }

    // Empty state
    if (effects.length === 0) {
        emptyState.classList.remove('hidden');
        emptyState.querySelector('p:first-of-type').textContent = t('emptyTitle');
        emptyState.querySelector('.empty-sub').textContent = t('emptySub');
        effectsGrid.innerHTML = '';
        return;
    }

    emptyState.classList.add('hidden');

    effects.sort((a, b) => CARD_ORDER.indexOf(a.rune.id) - CARD_ORDER.indexOf(b.rune.id));

    // Inscribed runes line
    const depicted = depictedRunes;
    effectsGrid.innerHTML = '';
    if (depicted.length > 0) {
        const barClone = document.getElementById('inscribed-runes-bar').content.cloneNode(true);
        const list = barClone.querySelector('.inscribed-runes-list');
        depicted.forEach((id, i) => {
            const r = RUNES[id];
            const span = document.createElement('span');
            span.className = 'inscribed-rune';
            span.dataset.rune = r.id;
            span.textContent = r.symbol + ' ' + r.name;
            list.appendChild(span);
            if (i < depicted.length - 1) {
                list.appendChild(document.createTextNode(' · '));
            }
        });
        effectsGrid.appendChild(barClone);
    }
    const cardTemplate = document.getElementById('rune-card-template');
    const effectItemTemplate = document.getElementById('effect-item-template');

    effects.forEach(({ rune, instances, enhancedEffects, conditionalEffects }) => {
        const cardClone = cardTemplate.content.cloneNode(true);
        const card = cardClone.querySelector('.rune-card');
        card.dataset.rune = rune.id;

        cardClone.querySelector('.rune-card-icon').textContent = rune.symbol;
        cardClone.querySelector('.rune-card-icon').dataset.rune = rune.id;
        cardClone.querySelector('.rune-card-name').textContent = rune.name;
        cardClone.querySelector('.rune-card-subtitle').textContent = tSub(rune.id);
        cardClone.querySelector('.effect-item.base .effect-text').textContent = tBase(rune.id);

        if (rune.perInstance) {
            const unitsEl = document.createElement('div');
            unitsEl.className = 'effect-units';
            unitsEl.textContent = `▸ ${t('targets')} 2 ${t('units')}`;
            cardClone.querySelector('.effect-item.base .effect-text').appendChild(unitsEl);
        }

        const effectList = cardClone.querySelector('.effect-list');

        conditionalEffects.forEach(ce => {
            const isActive = ce.active;
            const itemClone = effectItemTemplate.content.cloneNode(true);
            const item = itemClone.querySelector('.effect-item');
            item.classList.add(isActive ? 'enhanced-active' : 'enhanced-locked');
            itemClone.querySelector('.effect-icon').textContent = isActive ? '★' : '☆';
            itemClone.querySelector('.effect-text').textContent = tConditional(rune.id, ce.textIndex);
            effectList.appendChild(itemClone);
        });

        enhancedEffects.forEach(ee => {
            const isActive = ee.active;
            const itemClone = effectItemTemplate.content.cloneNode(true);
            const item = itemClone.querySelector('.effect-item');
            item.classList.add(isActive ? 'enhanced-active' : 'enhanced-locked');
            itemClone.querySelector('.effect-icon').textContent = isActive ? '⚡' : '🔒';

            const reqRune = RUNES[ee.requiredRune];
            const effectText = itemClone.querySelector('.effect-text');
            effectText.textContent = tEnhanced(rune.id, ee.textIndex);

            const reqEl = document.createElement('div');
            reqEl.className = 'effect-requirement';
            reqEl.textContent = isActive
                ? `✓ ${t('synergyWith')} ${reqRune.name}`
                : `${t('requires')} ${reqRune.name} (${tSub(ee.requiredRune)})`;
            effectText.appendChild(reqEl);
            effectList.appendChild(itemClone);
        });

        effectsGrid.appendChild(cardClone);
    });
}

// ── Render Synergy Matrix ──
function renderSynergyMap(uniqueRunes) {

    // Build synergy lookup: synergies[row][col] = textIndex
    const synergies = {};
    RUNE_IDS.forEach(runeId => {
        synergies[runeId] = {};
        RUNES[runeId].enhanced.forEach(ee => {
            synergies[runeId][ee.requiredRune] = ee.textIndex;
        });
    });

    const tableClone = document.getElementById('synergy-table-template').content.cloneNode(true);

    // Update header cells
    tableClone.querySelectorAll('thead th[data-col]').forEach(th => {
        const colId = th.dataset.col;
        const rune = RUNES[colId];
        const isActive = uniqueRunes.has(colId);
        th.className = 'rune-header ' + (isActive ? 'active' : 'inactive');
        th.textContent = rune.name;
    });

    // Update row headers and data cells
    tableClone.querySelectorAll('tbody tr[data-row]').forEach(tr => {
        const rowId = tr.dataset.row;
        const rowRune = RUNES[rowId];
        const rowActive = uniqueRunes.has(rowId);

        const rowHeader = tr.querySelector('.row-header');
        rowHeader.className = 'row-header ' + (rowActive ? 'active' : 'inactive');
        rowHeader.textContent = rowRune.name;

        tr.querySelectorAll('.synergy-cell[data-cell]').forEach(cell => {
            const parts = cell.dataset.cell.split('_');
            const rId = parts[0], cId = parts[1];
            const textIndex = synergies[rId]?.[cId];
            if (textIndex !== undefined) {
                const cellActive = uniqueRunes.has(rId) && uniqueRunes.has(cId);
                cell.className = 'synergy-cell ' + (cellActive ? 'active' : 'inactive');
                cell.textContent = tEnhanced(rId, textIndex);
            } else {
                cell.className = 'synergy-cell no-synergy';
                cell.textContent = '—';
            }
        });
    });

    synergyMatrix.innerHTML = '';
    synergyMatrix.appendChild(tableClone);
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
