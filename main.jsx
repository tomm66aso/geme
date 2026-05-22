import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, CalendarDays, ChevronRight, MapPin, Menu as MenuIcon, Phone, ShipWheel, Sparkles, X } from 'lucide-react';
import './styles.css';

const A = {
  logo: 'https://static.wixstatic.com/media/67f7ff_d2e4edffec23402cb9c5ce6387c3bc0c~mv2.png/v1/fill/w_456,h_260,al_c,lg_1,q_85,enc_avif,quality_auto/67f7ff_d2e4edffec23402cb9c5ce6387c3bc0c~mv2.png',
  hero: 'https://static.wixstatic.com/media/67f7ff_0ab61087b02643a186a11d4f43d31bed~mv2.jpg/v1/fill/w_1600,h_2000,al_c,q_90,enc_avif,quality_auto/67f7ff_0ab61087b02643a186a11d4f43d31bed~mv2.jpg',
  village: 'https://static.wixstatic.com/media/67f7ff_e5fc11d4945f402dbe87d01616255e89~mv2.jpg/v1/fill/w_1454,h_1938,al_c,q_90,enc_avif,quality_auto/67f7ff_e5fc11d4945f402dbe87d01616255e89~mv2.jpg',
  twins: 'https://static.wixstatic.com/media/67f7ff_776f8e50b4b548f59cd6bc8366f7bb7a~mv2.jpg/v1/crop/x_25,y_0,w_4622,h_6229/fill/w_1070,h_1442,al_c,q_90,enc_avif,quality_auto/DSC09589%20%281%29.jpg',
  raw: 'https://static.wixstatic.com/media/67f7ff_9611fd5850494693922a8da98600c14d~mv2.jpg/v1/fill/w_960,h_1280,al_c,q_90,enc_avif,quality_auto/67f7ff_9611fd5850494693922a8da98600c14d~mv2.jpg',
  menu: 'https://static.wixstatic.com/media/67f7ff_cd13960150a848e3bdaafa67291fd862~mv2.jpg/v1/fill/w_1960,h_1306,al_c,q_90,enc_avif,quality_auto/67f7ff_cd13960150a848e3bdaafa67291fd862~mv2.jpg',
  dish: 'https://static.wixstatic.com/media/67f7ff_66d0aa70534f43d9b4cb697cf918c122~mv2.jpg/v1/fill/w_1000,h_1300,al_c,q_90,enc_avif,quality_auto/67f7ff_66d0aa70534f43d9b4cb697cf918c122~mv2.jpg',
  charter: 'https://static.wixstatic.com/media/67f7ff_89bc9c1047004d3d8f702e3f9c890bcc~mv2.jpg/v1/fill/w_1600,h_1200,al_c,q_90,enc_avif,quality_auto/1%20charter%20(5).JPG'
};

const routes = ['home','prenotazioni','menu','cantina','storia','contatti','loft','franchising','events'];
const nav = {home:'Home', prenotazioni:'Prenotazioni', menu:'Menu', cantina:'Cantina Vini', storia:'La Nostra Storia', contatti:'Contatti', loft:'Loft', franchising:'Franchising', events:'Private Events'};
const map = {home:'/', prenotazioni:'/prenotazioni', menu:'/menu', cantina:'/cantina-vini', storia:'/la-nostra-storia', contatti:'/contatti', loft:'/da-i-gemelli-loft', franchising:'/franchising', events:'/private-events'};
function routeFromPath(){ const p = location.pathname; return routes.find(r => map[r] === p) || 'home'; }
function go(r){ history.pushState({},'', map[r]); dispatchEvent(new Event('popstate')); scrollTo({top:0, behavior:'smooth'}); }

