# Portfolio redesign direction

## Three initial directions

### Theme Name: Signal Atlas
Very Brief Intro: A tactile editorial-tech portfolio where research, systems, and machine learning are presented like a field notebook for the future. Dark graphite, warm ivory, and a sharp signal orange create a composed but unmistakable identity.
Probability: 0.07

### Theme Name: Quiet Interface
Very Brief Intro: A light, gallery-like portfolio with generous white space, precise typography, and calm blue-gray accents. The mood is thoughtful, minimal, and publication-oriented.
Probability: 0.04

### Theme Name: Neon Kernel
Very Brief Intro: A high-energy technical portfolio built around a terminal-inspired visual language, electric accents, and dense motion. It feels playful, experimental, and close to the machine.
Probability: 0.02

## Selected direction: Signal Atlas

### Design Movement
Editorial brutalism crossed with technical field notes: a portfolio that feels authored, observational, and materially grounded rather than assembled from generic product UI patterns.

### Core Principles
1. **Evidence over decoration:** project outcomes, methods, and research interests lead the visual story.
2. **Tension through contrast:** pair warm paper-like surfaces and crisp technical marks with a near-black field.
3. **Asymmetric rhythm:** use offset columns, oversized numerals, and editorial breaks instead of centered stacks.
4. **Motion as instrumentation:** interactions should feel like scanning, indexing, and revealing layers of a system.

### Color Philosophy
Near-black graphite establishes seriousness and lets the content breathe. Warm ivory gives the work the physical feeling of a printed research folio. Signal orange is reserved for decisions, links, active states, and data points so that it feels earned rather than sprayed across the interface. Muted cyan appears only in small system-status moments to suggest instrumentation without drifting into cyberpunk.

### Layout Paradigm
A long-form field report with a narrow fixed index rail on desktop, editorial content columns, and occasional full-bleed visual interruptions. The hero uses a two-part composition: a large statement on the left and a compact instrument panel on the right. On mobile, the rail collapses into a compact breadcrumb header.

### Signature Elements
- A vertical index rail with section numbers and a live scroll progress indicator.
- Orange signal ticks, dotted coordinates, and mono labels used as recurring annotations.
- Large ghosted project numerals and contour-line image fields that sit behind content without becoming decoration-first.

### Interaction Philosophy
Every interactive element should feel like a control in a research instrument: direct, legible, and slightly tactile. Hover states reveal metadata or shift a signal line; buttons compress on press; navigation updates the active section instead of opening visual clutter.

### Animation
Use subtle reveal-on-scroll with 30–70ms staggering, horizontal signal sweeps on active links, and image-field parallax limited to a few pixels. Hero copy enters in measured blocks, as if a report is being indexed. Avoid perpetual motion except for a very slow ambient scan line. Respect reduced-motion preferences by removing transforms and keeping opacity transitions brief.

### Typography System
Use **DM Serif Display** for editorial headlines, **Space Grotesk** for interface text, and **IBM Plex Mono** for labels, metadata, coordinates, and microcopy. Headlines should be large, slightly tight, and occasionally italicized; labels should be uppercase with deliberate tracking; body copy should stay readable at 16–18px.

### Brand Essence
A computer engineering portfolio for people who care about intelligent systems that survive contact with the real world — differentiated by combining research rigor with an instinct for usable, expressive interfaces. Personality: **observant, inventive, exacting**.

### Brand Voice
Headlines are concise and specific. CTAs sound like invitations to inspect the work, not sales language. Microcopy is calm, lightly technical, and human.

Example lines:
- “Systems with a point of view.”
- “Inspect the work →”

### Wordmark & Logo
Use a lowercase wordmark reading `/sid/` paired with a compact signal-node mark: a diagonal slash crossing a square point. The mark should work alone as the favicon and as a small orange stamp in the navigation rail.

### Signature Brand Color
Signal Orange — `#e86f2d`. It is warm enough to feel human, sharp enough to act like an indicator, and distinct from the overused blue/purple tech palette.

## Style Decisions

- Desktop orientation is carried by the vertical `/sid/` index rail, section numbers, progress state, and orange signal stamp; top navigation remains a secondary utility.
- Project previews are treated as field records and must show at least one concrete evidence cue such as method, constraint, input, stack, signal, or boundary.
- Signal Orange `#e86f2d` is reserved for active state, primary actions, section/index numerals, and signal annotations rather than general decoration.
