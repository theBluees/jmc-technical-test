/* ===== Inisialisasi Setelah DOM Dimuat ===== */
document.addEventListener('DOMContentLoaded', function () {
    // --- Smooth Scroll untuk Nav Link dan Tombol Kontak ---
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"], .btn-contact[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId, 500); // Durasi animasi 500ms
        });
    });

    // --- Animasi Hero Section ---
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }

    // --- Animasi Scroll untuk Navbar ---
    const navbar = document.querySelector('.navbar-modern');
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.remove('navbar-scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);

    // --- Animasi Footer dengan Intersection Observer ---
    const footer = document.querySelector('#site-footer');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const footerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    if (footer) {
        footerObserver.observe(footer);
    }

    // --- Filter Portofolio ---
    const filterLinks = document.querySelectorAll('.portfolio-filter .nav-link');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterLinks.length > 0 && portfolioItems.length > 0) {
        filterLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                filterLinks.forEach(el => el.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    item.style.transition = 'opacity 0.3s ease-in-out';
                    item.style.opacity = '0';
                    item.style.display = 'none';
                    if (item.classList.contains(filter.substring(1)) || filter === '*') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    }
                });
            });
        });
    }

    console.log('Halaman sudah siap. Animasi scroll kartu layanan dinonaktifkan.');
    console.log('Hero section is ready!');
});

/* ===== Smooth Scroll dengan jQuery untuk Kompatibilitas Tambahan ===== */
$(document).ready(function () {
    // Smooth scroll untuk nav-link
    $('a.nav-link').on('click', function (event) {
        if (this.hash !== '') {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    });

    // Form submission dengan AJAX
    $('#contact-us form').on('submit', function (event) {
        event.preventDefault();
        var form = $(this);
        var formData = form.serialize();
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData,
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    form.trigger('reset');
                    $('#modalMessageHeader').text('Terima Kasih, ' + response.name + '!');
                    var myModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
                    myModal.show();
                } else {
                    alert('Terjadi kesalahan: ' + response.message);
                }
            },
            error: function () {
                alert('Tidak dapat mengirim pesan. Silakan coba lagi.');
            }
        });
    });
});

/* ===== Fungsi Smooth Scroll Kustom ===== */
function smoothScrollTo(targetSelector, duration) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}