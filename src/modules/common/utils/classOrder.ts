/**
 * Utility for organizing Tailwind CSS classes according to best practices
 * Order: Layout → Display → Sizing → Spacing → Typography → Colors → Borders → Effects → Transitions → Responsive → Themes → States → Other
 */

type ClassCategory = {
  pattern: RegExp;
  priority: number;
};

const classCategories: ClassCategory[] = [
  // 1. Layout & Positioning
  { pattern: /^(relative|absolute|fixed|static|sticky)$/, priority: 1 },
  { pattern: /^(inset|top|right|bottom|left|z)-/, priority: 1 },
  
  // 2. Display & Flexbox/Grid
  { pattern: /^(block|inline|flex|grid|hidden|table)/, priority: 2 },
  { pattern: /^(items|justify|content|self|place)-/, priority: 2 },
  { pattern: /^(flex-|grow|shrink|basis)/, priority: 2 },
  { pattern: /^(grid-|col-|row-|auto-)/, priority: 2 },
  
  // 3. Sizing
  { pattern: /^(w|h|min-w|min-h|max-w|max-h|size)-/, priority: 3 },
  
  // 4. Spacing
  { pattern: /^(m|p|mx|my|mt|mr|mb|ml|px|py|pt|pr|pb|pl)-/, priority: 4 },
  { pattern: /^(space|gap)-/, priority: 4 },
  
  // 5. Typography
  { pattern: /^(text-(?!slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black))/, priority: 5 },
  { pattern: /^(font-|leading-|tracking-|break-|whitespace-|overflow-)/, priority: 5 },
  
  // 6. Colors (including theme variants for colors)
  { pattern: /^(bg-|text-slate|text-gray|text-zinc|text-neutral|text-stone|text-red|text-orange|text-amber|text-yellow|text-lime|text-green|text-emerald|text-teal|text-cyan|text-sky|text-blue|text-indigo|text-violet|text-purple|text-fuchsia|text-pink|text-rose|text-white|text-black)/, priority: 6 },
  { pattern: /^(border-slate|border-gray|border-zinc|border-neutral|border-stone|border-red|border-orange|border-amber|border-yellow|border-lime|border-green|border-emerald|border-teal|border-cyan|border-sky|border-blue|border-indigo|border-violet|border-purple|border-fuchsia|border-pink|border-rose|border-white|border-black)/, priority: 6 },
  
  // 7. Borders & Radius
  { pattern: /^(border(?!-slate|border-gray|border-zinc|border-neutral|border-stone|border-red|border-orange|border-amber|border-yellow|border-lime|border-green|border-emerald|border-teal|border-cyan|border-sky|border-blue|border-indigo|border-violet|border-purple|border-fuchsia|border-pink|border-rose|border-white|border-black))/, priority: 7 },
  { pattern: /^(rounded|divide)-/, priority: 7 },
  
  // 8. Effects
  { pattern: /^(shadow|opacity|mix-|backdrop-|filter|blur|brightness|contrast|grayscale|hue-rotate|invert|saturate|sepia)-/, priority: 8 },
  
  // 9. Transitions & Animations
  { pattern: /^(transition|duration|ease|delay|animate)-/, priority: 9 },
  { pattern: /^transform/, priority: 9 },
  
  // 10. Responsive Breakpoints
  { pattern: /^(sm|md|lg|xl|2xl):/, priority: 10 },
  
  // 11. Theme Variants
  { pattern: /^(dark|pink):/, priority: 11 },
  
  // 12. State Variants
  { pattern: /^(hover|focus|active|disabled|group-hover|group-focus):/, priority: 12 },
  
  // 13. Other Utilities
  { pattern: /^(cursor|select|pointer-events|resize|scroll|snap|touch|user-select|appearance)-/, priority: 13 },
  { pattern: /^(sr-only|not-sr-only|focus:outline-hidden|outline)/, priority: 13 },
];

/**
 * Determines the category and priority of a Tailwind class
 */
function getClassPriority(className: string): { priority: number; originalIndex: number } {
  // Handle theme and state variant prefixes
  const variants = ['dark:', 'pink:', 'sm:', 'md:', 'lg:', 'xl:', '2xl:', 'hover:', 'focus:', 'active:', 'disabled:', 'group-hover:', 'group-focus:'];
  
  for (const category of classCategories) {
    if (category.pattern.test(className)) {
      return { priority: category.priority, originalIndex: 0 };
    }
  }
  
  // If no category matches, assign high priority to maintain order
  return { priority: 999, originalIndex: 0 };
}

/**
 * Sorts Tailwind CSS classes according to best practices
 * @param classes - Array of class names or space-separated string
 * @returns Sorted class names as space-separated string
 */
export function sortTailwindClasses(classes: string | string[]): string {
  const classArray = Array.isArray(classes) ? classes : classes.split(/\s+/).filter(Boolean);
  
  // Add original index to maintain stable sorting for same-priority items
  const classesWithPriority = classArray.map((className, index) => ({
    className,
    ...getClassPriority(className),
    originalIndex: index,
  }));
  
  // Sort by priority, then by original index for stability
  const sorted = classesWithPriority.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.originalIndex - b.originalIndex;
  });
  
  return sorted.map(item => item.className).join(' ');
}

/**
 * Helper function to organize className strings in React components
 * Handles both string and classNames() function patterns
 */
export function cn(...args: (string | undefined | null | false)[]): string {
  const allClasses = args
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean);
    
  return sortTailwindClasses(allClasses);
}

export default sortTailwindClasses;