function App(){
  const [page,setPage] = useState(routeFromPath());
  useEffect(()=>{ const f=()=>setPage(routeFromPath()); addEventListener('popstate',f); return()=>removeEventListener('popstate',f);},[]);
  const Page = useMemo(()=>({home:Home, prenotazioni:Booking, menu:MenuPage, cantina:Wine, storia:Story, contatti:Contact, loft:Loft, franchising:Franchise, events:Events}[page]),[page]);
  return <><CursorGlow/><Nav page={page}/><AnimatePresence mode="wait"><motion.main key={page} initial={{opacity:0, y:18, filter:'blur(10px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-18,filter:'blur(10px)'}} transition={{duration:.65,ease:[.19,1,.22,1]}}><Page/></motion.main></AnimatePresence><Footer/></>;
}

function CursorGlow(){ return <div className="ambient"><span/><span/><span/></div>; }
function Nav({page}){ const [open,setOpen]=useState(false); return <header className="nav"><button className="logoBtn" onClick={()=>go('home')}><img src={A.logo} alt="Da i Gemelli"/><b>Portofino</b></button><nav className="navLinks">{routes.map(r=><button key={r} onClick={()=>go(r)} className={page===r?'active':''}>{nav[r]}</button>)}</nav><button className="book" onClick={()=>go('prenotazioni')}>Prenota <ArrowUpRight size={16}/></button><button className="hamb" onClick={()=>setOpen(!open)}>{open?<X/>:<MenuIcon/>}</button><AnimatePresence>{open&&<motion.div className="drawer" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}}>{routes.map(r=><button key={r} onClick={()=>{go(r);setOpen(false)}}>{nav[r]}</button>)}</motion.div>}</AnimatePresence></header>; }

