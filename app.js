/* ============================================================
   Karavan OS — Enterprise B2B Distribution Platform prototype
   Single-file client-side demo. All data is simulated in-memory.
   ============================================================ */

/* ---------------- Data layer ---------------- */

const PORTALS = [
  { id:'marketing', label:'Overview', icon:'●' },
  { id:'customer',  label:'Customer Portal', icon:'●' },
  { id:'wizard',    label:'Guided Ordering', icon:'●' },
  { id:'warehouse', label:'Warehouse', icon:'●' },
  { id:'sales',     label:'Sales Rep', icon:'●' },
  { id:'finance',   label:'Finance', icon:'●' },
  { id:'admin',     label:'Admin & Analytics', icon:'●' },
  { id:'dispatch',  label:'Dispatch & Driver', icon:'●' },
];

const CATEGORIES = [
  { id:'beverages', name:'Beverages', icon:'🥤', count:412 },
  { id:'snacks',    name:'Snacks & Confectionery', icon:'🍪', count:286 },
  { id:'medical',   name:'Medical & Pharmacy', icon:'💊', count:154 },
  { id:'cleaning',  name:'Cleaning & Household', icon:'🧼', count:198 },
  { id:'frozen',    name:'Frozen & Cold Chain', icon:'🧊', count:97 },
];

// Each product: base unit is "piece". conv = {pack: piecesPerPack, carton: piecesPerCarton}
const PRODUCTS = [
  { id:'SKU-10231', name:'Coca-Cola Can 350ml', cat:'beverages', icon:'🥤',
    conv:{piece:1, pack:6, carton:24}, price:3.20, tierDiscount:0.08,
    stock:{available:840, reserved:120, incoming:480, eta:'3 days'} },
  { id:'SKU-10245', name:'Sprite PET 500ml', cat:'beverages', icon:'🥤',
    conv:{piece:1, pack:6, carton:24}, price:4.10, tierDiscount:0.08,
    stock:{available:36, reserved:24, incoming:240, eta:'5 days'} },
  { id:'SKU-10298', name:'Malta Guinness 330ml', cat:'beverages', icon:'🍺',
    conv:{piece:1, pack:12, carton:24}, price:5.60, tierDiscount:0.05,
    stock:{available:210, reserved:30, incoming:0, eta:'—'} },
  { id:'SKU-20114', name:'Indomie Chicken Noodles 70g', cat:'snacks', icon:'🍜',
    conv:{piece:1, pack:5, carton:40}, price:2.10, tierDiscount:0.10,
    stock:{available:1520, reserved:200, incoming:800, eta:'2 days'} },
  { id:'SKU-20177', name:'Digestive Biscuits 250g', cat:'snacks', icon:'🍪',
    conv:{piece:1, pack:1, carton:24}, price:6.50, tierDiscount:0.06,
    stock:{available:64, reserved:12, incoming:0, eta:'—'} },
  { id:'SKU-30045', name:'Paracetamol 500mg (100-pack)', cat:'medical', icon:'💊',
    conv:{piece:1, pack:1, carton:20}, price:14.00, tierDiscount:0.04,
    stock:{available:410, reserved:60, incoming:200, eta:'4 days'} },
  { id:'SKU-30089', name:'Hand Sanitizer 500ml', cat:'medical', icon:'🧴',
    conv:{piece:1, pack:12, carton:48}, price:9.75, tierDiscount:0.05,
    stock:{available:18, reserved:6, incoming:96, eta:'6 days'} },
  { id:'SKU-40012', name:'Omo Detergent 1kg', cat:'cleaning', icon:'🧼',
    conv:{piece:1, pack:6, carton:24}, price:22.30, tierDiscount:0.07,
    stock:{available:302, reserved:40, incoming:0, eta:'—'} },
  { id:'SKU-40088', name:'Dettol Antiseptic Soap', cat:'cleaning', icon:'🧴',
    conv:{piece:1, pack:12, carton:72}, price:5.90, tierDiscount:0.06,
    stock:{available:540, reserved:80, incoming:360, eta:'3 days'} },
  { id:'SKU-50021', name:'Frozen Chicken Portions 1kg', cat:'frozen', icon:'🍗',
    conv:{piece:1, pack:1, carton:10}, price:38.00, tierDiscount:0.03,
    stock:{available:0, reserved:0, incoming:150, eta:'2 days'} },
];

const FREQUENT = ['SKU-10231','SKU-20114','SKU-40012'];

const CUSTOMER = {
  name:'Adjei Retail Stores', branch:'Osu Branch', tier:'Gold',
  creditLimit:50000, outstanding:12480, salesRep:'Kojo Mensah',
  branches:[
    {id:'osu', name:'Osu Branch', loc:'Oxford Street, Osu, Accra'},
    {id:'tema', name:'Tema Depot', loc:'Community 4, Tema'},
    {id:'kumasi', name:'Kumasi Outlet', loc:'Adum, Kumasi'},
  ]
};

const ORDER_STAGES = ['Ordered','Allocated','Picked & packed','In transit','Delivered'];
const RECENT_ORDERS = [
  { id:'ORD-88213', date:'24 Jul 2026', items:14, total:4820.50, status:'Delivered', stage:4,
    lines:[{sku:'SKU-10231', qty:96}, {sku:'SKU-40012', qty:36}, {sku:'SKU-20114', qty:120}] },
  { id:'ORD-88190', date:'19 Jul 2026', items:8,  total:2110.00, status:'In Transit', stage:3,
    lines:[{sku:'SKU-10298', qty:48}, {sku:'SKU-40088', qty:60}] },
  { id:'ORD-88155', date:'12 Jul 2026', items:22, total:7640.75, status:'Delivered', stage:4,
    lines:[{sku:'SKU-30045', qty:20}, {sku:'SKU-30089', qty:48}, {sku:'SKU-10245', qty:72}] },
  { id:'ORD-88102', date:'03 Jul 2026', items:5,  total:980.30,  status:'Backordered', stage:1,
    lines:[{sku:'SKU-50021', qty:10}] },
];

const INVOICES = [
  { id:'INV-5521', order:'ORD-88213', due:'07 Aug 2026', amount:4820.50, status:'Outstanding' },
  { id:'INV-5498', order:'ORD-88155', due:'26 Jul 2026', amount:7640.75, status:'Overdue' },
  { id:'INV-5460', order:'ORD-88090', due:'10 Jul 2026', amount:3200.00, status:'Paid' },
];

const LOW_STOCK = PRODUCTS.filter(p => p.stock.available < 50);

const WAREHOUSE_ZONES = [
  { name:'Zone A · Beverages', bins:[92,88,34,95,81,0] },
  { name:'Zone B · Snacks',    bins:[90,85,93,28,77,89] },
  { name:'Zone C · Medical',   bins:[31,0,96,90,22,84] },
  { name:'Zone D · Cleaning',  bins:[88,91,86,94,79,25] },
  { name:'Zone E · Frozen',    bins:[0,0,90,19,82,87] },
];
function binStatus(count){ return count===0 ? 'empty' : count<40 ? 'low' : 'full'; }

const PICK_QUEUE = {
  queued:[
    {id:'ORD-88231', nm:'Adjei Retail — Osu', lines:6},
    {id:'ORD-88229', nm:'Nyame Foods Ltd', lines:14},
  ],
  picking:[
    {id:'ORD-88224', nm:'Blessed Mart', items:[
      {sku:'SKU-10231', name:'Coca-Cola Can 350ml', qty:48, picked:false},
      {sku:'SKU-20114', name:'Indomie Chicken Noodles 70g', qty:120, picked:false},
      {sku:'SKU-40012', name:'Omo Detergent 1kg', qty:24, picked:true},
    ]},
  ],
  packing:[
    {id:'ORD-88219', nm:'Osei & Sons', lines:4},
    {id:'ORD-88217', nm:'Freetown Provisions', lines:11},
  ],
  dispatch:[
    {id:'ORD-88213', nm:'Adjei Retail — Osu', lines:14},
  ]
};

const SALES_CUSTOMERS = [
  { name:'Adjei Retail Stores', last:'2 days ago', balance:12480, risk:'Low', phone:'+233 24 555 0132', email:'kwame@adjeiretail.gh', visits:6, notes:'Prefers Tuesday deliveries. Interested in expanding to a second branch in Tema.' },
  { name:'Nyame Foods Ltd', last:'Today', balance:31200, risk:'Medium', phone:'+233 20 441 8890', email:'ops@nyamefoods.gh', visits:9, notes:'Large volume buyer — negotiate carton-level pricing at next visit.' },
  { name:'Blessed Mart', last:'5 days ago', balance:0, risk:'Low', phone:'+233 27 762 3345', email:'blessedmart@gmail.com', visits:14, notes:'Always pays on time. Good candidate for Gold tier upgrade.' },
  { name:'Freetown Provisions', last:'1 day ago', balance:8600, risk:'Low', phone:'+233 54 220 7761', email:'info@freetownprov.gh', visits:4, notes:'New account — onboarded 6 weeks ago.' },
  { name:'Osei & Sons', last:'11 days ago', balance:44100, risk:'High', phone:'+233 50 118 4423', email:'oseiandsons@yahoo.com', visits:2, notes:'Balance climbing — schedule an in-person collections visit this week.' },
];

const DELIVERIES = [
  { id:'ORD-88213', nm:'Adjei Retail — Osu', addr:'Oxford St, Osu', win:'2:00–4:00 PM', status:'Out for delivery' },
  { id:'ORD-88198', nm:'Freetown Provisions', addr:'Spintex Rd', win:'4:00–6:00 PM', status:'Queued' },
  { id:'ORD-88190', nm:'Blessed Mart', addr:'Dansoman', win:'11:00 AM–1:00 PM', status:'Delivered' },
];

/* ---------------- Roles (RBAC) ---------------- */
const ROLES = {
  admin:     { label:'Admin (Full access)', initials:'KR', portals:['marketing','customer','wizard','warehouse','sales','finance','admin','dispatch'] },
  customer:  { label:'Customer — Adjei Retail', initials:'AR', portals:['marketing','customer','wizard'] },
  sales:     { label:'Sales Rep — Kojo M.', initials:'KM', portals:['marketing','sales','customer'] },
  warehouse: { label:'Warehouse Staff', initials:'WH', portals:['marketing','warehouse','dispatch'] },
  finance:   { label:'Finance Team', initials:'FN', portals:['marketing','finance','admin'] },
};

const NOTIF_SEED = [
  { icon:'⚠️', text:'INV-5498 is overdue by 2 days', time:'2h ago' },
  { icon:'📦', text:'ORD-88190 is in transit — arriving today', time:'4h ago' },
  { icon:'🔔', text:'New negotiated rate card applied to Beverages', time:'1d ago' },
  { icon:'📉', text:'Sprite PET 500ml has dropped below reorder threshold', time:'1d ago' },
];

/* ---------------- State ---------------- */

const state = {
  view: 'marketing',
  pulseStarted:false,
  showRuleForm:false,
  editingRuleIndex:null,
  role: 'admin',
  notifPanelOpen:false,
  ruleDraft:{ tier:'Gold', qtyOp:'>', qtyVal:100, region:'North', discount:12, freeShipping:true, priority:true },
  rules:[
    { tier:'Gold', qtyOp:'>', qtyVal:100, region:'North', discount:12, freeShipping:true, priority:true },
    { tier:'Silver', qtyOp:'>=', qtyVal:50, region:'Any', discount:6, freeShipping:false, priority:false },
    { tier:'Gold', qtyOp:'>', qtyVal:20, region:'Any', discount:8, freeShipping:false, priority:true },
  ],
  notifications: NOTIF_SEED.map((n,i)=>({ id:'n'+i, ...n, read:false })),
  invoiceModal: null,
  cycleCounts: [],
  activeBin: null,
  purchaseOrders: [],
  lastPod: null,
  syncQueued: 3,
  lastSync: '4 minutes ago',
  syncing: false,
  wizard: {
    step: 0, // index into WIZARD_STEPS
    business: { branch:'osu', location:'Oxford Street, Osu, Accra', rep:'Kojo Mensah' },
    category: null,
    product: null,
    uom: 'piece',
    qty: 1,
    validationChoice: null,
    cart: [],
    signed:false,
    poAttached:false,
    orderNum:null,
    creditOverride:false,
  }
};

const FINANCE_INVOICES = [
  { id:'INV-5521', order:'ORD-88213', customer:'Adjei Retail Stores', due:'07 Aug 2026', amount:4820.50, status:'Outstanding' },
  { id:'INV-5498', order:'ORD-88155', customer:'Adjei Retail Stores', due:'26 Jul 2026', amount:7640.75, status:'Overdue' },
  { id:'INV-5502', order:'ORD-88301', customer:'Nyame Foods Ltd', due:'02 Aug 2026', amount:31200,   status:'Outstanding' },
  { id:'INV-5460', order:'ORD-88090', customer:'Blessed Mart', due:'10 Jul 2026', amount:3200,     status:'Paid' },
];

const HSN_CODES = {
  beverages:'2202.10', snacks:'1905.90', medical:'3004.90', cleaning:'3402.20', frozen:'0207.14'
};

const WIZARD_STEPS = [
  { key:'business',  label:'Business & Branch' },
  { key:'category',  label:'Product Category' },
  { key:'products',  label:'Product Selection' },
  { key:'configure', label:'Configure, Convert & Price' },
  { key:'review',    label:'Review Order' },
  { key:'submit',    label:'Sign & Submit' },
  { key:'confirm',   label:'Confirmation' },
];

function money(n){
  return '$' + n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
}
function esc(s){ return String(s); }

/* ---------------- Shell / Router ---------------- */

function renderTabs(){
  const allowed = ROLES[state.role].portals;
  const visible = PORTALS.filter(p=>allowed.includes(p.id));
  const el = document.getElementById('portalTabs');
  el.innerHTML = visible.map(p => `
    <button class="ptab ${state.view===p.id?'active':''}" data-view="${p.id}">${p.label}</button>
  `).join('');
  el.querySelectorAll('.ptab').forEach(btn=>{
    btn.addEventListener('click', ()=> setView(btn.dataset.view));
  });

  const roleSel = document.getElementById('roleSelect');
  if(roleSel){
    roleSel.innerHTML = Object.keys(ROLES).map(id=>`<option value="${id}" ${state.role===id?'selected':''}>${ROLES[id].label}</option>`).join('');
  }
  const avatar = document.getElementById('avatarBadge');
  if(avatar) avatar.textContent = ROLES[state.role].initials;

  renderNotifPanel();
}

