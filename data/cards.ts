const imageUrls = [
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915408/G9M5kGGcrYgntW6CI3gO9_xlgglf.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915402/xURS24fHvVc5qPcs6m6nl_je0gmz.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915389/G6jsZ5jmTZtFLqOxS06yJ_zl4qq1.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915362/foramour_usecase2_image_1_ekdtug.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915355/FGZuTMtzSoVoUt0P2HkeA_yvz6rv.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915347/bgtredtyujnbgtrd_ehwtsd.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915343/ayXHurEuA6ACIKo5C4eME_teypqz.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915317/3rGn7s5-ie_geyogA7QZ__e3auxa.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915309/KoFPteqCNqcPgp2_xyDgF_zaba5i.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915293/LtobJ7cRiZ4sRikjj8sko_ijl1un.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915288/h8zcddhu3YuIMKemwte10_egn66g.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915280/G8j17S7RGvli33gjyUbgW_oug3c7.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915271/2fsewbnCQRaCt06Q_ht1m4n.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915234/HGsJVqazNRqVkQikzFTkK_cvn7mk.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915229/suXae2KUXO_XiA0v4hTX7_dttrsw.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915198/hb_set_4.2_tt63he.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915194/hb_set_1_zzus9r.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915188/95928170061b4b37a705f76d7565a531_gdxpna.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915182/3e1f5281afd84dd790cd1614fc94b09b_kl9gxq.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915166/zwWBWUBrHdaUFcW3sfQ5a_c3zz7m.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915151/zHAY6gubTmViYgWJSmTWH_y1s2am.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915140/2XS3Nv0nG9QL_eBvWmHPf_oor5uv.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915121/wmGlpedVp3K3di_yT-4qP_qxcqnt.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915115/vfr43e567uhbvcfr4evfde45_z8czll.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915107/nbvfr43wst78iuhgfdertyhj_b70b1458_abotga.png",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915102/kxZDuVpINJlhCFQC_v5mM_2e881b34_msr6e6.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915095/di60p4zKUETub3pyxwhPg_9178ec4f_flcak9.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915081/YLW0vd0_CCBRUKm4iok8B_rlpg6c.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915059/f857G_czZ6ltNKmqDeU0V_hvaqul.jpg",
  "https://res.cloudinary.com/dl20l7ldt/image/upload/v1772915039/xpZYAmS627cE0I7Hx6WIA_uyft95.jpg",
] as const;

const baseCards = [
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.75 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.95 },
    exploded: { x: -3200, y: -280, scale: 0.85 },
    rowX: -3200,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.9 },
    exploded: { x: -2800, y: -200, scale: 0.9 },
    rowX: -2800,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.85 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.88 },
    exploded: { x: -2400, y: -150, scale: 0.95 },
    rowX: -2400,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.85 },
    exploded: { x: -2000, y: -100, scale: 1.1 },
    rowX: -2000,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.78 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.82 },
    exploded: { x: -1600, y: -120, scale: 0.92 },
    rowX: -1600,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.82 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.8 },
    exploded: { x: -1200, y: -180, scale: 0.9 },
    rowX: -1200,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.78 },
    exploded: { x: -800, y: -240, scale: 0.88 },
    rowX: -800,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.72 },
    exploded: { x: -400, y: 50, scale: 0.83 },
    rowX: -400,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.7 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.68 },
    exploded: { x: 0, y: -100, scale: 0.82 },
    rowX: 0,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.65 },
    exploded: { x: 400, y: -60, scale: 0.8 },
    rowX: 400,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.72 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.5 },
    exploded: { x: 800, y: 200, scale: 0.78 },
    rowX: 800,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.74 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.6 },
    exploded: { x: 1200, y: 150, scale: 0.88 },
    rowX: 1200,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.58 },
    exploded: { x: 1600, y: -120, scale: 0.82 },
    rowX: 1600,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.52 },
    exploded: { x: 2000, y: 180, scale: 0.8 },
    rowX: 2000,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.72 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.5 },
    exploded: { x: 2400, y: 100, scale: 0.86 },
    rowX: 2400,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.8 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.48 },
    exploded: { x: 2800, y: 140, scale: 0.84 },
    rowX: 2800,
  },
  {
    initial: { x: 0, y: 0, opacity: 0, scale: 0.68 },
    descending: { x: 0, y: 250, opacity: 1, scale: 0.46 },
    exploded: { x: 3200, y: 200, scale: 0.82 },
    rowX: 3200,
  },
] as const;

const extraCardsCount = imageUrls.length - baseCards.length;

const extraCards = Array.from(
  { length: Math.max(0, extraCardsCount) },
  (_, index) => {
    const x = baseCards[baseCards.length - 1].rowX + (index + 1) * 400;

    return {
      initial: { x: 0, y: 0, opacity: 0, scale: 0.68 },
      descending: { x: 0, y: 250, opacity: 1, scale: 0.46 },
      exploded: { x, y: 200, scale: 0.82 },
      rowX: x,
    };
  },
);

const motionCards = [...baseCards, ...extraCards];

const cards = imageUrls.map((image, index) => {
  const motion = motionCards[index];

  return {
    image,
    initial: { ...motion.initial },
    descending: { ...motion.descending },
    exploded: {
      x: motion.exploded.x + (Math.random() * 400 - 200),
      y: motion.exploded.y,
      opacity: 1,
      scale: motion.exploded.scale,
      rotation: 0,
    },
    row: { x: motion.rowX, y: 380, opacity: 1, scale: 1, rotation: 0 },
  };
});

export default cards;
