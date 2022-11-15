// récupération des datas photographes
export async function getPhotographers() {
  const response = await fetch("datas/photographers.json");
  if (!response.ok) {
    console.log(`Photographers: ${response.statusText}`);
  }
  const data = await response.json();
  const { photographers } = data;

  return photographers;
}

// récupération des datas medias
export async function getMedias() {
  const response = await fetch("datas/photographers.json");
  if (!response.ok) {
    console.log(`Medias: ${response.statusText}`);
  }
  const data = await response.json();
  const { medias } = data;

  return medias;
}
