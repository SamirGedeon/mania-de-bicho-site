// Opções demonstrativas. Cada SKU mantém preço e disponibilidade próprios.
export const extraFoodOptions = [
  { baseId: 'pet-001', id: 'pet-001-1kg', size: '1 kg', priceCents: 1990 },
  { baseId: 'pet-001', id: 'pet-001-3kg', size: '3 kg', priceCents: 4490 },
  { baseId: 'pet-002', id: 'pet-002-1kg', size: '1 kg', priceCents: 2290 },
  { baseId: 'pet-002', id: 'pet-002-3kg', size: '3 kg', priceCents: 5490 },
  { baseId: 'pet-003', id: 'pet-003-1kg', size: '1 kg', priceCents: 2690 },
  { baseId: 'pet-003', id: 'pet-003-10kg', size: '10 kg', priceCents: 16990 },
  { baseId: 'pet-004', id: 'pet-004-1kg', size: '1 kg', priceCents: 2790 },
  { baseId: 'pet-004', id: 'pet-004-3kg', size: '3 kg', priceCents: 6990 },
  { baseId: 'pet-005', id: 'pet-005-1kg', size: '1 kg', priceCents: 2990 },
  { baseId: 'pet-005', id: 'pet-005-10kg', size: '10 kg', priceCents: 20990 },
  { baseId: 'pet-006', id: 'pet-006-1kg', size: '1 kg', priceCents: 3490 },
  { baseId: 'pet-006', id: 'pet-006-10kg', size: '10 kg', priceCents: 23990 },
].map((option) => ({ ...option, availability: 'demo' as const }));

export const optionGroups = [
  ...Array.from({ length: 6 }, (_, i) => {
    const id = `pet-${String(i + 1).padStart(3, '0')}`;
    return [
      id,
      ...extraFoodOptions.filter((o) => o.baseId === id).map((o) => o.id),
    ];
  }),
  ['pet-007', 'pet-008', 'pet-009'],
  ['pet-010', 'pet-011', 'pet-012'],
  ['pet-013', 'pet-014', 'pet-015'],
  ['pet-016', 'pet-017', 'pet-018'],
  ['pet-019', 'pet-020', 'pet-021', 'pet-022'],
  ['pet-023', 'pet-024'],
];
