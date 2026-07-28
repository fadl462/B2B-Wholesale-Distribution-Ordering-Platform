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

const RECENT_ORDERS = [
  { id:'ORD-88213', date:'24 Jul 2026', items:14, total:4820.50, status:'Delivered' },
  { id:'ORD-88190', date:'19 Jul 2026', items:8,  total:2110.00, status:'In Transit' },
  { id:'ORD-88155', date:'12 Jul 2026', items:22, total:7640.75, status:'Delivered' },
  { id:'ORD-88102', date:'03 Jul 2026', items:5,  total:980.30,  status:'Backordered' },
];

const INVOICES = [
  { id:'INV-5521', order:'ORD-88213', due:'07 Aug 2026', amount:4820.50, status:'Outstanding' },
  { id:'INV-5498', order:'ORD-88155', due:'26 Jul 2026', amount:7640.75, status:'Overdue' },
  { id:'INV-5460', order:'ORD-88090', due:'10 Jul 2026', amount:3200.00, status:'Paid' },
];

const LOW_STOCK = PRODUCTS.filter(p => p.stock.available < 50);

const WAREHOUSE_ZONES = [
  { name:'Zone A · Beverages', bins:['full','full','low','full','full','empty'] },
  { name:'Zone B · Snacks',    bins:['full','full','full','low','full','full'] },
  { name:'Zone C · Medical',   bins:['low','empty','full','full','low','full'] },
  { name:'Zone D · Cleaning',  bins:['full','full','full','full','full','low'] },
  { name:'Zone E · Frozen',    bins:['empty','empty','full','low','full','full'] },
];

const PICK_QUEUE = {
  queued:[
    {id:'ORD-88231', nm:'Adjei Retail — Osu', lines:6},
    {id:'ORD-88229', nm:'Nyame Foods Ltd', lines:14},
  ],
  picking:[
    {id:'ORD-88224', nm:'Blessed Mart', lines:9},
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
  { name:'Adjei Retail Stores', last:'2 days ago', balance:12480, risk:'Low' },
  { name:'Nyame Foods Ltd', last:'Today', balance:31200, risk:'Medium' },
  { name:'Blessed Mart', last:'5 days ago', balance:0, risk:'Low' },
  { name:'Freetown Provisions', last:'1 day ago', balance:8600, risk:'Low' },
  { name:'Osei & Sons', last:'11 days ago', balance:44100, risk:'High' },
];

const DELIVERIES = [
  { id:'ORD-88213', nm:'Adjei Retail — Osu', addr:'Oxford St, Osu', win:'2:00–4:00 PM', status:'Out for delivery' },
  { id:'ORD-88198', nm:'Freetown Provisions', addr:'Spintex Rd', win:'4:00–6:00 PM', status:'Queued' },
  { id:'ORD-88190', nm:'Blessed Mart', addr:'Dansoman', win:'11:00 AM–1:00 PM', status:'Delivered' },
];

/* ---------------- State ---------------- */

const state = {
  view: 'marketing',
  pulseStarted:false,
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
  }
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
  return 'GH₵ ' + n.toLocaleString('en-GH', {minimumFractionDigits:2, maximumFractionDigits:2});
}
function esc(s){ return String(s); }

/* ---------------- Shell / Router ---------------- */

