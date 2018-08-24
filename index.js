const tick = 125;
const numBeats = 16;

// const frequencies=[
//   261.6256,
//   277.1826,					
//   293.6648,
//   311.1270,					
//   329.6276,
//   349.2282,					
//   369.9944,					
//   391.9954,					
//   415.3047,					
//   440.0000,
//   466.1638,					
//   493.8833,
//   523.2511
// ]
// const frequencies=[
//   261.6256,
// 
//   293.6648,
// 
//   329.6276,
//   349.2282,					
// 
//   391.9954,					
// 
//   440.0000,
// 
//   493.8833,
//   523.2511
// ]
const frequencies=[
  261.6256,

  293.6648,
  311.1270,					

  349.2282,					

  391.9954,					
  415.3047,					

  466.1638,					

  523.2511
]
const numNotes = frequencies.length;

function createButton(id){
  let a = document.createElement('button');
  a.setAttribute('data-id', id);
  a.setAttribute('data-checked', '0');
  a.onclick = function(e){
    let element = e.target;
    element.setAttribute('data-checked', (element.dataset.checked === '0' ? '1': '0'));
  }

  return a;
}
//const oscillators = new Array(13).fill([]);
const oscillators = [];
const context = new AudioContext();

function createOscillator(){
  const o = context.createOscillator();
  o.frequency.value = 0;
  o.type = 'triangle';
  o.connect(context.destination);
  o.start();
  return o;
}
for(let n = 0; n < numNotes; n++) {
  oscillators.push(createOscillator());
}

for(let b = 0; b < numBeats; b++) {
  const div = document.createElement('div');
  div.classList.add('column');
  document.body.appendChild(div);
  for(let note = 0; note < numNotes; note++) {
    div.appendChild(createButton(note)); 
  }
}


function clearAll() {
  Array.from(document.querySelectorAll('.active')).forEach((e)=> e.classList.remove('active'));
}


function strum(){
  const index = beat % numBeats;
  progress.setAttribute('value', index);
  let old = beats[(index % numBeats) -1]
  // if(old) {
  //   old.classList.remove('active')
  // } else {
  //   console.log('1')
  // 
  //   // beats[numBeats.length - 1].classList.remove('active');
  // }
  
  let column = beats[index]; 
  clearAll();
  column.classList.add('active')
  beat++;
  
  for (const note of column.children){
    const id = note.dataset.id
    if(oscillators[id]) {
      if(note.dataset.checked === '0') {
        oscillators[id].frequency.value = 0;
      } else {
        oscillators[id].frequency.value = frequencies[id];
      }
    }
  }
}

const beats = document.querySelectorAll('.column');

let beat = 0;
const progress = document.createElement('progress');
progress.setAttribute('max', numBeats);
progress.setAttribute('value', 0);
document.body.appendChild(progress);
// const soundSelect = document.createElement('select');
// const types = ["sine", "square", "sawtooth", "triangle"];
// for(const i = 0; i < types.count; i++) {
//   const opt = document.createElement('option');
//   opt.setAttribute('value', types[i]);
//   opt.innerHTML += types[i];
//   soundSelect.appendChild(opt);
// }
// 
// document.body.appendChild(soundSelect);


setInterval(strum, tick);






