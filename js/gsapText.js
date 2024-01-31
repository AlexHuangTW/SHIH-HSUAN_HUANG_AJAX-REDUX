(() => {
    gsap.registerPlugin(SplitText);

    const split = new SplitText('.movies', {type: 'chars'})
    const typingText = gsap.timeline({repeat: -1})
    .from(split.chars, {
        duration: .1,
        autoAlpha: 0,
        stagger: .5
    })
})();

