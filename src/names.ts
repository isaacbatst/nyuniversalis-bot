export default function sortName(names: string[]){
  const randomIndex = Math.floor(Math.random() * names.length);

  return names[randomIndex];
}