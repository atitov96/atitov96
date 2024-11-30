let sectionTimes = {};
const trackSectionTime = (sectionId) => {
    const startTime = new Date();
    sectionTimes[sectionId] = startTime;
    
    return () => {
        const endTime = new Date();
        const timeSpent = (endTime - startTime) / 1000;
        ym(YM_ID, 'reachGoal', 'section_time', {
            section: sectionId,
            time: timeSpent
        });
    };
};

let maxScroll = 0;
window.addEventListener('scroll', () => {
    const percent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    if (percent > maxScroll) {
        maxScroll = percent;
        if (percent > 25 && percent < 100) {
            ym(YM_ID, 'reachGoal', 'scroll_depth', {
                depth: Math.floor(percent)
            });
        }
    }
});

let lastActivity = new Date();
document.addEventListener('mousemove', () => {
    const now = new Date();
    if (now - lastActivity > 10000) {
        ym(YM_ID, 'reachGoal', 'user_active');
    }
    lastActivity = now;
});
