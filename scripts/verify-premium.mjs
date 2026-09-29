import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
const storage=new Map();const emitted=[];
const sandbox={exports:{},process:{env:{}},URLSearchParams,Set,CustomEvent:class{constructor(type,options){this.type=type;this.detail=options.detail;}},window:{location:{hostname:'review.example.com',search:'',pathname:'/pachuca',origin:'https://review.example.com'},sessionStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},dispatchEvent:e=>emitted.push(e)}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/webAnalytics.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,sandbox);
const api=sandbox.exports;
assert.equal(api.isPublicMeasurementEnabled(),false);
sandbox.window.location.hostname='www.alexisgarciaortopedia.com';assert.equal(api.isPublicMeasurementEnabled(),true);
sandbox.window.location.search='?medicion=prueba';assert.equal(api.isPublicMeasurementEnabled(),false);sandbox.window.location.search='';assert.equal(api.isPublicMeasurementEnabled(),false);storage.clear();
for(const [query,source] of [['?ref=GMAPS-PAC','gmaps_pachuca'],['?ref=GMAPS-TUL','gmaps_tula'],['?gclid=test&ref=GMAPS-TUL','gads_pachuca'],['?name=never-send','web_other']]){sandbox.window.location.search=query;assert.equal(api.acquisitionSource(),source);}
api.trackWebEvent('contact_click',{sede:'tula',channel:'phone',placement:'hero'});assert.equal(emitted.at(-1).detail.sede,'tula');assert.equal(JSON.stringify(emitted).includes('never-send'),false);
for(const route of ['index','pachuca','tula','agendar','muevete-seguro']){
 const html=fs.readFileSync(`.next/server/app/${route}.html`,'utf8');assert.ok(html.includes('7717588383'));assert.ok(html.includes('7731754638'));assert.ok(html.includes('p-header'));assert.ok(!html.includes('consulta.mp4'));assert.ok(!html.includes('<video'),'Video media must not preload before interaction');
 if(['pachuca','tula'].includes(route)){const hero=html.slice(html.indexOf('p-hero-actions'),html.indexOf('p-hero-visual'));assert.ok(hero.includes(route==='pachuca'?'wa.me/527717588383':'wa.me/527731754638'));}
}
const program=fs.readFileSync('.next/server/app/muevete-seguro.html','utf8');assert.ok(program.includes('data-program="muevete_seguro"'));assert.ok(program.includes('527731754638'));
console.log('PASS: attribution precedence, preview/test exclusion, safe event payloads, 5 routes, correct sede CTAs, lazy video, program channel.');
