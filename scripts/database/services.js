// récupération des datas photographes
export async function getPhotographers() {
  const response = await fetch("../../data/photographers.json");
  const data = await response.json();
  if (!response.ok) {
    const error = "Impossible de récupérer les données photographe !";
    throw error;
  }
  const { photographers } = data;

  return photographers;
}

// récupération des datas medias
export async function getMedias() {
  const response = await fetch("../../data/photographers.json");
  const data = await response.json();
  if (!response.ok) {
    const error = "Impossible de récupérer les données média !";
    throw error;
  }
  const { medias } = data;

  return medias;
}
