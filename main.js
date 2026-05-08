document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Role Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = {
        carriers: {
            title: "Scale Your Fleet Fast",
            tag: "Carriers",
            text: "Reduce downtime and keep trucks moving by instantly connecting with verified personnel.",
            list: ["Find qualified drivers", "Verified carrier profiles", "Real-time fleet scaling", "Direct communication"],
            img: "role-carrier.webp"
        },
        drivers: {
            title: "Find Better Opportunities",
            tag: "Drivers",
            text: "Connect directly with verified carriers and lease-on operators who need your skills.",
            list: ["Verified carriers only", "Transparent route details", "Direct messaging", "Higher earning potential"],
            img: "role-driver.webp"
        },
        dispatchers: {
            title: "Manage More with Less Effort",
            tag: "Dispatchers",
            text: "Streamline your workflow by connecting with verified carriers and drivers in one place.",
            list: ["Real-time matching", "Secure communication", "Identity verification", "Scale your agency"],
            img: "role-dispatcher.webp"
        },
        operators: {
            title: "Grow Your Independent Business",
            tag: "Lease-On Operators",
            text: "Find the best partners to lease onto and keep your truck moving consistently.",
            list: ["Equipment-based matching", "Region-specific search", "Trust Engine verification", "Maximize utilization"],
            img: "role-owner.webp"
        }
    };

    const updateTabContent = (role) => {
        const data = tabPanes[role];
        const pane = document.getElementById('carriers');

        pane.querySelector('.pane-tag').textContent = data.tag;
        pane.querySelector('h3').textContent = data.title;
        pane.querySelector('p').textContent = data.text;

        const listContainer = pane.querySelector('.pane-list');
        listContainer.innerHTML = '';
        data.list.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item;
            listContainer.appendChild(span);
        });

        // Update Image
        const img = pane.querySelector('#role-image');
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = data.img;
            img.style.opacity = '1';
        }, 200);
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateTabContent(btn.dataset.tab);
        });
    });

    // Form Submission to Google Sheets
    const leadForm = document.querySelector('.lead-form');
    // Paste your Google Apps Script URL here
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwIBv2IiVGW-GZX4XA8aRAOOcqgBAW5457B5zRp-TkOo7HAzgb1eW7_T0dUYzjHB4Md2w/exec';

    if (leadForm) {
        leadForm.addEventListener('submit', e => {
            e.preventDefault();
            const btn = leadForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Joining...';
            btn.disabled = true;

            fetch(scriptURL, {
                method: 'POST',
                body: new FormData(leadForm)
            })
                .then(response => {
                    btn.innerHTML = 'Success! Welcome to Boom.';
                    btn.style.background = '#2D1A18';
                    leadForm.reset();

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        btn.style.background = '';
                    }, 4000);
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    btn.innerHTML = 'Error. Try again.';
                    btn.disabled = false;

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                    }, 3000);
                });
        });
    }

    // Phone Number Masking (Basic)
    const telInput = document.querySelector('input[type="tel"]');
    if (telInput) {
        telInput.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
});
