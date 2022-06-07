export default function drawName(names: string[]){
  const randomIndex = Math.floor(Math.random() * names.length);

  return names[randomIndex];
}