function setRole(id){
  state.role = id;
  const allowed = ROLES[id].portals;
  if(!allowed.includes(state.view)){
    setView(allowed[0]);
  } else {
    renderTabs();
  }
  toast('👤', `Switched to ${ROLES[id].label} view — only permitted portals are shown.`);
  persist();
}

function setView(view){
  state.view = view;
  document.getElementById('siteFooter').style.display = view==='marketing' ? 'block':'none';
  renderTabs();
  renderMain();
  window.scrollTo({top:0, behavior:'instant'});
}

function renderMain(){
  const main = document.getElementById('main');
  switch(state.view){
    case 'marketing': main.innerHTML = viewMarketing(); afterMarketing(); break;
    case 'customer':  main.innerHTML = viewCustomer(); break;
    case 'wizard':    main.innerHTML = viewWizard(); afterWizard(); break;
    case 'warehouse': main.innerHTML = viewWarehouse(); break;
    case 'sales':     main.innerHTML = viewSales(); afterSales(); break;
    case 'finance':   main.innerHTML = viewFinance(); afterFinance(); break;
    case 'admin':     main.innerHTML = viewAdmin(); afterAdmin(); break;
    case 'dispatch':  main.innerHTML = viewDispatch(); break;
  }
  persist();
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadPersisted();
  renderTabs();
  renderMain();
  initHeaderScrollBehavior();
});

/* Header shrinks slightly once the page scrolls past a small threshold,
   then stays in that compact state for the rest of the scroll (up or down)
   until the user is back near the very top. */
function initHeaderScrollBehavior(){
  const topbar = document.querySelector('.topbar');
  if(!topbar) return;
  const THRESHOLD = 24;
  let ticking = false;
  function apply(){
    topbar.classList.toggle('compact', window.scrollY > THRESHOLD);
    ticking = false;
  }
  window.addEventListener('scroll', ()=>{
    if(!ticking){
      window.requestAnimationFrame(apply);
      ticking = true;
    }
  }, { passive:true });
  apply();
}

/* ---------------- Marketing / Overview ---------------- */

function viewMarketing(){
  return `
  <section class="hero">
    <div class="wrap hero-inner">
      <div class="eyebrow">● Replacing WhatsApp ordering with an operating system</div>
      <h1>From a WhatsApp thread to<br><em>one order-to-cash pipeline.</em></h1>
      <p class="lead">Karavan OS gives wholesale distributors a single system of record — buyer ordering,
      inventory, warehouse, dispatch, and finance — so nothing is confirmed by phone call again.</p>
      <div class="hero-ctas">
        <button class="btn btn-primary" onclick="setView('wizard')">Start a guided order →</button>
        <button class="btn btn-ghost" style="color:#F4F3EC;border-color:rgba(255,255,255,.25);" onclick="setView('admin')">View admin dashboard</button>
      </div>

      <div class="pulse-rail">
        <div class="pulse-labels" style="margin-bottom:0;">
          <span>ORDER LIFECYCLE — live simulation</span>
          <span id="pulseStatus" class="mono" style="color:#F4F3EC;">Order confirmed</span>
        </div>
        <div class="pulse-track" id="pulseTrack">
          <div class="pulse-fill" id="pulseFill"></div>
          <div class="pulse-node" style="left:2%" data-i="0"></div>
          <div class="pulse-node" style="left:26%" data-i="1"></div>
          <div class="pulse-node" style="left:50%" data-i="2"></div>
          <div class="pulse-node" style="left:74%" data-i="3"></div>
          <div class="pulse-node" style="left:98%" data-i="4"></div>
        </div>
        <div class="pulse-labels">
          <span><b>Ordered</b></span>
          <span><b>Allocated</b></span>
          <span><b>Picked &amp; packed</b></span>
          <span><b>In transit</b></span>
          <span><b>Delivered</b></span>
        </div>
        <div class="pulse-stats">
          <div class="pulse-stat"><div class="num">2,481</div><div class="lbl">Orders processed / mo</div></div>
          <div class="pulse-stat"><div class="num">99.2%</div><div class="lbl">Fulfilment accuracy</div></div>
          <div class="pulse-stat"><div class="num">6</div><div class="lbl">Portals in one platform</div></div>
          <div class="pulse-stat"><div class="num">3</div><div class="lbl">Warehouses connected</div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="eco-section">
    <div class="wrap">
      <div class="section-title">One platform, every role</div>
      <p class="section-sub">Instead of a website, an app, and an admin panel — a connected ecosystem, each surface built for the person using it.</p>
      <div class="eco-grid">
        ${ecoCard('🛒','Customer Portal','Guided ordering, invoices, credit balance and reorder favourites.','customer')}
        ${ecoCard('🧭','Guided Ordering','A 7-step wizard that converts units, checks live stock and prices in real time.','wizard')}
        ${ecoCard('📦','Warehouse Portal','Zone/aisle/bin visual map, pick–pack–dispatch Kanban and cycle counts.','warehouse')}
        ${ecoCard('🧑‍💼','Sales Rep Portal','Assigned accounts, targets, commissions and collections in one view.','sales')}
        ${ecoCard('💳','Finance Portal','GST-ready invoicing, credit notes, aging and Tally-style reconciliation.','finance')}
        ${ecoCard('📊','Admin &amp; Analytics','Real-time KPIs, demand forecasting and warehouse efficiency.','admin')}
        ${ecoCard('🚚','Dispatch Portal','Driver assignment, delivery windows, POD and OTP verification.','dispatch')}
        ${ecoCard('🔌','Integration Layer','Two-way sync to Tally, SAP, QuickBooks, Zoho — with offline queueing.','admin')}
      </div>
    </div>
  </section>

  <section style="background:var(--paper-2);padding:56px 0;">
    <div class="wrap">
      <div class="section-title">Built from the clarification board, not around it</div>
      <p class="section-sub">Every open question buyers asked before bidding became a real, working feature.</p>
      <div class="qb-grid">
        ${qbCard('Ramiz T. asked','How many SKUs and customers should it handle?','Catalog architecture supports millions of SKUs across a 7-level hierarchy — department → category → sub-category → brand → product → variant → SKU.')}
        ${qbCard('Prateek P. asked','How do we keep Tally and the platform in sync without duplicate transactions?','A conflict-aware sync queue versions every change; if Tally is offline, transactions queue, log, and reconcile automatically once it reconnects.')}
        ${qbCard('Prateek P. asked','Should inventory support a hybrid state before the warehouse is fully digitised?','Stock is tracked as available, reserved, committed, in-transit, backordered, damaged and unknown — so ordering never blocks on partial digitisation.')}
        ${qbCard('Prateek P. asked','Should product rules be configurable without code changes?','A no-code metadata &amp; pricing rule engine lets ops teams add attributes, conversions, and discount tiers visually — no developer required.')}
      </div>
    </div>
  </section>
  `;
}

function ecoCard(icon,title,desc,target){
  return `<button class="eco-card" style="text-align:left;width:100%;" onclick="setView('${target}')">
    <div class="ic">${icon}</div><h4>${title}</h4><p>${desc}</p>
  </button>`;
}
function qbCard(q,title,desc){
  return `<div class="qb-card"><div class="q">${q}</div><h4>“${title}”</h4><p>${desc}</p></div>`;
}

function afterMarketing(){
  if(state.pulseStarted) { setPulse(4); return; }
  state.pulseStarted = true;
  let i = 0;
  setPulse(0);
  const seq = [
    {i:0, pct:2,  label:'Order confirmed'},
    {i:1, pct:26, label:'Inventory allocated'},
    {i:2, pct:50, label:'Picked & packed'},
    {i:3, pct:74, label:'In transit'},
    {i:4, pct:98, label:'Delivered'},
  ];
  let step = 0;
  function tick(){
    if(state.view !== 'marketing') return;
    const s = seq[step];
    setPulse(s.i, s.pct, s.label);
    step = (step+1) % seq.length;
    setTimeout(tick, 1600);
  }
  setTimeout(tick, 300);
}
function setPulse(idx, pct, label){
  const fill = document.getElementById('pulseFill');
  const status = document.getElementById('pulseStatus');
  if(!fill) return;
  fill.style.width = (pct!==undefined?pct:idx*24) + '%';
  document.querySelectorAll('.pulse-node').forEach(n=>{
    n.classList.toggle('lit', Number(n.dataset.i) <= idx);
  });
  if(status && label) status.textContent = label;
}

/* ---------------- Customer Portal ---------------- */

