const SUPABASE_URL = "https://goszhtwxgdnfbzxrchll.supabase.co";
const SUPABASE_KEY = "sb_publishable_WIjWqmN-p0o2MlsGpPFF8A_Ibk_VcvOsb_publishable_WIjWqmN-p0o2MlsGpPFF8A_Ibk_VcvO";
const sampleListings = [
 {id:1,type:'product',title:'Modern sneakers — size 42',price:380,location:'Accra',seller:'Kojo Mensah',initials:'KM',emoji:'👟',description:'Clean everyday sneakers. Comfortable fit and ready for pickup.',category:'Fashion'},
 {id:2,type:'product',title:'Cordless power drill set',price:650,location:'Tema',seller:'BuildSmart Tools',initials:'BT',emoji:'🛠️',description:'Cordless drill with charger and starter bits. Ideal for home projects.',category:'Tools'},
 {id:3,type:'job',title:'Sales assistant',price:null,location:'Kumasi',seller:'Ashanti Retail Hub',initials:'AR',emoji:'💼',description:'Full-time role for a friendly, organised person. Customer service experience is a plus.',category:'Full-time'},
 {id:4,type:'service',title:'Professional painting services',price: 'From 500',location:'Accra',seller:'Kwame — Painter',initials:'KP',emoji:'🖌️',description:'Interior and exterior painting, wall preparation and neat finishing.',category:'Home improvement'},
 {id:5,type:'product',title:'Compact study desk',price:850,location:'Takoradi',seller:'WoodCraft GH',initials:'WG',emoji:'🪑',description:'Space-saving wooden desk for a bedroom, office or study corner.',category:'Furniture'},
 {id:6,type:'job',title:'Junior graphic designer',price:null,location:'Accra',seller:'Creative House GH',initials:'CH',emoji:'🎨',description:'Looking for a creative junior designer. Portfolio required; hybrid work may be possible.',category:'Creative'},
 {id:7,type:'service',title:'AC installation & servicing',price:'Contact',location:'Tema',seller:'CoolCare Services',initials:'CC',emoji:'❄️',description:'Installation, routine servicing and troubleshooting for home and office AC units.',category:'Repairs'},
 {id:8,type:'product',title:'LED ceiling light set',price:420,location:'Accra',seller:'Bright Living',initials:'BL',emoji:'💡',description:'Contemporary LED lights for a living room or bedroom. Ask seller for sizes.',category:'Home'},
 {id:9,type:'service',title:'CV writing and interview prep',price:'From 100',location:'Kumasi',seller:'CareerStep GH',initials:'CS',emoji:'📄',description:'CV formatting, application support and practice interviews for job seekers.',category:'Career'}
];
let listings = [...sampleListings];
let activeCategory = 'all';
const $ = id => document.getElementById(id);
const typeNames = {product:'Product',job:'Job',service:'Service'};
const typeBg = {product:'product-bg',job:'job-bg',service:'service-bg'};
const typePriceLabel = {product:'Asking price',job:'Pay / salary',service:'Service fee'};
function formatPrice(price,type){ if(price===null || price===undefined || price==='') return type==='job'?'See listing':'Contact for price'; if(typeof price==='number') return 'GH₵ '+price.toLocaleString('en-GH'); return price.startsWith('From')?price:price; }
function renderListings(){
 const q=$('searchInput').value.trim().toLowerCase(); const loc=$('locationFilter').value;
 const filtered=listings.filter(x=>(activeCategory==='all'||x.type===activeCategory)&&(loc==='all'||x.location===loc)&&(!q||[x.title,x.description,x.seller,x.location,x.category,typeNames[x.type]].join(' ').toLowerCase().includes(q)));
 $('listingGrid').innerHTML=filtered.map(x=>`<article class="listing-card"><div class="listing-visual ${typeBg[x.type]}"><span class="listing-type">${typeNames[x.type]}</span><span class="visual-emoji" aria-hidden="true">${x.emoji}</span></div><div class="listing-body"><div class="listing-title-row"><h3>${escapeHtml(x.title)}</h3></div><div class="price">${escapeHtml(formatPrice(x.price,x.type))}</div><div class="price-label">${typePriceLabel[x.type]}</div><p class="listing-desc">${escapeHtml(x.description||'Contact the poster for more information.')}</p><div class="listing-meta"><span class="seller"><span class="avatar">${escapeHtml(x.initials||'NG')}</span><span>${escapeHtml(x.location)}<br>${escapeHtml(x.seller)}</span></span><button class="contact-btn" data-contact="${x.id}">Contact</button></div></div></article>`).join('');
 $('emptyState').classList.toggle('hidden',filtered.length!==0); $('listingGrid').classList.toggle('hidden',filtered.length===0);
 $('listingTitle').textContent=activeCategory==='all'?'Discover what’s out there':`Explore ${activeCategory==='product'?'products':activeCategory==='job'?'jobs':'services'}`;
 document.querySelectorAll('[data-category]').forEach(b=>b.classList.toggle('active',b.classList.contains('filter-pill')&&b.dataset.category===activeCategory));
 document.querySelectorAll('.category-tile').forEach(b=>b.classList.toggle('selected',b.dataset.category===activeCategory));
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function setCategory(category){activeCategory=category;renderListings();$('marketplace').scrollIntoView({behavior:'smooth',block:'start'});}
function openModal(type='product'){$('listingForm').classList.remove('hidden');$('formSuccess').classList.add('hidden');$('listingForm').reset();$('postType').value=type;$('modalBackdrop').classList.remove('hidden');document.body.style.overflow='hidden';setTimeout(()=>$('postTitle').focus(),50);}
function closeModal(){$('modalBackdrop').classList.add('hidden');document.body.style.overflow='';}
function toast(message){$('toast').textContent=message;$('toast').classList.remove('hidden');setTimeout(()=>$('toast').classList.add('hidden'),2800);}
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>setCategory(b.dataset.category)));
document.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.jump).scrollIntoView({behavior:'smooth'})));
$('searchBtn').addEventListener('click',()=>{renderListings();$('marketplace').scrollIntoView({behavior:'smooth'});});$('searchInput').addEventListener('input',renderListings);$('locationFilter').addEventListener('change',renderListings);
['postTopBtn','heroPostBtn','postSectionBtn','bannerPostBtn','mobilePostBtn','emptyPostBtn'].forEach(id=>$(id).addEventListener('click',()=>openModal()));
$('modalClose').addEventListener('click',closeModal);$('modalBackdrop').addEventListener('click',e=>{if(e.target===$('modalBackdrop'))closeModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
$('listingForm').addEventListener('submit',e=>{e.preventDefault();const type=$('postType').value;const title=$('postTitle').value.trim();const rawPrice=$('postPrice').value;const price=rawPrice===''?(type==='job'?null:'Contact'):Number(rawPrice);const location=$('postLocation').value;const description=$('postDescription').value.trim()||'Contact the poster for more information.';const contact=$('postContact').value.trim();const item={id:Date.now(),type,title,price,location,seller:'Your demo profile',initials:'YD',emoji:type==='product'?'📦':type==='job'?'💼':'🧰',description,category:typeNames[type],contact};listings.unshift(item);renderListings();$('listingForm').classList.add('hidden');$('formSuccess').classList.remove('hidden');});
$('successDone').addEventListener('click',()=>{closeModal();activeCategory='all';$('searchInput').value='';$('locationFilter').value='all';renderListings();$('marketplace').scrollIntoView({behavior:'smooth'});toast('Demo listing added. It is not published online.');});
$('listingGrid').addEventListener('click',e=>{const btn=e.target.closest('[data-contact]');if(!btn)return;const item=listings.find(x=>x.id===Number(btn.dataset.contact));if(!item)return;if(item.contact){toast('Demo contact: '+item.contact+' — no message has been sent.');}else{toast('Contact details will be available when real seller profiles are connected.');}});
$('signInBtn').addEventListener('click',()=>toast('Sign-in will be added when we connect the user database.'));
$('mobileJobsBtn').addEventListener('click',()=>setCategory('job'));$('mobileProfileBtn').addEventListener('click',()=>toast('User profiles are planned for the next build stage.'));
$('menuBtn').addEventListener('click',()=>toast('Use Explore or Post to navigate this prototype.'));
renderListings();
