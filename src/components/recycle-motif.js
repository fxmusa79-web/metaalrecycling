/**
 * Decorative recycle motif — SVG outline, aria-hidden.
 * Place inside a section with class "has-recycle-motif".
 */
export function RecycleMotif({ className = '' } = {}) {
  return `
    <div class="recycle-motif ${className}" aria-hidden="true" data-recycle-motif>
      <svg class="recycle-motif__svg" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M72 58c18-28 54-40 86-28 18 7 32 20 40 36l12-18 6 38-38-4 14-16c-6-12-17-22-31-27-24-9-51 0-65 22l-10-3z"
          stroke="currentColor"
          stroke-width="3.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M188 108c22 24 24 62 4 90-11 16-28 26-47 29l8 20-36-16 20-32 12 14c14-3 26-11 34-23 15-21 14-49-2-68l7-14z"
          stroke="currentColor"
          stroke-width="3.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M148 196c-30 14-66 4-88-24-12-16-17-36-14-55l-22 2 18-34 30 24-16 8c-2 14 1 29 10 41 16 21 43 29 66 18l16 20z"
          stroke="currentColor"
          stroke-width="3.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  `
}
