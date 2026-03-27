# Page Topology

## Sections (top to bottom)
1. **SpaceBackground** - Fixed canvas (z-index 0) with stars, nebulae, shooting stars, floating 3D objects (planets, saturn, comets, spaceships, stars, moons, galaxies, asteroids)
2. **Navbar** (#navbar) - Fixed top, z-index 100, 0-81px height. Scroll state: shrinks padding, darkens bg
3. **HeroSection** (#hero) - 0-1239px. Badge, h1 with gradient "Zenith", subtitle, iframe video (tella.tv), 2 buttons, 4 stats
4. **MarqueeSection** (.marquee-section) - 1239-1314px. Infinite scrolling service names
5. **ServicesSection** (#services) - 1314-2415px. Section header + 3x2 grid of service cards with emoji icons
6. **AboutSection** (#about) - 2416-3116px. 2-column: left=engine visual (orbit paths, gears, labels), right=content with bullet points
7. **TestimonialsSection** (#testimonials) - 3116-4043px. Section header + grid of 4 testimonial cards with star ratings
8. **CTASection** (#cta) - 4042-4784px. Centered box with gradient title, description, CTA button
9. **Footer** - 4784-4881px. Simple flex row with copyright and "Back to top" link

## Global Patterns
- All sections use `position: relative; z-index: 1+` to layer above the canvas backgrounds
- Space background is TWO fixed canvases: #spaceCanvas (stars/nebulae) and #objectsCanvas (floating objects)
- Reveal-on-scroll animation via IntersectionObserver (`.reveal` → `.reveal.visible`)
- Nav gets `.scrolled` class after scroll > 50px