function viewCustomer(){
  const available = CUSTOMER.creditLimit - CUSTOMER.outstanding;
  const cartCount = state.wizard.cart.length;
  return `
  <div class="dash-header">
    <div class="wrap flex-between">
      <div>
        <div class="section-title">${CUSTOMER.name} <span style="color:var(--muted);font-weight:400;font-size:15px;">— ${CUSTOMER.branch}</span></div>
        <p class="section-sub" style="margin-bottom:0;">Tier <b style="color:var(--orange);">${CUSTOMER.tier}</b> · Sales rep ${CUSTOMER.salesRep} · Member since 2019</p>
      </div>
      <button class="btn btn-primary" onclick="setView('wizard')">+ New guided order${cartCount?` (${cartCount} in progress)`:''}</button>
    </div>
  </div>

  <div class="dash-body wrap">
    <div class="grid kpi-row">
      <div class="card kpi-clickable" onclick="openCreditDetail()">
        <div class="card-title">Credit available</div>
        <div class="kpi-value">${money(available)}</div>
        <div class="kpi-delta up">of ${money(CUSTOMER.creditLimit)} limit →</div>
      </div>
      <div class="card kpi-clickable" onclick="document.getElementById('invoicesCard').scrollIntoView({behavior:'smooth',block:'center'})">
        <div class="card-title">Outstanding balance</div>
        <div class="kpi-value">${money(CUSTOMER.outstanding)}</div>
        <div class="kpi-delta down">${INVOICES.filter(i=>i.status!=='Paid').length} invoices due →</div>
      </div>
      <div class="card kpi-clickable" onclick="document.getElementById('recentOrdersCard').scrollIntoView({behavior:'smooth',block:'center'})">
        <div class="card-title">Orders this month</div>
        <div class="kpi-value">14</div>
        <div class="kpi-delta up">+3 vs last month →</div>
      </div>
      <div class="card kpi-clickable" onclick="setView('dispatch')">
        <div class="card-title">Pending deliveries</div>
        <div class="kpi-value">2</div>
        <div class="kpi-delta">Next: today 2–4 PM →</div>
      </div>
    </div>

    <div class="grid two-col">
      <div class="card" id="recentOrdersCard">
        <div class="flex-between" style="margin-bottom:10px;">
          <div class="card-title" style="margin:0;">Recent orders</div>
          <div style="display:flex;gap:12px;align-items:center;">
            <button class="btn btn-ghost btn-sm" onclick="exportOrdersCSV()">⬇ Export CSV</button>
            <a href="#" onclick="toast('📋','Showing all 14 orders would open a paginated order history in production.');return false;" style="font-size:12.5px;color:var(--orange);font-weight:600;">View all</a>
          </div>
        </div>
        <table>
          <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            ${RECENT_ORDERS.map(o=>`
              <tr>
                <td class="mono"><a href="#" onclick="openOrderDetail('${o.id}');return false;" style="color:var(--orange);font-weight:600;">${o.id}</a></td>
                <td>${o.date}</td>
                <td>${o.items}</td>
                <td>${money(o.total)}</td>
                <td>${statusBadge(o.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="grid" style="gap:16px;">
        <div class="card">
          <div class="card-title">Favourite &amp; frequently ordered</div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
            ${FREQUENT.map(id=>{
              const p = PRODUCTS.find(x=>x.id===id);
              const inCart = w().cart.some(c=>c.product.id===id);
              return `<div class="list-row">
                <span>${p.icon} ${p.name}</span>
                <button class="btn ${inCart?'btn-ghost':'btn-dark'} btn-sm" style="padding:4px 10px;font-size:11.5px;" onclick="quickAddToCart('${id}',6)">${inCart?'✓ In order':'+ Quick add'}</button>
              </div>`;
            }).join('')}
          </div>
          <button class="btn btn-ghost btn-sm" style="margin-top:12px;width:100%;justify-content:center;" onclick="setView('wizard')">Open guided ordering</button>
        </div>
        <div class="card">
          <div class="card-title">Recommended for you</div>
          <p style="font-size:12.5px;color:var(--muted);margin:6px 0 10px;">Based on your order history and current promotions.</p>
          ${renderRecommendation('SKU-40088','Bundle deal')}
          ${renderRecommendation('SKU-10298','In stock')}
        </div>
      </div>
    </div>

    <div class="grid two-col" style="margin-top:16px;">
      <div class="card" id="invoicesCard">
        <div class="card-title">Invoices</div>
        <table>
          <thead><tr><th>Invoice</th><th>Order</th><th>Due</th><th>Amount</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${INVOICES.map(i=>`
              <tr>
                <td class="mono">${i.id}</td>
                <td class="mono" style="color:var(--muted);">${i.order}</td>
                <td>${i.due}</td>
                <td>${money(i.amount)}</td>
                <td>${statusBadge(i.status)}</td>
                <td><a href="#" onclick='openInvoiceFromRecord(${JSON.stringify(i)});return false;' style="font-size:12px;color:var(--orange);font-weight:600;">View</a></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Alerts</div>
        <div class="list-row" style="cursor:pointer;" onclick='openInvoiceFromRecord(${JSON.stringify(INVOICES.find(i=>i.id==="INV-5498"))});'><span>⚠️ INV-5498 is overdue by 2 days →</span></div>
        <div class="list-row" style="cursor:pointer;" onclick="setView('dispatch')"><span>📦 ORD-88190 is in transit — arriving today →</span></div>
        <div class="list-row" style="cursor:pointer;" onclick="setView('admin');setTimeout(()=>document.getElementById('ruleBuilderSection')?.scrollIntoView({behavior:'smooth'}),150);"><span>🔔 New negotiated rate card applied to Beverages →</span></div>
      </div>
    </div>
  </div>
  `;
}
function renderRecommendation(sku, tag){
  const p = PRODUCTS.find(x=>x.id===sku);
  const inCart = w().cart.some(c=>c.product.id===sku);
  return `<div class="list-row">
    <span>${p.icon} ${p.name}</span>
    <div style="display:flex;align-items:center;gap:8px;">
      <span class="badge ${tag==='Bundle deal'?'amber':'green'}">${tag}</span>
      <button class="btn ${inCart?'btn-ghost':'btn-dark'} btn-sm" style="padding:4px 10px;font-size:11.5px;" onclick="quickAddToCart('${sku}',6)">${inCart?'✓':'+'}</button>
    </div>
  </div>`;
}
function openCreditDetail(){
  const available = CUSTOMER.creditLimit - CUSTOMER.outstanding;
  const pct = Math.round((CUSTOMER.outstanding/CUSTOMER.creditLimit)*100);
  const body = document.getElementById('invoiceModalBody');
  body.innerHTML = `
    <div style="padding:28px 30px;">
      <h3 style="font-family:var(--display);margin:0 0 4px;">Credit position</h3>
      <p style="color:#666;font-size:12.5px;margin:0 0 20px;">${CUSTOMER.name} — ${CUSTOMER.tier} tier</p>
      <div style="background:#F2F1EA;border-radius:8px;height:10px;overflow:hidden;margin-bottom:8px;">
        <div style="background:${pct>80?'#C6432F':pct>60?'#E8A93A':'#0F7C68'};height:100%;width:${Math.min(100,pct)}%;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11.5px;color:#777;margin-bottom:22px;">
        <span>${pct}% utilised</span><span>${money(CUSTOMER.creditLimit)} limit</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;">
        <div style="display:flex;justify-content:space-between;"><span>Credit limit</span><b>${money(CUSTOMER.creditLimit)}</b></div>
        <div style="display:flex;justify-content:space-between;"><span>Outstanding balance</span><b>${money(CUSTOMER.outstanding)}</b></div>
        <div style="display:flex;justify-content:space-between;border-top:1px solid #DDD;padding-top:10px;"><span>Available to spend</span><b style="color:#0F7C68;">${money(available)}</b></div>
      </div>
      <p style="font-size:12px;color:#777;margin-top:20px;">Orders that would push your balance past the limit are placed on hold until ${CUSTOMER.salesRep} approves an override.</p>
    </div>
    <div class="invoice-actions">
      <button class="btn btn-ghost" onclick="closeInvoice()">Close</button>
      <button class="btn btn-primary" onclick="requestCreditIncrease()">Request credit increase</button>
    </div>
  `;
  document.getElementById('invoiceOverlay').style.display = 'flex';
}
function requestCreditIncrease(){
  closeInvoice();
  addNotification('💳', `Credit increase request sent to ${CUSTOMER.salesRep} for review`);
  toast('💳', `Credit increase request sent to ${CUSTOMER.salesRep}`);
}

function statusBadge(status){
  const map = {
    'Delivered':'green','In Transit':'amber','Backordered':'red',
    'Outstanding':'amber','Overdue':'red','Paid':'green'
  };
  return `<span class="badge ${map[status]||'grey'}">${status}</span>`;
}

/* ---------------- Guided Ordering Wizard ---------------- */

const TAX_RATE = 0.15;   // GST-equivalent
const DELIVERY_FEE = 50;

function w(){ return state.wizard; }

function stepIndex(key){ return WIZARD_STEPS.findIndex(s=>s.key===key); }
function goStep(key){ w().step = stepIndex(key); renderMain(); afterWizard(); }

function viewWizard(){
  const cur = WIZARD_STEPS[w().step];
  return `
  <div class="wizard-shell">
    <div class="wizard-rail">
      <h4>Order steps</h4>
      ${WIZARD_STEPS.map((s,i)=>{
        const cls = i < w().step ? 'done' : (i===w().step ? 'current':'');
        return `<div class="wstep ${cls}"><div class="num">${i<w().step?'✓':i+1}</div>${s.label}</div>`;
      }).join('')}
      <div style="margin-top:24px;padding-top:18px;border-top:1px solid rgba(255,255,255,.1);font-size:11.5px;color:#8B968F;">
        Cart total: <b class="mono" style="color:#F4F3EC;">${money(cartSubtotal())}</b><br>
        ${w().cart.length} item(s) added
      </div>
    </div>
    <div class="wizard-main">
      <div class="wrap" style="padding:0;max-width:720px;margin:0;">
        ${renderWizardStep(cur.key)}
      </div>
    </div>
    <div class="wizard-side">
      ${renderCartMini()}
    </div>
  </div>
  `;
}

function renderCartMini(){
  if(w().cart.length===0){
    return `<div class="cart-mini"><h4>Order so far</h4><p style="font-size:12.5px;color:var(--muted);">No items added yet. Configure a product to add your first line.</p></div>`;
  }
  return `<div class="cart-mini"><h4>Order so far (${w().cart.length})</h4>
    ${w().cart.map((c,idx)=>`
      <div class="cart-item">
        <div><div class="nm">${c.product.icon} ${c.product.name}</div><div class="sub">${c.qty} × ${c.uom} · ${c.pieces} pcs</div></div>
        <div style="text-align:right;">
          <div>${money(c.afterDiscount)}</div>
          ${w().step < stepIndex('submit') ? `<a href="#" onclick="removeCartItem(${idx});return false;" style="font-size:11px;color:var(--red);">remove</a>` : ''}
        </div>
      </div>
    `).join('')}
    <div style="margin-top:12px;padding-top:12px;border-top:1px solid #D2CEC1;font-size:13px;font-weight:600;display:flex;justify-content:space-between;">
      <span>Subtotal</span><span>${money(cartSubtotal())}</span>
    </div>
  </div>`;
}

function cartSubtotal(){ return w().cart.reduce((s,c)=>s+c.afterDiscount,0); }

function renderWizardStep(key){
  switch(key){
    case 'business':  return stepBusiness();
    case 'category':  return stepCategory();
    case 'products':  return stepProducts();
    case 'configure': return stepConfigure();
    case 'review':    return stepReview();
    case 'submit':    return stepSubmit();
    case 'confirm':   return stepConfirm();
  }
}

/* Step: Business */
function stepBusiness(){
  const b = w().business;
  return `
  <div class="step-eyebrow">Step 1 of 7</div>
  <div class="step-title">Which branch is this order for?</div>
  <p class="step-hint">Multi-branch and multi-user accounts select their buying branch, delivery location and confirm the assigned sales representative before browsing the catalog.</p>

  <div class="field">
    <label>Business branch</label>
    <select id="branchSelect" onchange="onBranchChange(this.value)">
      ${CUSTOMER.branches.map(br=>`<option value="${br.id}" ${b.branch===br.id?'selected':''}>${br.name}</option>`).join('')}
    </select>
  </div>
  <div class="field">
    <label>Delivery location</label>
    <input type="text" value="${b.location}" readonly>
  </div>
  <div class="field">
    <label>Assigned sales representative</label>
    <input type="text" value="${b.rep}" readonly>
  </div>

  <div class="wizard-nav">
    <span></span>
    <button class="btn btn-primary" onclick="goStep('category')">Continue to catalog →</button>
  </div>
  `;
}
function onBranchChange(id){
  const br = CUSTOMER.branches.find(x=>x.id===id);
  w().business.branch = id;
  w().business.location = br.loc;
  renderMain(); afterWizard();
}

/* Step: Category */
function stepCategory(){
  return `
  <div class="step-eyebrow">Step 2 of 7</div>
  <div class="step-title">Select a product category</div>
  <p class="step-hint">Karavan OS's catalog is built for millions of SKUs across a full department → category → brand → SKU hierarchy. This demo catalog spans five categories.</p>
  <div class="choice-grid">
    ${CATEGORIES.map(c=>`
      <button class="choice-card ${w().category===c.id?'selected':''}" onclick="selectCategory('${c.id}')">
        <div class="ic">${c.icon}</div>
        <h5>${c.name}</h5>
        <p>${c.count} SKUs</p>
      </button>
    `).join('')}
  </div>
  <div class="wizard-nav">
    <button class="btn btn-ghost" onclick="goStep('business')">← Back</button>
    ${w().cart.length>0 ? `<button class="btn btn-dark" onclick="goStep('review')">Proceed to review (${w().cart.length}) →</button>` : '<span></span>'}
  </div>
  `;
}
function selectCategory(id){
  w().category = id;
  goStep('products');
}

/* Step: Products */
function stepProducts(){
  const cat = CATEGORIES.find(c=>c.id===w().category);
  const list = PRODUCTS.filter(p=>p.cat===w().category);
  return `
  <div class="step-eyebrow">Step 3 of 7</div>
  <div class="step-title">${cat.icon} ${cat.name}</div>
  <p class="step-hint">Search, scan a barcode, or pick from frequently and recently ordered items. Selecting a product opens its configuration, unit conversion and live pricing.</p>
  <div class="product-search">
    <span class="si">🔍</span>
    <input type="text" placeholder="Search by name or SKU…" oninput="filterProducts(this.value)">
  </div>
  <div class="product-list" id="productList">
    ${list.map(p=>productRow(p)).join('')}
  </div>
  <div class="wizard-nav">
    <button class="btn btn-ghost" onclick="goStep('category')">← Back to categories</button>
    ${w().cart.length>0 ? `<button class="btn btn-dark" onclick="goStep('review')">Proceed to review (${w().cart.length}) →</button>` : '<span></span>'}
  </div>
  `;
}
function productRow(p){
  const stockPct = Math.min(100, Math.round((p.stock.available/600)*100));
  let tag, tagClass;
  if(p.stock.available===0){ tag='Out of stock'; tagClass='red'; }
  else if(p.stock.available<50){ tag='Low stock'; tagClass='amber'; }
  else{ tag='In stock'; tagClass='green'; }
  return `
  <button class="prow" style="width:100%;text-align:left;" onclick="selectProduct('${p.id}')">
    <div class="pic">${p.icon}</div>
    <div class="pinfo">
      <h5>${p.name}${FREQUENT.includes(p.id)?' <span class="badge grey" style="margin-left:4px;">Frequent</span>':''}</h5>
      <div class="meta">${p.id} · ${money(p.price)} / piece</div>
    </div>
    <span class="badge ${tagClass} stock-tag">${tag}</span>
  </button>`;
}
function filterProducts(term){
  const list = PRODUCTS.filter(p=>p.cat===w().category && (p.name.toLowerCase().includes(term.toLowerCase()) || p.id.toLowerCase().includes(term.toLowerCase())));
  document.getElementById('productList').innerHTML = list.map(p=>productRow(p)).join('') || `<p style="color:var(--muted);font-size:13px;">No products match “${term}”.</p>`;
}
function selectProduct(id){
  w().product = PRODUCTS.find(p=>p.id===id);
  w().uom = 'piece';
  w().qty = w().product.conv.piece===1 && w().product.conv.pack>1 ? 1 : 1;
  w().validationChoice = null;
  goStep('configure');
}

/* Step: Configure, Convert & Price */
function stepConfigure(){
  const p = w().product;
  const uoms = Object.keys(p.conv); // piece, pack, carton
  const pieces = w().qty * p.conv[w().uom];
  const available = p.stock.available;
  const short = Math.max(0, pieces - available);
  const pct = Math.min(100, Math.round((pieces/Math.max(available,1))*100));

  const segs = 10;
  const filledSegs = available>0 ? Math.round((Math.min(pieces,available)/available)*segs) : 0;

  let validationHtml;
  if(short>0){
    const opt = w().validationChoice;
    validationHtml = `
    <div class="validation-box">
      <h5>⚠️ Only ${available} pieces available — you ordered ${pieces}</h5>
      <p>You're ${short} piece(s) short of the requested quantity. Choose how Karavan OS should handle the shortfall — this decision is logged against the order and visible to your sales rep.</p>
      <div class="vopt">
        <button class="${opt==='backorder'?'chosen':''}" onclick="chooseValidation('backorder')">Backorder ${short}</button>
        <button class="${opt==='substitute'?'chosen':''}" onclick="chooseValidation('substitute')">Substitute similar product</button>
        <button class="${opt==='split'?'chosen':''}" onclick="chooseValidation('split')">Split shipment</button>
        <button class="${opt==='notify'?'chosen':''}" onclick="chooseValidation('notify')">Notify ${CUSTOMER.salesRep}</button>
      </div>
    </div>`;
  } else {
    validationHtml = `
    <div class="validation-box ok">
      <h5>✅ In stock — ready to allocate</h5>
      <p>${available} pieces available at ${p.stock.eta==='—'?'this warehouse':'this warehouse, with '+p.stock.eta+' incoming'}. This quantity will be reserved immediately on add.</p>
    </div>`;
  }

  const canAdd = short===0 || !!w().validationChoice;
  const price = computeLine(p, w().uom, w().qty);

  return `
  <div class="step-eyebrow">Step 4 of 7</div>
  <div class="step-title">${p.icon} ${p.name}</div>
  <p class="step-hint mono" style="font-family:var(--mono);">${p.id} · base unit: piece</p>

  <div class="field" style="margin-top:20px;">
    <label>Unit of measure</label>
    <div class="uom-row">
      ${uoms.map(u=>`
        <button class="uom-btn ${w().uom===u?'selected':''}" onclick="setUom('${u}')">
          <div class="qty">${p.conv[u]}</div>
          <div class="unit">${u}${p.conv[u]>1?' = '+p.conv[u]+' pcs':''}</div>
        </button>
      `).join('<div class="conv-arrow">→</div>')}
    </div>
  </div>

  <div class="field">
    <label>Quantity (in ${w().uom}s)</label>
    <div class="stepper">
      <button onclick="changeQty(-1)">−</button>
      <input type="number" min="1" value="${w().qty}" oninput="setQty(this.value)">
      <button onclick="changeQty(1)">+</button>
    </div>
    <p style="font-size:12px;color:var(--muted);margin-top:8px;">= <b>${pieces}</b> pieces total</p>
  </div>

  <div class="inv-meter">
    ${Array.from({length:segs}).map((_,i)=>`<div class="seg ${i<filledSegs?(short>0?'warn':'on'):''}"></div>`).join('')}
  </div>

  ${validationHtml}

  <div class="price-table" style="margin-top:22px;">
    <div class="price-row"><span>${pieces} pcs × ${money(p.price)}</span><span>${money(price.lineSubtotal)}</span></div>
    <div class="price-row"><span>${CUSTOMER.tier} tier discount (${Math.round(p.tierDiscount*100)}%)</span><span class="neg">− ${money(price.discountAmt)}</span></div>
    <div class="price-row total"><span>Line total</span><span>${money(price.afterDiscount)}</span></div>
  </div>
  <p style="font-size:11.5px;color:var(--muted);margin-top:8px;">GST and delivery are calculated once at order review.</p>

  <div class="wizard-nav">
    <button class="btn btn-ghost" onclick="goStep('products')">← Back to products</button>
    <button class="btn btn-primary" ${canAdd?'':'disabled'} onclick="addToCart()">Add to order →</button>
  </div>
  `;
}

function computeLine(p, uom, qty){
  const pieces = qty * p.conv[uom];
  const lineSubtotal = pieces * p.price;
  const discountAmt = lineSubtotal * p.tierDiscount;
  return { pieces, lineSubtotal, discountAmt, afterDiscount: lineSubtotal - discountAmt };
}

function setUom(u){ w().uom = u; w().qty = 1; w().validationChoice=null; renderMain(); afterWizard(); }
function setQty(v){ w().qty = Math.max(1, parseInt(v)||1); w().validationChoice=null; renderMain(); afterWizard(); }
function changeQty(d){ w().qty = Math.max(1, w().qty + d); w().validationChoice=null; renderMain(); afterWizard(); }
function chooseValidation(opt){ w().validationChoice = opt; renderMain(); afterWizard(); }

function addLineToCart(product, uom, qty, validationChoice){
  const price = computeLine(product, uom, qty);
  state.wizard.cart.push({
    product, uom, qty, pieces:price.pieces,
    lineSubtotal:price.lineSubtotal, discountAmt:price.discountAmt, afterDiscount:price.afterDiscount,
    validationChoice: validationChoice || null
  });
}
function addToCart(){
  const p = w().product;
  addLineToCart(p, w().uom, w().qty, w().validationChoice);
  w().product = null; w().validationChoice = null;
  goStep('category');
}
function removeCartItem(idx){ w().cart.splice(idx,1); renderMain(); afterWizard(); }

/* Quick-add from Customer Portal favourites / recommendations — skips the wizard for known items */
function quickAddToCart(productId, qty){
  const p = PRODUCTS.find(x=>x.id===productId);
  if(!p) return;
  const already = w().cart.find(c=>c.product.id===productId && c.uom==='piece');
  if(already){
    toast('ℹ️', `${p.name} is already in your order — opening guided order to adjust it.`);
    setView('wizard'); goStep('review');
    return;
  }
  addLineToCart(p, 'piece', qty || 6, null);
  toast('🛒', `Added ${qty||6} × ${p.name} to your order`);
  renderMain();
}

/* Step: Review */
function stepReview(){
  if(w().cart.length===0){
    return `
    <div class="step-eyebrow">Step 5 of 7</div>
    <div class="step-title">Your order is empty</div>
    <p class="step-hint">Add at least one product before reviewing your order.</p>
    <div class="wizard-nav"><button class="btn btn-primary" onclick="goStep('category')">Browse catalog →</button><span></span></div>
    `;
  }
  const subtotal = cartSubtotal();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_FEE;
  const b = w().business;
  const branch = CUSTOMER.branches.find(x=>x.id===b.branch);

  return `
  <div class="step-eyebrow">Step 5 of 7</div>
  <div class="step-title">Review your order</div>
  <p class="step-hint">Everything summarized before you sign and submit. Remove or adjust anything that isn't right.</p>

  <div class="review-block">
    <h5>Items (${w().cart.length})</h5>
    <table>
      <thead><tr><th>Product</th><th>Qty</th><th>Pieces</th><th>Note</th><th>Total</th><th></th></tr></thead>
      <tbody>
        ${w().cart.map((c,idx)=>`
          <tr>
            <td>${c.product.icon} ${c.product.name}</td>
            <td>${c.qty} ${c.uom}${c.qty>1?'s':''}</td>
            <td class="mono">${c.pieces}</td>
            <td>${c.validationChoice ? `<span class="badge amber">${validationLabel(c.validationChoice)}</span>` : '<span class="badge green">Full stock</span>'}</td>
            <td>${money(c.afterDiscount)}</td>
            <td><a href="#" onclick="removeCartItem(${idx});goStep('review');return false;" style="color:var(--red);font-size:12px;">remove</a></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div class="review-block">
    <h5>Delivery</h5>
    <div class="list-row"><span>Branch</span><span>${branch.name}</span></div>
    <div class="list-row"><span>Delivery location</span><span>${b.location}</span></div>
    <div class="list-row"><span>Sales representative</span><span>${b.rep}</span></div>
  </div>

  <div class="price-table">
    <div class="price-row"><span>Items subtotal</span><span>${money(subtotal)}</span></div>
    <div class="price-row"><span>GST (${Math.round(TAX_RATE*100)}%)</span><span>${money(tax)}</span></div>
    <div class="price-row"><span>Delivery</span><span>${money(DELIVERY_FEE)}</span></div>
    <div class="price-row total"><span>Order total</span><span>${money(total)}</span></div>
  </div>

  <div class="wizard-nav">
    <button class="btn btn-ghost" onclick="goStep('category')">← Add more items</button>
    <button class="btn btn-primary" onclick="goStep('submit')">Continue to sign &amp; submit →</button>
  </div>
  `;
}
function validationLabel(k){
  return {backorder:'Partial backorder', substitute:'Substitution requested', split:'Split shipment', notify:'Rep notified'}[k] || k;
}

/* Step: Submit */
function stepSubmit(){
  const subtotal = cartSubtotal();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_FEE;
  const projectedBalance = CUSTOMER.outstanding + total;
  const overLimit = projectedBalance > CUSTOMER.creditLimit;
  const blocked = overLimit && !w().creditOverride;

  return `
  <div class="step-eyebrow">Step 6 of 7</div>
  <div class="step-title">Sign &amp; submit</div>
  <p class="step-hint">A digital signature and optional purchase order attachment close out the order — matching how your team already confirms orders on paper.</p>

  ${overLimit ? `
    <div class="credit-hold">
      <h5>🚫 Credit hold — order exceeds available limit</h5>
      <p>This order would bring your balance to ${money(projectedBalance)}, against a ${money(CUSTOMER.creditLimit)} limit
      (${money(CUSTOMER.creditLimit - CUSTOMER.outstanding)} currently available). Orders on hold can't be submitted without sales rep approval.</p>
      ${w().creditOverride
        ? `<span class="badge green">✓ Approved by ${CUSTOMER.salesRep}</span>`
        : `<button class="btn btn-dark btn-sm" onclick="requestCreditOverride()">Request approval from ${CUSTOMER.salesRep}</button>`}
    </div>
  ` : ''}

  <div class="review-block" style="margin-top:18px;">
    <h5>Digital signature</h5>
    <div class="sig-pad ${w().signed?'signed':''}" onclick="toggleSign()">
      ${w().signed ? 'Kwame Adjei' : 'Click to sign on behalf of ' + CUSTOMER.name}
    </div>
    <p style="font-size:11.5px;color:var(--muted);margin-top:8px;">${w().signed ? '✓ Signed ' + new Date().toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) : 'Tap the box above to sign.'}</p>
  </div>

  <div class="review-block">
    <h5>Purchase order (optional)</h5>
    ${w().poAttached ? `
      <div class="upload-row">📎 PO-2026-0417.pdf attached <a href="#" onclick="w().poAttached=false;renderMain();afterWizard();return false;" style="margin-left:auto;color:var(--red);font-size:12px;">remove</a></div>
    ` : `
      <button class="btn btn-ghost btn-sm" onclick="attachPO()">+ Attach purchase order / supporting document</button>
    `}
  </div>

  <div class="wizard-nav">
    <button class="btn btn-ghost" onclick="goStep('review')">← Back to review</button>
    <button class="btn btn-primary" ${(w().signed && !blocked)?'':'disabled'} onclick="submitOrder()">Submit order →</button>
  </div>
  `;
}
function requestCreditOverride(){
  toast('⏳', `Requesting approval from ${CUSTOMER.salesRep}…`);
  setTimeout(()=>{
    w().creditOverride = true;
    addNotification('✅', `${CUSTOMER.salesRep} approved a credit hold override for your order`);
    toast('✅', `${CUSTOMER.salesRep} approved the credit hold — you can now submit.`);
    renderMain(); afterWizard();
  }, 1100);
}
function toggleSign(){ w().signed = !w().signed; renderMain(); afterWizard(); }
function attachPO(){ w().poAttached = true; renderMain(); afterWizard(); }

function submitOrder(){
  w().orderNum = 'ORD-' + Math.floor(80000 + Math.random()*9999);
  addNotification('📦', `Order ${w().orderNum} confirmed and inventory reserved`);
  persist();
  goStep('confirm');
}

/* Step: Confirmation */
function stepConfirm(){
  const subtotal = cartSubtotal();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + DELIVERY_FEE;
  const eta = new Date(Date.now() + 3*86400000).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
  return `
  <div class="confirm-hero">
    <div class="confirm-check">✓</div>
    <h2 style="font-family:var(--display);margin:0 0 6px;">Order confirmed</h2>
    <p style="color:var(--muted);margin:0;">Your order has been submitted and inventory reserved.</p>
    <div class="order-num">${w().orderNum}</div>
  </div>

  <div class="review-block">
    <h5>Summary</h5>
    <div class="list-row"><span>Items</span><span>${w().cart.length}</span></div>
    <div class="list-row"><span>Expected delivery</span><span>${eta}</span></div>
    <div class="list-row"><span>Delivery window</span><span>2:00 – 4:00 PM</span></div>
    <div class="list-row"><span>Order total</span><span><b>${money(total)}</b></span></div>
  </div>

  <div class="wizard-nav">
    <button class="btn btn-ghost" onclick="setView('dispatch')">Track order →</button>
    <div style="display:flex;gap:10px;">
      <button class="btn btn-ghost" onclick="openInvoiceFromCart('${w().orderNum}', w().cart, ${subtotal}, ${tax}, ${DELIVERY_FEE}, ${total})">View / print invoice</button>
      <button class="btn btn-primary" onclick="resetWizard()">Start new order</button>
    </div>
  </div>
  `;
}
function resetWizard(){
  state.wizard = {
    step:0, business:{ branch:'osu', location:'Oxford Street, Osu, Accra', rep:'Kojo Mensah' },
    category:null, product:null, uom:'piece', qty:1, validationChoice:null,
    cart:[], signed:false, poAttached:false, orderNum:null, creditOverride:false
  };
  persist();
  renderMain(); afterWizard();
}

function afterWizard(){ /* placeholder for future chart/animation hooks in the wizard */ }

/* ---------------- Warehouse Portal ---------------- */

function viewWarehouse(){
  return `
  <div class="dash-header">
    <div class="wrap">
      <div class="section-title">Warehouse Portal</div>
      <p class="section-sub" style="margin-bottom:0;">Tema Central Warehouse · 3 floors · Bin-level accuracy 98.4%</p>
    </div>
  </div>
  <div class="dash-body wrap">
    <div class="grid kpi-row">
      <div class="card"><div class="card-title">Orders in queue</div><div class="kpi-value">${PICK_QUEUE.queued.length}</div></div>
      <div class="card"><div class="card-title">Being picked</div><div class="kpi-value">${PICK_QUEUE.picking.length}</div></div>
      <div class="card"><div class="card-title">Packed, awaiting dispatch</div><div class="kpi-value">${PICK_QUEUE.packing.length}</div></div>
      <div class="card"><div class="card-title">Inventory accuracy</div><div class="kpi-value">98.4%</div><div class="kpi-delta up">+0.6 pts this month</div></div>
    </div>

    <div class="card" style="margin-bottom:16px;">
      <div class="flex-between" style="margin-bottom:10px;">
        <div class="card-title" style="margin:0;">Warehouse map — bin status by zone</div>
        <div style="display:flex;gap:14px;font-size:11.5px;color:var(--muted);">
          <span><span style="display:inline-block;width:8px;height:8px;background:var(--teal);border-radius:2px;"></span> Full</span>
          <span><span style="display:inline-block;width:8px;height:8px;background:var(--amber);border-radius:2px;"></span> Low</span>
          <span><span style="display:inline-block;width:8px;height:8px;background:var(--red-light);border:1px solid var(--red);border-radius:2px;"></span> Empty</span>
        </div>
      </div>
      <p style="font-size:11.5px;color:var(--muted);margin:-4px 0 10px;">Click any bin to record a cycle count.</p>
      <div class="wh-map">
        ${WAREHOUSE_ZONES.map((z,zi)=>`
          <div class="wh-zone">
            <div class="zn">${z.name}</div>
            <div class="bins">${z.bins.map((count,bi)=>`<div class="bin ${binStatus(count)}" title="Bin ${bi+1}: ${count} units" onclick="openBinCount(${zi},${bi})"></div>`).join('')}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card" style="margin-bottom:16px;">
      <div class="card-title" style="margin-bottom:12px;">Order fulfilment pipeline</div>
      <div class="kanban">
        ${kanbanCol('Queued', PICK_QUEUE.queued)}
        ${kanbanColPicking()}
        ${kanbanCol('Packing', PICK_QUEUE.packing)}
        ${kanbanCol('Dispatch', PICK_QUEUE.dispatch)}
      </div>
    </div>

    <div class="grid two-col">
      <div class="card">
        <div class="card-title">Low stock alerts</div>
        ${LOW_STOCK.map(p=>`
          <div class="list-row" style="cursor:pointer;" onclick="createPurchaseOrder('${p.id}')">
            <span>${p.icon} ${p.name} →</span><span class="badge ${p.stock.available===0?'red':'amber'}">${p.stock.available} pcs left</span>
          </div>
        `).join('')}
        ${state.purchaseOrders.length ? `<p style="font-size:11px;color:var(--muted);margin-top:10px;">${state.purchaseOrders.length} purchase order(s) raised this session.</p>` : `<p style="font-size:11.5px;color:var(--muted);margin-top:10px;">Click a product to raise a replenishment purchase order.</p>`}
      </div>
      <div class="card">
        <div class="card-title">Returns &amp; damage workflow</div>
        <div class="list-row" style="cursor:pointer;" onclick="openRmaDetail('RMA-2214','3 units, water damage','pending')"><span>RMA-2214 — 3 units, water damage →</span><span class="badge amber">Credit note pending</span></div>
        <div class="list-row" style="cursor:pointer;" onclick="openRmaDetail('RMA-2209','1 unit, wrong SKU picked','resolved')"><span>RMA-2209 — 1 unit, wrong SKU picked →</span><span class="badge green">Resolved</span></div>
      </div>
    </div>

    <div class="card" style="margin-top:16px;">
      <div class="card-title">Recent cycle counts</div>
      ${state.cycleCounts.length===0
        ? `<p style="font-size:12.5px;color:var(--muted);">No cycle counts recorded yet — click a bin above to log one.</p>`
        : state.cycleCounts.slice(0,6).map(c=>`
            <div class="list-row">
              <span>${c.zone} · Bin ${c.bin}</span>
              <span>System ${c.system} → Physical ${c.physical}
                ${c.variance!==0 ? `<span class="badge ${Math.abs(c.variance)>10?'red':'amber'}" style="margin-left:6px;">${c.variance>0?'+':''}${c.variance} variance</span>` : `<span class="badge green" style="margin-left:6px;">Matched</span>`}
              </span>
            </div>
          `).join('')
      }
    </div>
  </div>
  `;
}
function kanbanCol(title, items){
  return `<div class="kcol"><h5><span>${title}</span><span>${items.length}</span></h5>
    ${items.map(o=>`<div class="kcard" onclick="openOrderDetail('${o.id}')" style="cursor:pointer;"><div class="id">${o.id}</div><div class="nm">${o.nm}</div><div style="color:var(--muted);">${o.lines} lines</div></div>`).join('')}
  </div>`;
}
function kanbanColPicking(){
  const items = PICK_QUEUE.picking;
  return `<div class="kcol"><h5><span>Picking</span><span>${items.length}</span></h5>
    ${items.map(o=>{
      const pickedCount = o.items.filter(i=>i.picked).length;
      return `
      <div class="kcard" style="margin-bottom:10px;">
        <div class="flex-between">
          <div><div class="id">${o.id}</div><div class="nm">${o.nm}</div></div>
          <span style="font-size:11px;color:var(--muted);">${pickedCount}/${o.items.length} picked</span>
        </div>
        <div style="margin-top:8px;display:flex;flex-direction:column;gap:4px;">
          ${o.items.map(it=>`
            <div style="display:flex;justify-content:space-between;font-size:11.5px;color:${it.picked?'var(--teal)':'var(--text)'};">
              <span>${it.picked?'✓':'○'} ${it.name}</span><span class="mono">${it.qty}</span>
            </div>
          `).join('')}
        </div>
      </div>`;
    }).join('')}
    <div style="margin-top:6px;">
      <input type="text" id="scanInput" placeholder="Scan or type SKU…" style="width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:6px;font-size:12px;font-family:var(--mono);"
        onkeydown="if(event.key==='Enter'){scanPick(this.value); this.value='';}">
    </div>
  </div>`;
}
function scanPick(sku){
  sku = (sku||'').trim().toUpperCase();
  if(!sku) return;
  for(const order of PICK_QUEUE.picking){
    const item = order.items.find(i => i.sku.toUpperCase() === sku && !i.picked);
    if(item){
      item.picked = true;
      toast('✅', `Picked: ${item.name} (${item.qty} pcs) — ${order.id}`);
      const allPicked = order.items.every(i=>i.picked);
      if(allPicked){
        PICK_QUEUE.picking = PICK_QUEUE.picking.filter(o=>o.id!==order.id);
        PICK_QUEUE.packing.push({ id:order.id, nm:order.nm, lines:order.items.length });
        addNotification('📦', `${order.id} fully picked — moved to Packing`);
        toast('📦', `${order.id} fully picked — moved to Packing`);
      }
      renderMain();
      return;
    }
  }
  toast('⚠️', `SKU "${sku}" not found in any active pick list`);
}

/* Cycle count drill-down */
function openBinCount(zoneIdx, binIdx){
  state.activeBin = { zoneIdx, binIdx };
  const zone = WAREHOUSE_ZONES[zoneIdx];
  const system = zone.bins[binIdx];
  const body = document.getElementById('invoiceModalBody'); // reuse the generic light modal
  body.innerHTML = `
    <div style="padding:28px 30px;">
      <h3 style="font-family:var(--display);margin:0 0 4px;">Cycle count — ${zone.name}</h3>
      <p style="color:#666;font-size:13px;margin:0 0 20px;">Bin ${binIdx+1} of ${zone.bins.length}</p>
      <div style="display:flex;gap:20px;margin-bottom:18px;">
        <div style="flex:1;">
          <label style="font-size:11.5px;font-weight:600;color:#666;display:block;margin-bottom:6px;">System count</label>
          <div style="font-family:var(--mono);font-size:22px;font-weight:600;">${system} units</div>
        </div>
        <div style="flex:1;">
          <label style="font-size:11.5px;font-weight:600;color:#666;display:block;margin-bottom:6px;">Physical count</label>
          <input type="number" id="physicalCountInput" value="${system}" style="width:100%;padding:10px 12px;border:1px solid #DDD;border-radius:7px;font-size:16px;font-family:var(--mono);">
        </div>
      </div>
      <p style="font-size:12px;color:#777;">Enter what you physically counted on the shelf. Variances beyond ±10 units are flagged for review.</p>
    </div>
    <div class="invoice-actions">
      <button class="btn btn-ghost" onclick="closeInvoice()">Cancel</button>
      <button class="btn btn-primary" onclick="saveBinCount()">Save count</button>
    </div>
  `;
  document.getElementById('invoiceOverlay').style.display = 'flex';
}
function saveBinCount(){
  const { zoneIdx, binIdx } = state.activeBin;
  const zone = WAREHOUSE_ZONES[zoneIdx];
  const system = zone.bins[binIdx];
  const physical = Math.max(0, parseInt(document.getElementById('physicalCountInput').value) || 0);
  const variance = physical - system;
  zone.bins[binIdx] = physical;
  state.cycleCounts.unshift({ zone: zone.name, bin: binIdx+1, system, physical, variance, time:'just now' });
  closeInvoice();
  toast(variance===0 ? '✅' : '⚠️', variance===0 ? 'Cycle count matched — no variance' : `Cycle count logged — variance of ${variance>0?'+':''}${variance} units flagged`);
  renderMain();
}

/* ---------------- Sales Rep Portal ---------------- */

function viewSales(){
  return `
  <div class="dash-header">
    <div class="wrap">
      <div class="section-title">Sales Rep Portal — Kojo Mensah</div>
      <p class="section-sub" style="margin-bottom:0;">Greater Accra region · 24 assigned accounts</p>
    </div>
  </div>
  <div class="dash-body wrap">
    <div class="grid kpi-row">
      <div class="card kpi-clickable" onclick="toast('🎯','72% of $180k target achieved — $50,400 remaining this month')"><div class="card-title">Monthly target</div><div class="kpi-value">$180k</div><div class="kpi-delta up">72% achieved →</div></div>
      <div class="card kpi-clickable" onclick="document.getElementById('salesCustTable').scrollIntoView({behavior:'smooth',block:'center'})"><div class="card-title">Orders this month</div><div class="kpi-value">61</div></div>
      <div class="card kpi-clickable" onclick="toast('💰','$6,340 commission accrued — paid out on the 1st of next month')"><div class="card-title">Commission accrued</div><div class="kpi-value">$6,340</div></div>
      <div class="card kpi-clickable" onclick="filterSalesByRisk('High')"><div class="card-title">Collections pending</div><div class="kpi-value">$96,380</div><div class="kpi-delta down">5 accounts overdue →</div></div>
    </div>

    <div class="grid two-col">
      <div class="card" id="salesCustTable">
        <div class="card-title">Assigned customers</div>
        <table>
          <thead><tr><th>Customer</th><th>Last order</th><th>Balance</th><th>Risk</th></tr></thead>
          <tbody id="salesCustBody">
            ${renderSalesRows(SALES_CUSTOMERS)}
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Target progress</div>
        <div class="chart-box"><canvas id="targetChart"></canvas></div>
      </div>
    </div>
  </div>
  `;
}
function renderSalesRows(list){
  return list.map((c,idx)=>`
    <tr style="cursor:pointer;" onclick='openCustomerDetail(${JSON.stringify(c)})'>
      <td>${c.name}</td><td>${c.last}</td><td>${money(c.balance)}</td>
      <td><span class="badge ${c.risk==='High'?'red':c.risk==='Medium'?'amber':'green'}">${c.risk}</span></td>
    </tr>
  `).join('');
}
function filterSalesByRisk(risk){
  const filtered = SALES_CUSTOMERS.filter(c=>c.risk===risk || c.balance>0);
  document.getElementById('salesCustBody').innerHTML = renderSalesRows(filtered.length?filtered:SALES_CUSTOMERS);
  document.getElementById('salesCustTable').scrollIntoView({behavior:'smooth',block:'center'});
  toast('🔎', `Showing ${filtered.length} account(s) with an outstanding balance`);
}
function openCustomerDetail(c){
  const body = document.getElementById('invoiceModalBody');
  body.innerHTML = `
    <div style="padding:28px 30px;">
      <div class="flex-between" style="margin-bottom:4px;">
        <h3 style="font-family:var(--display);margin:0;">${c.name}</h3>
        <span class="badge ${c.risk==='High'?'red':c.risk==='Medium'?'amber':'green'}">${c.risk} risk</span>
      </div>
      <p style="color:#666;font-size:12.5px;margin:0 0 20px;">Last order ${c.last} · ${c.visits} visits logged</p>
      <div style="display:flex;flex-direction:column;gap:9px;font-size:13px;margin-bottom:18px;">
        <div style="display:flex;justify-content:space-between;"><span>📞 Phone</span><span>${c.phone}</span></div>
        <div style="display:flex;justify-content:space-between;"><span>✉️ Email</span><span>${c.email}</span></div>
        <div style="display:flex;justify-content:space-between;"><span>💰 Outstanding balance</span><b>${money(c.balance)}</b></div>
      </div>
      <div style="background:#F2F1EA;border-radius:8px;padding:12px 14px;font-size:12.5px;color:#444;">${c.notes}</div>
    </div>
    <div class="invoice-actions">
      <button class="btn btn-ghost" onclick="closeInvoice()">Close</button>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-ghost" onclick="toast('📞','Dialling ${c.phone.replace(/'/g,"")}…')">Call</button>
        <button class="btn btn-primary" onclick="logVisit('${c.name.replace(/'/g,"")}')">Log a visit</button>
      </div>
    </div>
  `;
  document.getElementById('invoiceOverlay').style.display = 'flex';
}
function logVisit(name){
  const c = SALES_CUSTOMERS.find(x=>x.name===name);
  if(c){ c.visits += 1; c.last = 'Just now'; }
  closeInvoice();
  addNotification('🧭', `Visit logged for ${name}`);
  toast('🧭', `Visit logged for ${name} — ${c?c.visits:''} total visits`);
  renderMain();
}
function afterSales(){
  const ctx = document.getElementById('targetChart');
  if(!ctx || !window.Chart) return;
  new Chart(ctx, {
    type:'doughnut',
    data:{ labels:['Achieved','Remaining'], datasets:[{ data:[72,28], backgroundColor:['#0F7C68','#ECEAE2'], borderWidth:0 }]},
    options:{ cutout:'72%', plugins:{legend:{position:'bottom', labels:{font:{size:11}}}} }
  });
}

/* ---------------- Finance Portal ---------------- */

function viewFinance(){
  return `
  <div class="dash-header">
    <div class="wrap">
      <div class="section-title">Finance Portal</div>
      <p class="section-sub" style="margin-bottom:0;">GST-compliant invoicing · two-way Tally sync · last reconciled ${state.lastSync}</p>
    </div>
  </div>
  <div class="dash-body wrap">
    <div class="grid kpi-row">
      <div class="card"><div class="card-title">Receivables outstanding</div><div class="kpi-value">$412k</div></div>
      <div class="card"><div class="card-title">Overdue &gt; 30 days</div><div class="kpi-value">$68k</div><div class="kpi-delta down">14 accounts</div></div>
      <div class="card"><div class="card-title">Invoices issued (mo)</div><div class="kpi-value">1,204</div></div>
      <div class="card"><div class="card-title">Tally sync status</div><div class="kpi-value" style="font-size:20px;color:var(--teal);">✓ Connected</div></div>
    </div>

    <div class="grid two-col">
      <div class="card">
        <div class="card-title">Receivables aging</div>
        <div class="chart-box"><canvas id="agingChart"></canvas></div>
      </div>
      <div class="card">
        <div class="flex-between" style="margin-bottom:2px;">
          <div class="card-title" style="margin:0;">Sync queue</div>
          <button class="btn btn-ghost btn-sm" onclick="forceReconcile()">${state.syncing?'Reconciling…':'Force reconciliation now'}</button>
        </div>
        <div class="list-row"><span>Invoices → Tally</span><span class="badge green">Synced</span></div>
        <div class="list-row"><span>Credit notes → Tally</span><span class="badge green">Synced</span></div>
        <div class="list-row"><span>Payments ← Tally</span><span class="badge ${state.syncQueued>0?'amber':'green'}">${state.syncQueued>0?state.syncQueued+' queued':'Synced'}</span></div>
        <div class="list-row"><span>Customer master ↔ Tally</span><span class="badge green">Synced</span></div>
        <p style="font-size:11.5px;color:var(--muted);margin-top:10px;">Last reconciled ${state.lastSync}. If Tally goes offline, changes queue locally, version, and reconcile automatically on reconnect — nothing is lost or double-posted.</p>
      </div>
    </div>

    <div class="card" style="margin-top:16px;">
      <div class="flex-between" style="margin-bottom:8px;">
        <div class="card-title" style="margin:0;">Recent invoices</div>
        <button class="btn btn-ghost btn-sm" onclick="exportInvoicesCSV()">⬇ Export CSV</button>
      </div>
      <table>
        <thead><tr><th>Invoice</th><th>Customer</th><th>Due</th><th>Amount</th><th>Status</th><th></th></tr></thead>
        <tbody>
          ${FINANCE_INVOICES.map(i=>`
            <tr>
              <td class="mono">${i.id}</td><td>${i.customer}</td><td>${i.due}</td><td>${money(i.amount)}</td>
              <td>${statusBadge(i.status)}</td>
              <td><a href="#" onclick='openInvoiceFromRecord(${JSON.stringify(i)});return false;' style="font-size:12px;color:var(--orange);font-weight:600;">View</a></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>
  `;
}
function afterFinance(){
  const ctx = document.getElementById('agingChart');
  if(!ctx || !window.Chart) return;
  new Chart(ctx, {
    type:'bar',
    data:{ labels:['0–15d','16–30d','31–45d','46–60d','60d+'],
      datasets:[{ data:[210,96,52,31,23], backgroundColor:'#0F7C68', borderRadius:4 }]},
    options:{ plugins:{legend:{display:false}}, scales:{ y:{beginAtZero:true, ticks:{font:{size:10}}}, x:{ticks:{font:{size:11}}} } }
  });
}

/* ---------------- Admin & Analytics ---------------- */

function viewAdmin(){
  return `
  <div class="dash-header">
    <div class="wrap">
      <div class="section-title">Admin &amp; Analytics</div>
      <p class="section-sub" style="margin-bottom:0;">Real-time KPIs across every portal · 3 warehouses · 8 sales reps</p>
    </div>
  </div>
  <div class="dash-body wrap">
    <div class="grid kpi-row">
      <div class="card"><div class="card-title">Revenue (mo-to-date)</div><div class="kpi-value">$2.41M</div><div class="kpi-delta up">+11.4% vs last mo</div></div>
      <div class="card"><div class="card-title">Fulfilment rate</div><div class="kpi-value">96.8%</div><div class="kpi-delta up">+1.2 pts</div></div>
      <div class="card"><div class="card-title">Warehouse utilisation</div><div class="kpi-value">78%</div></div>
      <div class="card"><div class="card-title">Active backorders</div><div class="kpi-value">37</div><div class="kpi-delta down">-9 vs last week</div></div>
    </div>

    <div class="grid two-col">
      <div class="card">
        <div class="card-title">Revenue &amp; orders — last 8 weeks</div>
        <div class="chart-box tall"><canvas id="revChart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title">ABC inventory analysis</div>
        <div class="chart-box"><canvas id="abcChart"></canvas></div>
        <p style="font-size:11.5px;color:var(--muted);margin-top:8px;">Class A SKUs (14% of catalog) drive 71% of order value.</p>
      </div>
    </div>

    <div class="grid three-col" style="margin-top:16px;">
      <div class="card">
        <div class="card-title">Regional performance</div>
        ${renderRegionRow('Greater Accra','$1.12M',['Adjei Retail Stores — $210k','Nyame Foods Ltd — $184k','Blessed Mart — $96k'],'+14% vs last quarter')}
        ${renderRegionRow('Ashanti','$640k',['Osei & Sons — $88k','Freetown Provisions — $52k'],'+6% vs last quarter')}
        ${renderRegionRow('Western','$310k',['3 active accounts'],'Flat vs last quarter')}
        ${renderRegionRow('Volta','$210k',['2 active accounts'],'−3% vs last quarter')}
        ${renderRegionRow('Northern','$148k',['2 active accounts'],'+9% vs last quarter')}
      </div>
      <div class="card">
        <div class="card-title">Demand forecast — next 7 days</div>
        <div class="list-row" style="cursor:pointer;" onclick="toast('🥤','Beverages up 12% — hot weather driving cold-drink demand across Accra')"><span>🥤 Beverages</span><span class="badge green">↑ 12%</span></div>
        <div class="list-row" style="cursor:pointer;" onclick="toast('🍜','Snacks demand holding steady — no reorder action needed')"><span>🍜 Snacks</span><span class="badge grey">Stable</span></div>
        <div class="list-row" style="cursor:pointer;" onclick="toast('💊','Medical up 22% — seasonal flu demand, consider a pre-emptive restock')"><span>💊 Medical</span><span class="badge amber">↑ 22% (flu season)</span></div>
        <div class="list-row" style="cursor:pointer;" onclick="toast('🧊','Frozen down 8% — cold chain capacity gap at Tema warehouse')"><span>🧊 Frozen</span><span class="badge red">↓ 8% (cold chain gap)</span></div>
      </div>
      <div class="card">
        <div class="card-title">Integration health</div>
        <div class="list-row" style="cursor:pointer;" onclick="toast('✅','Tally ERP — last synced just now, 0 conflicts')"><span>Tally ERP</span><span class="badge green">Connected</span></div>
        <div class="list-row" style="cursor:pointer;" onclick="requestIntegration('SAP')"><span>SAP</span><span class="badge grey">Not configured →</span></div>
        <div class="list-row" style="cursor:pointer;" onclick="toast('ℹ️','This account operates on offline credit terms — no payment gateway needed')"><span>Payment gateway</span><span class="badge grey">N/A — offline terms</span></div>
        <div class="list-row" style="cursor:pointer;" onclick="toast('✅','SMS / WhatsApp notifications — 1,204 sent this month, 99.1% delivered')"><span>SMS / WhatsApp notify</span><span class="badge green">Connected</span></div>
      </div>
    </div>

    <div class="card" style="margin-top:16px;" id="ruleBuilderSection">
      <div class="flex-between" style="margin-bottom:12px;">
        <div>
          <div class="card-title" style="margin:0;">No-code pricing &amp; promotion rules</div>
          <p style="font-size:12px;color:var(--muted);margin:4px 0 0;">Ops teams build discount, shipping and fulfilment logic visually — no developer required.</p>
        </div>
        <button class="btn btn-primary btn-sm" onclick="toggleRuleForm()">${state.showRuleForm?'Cancel':'+ New rule'}</button>
      </div>

      ${state.showRuleForm ? renderRuleForm() : ''}

      <div id="ruleList">${renderRuleList()}</div>
    </div>
  </div>
  `;
}
function afterAdmin(){
  const revCtx = document.getElementById('revChart');
  if(revCtx && window.Chart){
    new Chart(revCtx, {
      type:'line',
      data:{ labels:['W1','W2','W3','W4','W5','W6','W7','W8'],
        datasets:[
          { label:'Revenue ($k)', data:[210,232,198,255,268,241,289,301], borderColor:'#FF6A1A', backgroundColor:'rgba(255,106,26,.1)', tension:.35, fill:true, yAxisID:'y' },
          { label:'Orders', data:[540,580,510,610,640,590,670,690], borderColor:'#0F7C68', backgroundColor:'rgba(15,124,104,.08)', tension:.35, fill:true, yAxisID:'y1' },
        ]},
      options:{ interaction:{mode:'index',intersect:false}, plugins:{legend:{position:'bottom',labels:{font:{size:11}}}},
        scales:{ y:{position:'left', ticks:{font:{size:10}}}, y1:{position:'right', grid:{drawOnChartArea:false}, ticks:{font:{size:10}}} } }
    });
  }
  const abcCtx = document.getElementById('abcChart');
  if(abcCtx && window.Chart){
    new Chart(abcCtx, {
      type:'doughnut',
      data:{ labels:['Class A','Class B','Class C'], datasets:[{ data:[71,21,8], backgroundColor:['#FF6A1A','#E8A93A','#ECEAE2'], borderWidth:0 }]},
      options:{ cutout:'65%', plugins:{legend:{position:'bottom',labels:{font:{size:11}}}} }
    });
  }
}

/* ---------------- Dispatch & Driver ---------------- */

function viewDispatch(){
  const delivered = DELIVERIES.filter(d=>d.status==='Delivered').length;
  return `
  <div class="dash-header">
    <div class="wrap">
      <div class="section-title">Dispatch &amp; Driver Portal</div>
      <p class="section-sub" style="margin-bottom:0;">Driver: Yaw Boateng · Vehicle GH-4471-24 · ${DELIVERIES.length} stops today</p>
    </div>
  </div>
  <div class="dash-body wrap">
    <div class="grid kpi-row" style="grid-template-columns:repeat(3,1fr);">
      <div class="card"><div class="card-title">Stops today</div><div class="kpi-value">${DELIVERIES.length}</div></div>
      <div class="card"><div class="card-title">Delivered</div><div class="kpi-value">${delivered}</div></div>
      <div class="card"><div class="card-title">On-time rate (mo)</div><div class="kpi-value">94%</div></div>
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:10px;">Delivery route</div>
      <table>
        <thead><tr><th>Order</th><th>Customer</th><th>Address</th><th>Window</th><th>Status</th><th></th></tr></thead>
        <tbody>
          ${DELIVERIES.map(d=>`
            <tr>
              <td class="mono"><a href="#" onclick="openOrderDetail('${d.id}');return false;" style="color:var(--orange);font-weight:600;">${d.id}</a></td>
              <td>${d.nm}</td>
              <td>${d.addr}</td>
              <td>${d.win}</td>
              <td>${statusBadge(d.status==='Out for delivery'?'In Transit':d.status==='Delivered'?'Delivered':'Outstanding')}</td>
              <td>${dispatchAction(d)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="grid two-col" style="margin-top:16px;">
      <div class="card">
        <div class="card-title">Proof of delivery — last stop</div>
        ${state.lastPod ? `
          <div class="list-row"><span>Customer signature</span><span class="badge green">Captured</span></div>
          <div class="list-row"><span>Delivery photo</span><span class="badge green">Captured</span></div>
          <div class="list-row"><span>OTP verification</span><span class="badge green">Verified — ${state.lastPod.otp}</span></div>
        ` : `<p style="font-size:12.5px;color:var(--muted);">No deliveries captured yet this session.</p>`}
      </div>
      <div class="card">
        <div class="card-title">Route optimisation</div>
        <p style="font-size:13px;color:var(--muted);margin:0 0 10px;">The routing engine selected this sequence to minimise total distance while respecting each customer's delivery window.</p>
        ${DELIVERIES.map((d,i)=>`
          <div class="list-row"><span>${i+1}. ${d.nm} — ${d.addr}</span>
            <span class="badge ${d.status==='Delivered'?'green':d.status==='Out for delivery'?'amber':'grey'}">${d.status==='Delivered'?'Done':d.status==='Out for delivery'?'In progress':'Queued'}</span>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  `;
}
function dispatchAction(d){
  if(d.status==='Delivered') return '<span style="color:var(--muted);font-size:12px;">✓ Signed &amp; photographed</span>';
  if(d.status==='Queued') return `<button class="btn btn-ghost btn-sm" onclick="startDelivery('${d.id}')">Start delivery</button>`;
  return `<button class="btn btn-ghost btn-sm" onclick="capturePOD('${d.id}')">Capture POD</button>`;
}
function startDelivery(id){
  const d = DELIVERIES.find(x=>x.id===id);
  if(d) d.status = 'Out for delivery';
  toast('🚚', `${id} marked out for delivery`);
  renderMain();
}
function capturePOD(id){
  const d = DELIVERIES.find(x=>x.id===id);
  const otp = Math.floor(1000+Math.random()*8999);
  if(d) d.status = 'Delivered';
  state.lastPod = { id, otp };
  addNotification('✅', `${id} delivered — proof of delivery captured (OTP ${otp})`);
  toast('✅', `Proof of delivery captured for ${id} — signature, photo &amp; OTP ${otp} verified`);
  renderMain();
}

/* ---------------- Toasts ---------------- */
function toast(icon, msg){
  const host = document.getElementById('toastHost');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="ic">${icon}</span><span>${msg}</span>`;
  host.appendChild(el);
  setTimeout(()=>{
    el.classList.add('leaving');
    setTimeout(()=>el.remove(), 220);
  }, 3200);
}

/* ---------------- Theme ---------------- */
function toggleTheme(){
  const html = document.documentElement;
  const dark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', dark ? 'light' : 'dark');
  document.getElementById('themeToggle').textContent = dark ? '🌙' : '☀️';
  renderMain(); // re-render current view so charts repaint against the new theme
}

/* ---------------- Command palette ---------------- */
const CMDK_ITEMS = [
  { label:'Overview — marketing home', kind:'Portal', action:()=>setView('marketing') },
  { label:'Customer Portal — dashboard', kind:'Portal', action:()=>setView('customer') },
  { label:'Start a guided order', kind:'Action', action:()=>setView('wizard') },
  { label:'Warehouse Portal — pick / pack / dispatch', kind:'Portal', action:()=>setView('warehouse') },
  { label:'Sales Rep Portal', kind:'Portal', action:()=>setView('sales') },
  { label:'Finance Portal — invoices & aging', kind:'Portal', action:()=>setView('finance') },
  { label:'Admin & Analytics', kind:'Portal', action:()=>setView('admin') },
  { label:'Dispatch & Driver Portal', kind:'Portal', action:()=>setView('dispatch') },
  { label:'Open pricing rule builder', kind:'Action', action:()=>{ setView('admin'); setTimeout(()=>document.getElementById('ruleBuilderSection')?.scrollIntoView({behavior:'smooth'}),150); } },
  { label:'Toggle dark mode', kind:'Action', action:()=>toggleTheme() },
  { label:'Check overdue invoices', kind:'Action', action:()=>setView('finance') },
  ...Object.keys(ROLES).map(id => ({ label:`Switch role: ${ROLES[id].label}`, kind:'Role', action:()=>setRole(id) })),
];
let cmdkHi = 0;
function openCmdk(){
  document.getElementById('cmdkOverlay').style.display='flex';
  document.getElementById('cmdkInput').value='';
  cmdkHi = 0;
  renderCmdkList('');
  setTimeout(()=>document.getElementById('cmdkInput').focus(), 30);
}
function closeCmdk(){ document.getElementById('cmdkOverlay').style.display='none'; }
function closeShortcuts(){ const el = document.getElementById('shortcutsOverlay'); if(el) el.style.display='none'; }
function renderCmdkList(term){
  const list = CMDK_ITEMS.filter(i=>i.label.toLowerCase().includes(term.toLowerCase()));
  document.getElementById('cmdkList').innerHTML = list.map((i,idx)=>`
    <div class="cmdk-item ${idx===cmdkHi?'hi':''}" data-idx="${idx}" onclick="runCmdk(${idx},'${term.replace(/'/g,"\\'")}')">
      <span>${i.label}</span><span class="k">${i.kind}</span>
    </div>`).join('') || `<div style="padding:16px;color:var(--muted);font-size:13px;">No matches.</div>`;
  window._cmdkFiltered = list;
}
function runCmdk(idx, term){
  const list = window._cmdkFiltered || CMDK_ITEMS;
  const item = list[idx];
  closeCmdk();
  if(item) item.action();
}
document.addEventListener('keydown', (e)=>{
  const typing = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
  if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){
    e.preventDefault();
    const overlay = document.getElementById('cmdkOverlay');
    if(overlay.style.display==='flex') closeCmdk(); else openCmdk();
  }
  if(e.key==='?' && !typing){
    e.preventDefault();
    document.getElementById('shortcutsOverlay').style.display = 'flex';
  }
  if(e.key==='Escape'){
    closeCmdk();
    closeShortcuts();
    closeInvoice();
  }
  const overlay = document.getElementById('cmdkOverlay');
  if(overlay && overlay.style.display==='flex'){
    const list = window._cmdkFiltered || CMDK_ITEMS;
    if(e.key==='ArrowDown'){ e.preventDefault(); cmdkHi = Math.min(list.length-1, cmdkHi+1); renderCmdkList(document.getElementById('cmdkInput').value); }
    if(e.key==='ArrowUp'){ e.preventDefault(); cmdkHi = Math.max(0, cmdkHi-1); renderCmdkList(document.getElementById('cmdkInput').value); }
    if(e.key==='Enter'){ runCmdk(cmdkHi, document.getElementById('cmdkInput').value); }
  }
});

/* ---------------- AI Assistant (rule-based demo) ---------------- */
let aiHistory = [];
function toggleAI(){
  const panel = document.getElementById('aiPanel');
  const opening = !panel.classList.contains('open');
  panel.classList.toggle('open');
  if(opening && aiHistory.length===0){
    aiSay("Hi, I'm the Karavan AI Assistant. I can check stock, explain pricing, chase invoices, or help you build an order. Try one of these:");
    renderAiSuggestions(['Is Sprite PET 500ml in stock?','Why is my Gold discount 8%?','What do I owe right now?','Recommend something for a beverages order']);
  }
}
function aiSay(text, from='bot'){
  aiHistory.push({from, text});
  const body = document.getElementById('aiBody');
  const el = document.createElement('div');
  el.className = 'ai-msg ' + (from==='bot'?'bot':'user');
  el.textContent = text;
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
}
function renderAiSuggestions(list){
  document.getElementById('aiSuggest').innerHTML = list.map(s=>`<button onclick="sendAI('${s.replace(/'/g,"\\'")}')">${s}</button>`).join('');
}
function sendAI(text){
  text = (text||'').trim();
  if(!text) return;
  document.getElementById('aiInput').value='';
  aiSay(text, 'user');
  document.getElementById('aiSuggest').innerHTML='';
  setTimeout(()=>{ aiSay(answerAI(text)); }, 380);
}
function answerAI(q){
  const t = q.toLowerCase();
  const prod = PRODUCTS.find(p => t.includes(p.name.toLowerCase().split(' ')[0].toLowerCase()));
  if(t.includes('stock') || t.includes('available')){
    if(prod) return `${prod.name}: ${prod.stock.available} pieces available, ${prod.stock.reserved} reserved${prod.stock.incoming?`, ${prod.stock.incoming} incoming (ETA ${prod.stock.eta})`:''}.`;
    return "Tell me a product name (e.g. 'Is Sprite PET 500ml in stock?') and I'll check live inventory across all zones.";
  }
  if(t.includes('discount') || t.includes('pricing') || t.includes('price')){
    return `Your account is Gold tier. Gold customers get category-specific discounts — Beverages and Cleaning currently run 6–8%, applied automatically at checkout before GST.`;
  }
  if(t.includes('owe') || t.includes('balance') || t.includes('invoice')){
    return `Outstanding balance is ${money(CUSTOMER.outstanding)}. INV-5498 (${money(7640.75)}) is overdue — want me to flag it to ${CUSTOMER.salesRep}?`;
  }
  if(t.includes('recommend') || t.includes('suggest')){
    return `Based on order history, I'd add Malta Guinness 330ml (steady demand, full stock) and Dettol Soap (bundle deal this week) to a Beverages/Cleaning order.`;
  }
  if(t.includes('order') || t.includes('wizard')){
    return `I can take you straight to guided ordering — just say "start an order" or use the Guided Ordering tab above.`;
  }
  return `I can help with stock levels, pricing explanations, invoice status, and product recommendations — try asking about a specific SKU or your account balance.`;
}

/* ---------------- Pricing Rule Engine (no-code) ---------------- */
function renderRuleList(){
  if(state.rules.length===0) return `<p style="font-size:13px;color:var(--muted);">No rules yet. Add one above.</p>`;
  return state.rules.map((r,idx)=>`
    <div class="rule-card">
      <div class="rule-line">
        <span class="rule-kw">IF</span>
        <span class="rule-chip cond">Customer tier = ${r.tier}</span>
        <span class="rule-kw">AND</span>
        <span class="rule-chip cond">Quantity ${r.qtyOp} ${r.qtyVal}</span>
        <span class="rule-kw">AND</span>
        <span class="rule-chip cond">Region = ${r.region}</span>
        <span class="rule-kw">THEN</span>
        <span class="rule-chip then">${r.discount}% discount</span>
        ${r.freeShipping?'<span class="rule-chip then">Free shipping</span>':''}
        ${r.priority?'<span class="rule-chip then">Priority fulfilment</span>':''}
      </div>
      <div class="rule-actions">
        <span style="font-size:11px;color:var(--muted);">Rule #${idx+1} · active on all new orders</span>
        <span><a href="#" onclick="editRule(${idx});return false;" style="font-size:12px;color:var(--orange);font-weight:600;margin-right:12px;">Edit</a><a href="#" onclick="deleteRule(${idx});return false;" style="font-size:12px;color:var(--red);">Delete</a></span>
      </div>
    </div>
  `).join('');
}
function toggleRuleForm(){
  state.showRuleForm = !state.showRuleForm;
  if(state.showRuleForm && state.editingRuleIndex===null){
    state.ruleDraft = { tier:'Gold', qtyOp:'>', qtyVal:100, region:'North', discount:12, freeShipping:true, priority:true };
  }
  if(!state.showRuleForm) state.editingRuleIndex = null;
  renderMain(); afterAdmin();
}
function renderRuleForm(){
  const d = state.ruleDraft;
  return `
  <div class="rule-builder">
    <div class="rb-row">
      <span class="rule-kw">IF</span>
      <select onchange="updateRuleDraft('tier',this.value)">
        ${['Gold','Silver','Bronze','Any'].map(t=>`<option ${d.tier===t?'selected':''}>${t}</option>`).join('')}
      </select>
      <span style="font-size:12px;color:var(--muted);">tier</span>
      <span class="rule-kw">AND qty</span>
      <select onchange="updateRuleDraft('qtyOp',this.value)">
        ${['>','>=','<','<='].map(o=>`<option ${d.qtyOp===o?'selected':''}>${o}</option>`).join('')}
      </select>
      <input type="number" value="${d.qtyVal}" style="width:70px;padding:8px;border:1px solid var(--line);border-radius:6px;font-size:12.5px;" oninput="updateRuleDraft('qtyVal',this.value)">
      <span class="rule-kw">AND region</span>
      <select onchange="updateRuleDraft('region',this.value)">
        ${['Any','North','South','East','West','Greater Accra'].map(r=>`<option ${d.region===r?'selected':''}>${r}</option>`).join('')}
      </select>
    </div>
    <div class="rb-row">
      <span class="rule-kw">THEN discount</span>
      <input type="number" value="${d.discount}" style="width:60px;padding:8px;border:1px solid var(--line);border-radius:6px;font-size:12.5px;" oninput="updateRuleDraft('discount',this.value)">
      <span style="font-size:12px;color:var(--muted);">%</span>
      <label style="display:flex;align-items:center;gap:5px;font-size:12.5px;margin-left:8px;">
        <input type="checkbox" ${d.freeShipping?'checked':''} onchange="updateRuleDraft('freeShipping',this.checked)"> Free shipping
      </label>
      <label style="display:flex;align-items:center;gap:5px;font-size:12.5px;">
        <input type="checkbox" ${d.priority?'checked':''} onchange="updateRuleDraft('priority',this.checked)"> Priority fulfilment
      </label>
    </div>
    <button class="btn btn-dark btn-sm" onclick="saveRule()">Save rule</button>
  </div>
  `;
}
function updateRuleDraft(field, val){
  if(field==='qtyVal' || field==='discount') val = Number(val)||0;
  state.ruleDraft[field] = val;
  // intentionally no re-render here so number/text inputs keep focus while typing
}
function saveRule(){
  if(state.editingRuleIndex!==null && state.editingRuleIndex!==undefined){
    state.rules[state.editingRuleIndex] = {...state.ruleDraft};
    toast('⚙️','Rule updated');
    state.editingRuleIndex = null;
  } else {
    state.rules.push({...state.ruleDraft});
    toast('⚙️','New pricing rule saved and applied to future orders');
  }
  state.showRuleForm = false;
  renderMain(); afterAdmin();
}
function editRule(idx){
  state.ruleDraft = {...state.rules[idx]};
  state.editingRuleIndex = idx;
  state.showRuleForm = true;
  renderMain(); afterAdmin();
  document.getElementById('ruleBuilderSection')?.scrollIntoView({behavior:'smooth'});
}
function deleteRule(idx){
  state.rules.splice(idx,1);
  renderMain(); afterAdmin();
}

/* ---------------- Persistence (localStorage) ---------------- */
const PERSIST_KEY = 'karavan_os_state_v1';
function persist(){
  try{
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    localStorage.setItem(PERSIST_KEY, JSON.stringify({
      theme, role: state.role, rules: state.rules,
      notifications: state.notifications, wizard: state.wizard,
      cycleCounts: state.cycleCounts, syncQueued: state.syncQueued, lastSync: state.lastSync,
      purchaseOrders: state.purchaseOrders, lastPod: state.lastPod, deliveries: DELIVERIES,
      pickQueue: PICK_QUEUE, warehouseBins: WAREHOUSE_ZONES.map(z=>z.bins),
    }));
  }catch(e){ /* storage unavailable — fail silently, app still works in-memory */ }
}
function loadPersisted(){
  try{
    const raw = localStorage.getItem(PERSIST_KEY);
    if(!raw) return;
    const saved = JSON.parse(raw);
    if(saved.theme==='dark'){
      document.documentElement.setAttribute('data-theme','dark');
      const tt = document.getElementById('themeToggle'); if(tt) tt.textContent = '☀️';
    }
    if(saved.role && ROLES[saved.role]) state.role = saved.role;
    if(Array.isArray(saved.rules) && saved.rules.length) state.rules = saved.rules;
    if(Array.isArray(saved.notifications) && saved.notifications.length) state.notifications = saved.notifications;
    if(Array.isArray(saved.cycleCounts)) state.cycleCounts = saved.cycleCounts;
    if(Array.isArray(saved.purchaseOrders)) state.purchaseOrders = saved.purchaseOrders;
    if(saved.lastPod) state.lastPod = saved.lastPod;
    if(Array.isArray(saved.deliveries)){
      saved.deliveries.forEach((d,i)=>{ if(DELIVERIES[i]) DELIVERIES[i].status = d.status; });
    }
    if(typeof saved.syncQueued === 'number') state.syncQueued = saved.syncQueued;
    if(saved.lastSync) state.lastSync = saved.lastSync;
    if(saved.pickQueue){
      if(Array.isArray(saved.pickQueue.queued)) PICK_QUEUE.queued = saved.pickQueue.queued;
      if(Array.isArray(saved.pickQueue.picking)) PICK_QUEUE.picking = saved.pickQueue.picking;
      if(Array.isArray(saved.pickQueue.packing)) PICK_QUEUE.packing = saved.pickQueue.packing;
      if(Array.isArray(saved.pickQueue.dispatch)) PICK_QUEUE.dispatch = saved.pickQueue.dispatch;
    }
    if(Array.isArray(saved.warehouseBins)){
      saved.warehouseBins.forEach((bins,i)=>{ if(WAREHOUSE_ZONES[i] && Array.isArray(bins)) WAREHOUSE_ZONES[i].bins = bins; });
    }
    if(saved.wizard){
      state.wizard = Object.assign({}, state.wizard, saved.wizard);
      if(Array.isArray(state.wizard.cart)){
        state.wizard.cart = state.wizard.cart.map(c => ({ ...c, product: PRODUCTS.find(p=>p.id===c.product.id) || c.product }));
      }
      if(state.wizard.product){
        state.wizard.product = PRODUCTS.find(p=>p.id===state.wizard.product.id) || null;
      }
      if(!state.wizard.product && WIZARD_STEPS[state.wizard.step] && WIZARD_STEPS[state.wizard.step].key==='configure'){
        state.wizard.step = stepIndex('category');
      }
    }
  }catch(e){ /* corrupt storage — ignore and start fresh */ }
}

/* ---------------- Notification center ---------------- */
function addNotification(icon, text){
  state.notifications.unshift({ id:'n'+Date.now(), icon, text, time:'just now', read:false });
  renderNotifPanel();
  persist();
}
function toggleNotifPanel(){
  state.notifPanelOpen = !state.notifPanelOpen;
  renderNotifPanel();
}
function renderNotifPanel(){
  const panel = document.getElementById('notifPanel');
  const badge = document.getElementById('notifBadge');
  if(!panel || !badge) return;
  const unread = state.notifications.filter(n=>!n.read).length;
  badge.style.display = unread>0 ? 'flex' : 'none';
  badge.textContent = unread>9 ? '9+' : String(unread);
  panel.classList.toggle('open', state.notifPanelOpen);
  panel.innerHTML = `
    <div class="notif-panel-head"><span>Notifications</span><a onclick="markAllRead()">Mark all read</a></div>
    ${state.notifications.length===0 ? '<div class="notif-empty">No notifications</div>' :
      state.notifications.map(n=>`
        <div class="notif-row ${n.read?'':'unread'}" onclick="markRead('${n.id}')">
          <span>${n.icon}</span>
          <div><div>${n.text}</div><div class="t">${n.time}</div></div>
        </div>
      `).join('')}
  `;
}
function markRead(id){
  const n = state.notifications.find(x=>x.id===id);
  if(n) n.read = true;
  renderNotifPanel();
  persist();
}
function markAllRead(){
  state.notifications.forEach(n=>n.read=true);
  renderNotifPanel();
  persist();
}
document.addEventListener('click', (e)=>{
  const wrap = document.querySelector('.notif-wrap');
  if(state.notifPanelOpen && wrap && !wrap.contains(e.target)){
    state.notifPanelOpen = false;
    renderNotifPanel();
  }
});

/* ---------------- GST Invoice document ---------------- */
function openInvoiceFromCart(orderNum, cart, subtotal, tax, delivery, total){
  const lines = cart.map(c => ({
    name:c.product.name, hsn:HSN_CODES[c.product.cat]||'—', qty:c.pieces, rate:c.product.price,
    amount:c.lineSubtotal, discount:c.discountAmt, net:c.afterDiscount
  }));
  renderInvoice({ orderNum, lines, subtotal, tax, delivery, total, date:new Date() });
}
function openInvoiceFromRecord(inv){
  const subtotal = inv.amount / (1+TAX_RATE);
  const tax = inv.amount - subtotal;
  renderInvoice({
    orderNum:inv.order, invoiceId:inv.id, lines:[{ name:'Wholesale order — mixed line items', hsn:'—', qty:'—', rate:'—', amount:subtotal, discount:0, net:subtotal }],
    subtotal, tax, delivery:0, total:inv.amount, date:new Date(), due:inv.due
  });
}
function renderInvoice(data){
  const irn = 'IRN' + Math.random().toString(36).slice(2,10).toUpperCase();
  const ewb = 'EWB' + Math.floor(1e11 + Math.random()*8e11);
  const body = document.getElementById('invoiceModalBody');
  body.innerHTML = `
  <div class="invoice-doc">
    <div class="inv-top">
      <div>
        <div class="inv-brand">Karavan OS</div>
        <div style="font-size:11.5px;color:#555;">Tema Central Warehouse, Ghana · GST/VAT Reg: GH-0041-2019</div>
      </div>
      <div class="inv-meta">
        <div><b>Tax Invoice</b></div>
        <div>${data.invoiceId ? data.invoiceId : 'INV-' + data.orderNum.replace('ORD-','')}</div>
        <div>Order ${data.orderNum}</div>
        <div>${data.date.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</div>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
      <div><b>Billed to</b><br>${CUSTOMER.name} — ${CUSTOMER.branch}<br>${w().business ? w().business.location : ''}</div>
      <div style="text-align:right;"><b>IRN</b> ${irn}<br><b>E-way bill</b> ${ewb}${data.due?`<br><b>Due</b> ${data.due}`:''}</div>
    </div>

    <h2>Line items</h2>
    <table>
      <thead><tr><th>Description</th><th>HSN</th><th>Qty (pcs)</th><th>Rate</th><th>Amount</th><th>Discount</th><th>Net</th></tr></thead>
      <tbody>
        ${data.lines.map(l=>`
          <tr>
            <td>${l.name}</td><td>${l.hsn}</td><td>${l.qty}</td>
            <td>${typeof l.rate==='number'?money(l.rate):l.rate}</td>
            <td>${money(l.amount)}</td><td>${l.discount?('− '+money(l.discount)):'—'}</td><td>${money(l.net)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <div class="inv-totals">
      <div><span>Subtotal</span><span>${money(data.subtotal)}</span></div>
      <div><span>GST (${Math.round(TAX_RATE*100)}%)</span><span>${money(data.tax)}</span></div>
      ${data.delivery ? `<div><span>Delivery</span><span>${money(data.delivery)}</span></div>` : ''}
      <div class="grand"><span>Total due</span><span>${money(data.total)}</span></div>
    </div>

    <div class="inv-footer">
      This is a system-generated tax invoice from Karavan OS. Two-way synced to Tally ERP. Bank details and payment terms available on request. Prototype data — not a real transaction.
    </div>
  </div>
  <div class="invoice-actions">
    <button class="btn btn-ghost" onclick="closeInvoice()">Close</button>
    <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
  `;
  document.getElementById('invoiceOverlay').style.display = 'flex';
}
function closeInvoice(){ document.getElementById('invoiceOverlay').style.display = 'none'; }

/* ---------------- CSV export ---------------- */
function downloadCSV(filename, rows){
  const csv = rows.map(r => r.map(cell => {
    const s = String(cell ?? '');
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
  }).join(',')).join('\n');
  const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function exportInvoicesCSV(){
  const rows = [['Invoice','Customer','Order','Due date','Amount (USD)','Status']];
  FINANCE_INVOICES.forEach(i => rows.push([i.id, i.customer, i.order, i.due, i.amount.toFixed(2), i.status]));
  downloadCSV('karavan-invoices.csv', rows);
  toast('⬇️','Invoices exported as CSV');
}
function exportOrdersCSV(){
  const rows = [['Order','Date','Items','Total (USD)','Status']];
  RECENT_ORDERS.forEach(o => rows.push([o.id, o.date, o.items, o.total.toFixed(2), o.status]));
  downloadCSV('karavan-orders.csv', rows);
  toast('⬇️','Orders exported as CSV');
}

/* ---------------- Order detail drill-down ---------------- */
const STAGE_LABELS = ['Ordered','Allocated','Picked & packed','In transit','Delivered'];

function findOrderRecord(orderId){
  const found = RECENT_ORDERS.find(o=>o.id===orderId);
  if(found) return found;
  // synthesize a plausible record for IDs that only exist in warehouse/dispatch mock data
  let stage = 1;
  const inPacking = PICK_QUEUE.packing.find(o=>o.id===orderId);
  const inDispatch = PICK_QUEUE.dispatch.find(o=>o.id===orderId) || DELIVERIES.find(d=>d.id===orderId);
  const inQueued = PICK_QUEUE.queued.find(o=>o.id===orderId);
  const inPicking = PICK_QUEUE.picking.find(o=>o.id===orderId);
  if(inQueued) stage = 0;
  if(inPicking) stage = 1;
  if(inPacking) stage = 2;
  if(inDispatch) stage = (inDispatch.status==='Delivered') ? 4 : 3;
  const nm = (inPacking||inDispatch||inQueued||inPicking||{}).nm || 'Customer';
  // deterministic pseudo-random line items based on order id
  let seed = 0; for(const ch of orderId) seed += ch.charCodeAt(0);
  const lines = [0,1,2].map(i => {
    const p = PRODUCTS[(seed + i*3) % PRODUCTS.length];
    const qty = 12 + ((seed*(i+1)) % 60);
    return { sku:p.id, qty };
  });
  return { id:orderId, date:'—', items:lines.length, total:lines.reduce((s,l,i)=> s + l.qty * (PRODUCTS.find(p=>p.id===l.sku)?.price||10), 0), status: STAGE_LABELS[stage], stage, lines, customer:nm };
}

function openOrderDetail(orderId){
  const o = findOrderRecord(orderId);
  const body = document.getElementById('invoiceModalBody');
  body.innerHTML = `
    <div style="padding:28px 30px;">
      <div class="flex-between" style="margin-bottom:6px;">
        <h3 style="font-family:var(--display);margin:0;">${o.id}</h3>
        <span class="badge ${o.stage>=4?'green':o.stage>=2?'amber':'grey'}">${STAGE_LABELS[o.stage]}</span>
      </div>
      <p style="color:#666;font-size:12.5px;margin:0 0 22px;">${o.customer || CUSTOMER.name} · ${o.date && o.date!=='—' ? o.date : 'date pending'}</p>

      <div class="pulse-track" style="background:#eee;">
        <div class="pulse-fill" style="width:${o.stage*25}%;"></div>
        ${STAGE_LABELS.map((l,i)=>`<div class="pulse-node ${i<=o.stage?'lit':''}" style="left:${i*25}%;border-color:${i<=o.stage?'':'#ccc'};"></div>`).join('')}
      </div>
      <div class="pulse-labels" style="color:#888;">
        ${STAGE_LABELS.map((l,i)=>`<span style="${i<=o.stage?'color:#12201D;font-weight:600;':''}">${l}</span>`).join('')}
      </div>

      <h2 style="margin-top:26px;">Line items</h2>
      <table>
        <thead><tr><th>Product</th><th>SKU</th><th>Qty (pcs)</th></tr></thead>
        <tbody>
          ${o.lines.map(l=>{
            const p = PRODUCTS.find(x=>x.id===l.sku);
            return `<tr><td>${p?p.icon+' '+p.name:l.sku}</td><td class="mono">${l.sku}</td><td>${l.qty}</td></tr>`;
          }).join('')}
        </tbody>
      </table>
      <div style="text-align:right;font-size:14px;font-weight:600;">Order total: ${money(o.total)}</div>
    </div>
    <div class="invoice-actions">
      <button class="btn btn-ghost" onclick="closeInvoice()">Close</button>
      <button class="btn btn-primary" onclick="openInvoiceFromCartLike(${JSON.stringify(o)})">View invoice</button>
    </div>
  `;
  document.getElementById('invoiceOverlay').style.display = 'flex';
}
function openInvoiceFromCartLike(o){
  const subtotal = o.total / (1+TAX_RATE);
  const tax = o.total - subtotal;
  renderInvoice({
    orderNum:o.id,
    lines: o.lines.map(l=>{
      const p = PRODUCTS.find(x=>x.id===l.sku);
      return { name:p?p.name:l.sku, hsn:p?(HSN_CODES[p.cat]||'—'):'—', qty:l.qty, rate:p?p.price:'—', amount:p?p.price*l.qty:0, discount:0, net:p?p.price*l.qty:0 };
    }),
    subtotal, tax, delivery:0, total:o.total, date:new Date()
  });
}

/* ---------------- Force ERP reconciliation ---------------- */
function forceReconcile(){
  if(state.syncing) return;
  state.syncing = true;
  renderMain(); afterFinance();
  toast('🔄','Reconciling queued Tally transactions…');
  setTimeout(()=>{
    state.syncQueued = 0;
    state.lastSync = 'just now';
    state.syncing = false;
    addNotification('✅','Tally reconciliation complete — 3 payments synced, 0 conflicts');
    toast('✅','Reconciliation complete — all records in sync');
    renderMain(); afterFinance();
  }, 1300);
}

/* ---------------- Admin drill-downs ---------------- */
function renderRegionRow(name, total, topAccounts, trend){
  const payload = { name, total, topAccounts, trend };
  return `<div class="list-row" style="cursor:pointer;" onclick='openRegionDetail(${JSON.stringify(payload)})'>
    <span>${name} →</span><span><b>${total}</b></span>
  </div>`;
}
function openRegionDetail(r){
  const body = document.getElementById('invoiceModalBody');
  body.innerHTML = `
    <div style="padding:28px 30px;">
      <h3 style="font-family:var(--display);margin:0 0 4px;">${r.name}</h3>
      <p style="color:#666;font-size:12.5px;margin:0 0 20px;">${r.total} revenue · ${r.trend}</p>
      <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:.6px;color:#666;margin-bottom:10px;">Top accounts</h2>
      <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
        ${r.topAccounts.map(a=>`<div style="padding:9px 12px;background:#F2F1EA;border-radius:7px;">${a}</div>`).join('')}
      </div>
    </div>
    <div class="invoice-actions">
      <button class="btn btn-ghost" onclick="closeInvoice()">Close</button>
      <button class="btn btn-primary" onclick="closeInvoice();setView('sales');">View in Sales Portal</button>
    </div>
  `;
  document.getElementById('invoiceOverlay').style.display = 'flex';
}
function requestIntegration(name){
  addNotification('🔌', `${name} integration request logged for your account manager`);
  toast('🔌', `Request sent — your account manager will follow up about connecting ${name}`);
}

/* ---------------- Warehouse: purchase orders & RMA detail ---------------- */
function createPurchaseOrder(productId){
  const p = PRODUCTS.find(x=>x.id===productId);
  if(!p) return;
  const already = state.purchaseOrders.find(po=>po.sku===productId);
  if(already){
    toast('ℹ️', `A purchase order (${already.poNum}) for ${p.name} is already open`);
    return;
  }
  const poNum = 'PO-' + Math.floor(4000 + Math.random()*5999);
  const qty = Math.max(200, (p.stock.reserved||0) * 3);
  state.purchaseOrders.push({ poNum, sku:p.id, name:p.name, qty });
  addNotification('📥', `${poNum} raised — ${qty} pcs of ${p.name} from supplier`);
  toast('📥', `Purchase order ${poNum} raised for ${qty} pcs of ${p.name}`);
  renderMain();
}
function openRmaDetail(id, desc, status){
  const body = document.getElementById('invoiceModalBody');
  body.innerHTML = `
    <div style="padding:28px 30px;">
      <div class="flex-between" style="margin-bottom:4px;">
        <h3 style="font-family:var(--display);margin:0;">${id}</h3>
        <span class="badge ${status==='resolved'?'green':'amber'}">${status==='resolved'?'Resolved':'Credit note pending'}</span>
      </div>
      <p style="color:#666;font-size:13px;margin:14px 0 20px;">${desc}. Logged by warehouse staff during receiving inspection.</p>
      <div style="background:#F2F1EA;border-radius:8px;padding:14px;font-size:12.5px;color:#444;">
        ${status==='resolved'
          ? 'Credit note issued to customer account and reconciled with Tally. No further action needed.'
          : 'Awaiting finance sign-off on the credit note amount before it posts to the customer ledger.'}
      </div>
    </div>
    <div class="invoice-actions">
      <button class="btn btn-ghost" onclick="closeInvoice()">Close</button>
      ${status!=='resolved' ? `<button class="btn btn-primary" onclick="resolveRma('${id}')">Approve credit note</button>` : '<span></span>'}
    </div>
  `;
  document.getElementById('invoiceOverlay').style.display = 'flex';
}
function resolveRma(id){
  closeInvoice();
  addNotification('✅', `${id} credit note approved and posted to Tally`);
  toast('✅', `${id} resolved — credit note posted`);
}
