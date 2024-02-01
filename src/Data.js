const data = [
  {
    id: 1,
    title: "Manik(Ruby)",
    img: "https://kalyanastrogems.com/cdn/shop/products/ruby-stone_580x.jpg?v=1609953296",
    description: "Diamonds are known for their brilliance and durability.",
    benefits: [
      "Enhances inner vision and creativity.",
      "Promotes clarity and purity of thought.",
      "Boosts self-confidence and positive energy.",
      "Aids in better relationships and communication.",
      "Provides mental strength and resilience.",
    ],
    quantity: 20,
    qualities: [
      { type: "II nd Quality", prices: [150, 250, 350] },
      { type: "1st Quality", prices: [500, 750, 1000] },
      { type: "Special Quality", prices: [1500, 2000, 2500] },
      { type: "Super Quality", prices: [3000, 3500] },
    ],
  },
  {
    title: "Munga(Red Color)",
    img: "https://www.astromantra.com/wp-content/uploads/2017/07/Energized-Munga.jpg",
    description: "Cat's Eye stones are known for their unique appearance.",
    benefits:
      "Promotes intuition and awareness.Wards off negative energies.Brings good fortune and protection.Aids in spiritual healing and growth.Enhances psychic abilities.",
    quantity: 30,
    qualities: [
      { type: "II nd Quality", prices: [150, 250, 350] },
      { type: "1st Quality", prices: [500, 750, 1000] },
      { type: "Special Quality", prices: [1500, 2000, 2500] },
      { type: "Super Quality", prices: [3000] },
    ],
  },
  {
    title: "Pukhraj(Yellow Sapphire)",
    img: "https://imgcdn1.gempundit.com/media/catalog/product/g/p/gp129997-2-280923.jpg?imgeng=/w_960/f_webp/cmpr_20/s_7",
    description: "Diamonds are known for their brilliance and durability.",
    benefits:
      "Enhances inner vision and creativity.Promotes clarity and purity of thought.Boosts self-confidence and positive energy.Aids in better relationships and communication.Provides mental strength and resilience.",
    quantity: 20,
    qualities: [
      { type: "II nd Quality", prices: [500, 750, 1000] },
      { type: "1st Quality", prices: [1500, 2000, 2500] },
      { type: "Special Quality", prices: [3000, 3500, 4500] },
      { type: "Special Quality", prices: [5500, 6000] },
    ],
  },
  {
    title: "Moti(Pearl)",
    img: "https://imgcdn1.gempundit.com/media/catalog/product/g/e/gem-pearl-luxury-nat-1-191019.jpg?imgeng=/w_960/f_webp/cmpr_20/s_7",
    description: "Cat's Eye stones are known for their unique appearance.",
    benefits:
      "Promotes intuition and awareness.Wards off negative energies.Brings good fortune and protection.Aids in spiritual healing and growth.Enhances psychic abilities.",
    quantity: 20,
    qualities: [
      { type: "II nd Quality", prices: [60, 100, 150] },
      { type: "1st Quality", prices: [200, 250, 300] },
      { type: "Special Quality", prices: [450, 500, 600] },
      { type: "Super Quality", prices: [700, 1000] },
    ],
  },
  {
    title: "Panna(Emerald)",
    img: "https://imgcdn1.gempundit.com/media/catalog/product/g/e/gem-emer-slux-zamb-1-20190805_1.jpg?imgeng=/w_960/f_webp/cmpr_20/s_7",
    description: "Cat's Eye stones are known for their unique appearance.",
    benefits:
      "Promotes intuition and awareness.Wards off negative energies.Brings good fortune and protection.Aids in spiritual healing and growth.Enhances psychic abilities.",
    price: 5000,
    quantity: 20,
    qualities: [
      { type: "II nd Quality", prices: [150, 250, 350] },
      { type: "1st Quality", prices: [500, 750, 1000] },
      { type: "Special Quality", prices: [1500, 2000, 2500] },
    ],
  },
  {
    title: "Heera(Diamond)",
    img: "https://www.ratnabhandar.com/assets/products/large/30052020153915_2095%20f.jpg",
    description: "Cat's Eye stones are known for their unique appearance.",
    benefits:
      "Promotes intuition and awareness.Wards off negative energies.Brings good fortune and protection.Aids in spiritual healing and growth.Enhances psychic abilities.",
    quantity: 20,
    qualities: [
      { type: "II nd Quality", prices: [1000, 1500, 2000] },
      { type: "1st Quality", prices: [2500, 3000, 3500] },
      { type: "Special Quality", prices: [4000, 4500, 5000] },
      { type: "Special Quality", prices: [] },
    ],
  },
  {
    title: "Neelam(Blue Sapphire)",
    img: "https://imgcdn1.gempundit.com/media/catalog/product/g/p/gp129991-1-101123.jpg?imgeng=/w_960/f_webp/cmpr_20/s_7",
    description: "Cat's Eye stones are known for their unique appearance.",
    benefits:
      "Promotes intuition and awareness.Wards off negative energies.Brings good fortune and protection.Aids in spiritual healing and growth.Enhances psychic abilities.",
    quantity: 20,
    qualities: [
      { type: "II nd Quality", prices: [350, 500, 750] },
      { type: "1st Quality", prices: [1000, 1500, 2000] },
      { type: "Special Quality", prices: [2500, 3000, 4000] },
      { type: "Special Quality", prices: [5000, 6000] },
    ],
  },
  {
    id: 8,
    title: "Gomed(Hessonite)",
    img: "https://kalyanastrogems.com/cdn/shop/products/gomed_580x.jpg?v=1609952520",
    description: "Cat's Eye stones are known for their unique appearance.",
    benefits: [
      "Promotes intuition and awareness.",
      "Wards off negative energies.",
      "Brings good fortune and protection.",
      "Aids in spiritual healing and growth.",
      "Enhances psychic abilities.",
    ],

    quantity: 20,
    qualities: [
      { type: "II nd Quality", prices: [85, 150, 250] },
      { type: "1st Quality", prices: [350, 500, 750] },
      { type: "Special Quality", prices: [1000, 1500, 2000] },
      { type: "Super Quality", prices: [2500, 3000] },
    ],
  },
  {
    title: "Lahsuniya(Cat's eye)",
    img: "https://clara.in/cdn/shop/products/clgce3_1_1_1_1024x1024.jpg?v=1624956124",
    description: "Cat's Eye stones are known for their unique appearance.",
    benefits:
      "Promotes intuition and awareness.Wards off negative energies.Brings good fortune and protection.Aids in spiritual healing and growth.Enhances psychic abilities.",
    quantity: 20,
    qualities: [
      { type: "II nd Quality", prices: [85, 150, 250] },
      { type: "1st Quality", prices: [350, 500, 750] },
      { type: "Special Quality", prices: [1000, 1500, 2000] },
      { type: "Super Quality", prices: [2500, 3000] },
    ],
  },
];
export default data;