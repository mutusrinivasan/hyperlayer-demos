import { Heart, Plane, Shield, type LucideIcon } from 'lucide-react';
import type { JarAccent, JarIcon } from '@/types/scenario';

export type Accent = JarAccent | 'grey';

export const accentMap: Record<Accent, { bg: string; text: string; fill: string }> = {
  blue: { bg: 'bg-jar-blue/15', text: 'text-jar-blue', fill: 'bg-jar-blue' },
  teal: { bg: 'bg-jar-teal/15', text: 'text-jar-teal', fill: 'bg-jar-teal' },
  gold: { bg: 'bg-jar-gold/15', text: 'text-jar-gold', fill: 'bg-jar-gold' },
  grey: {
    bg: 'bg-hyperlayer-grey/10',
    text: 'text-hyperlayer-grey',
    fill: 'bg-hyperlayer-grey',
  },
};

export const iconMap: Record<JarIcon, LucideIcon> = {
  shield: Shield,
  plane: Plane,
  heart: Heart,
};
