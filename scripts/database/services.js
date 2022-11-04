// récupération des datas photographes
export async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  if (!response.ok) {
    console.log("Photographers: ", response.statusText);
  }
  const { photographers } = data;

  return photographers;
}

// récupération des datas medias
export async function getMedias() {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  if (!response.ok) {
    console.log("Medias: ", response.statusText);
  }
  const { medias } = data;

  return medias;
}