function Home(){ const {scrollY}=useScroll(); const y=useTransform(scrollY,[0,900],[0,180]); const scale=useTransform(scrollY,[0,900],[1.05,1.18]); return <>
  <section className="introHero">
    <motion.img className="heroPhoto" src={A.hero} alt="Panorama mare Portofino Da i Gemelli" style={{y,scale}}/>
    <div className="cinema"/><div className="grain"/>
    <motion.div className="opening dai" initial={{opacity:0,x:-120,y:-30,rotate:-4,filter:'blur(24px)'}} animate={{opacity:1,x:0,y:0,rotate:0,filter:'blur(0px)'}} transition={{duration:1.55,delay:.18,ease:[.16,1,.3,1]}}>dai</motion.div>
    <motion.div className="opening gemelli" initial={{opacity:0,x:150,y:46,rotate:3,filter:'blur(24px)'}} animate={{opacity:1,x:0,y:0,rotate:0,filter:'blur(0px)'}} transition={{duration:1.7,delay:.62,ease:[.16,1,.3,1]}}>gemelli</motion.div>
    <motion.div className="heroPanel" initial={{opacity:0,y:42}} animate={{opacity:1,y:0}} transition={{duration:1,delay:1.15}}><p className="kicker">Restaurant & Lounge Bar · Portofino</p><h1>Il mare, la luce, l’eleganza di una tavola italiana.</h1><p>Un’esperienza premium sul porto: cucina ligure contemporanea, crudi, vini e ospitalità scenografica.</p><div className="cta"><button onClick={()=>go('prenotazioni')}>Prenota un tavolo <ChevronRight size={18}/></button><button onClick={()=>go('menu')} className="outline">Esplora il menu</button></div></motion.div>
    <div className="scrollMark">scroll</div>
  </section>
  <Manifesto/><SignatureGrid/><Experience/><Mosaic/>
</>; }
function Reveal({children, className=''}){return <motion.div className={className} initial={{opacity:0,y:55}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-90px'}} transition={{duration:.85,ease:[.19,1,.22,1]}}>{children}</motion.div>}
function Manifesto(){ return <section className="manifesto"><Reveal><p className="kicker">Design direction</p><h2>Portofino come un film: texture calde, vetro, oro, mare e fotografia editoriale.</h2></Reveal><Reveal><p>Il sito è stato ripensato con sezioni immersive, micro-interazioni, tipografia luxury e una home che apre con l’animazione richiesta: “dai” in alto a sinistra e “gemelli” in basso a destra sopra il panorama.</p></Reveal></section> }
function SignatureGrid(){ const items=[['Menu','Un racconto di mare e territorio',A.raw,'menu'],['Prenota','Il tuo tavolo affacciato su Portofino',A.village,'prenotazioni'],['Cantina','Bianchi liguri, bollicine, grandi etichette italiane',A.dish,'cantina']]; return <section className="signature">{items.map((it,i)=><Reveal key={it[0]}><button className="sigCard" onClick={()=>go(it[3])}><img src={it[2]}/><div><span>0{i+1}</span><h3>{it[0]}</h3><p>{it[1]}</p><ArrowUpRight/></div></button></Reveal>)}</section> }
function Experience(){ return <section className="experience"><Reveal><img src={A.village}/></Reveal><Reveal><article><p className="kicker">Portofino front row</p><h2>Un tavolo sospeso tra borgo, mare e luce.</h2><p>La nuova identità digitale mette in primo piano il luogo: fotografie grandi, spazi respirati, dettagli materici e call to action chiare per prenotare.</p><ul><li><Sparkles/>Hero cinematografica animata</li><li><Sparkles/>Multipagina come il sito originale</li><li><Sparkles/>Design responsive GitHub/Vercel-ready</li></ul></article></Reveal></section> }
function Mosaic(){ return <section className="mosaic"><Reveal><img src={A.twins}/></Reveal><Reveal><img src={A.raw}/></Reveal><Reveal><img src={A.charter}/></Reveal><Reveal><div className="quote">“Da i Gemelli interpreta il mare di Portofino con eleganza.”</div></Reveal></section> }

function PageHero({title,sub,img}){ return <section className="pageHero"><img src={img}/><div className="pageShade"/><motion.article initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:.85}}><p className="kicker">Da i Gemelli Portofino</p><h1>{title}</h1><p>{sub}</p></motion.article></section> }
function MenuPage(){ return <><PageHero title="Menu" sub="Un racconto di mare e territorio, crudi, primi e sapori liguri." img={A.raw}/><SectionBlocks title="La carta" items={['Crudi & Plateau','Primi di mare','Pescato del giorno','Dessert italiani']}/></> }
function Booking(){ return <><PageHero title="Prenotazioni" sub="Il tuo tavolo affacciato su Portofino." img={A.village}/><Info/></> }
function Wine(){ return <><PageHero title="Cantina Vini" sub="Etichette italiane, bollicine e abbinamenti per il mare." img={A.dish}/><SectionBlocks title="Selezione" items={['Champagne & Metodo Classico','Bianchi liguri','Rosati mediterranei','Grandi rossi italiani']}/></> }
function Story(){ return <><PageHero title="La Nostra Storia" sub="Due gemelli, una baia, una cucina che parla ligure." img={A.twins}/><section className="story"><Reveal><h2>Famiglia, Porto, Mare.</h2><p>Una narrazione visiva calda e autorevole per valorizzare persone, materia prima e atmosfera.</p></Reveal></section></> }
function Contact(){ return <><PageHero title="Contatti" sub="Vieni a trovarci a Portofino." img={A.hero}/><Info/></> }
function Loft(){ return <><PageHero title="Da i Gemelli Loft" sub="Ospitalità e atmosfera Portofino anche oltre il ristorante." img={A.menu}/><SectionBlocks title="Loft experience" items={['Soggiorni su misura','Concierge locale','Esperienze mare','Cena privata']}/></> }
function Franchise(){ return <><PageHero title="Franchising" sub="Un’identità forte, riconoscibile e pronta a scalare." img={A.village}/><SectionBlocks title="Concept" items={['Brand system','Format premium','Esperienza italiana','Manuale operativo']}/></> }
function Events(){ return <><PageHero title="Private Events" sub="Cene, ricevimenti e momenti privati disegnati sulla luce di Portofino." img={A.charter}/><SectionBlocks title="Eventi" items={['Cena privata','Boat arrival','Wedding dinner','Corporate hospitality']}/></> }
function SectionBlocks({title,items}){ return <section className="blocks"><Reveal><h2>{title}</h2></Reveal><div>{items.map((x,i)=><Reveal key={x}><article><span>{String(i+1).padStart(2,'0')}</span><h3>{x}</h3><p>Dettaglio editoriale, animazioni morbide e layout elegante per un’esperienza premium.</p></article></Reveal>)}</div></section> }
function Info(){ const arr=[['Da i Gemelli Molo','Molo Umberto 1-5, 16034 Portofino','+39 0185 269089','Chiuso Martedì'],['Da i Gemelli','Calata Marconi, 7, 16034 Portofino','+39 0185 269257','Chiuso Giovedì'],['Orari di Apertura','Lun - Dom','12:00 - 15:00','19:00 - 23:00']]; return <section className="info">{arr.map((x,i)=><Reveal key={x[0]}><article>{i===0?<MapPin/>:i===1?<Phone/>:<CalendarDays/>}<h3>{x[0]}</h3><p>{x.slice(1).map(v=><React.Fragment key={v}>{v}<br/></React.Fragment>)}</p></article></Reveal>)}</section> }
function Footer(){ return <footer><div><img src={A.logo}/><p>Portofino · Restaurant & Lounge Bar</p></div><button onClick={()=>go('prenotazioni')}>Prenota ora <ShipWheel size={18}/></button><a href="https://www.instagram.com/daigemelliportofino/" target="_blank">Instagram</a></footer> }

createRoot(document.getElementById('root')).render(<App/>);
