let sectionTimes = {};
const trackSectionTime = (sectionId) => {
    const startTime = new Date();
    sectionTimes[sectionId] = startTime;
    
    return () => {
        const endTime = new Date();
        const timeSpent = (endTime - startTime) / 1000;
        ym(99090271, 'reachGoal', 'section_time', {
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
            ym(99090271, 'reachGoal', 'scroll_depth', {
                depth: Math.floor(percent)
            });
        }
    }
});

let lastActivity = new Date();
document.addEventListener('mousemove', () => {
    const now = new Date();
    if (now - lastActivity > 10000) {
        ym(99090271, 'reachGoal', 'user_active');
    }
    lastActivity = now;
});

const AB_TESTS = {
    HERO: 'hero_test',
    CTA: 'cta_test',
    EXPERTISE: 'expertise_test',
    FORMATS: 'formats_test',
    LAYOUT: 'layout_test'
};

class ABTestManager {
    constructor(ymId) {
        this.ymId = ymId;
        this.tests = new Map();
        this.initializeTests();
    }

    getTestVariant(testId) {
        let variant = localStorage.getItem(testId);
        if (!variant) {
            variant = Math.random() < 0.5 ? 'A' : 'B';
            localStorage.setItem(testId, variant);
        }
        return variant;
    }

    trackEvent(eventName, params) {
        ym(this.ymId, 'reachGoal', eventName, params);
    }

    initializeTests() {
        this.tests.set(AB_TESTS.HERO, {
            variants: {
                A: {
                    title: "Стань Go/Python разработчиком с опытным ментором",
                    subtitle: "Персональная программа обучения для карьерного роста",
                },
                B: {
                    title: "Увеличь свой доход в IT с персональным наставником",
                    subtitle: "От junior до middle за 6 месяцев",
                }
            },
            apply: (variant) => {
                const content = this.tests.get(AB_TESTS.HERO).variants[variant];
                document.querySelector('.hero h1').textContent = content.title;
                document.querySelector('.hero p').textContent = content.subtitle;
            }
        });

        this.tests.set(AB_TESTS.CTA, {
            variants: {
                A: {
                    mainCta: "Записаться на консультацию",
                    footerCta: "Получить план развития"
                },
                B: {
                    mainCta: "Начать обучение",
                    footerCta: "Связаться с ментором"
                }
            },
            apply: (variant) => {
                const content = this.tests.get(AB_TESTS.CTA).variants[variant];
                document.querySelector('.cta-button').textContent = content.mainCta;
                document.querySelector('.contact-button').textContent = content.footerCta;
            }
        });

        this.tests.set(AB_TESTS.EXPERTISE, {
            variants: {
                A: 'grid',
                B: 'list'
            },
            apply: (variant) => {
                const expertiseSection = document.querySelector('.expertise-grid');
                if (variant === 'B') {
                    expertiseSection.style.display = 'block';
                    expertiseSection.classList.remove('expertise-grid');
                    expertiseSection.classList.add('expertise-list');
                }
            }
        });

        this.tests.set(AB_TESTS.FORMATS, {
            variants: {
                A: {
                    style: 'cards',
                    layout: 'grid'
                },
                B: {
                    style: 'timeline',
                    layout: 'vertical'
                }
            },
            apply: (variant) => {
                const content = this.tests.get(AB_TESTS.FORMATS).variants[variant];
                const formatsSection = document.querySelector('#formats .feature-card');
                formatsSection.className = `feature-card ${content.style} ${content.layout}`;
            }
        });

        this.tests.set(AB_TESTS.LAYOUT, {
            variants: {
                A: ['about', 'expertise', 'course', 'formats'],
                B: ['expertise', 'course', 'about', 'formats']
            },
            apply: (variant) => {
                const content = this.tests.get(AB_TESTS.LAYOUT).variants[variant];
                const container = document.querySelector('.main-content .container');
                content.forEach(sectionId => {
                    const section = document.getElementById(sectionId);
                    container.appendChild(section);
                });
            }
        });
    }

    runTest(testId) {
        const variant = this.getTestVariant(testId);
        const test = this.tests.get(testId);
        
        if (test) {
            test.apply(variant);
            this.trackEvent('ab_test_view', {
                test_id: testId,
                variant: variant
            });

            document.querySelectorAll('.cta-button, .contact-button').forEach(button => {
                button.addEventListener('click', () => {
                    this.trackEvent('ab_test_conversion', {
                        test_id: testId,
                        variant: variant
                    });
                });
            });
        }
    }

    runAllTests() {
        for (const testId of this.tests.keys()) {
            this.runTest(testId);
        }
    }
}

const abStyles = `
    .expertise-list .expertise-item {
        margin-bottom: 20px;
        max-width: 800px;
    }

    .feature-card.timeline {
        position: relative;
        padding-left: 50px;
    }

    .feature-card.timeline .feature-list li {
        position: relative;
        margin-bottom: 40px;
    }

    .feature-card.timeline .feature-list li:before {
        content: "";
        position: absolute;
        left: -50px;
        top: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--primary);
    }

    .feature-card.timeline .feature-list li:after {
        content: "";
        position: absolute;
        left: -40px;
        top: 20px;
        width: 2px;
        height: calc(100% + 20px);
        background: var(--primary);
        opacity: 0.3;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = abStyles;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', () => {
    const abTestManager = new ABTestManager(99090271);
    abTestManager.runAllTests();
});
