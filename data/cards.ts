const cards = [
  {
    image:
      "https://images.unsplash.com/photo-1770983438085-f840f1a72504?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTZ8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.75 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.95 },
    exploded: {
      x: -3200 + (Math.random() * 400 - 200),
      y: -280,
      opacity: 1,
      scale: 0.85,
      rotation: 0,
    },
    row: { x: -3200, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1768740067016-d7fddac028d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTZ8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.9 },
    exploded: {
      x: -2800 + (Math.random() * 400 - 200),
      y: -200,
      opacity: 1,
      scale: 0.9,
      rotation: 0,
    },
    row: { x: -2800, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1771030668566-dc2e0f24c95e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTZ8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.85 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.88 },
    exploded: {
      x: -2400 + (Math.random() * 400 - 200),
      y: -150,
      opacity: 1,
      scale: 0.95,
      rotation: 0,
    },
    row: { x: -2400, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1770929356906-765cd4e21dd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTd8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.85 },
    exploded: {
      x: -2000 + (Math.random() * 400 - 200),
      y: -100,
      opacity: 1,
      scale: 1.1,
      rotation: 0,
    },
    row: { x: -2000, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1771251004016-d879327b33c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTd8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.78 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.82 },
    exploded: {
      x: -1600 + (Math.random() * 400 - 200),
      y: -120,
      opacity: 1,
      scale: 0.92,
      rotation: 0,
    },
    row: { x: -1600, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1772173333598-31ffc020d58a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTd8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.82 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.8 },
    exploded: {
      x: -1200 + (Math.random() * 400 - 200),
      y: -180,
      opacity: 1,
      scale: 0.9,
      rotation: 0,
    },
    row: { x: -1200, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1770562525481-e7a3eae66492?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTd8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.78 },
    exploded: {
      x: -800 + (Math.random() * 400 - 200),
      y: -240,
      opacity: 1,
      scale: 0.88,
      rotation: 0,
    },
    row: { x: -800, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1770034849260-2e67f8f423a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTh8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.72 },
    exploded: {
      x: -400 + (Math.random() * 400 - 200),
      y: 50,
      opacity: 1,
      scale: 0.83,
      rotation: 0,
    },
    row: { x: -400, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1770647109112-62553107e44a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTh8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.7 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.68 },
    exploded: {
      x: 0 + (Math.random() * 400 - 200),
      y: -100,
      opacity: 1,
      scale: 0.82,
      rotation: 0,
    },
    row: { x: 0, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1771681278446-6f8eb0c7323f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTh8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.65 },
    exploded: {
      x: 400 + (Math.random() * 400 - 200),
      y: -60,
      opacity: 1,
      scale: 0.8,
      rotation: 0,
    },
    row: { x: 400, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1770752609290-264c53dc54a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTl8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.72 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.5 },
    exploded: {
      x: 800 + (Math.random() * 400 - 200),
      y: 200,
      opacity: 1,
      scale: 0.78,
      rotation: 0,
    },
    row: { x: 800, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1771009469341-576c828b7691?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUxOTl8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.74 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.6 },
    exploded: {
      x: 1200 + (Math.random() * 400 - 200),
      y: 150,
      opacity: 1,
      scale: 0.88,
      rotation: 0,
    },
    row: { x: 1200, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1772606270537-6eb199b55aed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUyMDB8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.58 },
    exploded: {
      x: 1600 + (Math.random() * 400 - 200),
      y: -120,
      opacity: 1,
      scale: 0.82,
      rotation: 0,
    },
    row: { x: 1600, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1771787616811-7ae7a73a31de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUyMDB8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.52 },
    exploded: {
      x: 2000 + (Math.random() * 400 - 200),
      y: 180,
      opacity: 1,
      scale: 0.8,
      rotation: 0,
    },
    row: { x: 2000, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1769881846576-959f7e84ce32?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUyMDB8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.72 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.5 },
    exploded: {
      x: 2400 + (Math.random() * 400 - 200),
      y: 100,
      opacity: 1,
      scale: 0.86,
      rotation: 0,
    },
    row: { x: 2400, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1772339014113-29414e7295b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUyMDB8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.48 },
    exploded: {
      x: 2800 + (Math.random() * 400 - 200),
      y: 140,
      opacity: 1,
      scale: 0.84,
      rotation: 0,
    },
    row: { x: 2800, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
  {
    image:
      "https://images.unsplash.com/photo-1769950268368-f927c5cab379?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4ODk3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzI4NzUyMDF8&ixlib=rb-4.1.0&q=85",
    initial: { x: 0, y: 0, opacity: 0, scale: 0.68 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.46 },
    exploded: {
      x: 3200 + (Math.random() * 400 - 200),
      y: 200,
      opacity: 1,
      scale: 0.82,
      rotation: 0,
    },
    row: { x: 3200, y: 380, opacity: 1, scale: 1, rotation: 0 },
  },
];

export default cards;