function renderTabs(){
  const el = document.getElementById('portalTabs');
  el.innerHTML = PORTALS.map(p => `
    <button class="ptab ${state.view===p.id?'active':''}" data-view="${p.id}">${p.label}</button>
  `).join('');
  el.querySelectorAll('.ptab').forEach(btn=>{
    btn.addEventListener('click', ()=> setView(btn.dataset.view));
  });
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
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderTabs();
  renderMain();
});

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
  return `
  <div class="dash-header">
    <div class="wrap flex-between">
      <div>
        <div class="section-title">${CUSTOMER.name} <span style="color:var(--muted);font-weight:400;font-size:15px;">— ${CUSTOMER.branch}</span></div>
        <p class="section-sub" style="margin-bottom:0;">Tier <b style="color:var(--orange);">${CUSTOMER.tier}</b> · Sales rep ${CUSTOMER.salesRep} · Member since 2019</p>
      </div>
      <button class="btn btn-primary" onclick="setView('wizard')">+ New guided order</button>
    </div>
  </div>

  <div class="dash-body wrap">
    <div class="grid kpi-row">
      <div class="card">
        <div class="card-title">Credit available</div>
        <div class="kpi-value">${money(available)}</div>
        <div class="kpi-delta up">of ${money(CUSTOMER.creditLimit)} limit</div>
      </div>
      <div class="card">
        <div class="card-title">Outstanding balance</div>
        <div class="kpi-value">${money(CUSTOMER.outstanding)}</div>
        <div class="kpi-delta down">2 invoices due</div>
      </div>
      <div class="card">
        <div class="card-title">Orders this month</div>
        <div class="kpi-value">14</div>
        <div class="kpi-delta up">+3 vs last month</div>
      </div>
      <div class="card">
        <div class="card-title">Pending deliveries</div>
        <div class="kpi-value">2</div>
        <div class="kpi-delta">Next: today 2–4 PM</div>
      </div>
    </div>

    <div class="grid two-col">
      <div class="card">
        <div class="flex-between" style="margin-bottom:10px;">
          <div class="card-title" style="margin:0;">Recent orders</div>
          <a href="#" style="font-size:12.5px;color:var(--orange);font-weight:600;">View all</a>
        </div>
        <table>
          <thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            ${RECENT_ORDERS.map(o=>`
              <tr>
                <td class="mono">${o.id}</td>
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
              return `<div class="list-row"><span>${p.icon} ${p.name}</span><span class="mono" style="color:var(--muted);font-size:12px;">${p.id}</span></div>`;
            }).join('')}
          </div>
          <button class="btn btn-ghost btn-sm" style="margin-top:12px;width:100%;justify-content:center;" onclick="setView('wizard')">Reorder favourites</button>
        </div>
        <div class="card">
          <div class="card-title">Recommended for you</div>
          <p style="font-size:12.5px;color:var(--muted);margin:6px 0 0;">Based on your order history and current promotions.</p>
          <div class="list-row"><span>🧴 Dettol Antiseptic Soap</span><span class="badge amber">Bundle deal</span></div>
          <div class="list-row"><span>🍺 Malta Guinness 330ml</span><span class="badge green">In stock</span></div>
        </div>
      </div>
    </div>

    <div class="grid two-col" style="margin-top:16px;">
      <div class="card">
        <div class="card-title">Invoices</div>
        <table>
          <thead><tr><th>Invoice</th><th>Order</th><th>Due</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            ${INVOICES.map(i=>`
              <tr>
                <td class="mono">${i.id}</td>
                <td class="mono" style="color:var(--muted);">${i.order}</td>
                <td>${i.due}</td>
                <td>${money(i.amount)}</td>
                <td>${statusBadge(i.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Alerts</div>
        <div class="list-row"><span>⚠️ INV-5498 is overdue by 2 days</span></div>
        <div class="list-row"><span>📦 ORD-88190 is in transit — arriving today</span></div>
        <div class="list-row"><span>🔔 New negotiated rate card applied to Beverages</span></div>
      </div>
    </div>
  </div>
  `;
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

function addToCart(){
  const p = w().product;
  const price = computeLine(p, w().uom, w().qty);
  w().cart.push({
    product:p, uom:w().uom, qty:w().qty, pieces:price.pieces,
    lineSubtotal:price.lineSubtotal, discountAmt:price.discountAmt, afterDiscount:price.afterDiscount,
    validationChoice:w().validationChoice
  });
  w().product = null; w().validationChoice = null;
  goStep('category');
}
function removeCartItem(idx){ w().cart.splice(idx,1); renderMain(); afterWizard(); }

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
  return `
  <div class="step-eyebrow">Step 6 of 7</div>
  <div class="step-title">Sign &amp; submit</div>
  <p class="step-hint">A digital signature and optional purchase order attachment close out the order — matching how your team already confirms orders on paper.</p>

  <div class="review-block">
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
    <button class="btn btn-primary" ${w().signed?'':'disabled'} onclick="submitOrder()">Submit order →</button>
  </div>
  `;
}
function toggleSign(){ w().signed = !w().signed; renderMain(); afterWizard(); }
function attachPO(){ w().poAttached = true; renderMain(); afterWizard(); }

function submitOrder(){
  w().orderNum = 'ORD-' + Math.floor(80000 + Math.random()*9999);
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
      <button class="btn btn-ghost" onclick="alert('Invoice PDF generated (prototype simulation).')">Download invoice PDF</button>
      <button class="btn btn-primary" onclick="resetWizard()">Start new order</button>
    </div>
  </div>
  `;
}
function resetWizard(){
  state.wizard = {
    step:0, business:{ branch:'osu', location:'Oxford Street, Osu, Accra', rep:'Kojo Mensah' },
    category:null, product:null, uom:'piece', qty:1, validationChoice:null,
    cart:[], signed:false, poAttached:false, orderNum:null
  };
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
      <div class="wh-map">
        ${WAREHOUSE_ZONES.map(z=>`
          <div class="wh-zone">
            <div class="zn">${z.name}</div>
            <div class="bins">${z.bins.map(b=>`<div class="bin ${b}"></div>`).join('')}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:12px;">Order fulfilment pipeline</div>
      <div class="kanban">
        ${kanbanCol('Queued', PICK_QUEUE.queued)}
        ${kanbanCol('Picking', PICK_QUEUE.picking)}
        ${kanbanCol('Packing', PICK_QUEUE.packing)}
        ${kanbanCol('Dispatch', PICK_QUEUE.dispatch)}
      </div>
    </div>

    <div class="grid two-col" style="margin-top:16px;">
      <div class="card">
        <div class="card-title">Low stock alerts</div>
        ${LOW_STOCK.map(p=>`
          <div class="list-row"><span>${p.icon} ${p.name}</span><span class="badge ${p.stock.available===0?'red':'amber'}">${p.stock.available} pcs left</span></div>
        `).join('')}
      </div>
      <div class="card">
        <div class="card-title">Returns &amp; damage workflow</div>
        <div class="list-row"><span>RMA-2214 — 3 units, water damage</span><span class="badge amber">Credit note pending</span></div>
        <div class="list-row"><span>RMA-2209 — 1 unit, wrong SKU picked</span><span class="badge green">Resolved</span></div>
      </div>
    </div>
  </div>
  `;
}
function kanbanCol(title, items){
  return `<div class="kcol"><h5><span>${title}</span><span>${items.length}</span></h5>
    ${items.map(o=>`<div class="kcard"><div class="id">${o.id}</div><div class="nm">${o.nm}</div><div style="color:var(--muted);">${o.lines} lines</div></div>`).join('')}
  </div>`;
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
      <div class="card"><div class="card-title">Monthly target</div><div class="kpi-value">GH₵ 180k</div><div class="kpi-delta up">72% achieved</div></div>
      <div class="card"><div class="card-title">Orders this month</div><div class="kpi-value">61</div></div>
      <div class="card"><div class="card-title">Commission accrued</div><div class="kpi-value">GH₵ 6,340</div></div>
      <div class="card"><div class="card-title">Collections pending</div><div class="kpi-value">GH₵ 96,380</div><div class="kpi-delta down">5 accounts overdue</div></div>
    </div>

    <div class="grid two-col">
      <div class="card">
        <div class="card-title">Assigned customers</div>
        <table>
          <thead><tr><th>Customer</th><th>Last order</th><th>Balance</th><th>Risk</th></tr></thead>
          <tbody>
            ${SALES_CUSTOMERS.map(c=>`
              <tr><td>${c.name}</td><td>${c.last}</td><td>${money(c.balance)}</td>
              <td><span class="badge ${c.risk==='High'?'red':c.risk==='Medium'?'amber':'green'}">${c.risk}</span></td></tr>
            `).join('')}
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
      <p class="section-sub" style="margin-bottom:0;">GST-compliant invoicing · two-way Tally sync · last reconciled 4 minutes ago</p>
    </div>
  </div>
  <div class="dash-body wrap">
    <div class="grid kpi-row">
      <div class="card"><div class="card-title">Receivables outstanding</div><div class="kpi-value">GH₵ 412k</div></div>
      <div class="card"><div class="card-title">Overdue &gt; 30 days</div><div class="kpi-value">GH₵ 68k</div><div class="kpi-delta down">14 accounts</div></div>
      <div class="card"><div class="card-title">Invoices issued (mo)</div><div class="kpi-value">1,204</div></div>
      <div class="card"><div class="card-title">Tally sync status</div><div class="kpi-value" style="font-size:20px;color:var(--teal);">✓ Connected</div></div>
    </div>

    <div class="grid two-col">
      <div class="card">
        <div class="card-title">Receivables aging</div>
        <div class="chart-box"><canvas id="agingChart"></canvas></div>
      </div>
      <div class="card">
        <div class="card-title">Sync queue</div>
        <div class="list-row"><span>Invoices → Tally</span><span class="badge green">Synced</span></div>
        <div class="list-row"><span>Credit notes → Tally</span><span class="badge green">Synced</span></div>
        <div class="list-row"><span>Payments ← Tally</span><span class="badge amber">3 queued</span></div>
        <div class="list-row"><span>Customer master ↔ Tally</span><span class="badge green">Synced</span></div>
        <p style="font-size:11.5px;color:var(--muted);margin-top:10px;">If Tally goes offline, changes queue locally, version, and reconcile automatically on reconnect — nothing is lost or double-posted.</p>
      </div>
    </div>

    <div class="card" style="margin-top:16px;">
      <div class="card-title">Recent invoices</div>
      <table>
        <thead><tr><th>Invoice</th><th>Customer</th><th>Due</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td class="mono">INV-5521</td><td>Adjei Retail Stores</td><td>07 Aug 2026</td><td>${money(4820.50)}</td><td>${statusBadge('Outstanding')}</td></tr>
          <tr><td class="mono">INV-5498</td><td>Adjei Retail Stores</td><td>26 Jul 2026</td><td>${money(7640.75)}</td><td>${statusBadge('Overdue')}</td></tr>
          <tr><td class="mono">INV-5502</td><td>Nyame Foods Ltd</td><td>02 Aug 2026</td><td>${money(31200)}</td><td>${statusBadge('Outstanding')}</td></tr>
          <tr><td class="mono">INV-5460</td><td>Blessed Mart</td><td>10 Jul 2026</td><td>${money(3200)}</td><td>${statusBadge('Paid')}</td></tr>
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
      <div class="card"><div class="card-title">Revenue (mo-to-date)</div><div class="kpi-value">GH₵ 2.41M</div><div class="kpi-delta up">+11.4% vs last mo</div></div>
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
        <div class="list-row"><span>Greater Accra</span><span><b>GH₵ 1.12M</b></span></div>
        <div class="list-row"><span>Ashanti</span><span><b>GH₵ 640k</b></span></div>
        <div class="list-row"><span>Western</span><span><b>GH₵ 310k</b></span></div>
        <div class="list-row"><span>Volta</span><span><b>GH₵ 210k</b></span></div>
        <div class="list-row"><span>Northern</span><span><b>GH₵ 148k</b></span></div>
      </div>
      <div class="card">
        <div class="card-title">Demand forecast — next 7 days</div>
        <div class="list-row"><span>🥤 Beverages</span><span class="badge green">↑ 12%</span></div>
        <div class="list-row"><span>🍜 Snacks</span><span class="badge grey">Stable</span></div>
        <div class="list-row"><span>💊 Medical</span><span class="badge amber">↑ 22% (flu season)</span></div>
        <div class="list-row"><span>🧊 Frozen</span><span class="badge red">↓ 8% (cold chain gap)</span></div>
      </div>
      <div class="card">
        <div class="card-title">Integration health</div>
        <div class="list-row"><span>Tally ERP</span><span class="badge green">Connected</span></div>
        <div class="list-row"><span>SAP</span><span class="badge grey">Not configured</span></div>
        <div class="list-row"><span>Payment gateway</span><span class="badge grey">N/A — offline terms</span></div>
        <div class="list-row"><span>SMS / WhatsApp notify</span><span class="badge green">Connected</span></div>
      </div>
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
          { label:'Revenue (GH₵ k)', data:[210,232,198,255,268,241,289,301], borderColor:'#FF6A1A', backgroundColor:'rgba(255,106,26,.1)', tension:.35, fill:true, yAxisID:'y' },
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
  return `
  <div class="dash-header">
    <div class="wrap">
      <div class="section-title">Dispatch &amp; Driver Portal</div>
      <p class="section-sub" style="margin-bottom:0;">Driver: Yaw Boateng · Vehicle GH-4471-24 · 3 stops today</p>
    </div>
  </div>
  <div class="dash-body wrap">
    <div class="grid kpi-row" style="grid-template-columns:repeat(3,1fr);">
      <div class="card"><div class="card-title">Stops today</div><div class="kpi-value">3</div></div>
      <div class="card"><div class="card-title">Delivered</div><div class="kpi-value">1</div></div>
      <div class="card"><div class="card-title">On-time rate (mo)</div><div class="kpi-value">94%</div></div>
    </div>

    <div class="card">
      <div class="card-title" style="margin-bottom:10px;">Delivery route</div>
      <table>
        <thead><tr><th>Order</th><th>Customer</th><th>Address</th><th>Window</th><th>Status</th><th></th></tr></thead>
        <tbody>
          ${DELIVERIES.map(d=>`
            <tr>
              <td class="mono">${d.id}</td>
              <td>${d.nm}</td>
              <td>${d.addr}</td>
              <td>${d.win}</td>
              <td>${statusBadge(d.status==='Out for delivery'?'In Transit':d.status==='Delivered'?'Delivered':'Outstanding')}</td>
              <td>${d.status!=='Delivered' ? `<button class="btn btn-ghost btn-sm" onclick="alert('Proof of delivery captured: signature + photo + OTP verified (prototype simulation).')">Capture POD</button>` : '<span style="color:var(--muted);font-size:12px;">✓ Signed &amp; photographed</span>'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="grid two-col" style="margin-top:16px;">
      <div class="card">
        <div class="card-title">Proof of delivery — last stop</div>
        <div class="list-row"><span>Customer signature</span><span class="badge green">Captured</span></div>
        <div class="list-row"><span>Delivery photo</span><span class="badge green">Captured</span></div>
        <div class="list-row"><span>OTP verification</span><span class="badge green">Verified — 4821</span></div>
      </div>
      <div class="card">
        <div class="card-title">Route optimisation</div>
        <p style="font-size:13px;color:var(--muted);margin:0 0 10px;">The routing engine selected this sequence to minimise total distance while respecting each customer's delivery window.</p>
        <div class="list-row"><span>1. Blessed Mart — Dansoman</span><span class="badge green">Done</span></div>
        <div class="list-row"><span>2. Adjei Retail — Osu</span><span class="badge amber">In progress</span></div>
        <div class="list-row"><span>3. Freetown Provisions — Spintex</span><span class="badge grey">Queued</span></div>
      </div>
    </div>
  </div>
  `;
}
