# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Vite + vanilla TypeScript. The whole product is a single animated scene (an ASCII bouquet plus one message), so a component framework adds weight without benefit. Static build, deployed to Vercel.

## Users

One person: Aulia. Sean made this as a personal gift for her. She will open a shared link, most likely on her phone, and spend a short, personal moment with it.

## Product Purpose

A digital gift of flowers from Sean to Aulia. It shows a bouquet that blooms and grows, rotating at the center of the screen, together with a signed message. It succeeds if Aulia feels the care that went into it and wants to play with it again.

## Positioning

It is made for exactly one person and signed by the person who made it. It is not a template, a greeting-card service or a product for other people.

## Operating Context

- Delivered as a link (Vercel URL), opened on a phone first, possibly on desktop later.
- Viewed in a single session, likely more than once.

## Capabilities and Constraints

- Centerpiece: an ASCII-styled bouquet that blooms and grows, rotating in the middle of the screen.
- Flowers: pink roses and tulips (binding).
- Interactive. The bouquet responds to her, not only plays back. The specific interactions are still undecided.
- Message text (binding, exact):

  > Made with love for my dearest Aulia
  > ~ Sean

- Every screen shape (binding): must look right on phones, tablets and desktops, in portrait and landscape, at any aspect ratio. Touch, mouse and keyboard input all work.

## Brand Commitments

- ASCII / text-character rendering of the flowers is a binding visual constraint set by Sean.
- The message wording above is fixed. Do not rewrite it.

## Evidence on Hand

None. There are no photos, extra copy or assets. Do not invent memories, quotes, dates or extra messages from Sean.

## Product Principles

1. The bouquet is the gift. Everything else stays out of its way.
2. Personal over polished-generic. It should feel handmade by Sean, not like a stock template.
3. Any screen. The first impression is likely a phone, but it must be just as good on a desktop or a tablet turned sideways.
4. Reward lingering. Interaction should invite her to come back, not explain itself with instructions.

## Accessibility & Inclusion

Respect `prefers-reduced-motion` with a calm, still or slow version of the bouquet. The message must be real, readable text, not only ASCII art. The bouquet has a text description for screen readers, is operable by keyboard, and text meets WCAG AA contrast.
