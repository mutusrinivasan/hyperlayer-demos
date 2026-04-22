import {
  Briefcase,
  Car,
  Coffee,
  Heart,
  PiggyBank,
  Plane,
  Receipt,
  Shield,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';
import type { JarAccent, JarIcon } from '@/types/scenario';

export type Accent = JarAccent | 'grey' | 'green' | 'mushroom';

export const accentMap: Record<Accent, { bg: string; text: string; fill: string }> = {
  blue: { bg: 'bg-jar-blue/15', text: 'text-jar-blue', fill: 'bg-jar-blue' },
  teal: { bg: 'bg-jar-teal/15', text: 'text-jar-teal', fill: 'bg-jar-teal' },
  gold: { bg: 'bg-jar-gold/15', text: 'text-jar-gold', fill: 'bg-jar-gold' },
  grey: {
    bg: 'bg-hyperlayer-grey/10',
    text: 'text-hyperlayer-grey',
    fill: 'bg-hyperlayer-grey',
  },
  green: {
    bg: 'bg-secondary-green/15',
    text: 'text-secondary-green',
    fill: 'bg-secondary-green',
  },
  mushroom: {
    bg: 'bg-secondary-mushroom/15',
    text: 'text-secondary-mushroom',
    fill: 'bg-secondary-mushroom',
  },
};

export const iconMap: Record<JarIcon, LucideIcon> = {
  shield: Shield,
  plane: Plane,
  heart: Heart,
};

export const categoryAccentMap: Record<string, Accent> = {
  Groceries: 'mushroom',
  'Eating out': 'gold',
  Transport: 'teal',
  Income: 'green',
  'Jar top-up': 'blue',
};

export const categoryIconMap: Record<string, LucideIcon> = {
  Groceries: ShoppingCart,
  'Eating out': Coffee,
  Transport: Car,
  Income: Briefcase,
  'Jar top-up': PiggyBank,
};

const warnedCategories = new Set<string>();

export function resolveCategory(category: string): { accent: Accent; Icon: LucideIcon } {
  const accent = categoryAccentMap[category];
  const Icon = categoryIconMap[category];
  if ((accent === undefined || Icon === undefined) && !warnedCategories.has(category)) {
    warnedCategories.add(category);
    if (import.meta.env.DEV) {
      console.warn(
        `[accents] Unknown transaction category "${category}" — falling back to grey + Receipt icon. Add it to categoryAccentMap / categoryIconMap in src/lib/accents.ts.`,
      );
    }
  }
  return {
    accent: accent ?? 'grey',
    Icon: Icon ?? Receipt,
  };
}
