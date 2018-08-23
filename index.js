console.log('hello');

const frequencies=[
  261.6256,
  277.1826,					
  293.6648,
  311.1270,					
  329.6276,
  349.2282,					
  369.9944,					
  391.9954,					
  415.3047,					
  440.0000,
  466.1638,					
  493.8833,
  523.2511
]

function createButton(id){
  let a = document.createElement('button');
  a.setAttribute('data-id', id);
  a.setAttribute('data-checked', '0');
  a.onclick = function(e){
    console.log(e.target);
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
  o.connect(context.destination);
  o.start();
  return o;
}

for(let b = 0; b < 12; b++) {
  oscillators.push(createOscillator());
  const div = document.createElement('div');
  div.classList.add('column');
  document.body.appendChild(div);
  for(let note = 0; note < 12; note++) {
    div.appendChild(createButton(note)); 
  }
}



function strum(){
  console.log(beat);
  let notes = beats[beat % 12].children; 
  beat++;
  //console.log(notes);
  for (const note of notes){
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
setInterval(strum, 600);






