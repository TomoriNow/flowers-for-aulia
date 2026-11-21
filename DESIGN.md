---
name: Flowers for Aulia
description: A turning bouquet of pink roses and tulips built from the letters of its own message, on a flat deep-wine ground.
colors:
  wine: "#2b0a1e"
  blush: "#ffe1ea"
  rose: "#ff9ebb"
  hint: "#e3a9bd"
  rose-deep: "#c9668a"
  rose-mid: "#f59ab8"
  rose-light: "#ffc4d6"
  tulip-deep: "#c2396d"
  tulip-mid: "#f0447f"
  tulip-light: "#ff86ad"
  stem-deep: "#4f8262"
  stem-mid: "#7fb08a"
  stem-light: "#a5cdae"
  leaf-deep: "#3f7354"
  leaf-mid: "#69a57c"
  leaf-light: "#93c4a2"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(1.6rem, 4vmin + 0.7rem, 3.2rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  display-wide:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(1.6rem, 5.5vmin + 0.5rem, 5rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "clamp(12px, 1.5vmin, 18px)"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.04em"
  matter:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontWeight: 700
    lineHeight: 1.15
rounded:
  focus: "8px"
spacing:
  gutter: "16px"
  stack: "2vh"
  side: "1.2vh"
  column: "4vw"
components:
  bouquet:
    typography: "{typography.matter}"
    rounded: "{rounded.focus}"
  message:
    textColor: "{colors.blush}"
    typography: "{typography.display}"
  message-wide:
    textColor: "{colors.blush}"
    typography: "{typography.display-wide}"
  signature:
    textColor: "{colors.rose}"
  hint:
    textColor: "{colors.hint}"
    typography: "{typography.label}"
---

# Design System: Flowers for Aulia

## Overview

**Creative North Star: "Letters as Matter"**

Nothing here is drawn. Every petal, leaf, stem and ribbon is a bold uppercase letter taken from the message, and the letters behave like physical stuff: they drift in loose, gather from the stems up, open into blooms, turn as one body, and burst apart when touched. The picture and the words are the same material, so reading the bouquet and looking at it are one act.

The world is an alphabet storm moved from black-on-white to pinks on wine. One flat deep-wine ground holds everything. There are two typefaces and no other surfaces: a bold monospace for the matter and the small hint, and one heavy grotesk for the message. Color carries all the form, in three tones per kind of matter. It refuses the black terminal with glowing monospace that text-art pages default to.

**Key Characteristics:**
- One flat wine ground, no panels, borders, gradients, glow or shadows.
- Letters are the only drawing material, and they come only from the message.
- Three tones (deep, mid, light) per kind of matter; kind is told apart by color.
- Two faces: JetBrains Mono 700 for matter and hint, Archivo Black for the message.
- One screen, no scroll, no navigation; the bouquet is the single control.
- The letter grid is sized by script to fit any screen shape.

## Colors

Pinks and sage greens on one dark wine; no neutrals outside the wine and blush pair.

### Primary
- **Blush** (`blush`): the message text, the default text color, and the ribbon letters. The lightest pink that still reads as pink.
- **Rose** (`rose`): the signature, the focus ring and the text-selection background. The one accent on interface text.

### Secondary
- **Rose bloom** (`rose-deep`, `rose-mid`, `rose-light`): rose petals. A pale, low-saturation pink ramp that ends almost white.
- **Tulip bloom** (`tulip-deep`, `tulip-mid`, `tulip-light`): tulip petals. A saturated hot-pink ramp, clearly stronger than the roses.

### Tertiary
- **Stem sage** (`stem-deep`, `stem-mid`, `stem-light`): stems.
- **Leaf sage** (`leaf-deep`, `leaf-mid`, `leaf-light`): leaves, a shade deeper and greener than the stems.

### Neutral
- **Deep Wine** (`wine`): the only ground, the browser theme color, and the text color inside a selection.
- **Dusty Pink** (`hint`): the hint line only. Quieter than blush, still about 9:1 against wine.

### Named Rules
**The Flat Ground Rule.** Wine is the only surface. Nothing sits on a second background, and no color fades into another.

**The Kind Is the Color Rule.** Roses are pale, tulips are saturated, stems and leaves are sage, the ribbon is blush. Each kind keeps its own three-tone ramp; ramps are never shared or blended between kinds.

## Typography

**Display Font:** Archivo Black (with sans-serif), self-hosted, weight 400 only
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace), self-hosted, weight 700 only

**Character:** A heavy, wide grotesk says the message once, loudly and warmly. A bold monospace does everything else, as picture matter and as the one quiet hint. There is no body text and no third face.

### Hierarchy
- **Display** (`display`, and `display-wide` at 7:5 and wider): the message, the page's only heading. Centered and capped at 11em wide with balanced wrapping in portrait; left-aligned beside the bouquet when wide. The signature sits on its own line at 0.6em of the display size with a 0.5em gap above.
- **Label** (`label`): the single hint line under the message. Lowercase, bold mono, balanced wrapping.
- **Matter** (`matter`): the bouquet letters. Uppercase, bold mono, preformatted. The size is not a fixed token: the script picks it per screen between 10px and 24px, aiming for 72 letters across. Each cell is 0.6em wide and 1.15em tall.

### Named Rules
**The Message Alphabet Rule.** Matter letters are the message with spaces removed, uppercase, with the tilde kept (MADEWITHLOVEFORMYDEARESTAULIA~SEAN), dealt in order by grid cell. No other characters, symbols or shading glyphs make the picture.

**The Readable Letter Rule.** Matter never goes below 10px. On a small screen the grid gets fewer letters, not smaller ones.

## Layout

One viewport, centered, no scroll. The page is a grid that centers its content both ways, with a gutter of at least 16px on every side that also respects device safe areas.

- **Portrait and near-square:** bouquet on top, message and hint centered under it, 2vh between them and 1.2vh between message and hint. The bouquet is fitted into about 64% of the viewport height and the full width inside the gutters, and is built with longer stems so it fills a tall screen.
- **Wide (aspect ratio 7:5 and up):** two columns, bouquet left and message right, 4vw apart, both vertically centered. Message and hint turn left-aligned and the message steps up to its wide size. The bouquet is fitted into the height minus 48px and whatever width the message column leaves, and is built with shorter stems.

The breakpoint is an aspect ratio, not a width, so a phone on its side and a desktop get the same arrangement. The fit is recomputed on every resize.

## Elevation & Depth

Flat. There are no shadows, no blur, no glow and no layered surfaces. Depth exists only inside the bouquet and is made of tone: the nearest letter wins each grid cell, letters toward the back drop one tone, and a one-letter gap is left wherever two different blooms meet so each flower keeps its outline.

### Named Rules
**The Tone Is Depth Rule.** Roundness comes from the three-tone ramps and the gaps between blooms. Nothing is lifted off the ground by shadow, opacity or blur.

## Shapes

There are no drawn shapes: no boxes, rules, borders or icons. Form is the letter grid. The single radius in the system (8px) belongs to the bouquet's focus outline, a 2px ring in rose set 6px off the letters. The favicon is the one exception to letters-only, because letters cannot read at that size: a wine rounded square with a five-petal rose flower and a blush center.

## Components

### Bouquet
The centerpiece and the only control. It is one real button that holds a preformatted letter grid, with no background, border or padding of its own.
- **Contents:** one rose in the middle ringed by three tulips and three roses, one leaf per outer stem, stems tied by a blush ribbon with a bow and two tails. Seen side-on, tipped slightly down onto the blooms.
- **Motion:** letters start scattered and gather over 6 seconds with a cubic ease-out, staggered so stems arrive first, then ribbon, leaves and blooms; blooms then open. About one letter in twenty is visible while still travelling. The finished bouquet turns steadily at 0.3 radians per second.
- **Pointer:** drag turns it and a release keeps a decaying spin. A tap or click scatters the letters in 0.7 seconds, after which they gather again. The cursor is a grab hand, closed while pressed.
- **Keyboard:** Enter or Space scatters; left and right arrows turn it. Focus shows the rose ring described under Shapes.
- **Reduced motion:** the bouquet is shown complete and still. Drag and arrows still turn it; a tap shows the next side (an eighth of a turn) instead of scattering.
- **Assistive text:** the letter grid is hidden from screen readers and the button carries a sentence describing the bouquet and how to use it.

### Message
The heading in the display face, blush, with the signature in rose beneath it. It is hidden until the bouquet is about 90% gathered, then fades in once over 1.4 seconds while rising 10px (ease `cubic-bezier(0.16, 1, 0.3, 1)`). It is the only thing on the page that fades. Without script, or with reduced motion, it is simply there.

### Hint
One lowercase line in the label style and the dusty pink, naming the two gestures, with a middle dot between them. Always visible; it does not animate.

## Do's and Don'ts

### Do:
- **Do** build every picture out of the message's own letters, uppercase, in JetBrains Mono 700.
- **Do** keep each kind of matter on its own three-tone ramp and let tone, not effects, show depth.
- **Do** keep wine as the single ground and blush, rose and dusty pink as the only colors for interface text.
- **Do** let the script fit the letter grid to the screen, between 10px and 24px letters.
- **Do** switch layout by aspect ratio (7:5), so every landscape screen gets the side-by-side arrangement.
- **Do** keep a still, complete bouquet for reduced motion, with turning still available.
- **Do** keep the message as real heading text in Archivo Black, separate from the letter picture.

### Don't:
- **Don't** add glow, gradients, shadows, blur or scanlines; this is not a glowing terminal.
- **Don't** put anything on a second surface: no cards, panels, borders or dividers.
- **Don't** draw with characters from outside the message, such as block or shading glyphs, punctuation art or emoji.
- **Don't** shrink matter letters below 10px to fit more detail.
- **Don't** add a third typeface or a second weight of either face.
- **Don't** fade or slide anything except the message, and that only once.
- **Don't** blend the rose and tulip ramps; pale means rose and saturated means tulip.
