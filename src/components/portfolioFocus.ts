export type PortfolioFocus = 'product' | 'business' | 'engineering';

export const portfolioFocusOptions: {
  id: PortfolioFocus;
  label: string;
  description: string;
}[] = [
  {
    id: 'product',
    label: 'Product',
    description: 'Roadmaps, user journeys, MVP decisions, and measurable outcomes.',
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Commercial strategy, consumer insights, stakeholder alignment, and growth.',
  },
  {
    id: 'engineering',
    label: 'Engineering',
    description: 'Scalable systems, AI automation, data, and technical execution.',
  },
];
