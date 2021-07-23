const names = [
  'Quartes', 
  'DurmoDeMeinha', 
  'Jantando', 
  'Luan', 
  'Luano', 
  'Pixie',
  'Myrkridian',
  'Dra. Kirishima',
  'Appeaser Crimson',
  'Diane'
]

export default function sortName(){
  const randomIndex = Math.floor(Math.random() * names.length);

  return names[randomIndex];
}