const unsplash = (str: TemplateStringsArray) => `https://source.unsplash.com/${str[0]}/400x300`;


export const categories: { slug: string, name: string, img: string }[] = [
  { slug: 'salas-de-estudio', name: 'Salas de estudio', img: unsplash`s9CC2SKySJM` },
  { slug: 'donde-comer', name: 'Donde comer', img: unsplash`tKN1WXrzQ3s` },
  { slug: 'banos', name: 'Baños', img: unsplash`d6LzDABxP6I` },
  { slug: 'puntos-de-reciclaje', name: 'Puntos de reciclaje', img: unsplash`aI4RJ--Mw4I` },
  { slug: 'donde-dormir', name: 'Donde dormir', img: unsplash`6I6r7c_0JRU` },
]
