// Inisialisasi AOS
AOS.init({
    duration: 800, // Durasi animasi dalam ms
    once: true, // Animasi hanya berjalan sekali saat elemen di-scroll
    mirror: false // Apakah elemen harus dianimasikan saat di-scroll ke atas lagi
});

// Preloader script
const preloader = document.getElementById('preloader');

// Sembunyikan preloader setelah DOMContentLoaded (lebih cepat)
document.addEventListener('DOMContentLoaded', () => {
    preloader.classList.add('hidden');
});

// Toggle menu mobile
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar'); // Mendapatkan elemen navbar

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Tutup menu mobile saat mengklik tautan
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Tombol kembali ke atas
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Logika untuk tombol kembali ke atas
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }

    // Logika untuk mengubah gaya navbar saat digulir
    if (window.pageYOffset > 50) { // Jika halaman digulir lebih dari 50px
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Pengguliran halus untuk semua tautan
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Inisialisasi Swiper
document.addEventListener('DOMContentLoaded', function () {
    // Swiper untuk Sertifikat
    const swiperCertificates = new Swiper('.mySwiper', {
        slidesPerView: 1, // Default untuk mobile
        slidesPerGroup: 1, // Selalu geser 1 slide
        spaceBetween: 32,
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: { // Untuk layar >= 768px (tablet)
                slidesPerView: 2, // Tampilkan 2 slide
                slidesPerGroup: 1, // Tetap geser 1 slide
            },
            1024: { // Untuk layar >= 1024px (desktop)
                slidesPerView: 3, // Tampilkan 3 slide
                slidesPerGroup: 1, // Tetap geser 1 slide
            }
        },
        on: {
            init: function () {
                updateSwiperPaginationFraction(this, 'swiper-pagination-fraction', 20, 18);
            },
            slideChange: function () {
                updateSwiperPaginationFraction(this, 'swiper-pagination-fraction', 20, 18);
            },
            resize: function() {
                updateSwiperPaginationFraction(this, 'swiper-pagination-fraction', 20, 18);
            }
        }
    });

    // Swiper untuk Keahlian
    const swiperSkills = new Swiper('.mySwiperSkills', {
        slidesPerView: 2, // Default for mobile
        slidesPerGroup: 2, // Scroll 2 slides at a time
        spaceBetween: 20,
        loop: false,
        pagination: {
            el: '.swiper-pagination-skills',
            clickable: true,
            type: 'custom', // Menggunakan tipe kustom untuk paginasi
            renderCustom: function (swiper, current, total) {
                return `${current} / ${total}`; // Format angka
            }
        },
        navigation: {
            nextEl: '.swiper-button-next-skills',
            prevEl: '.swiper-button-prev-skills',
        },
        breakpoints: {
            768: { // For screens >= 768px (tablet)
                slidesPerView: 4, // Show 4 slides
                slidesPerGroup: 4, // Scroll 4 slides
                spaceBetween: 30,
            },
            1024: { // For screens >= 1024px (desktop)
                slidesPerView: 6, // Show 6 slides
                slidesPerGroup: 6, // Scroll 6 slides
                spaceBetween: 40,
            }
        },
        on: {
            init: function () {
                updateSwiperPaginationFractionCustom(this, 'swiper-pagination-fraction-skills');
            },
            slideChange: function () {
                updateSwiperPaginationFractionCustom(this, 'swiper-pagination-fraction-skills');
            },
            resize: function() {
                updateSwiperPaginationFractionCustom(this, 'swiper-pagination-fraction-skills');
            }
        }
    });

    // Swiper untuk Proyek
    const swiperProjects = new Swiper('.mySwiperProjects', {
        slidesPerView: 1, // Default for mobile (displays 1 slide)
        slidesPerGroup: 1, // Scroll 1 slide at a time
        spaceBetween: 32,
        loop: false,
        pagination: {
            el: '.swiper-pagination-projects',
            clickable: true,
            type: 'custom', // Menggunakan tipe kustom untuk paginasi
            renderCustom: function (swiper, current, total) {
                // This renderCustom function is overridden by the on: resize/init/slideChange for projects
                return `${current} / ${total}`; // Fallback, will be updated by custom function
            }
        },
        navigation: {
            nextEl: '.swiper-button-next-projects',
            prevEl: '.swiper-button-prev-projects',
        },
        breakpoints: {
            768: { // For screens >= 768px (tablet)
                slidesPerView: 2, // Show 2 slides
                slidesPerGroup: 1, // Scroll 1 slide
            },
            1024: { // For screens >= 1024px (desktop)
                slidesPerView: 3, // Show 3 slides
                slidesPerGroup: 1, // Scroll 1 slide
            }
        },
        on: {
            init: function () {
                // Pass the custom total pages for projects
                updateSwiperPaginationFractionProjects(this, 'swiper-pagination-fraction-projects', 6, 4);
            },
            slideChange: function () {
                // Pass the custom total pages for projects
                updateSwiperPaginationFractionProjects(this, 'swiper-pagination-fraction-projects', 6, 4);
            },
            resize: function() {
                // Pass the custom total pages for projects
                updateSwiperPaginationFractionProjects(this, 'swiper-pagination-fraction-projects', 6, 4);
            }
        }
    });

    // Fungsi untuk memperbarui teks paginasi kustom (misal: 1 / 18 atau 1 / 20) untuk Sertifikat
    function updateSwiperPaginationFraction(swiperInstance, elementId, totalMobile, totalDesktop) {
        let totalOriginalSlides;
        // Determine total slides based on the current slidesPerView
        if (swiperInstance.params.slidesPerView === 1) {
            totalOriginalSlides = totalMobile;
        } else {
            totalOriginalSlides = totalDesktop;
        }

        const currentSlideNumber = swiperInstance.realIndex + 1; // Selalu indeks slide individu + 1

        // Pastikan currentSlideNumber tidak melebihi totalOriginalSlides
        const displayCurrent = Math.min(currentSlideNumber, totalOriginalSlides);

        document.getElementById(elementId).textContent = `${displayCurrent} / ${totalOriginalSlides}`;
    }

    // Fungsi untuk memperbarui teks paginasi kustom untuk Swiper dengan pagination.type = 'custom' (Skills)
    function updateSwiperPaginationFractionCustom(swiperInstance, elementId) {
        const totalSlides = swiperInstance.slides.length;
        const slidesPerGroup = swiperInstance.params.slidesPerGroup;
        const currentSlideIndex = swiperInstance.realIndex;

        // Calculate the current "page" based on slides per group
        const currentPage = Math.floor(currentSlideIndex / slidesPerGroup) + 1;
        const totalPages = Math.ceil(totalSlides / slidesPerGroup);

        document.getElementById(elementId).textContent = `${currentPage} / ${totalPages}`;
    }

    // Fungsi baru untuk memperbarui teks paginasi kustom untuk Swiper Proyek
    function updateSwiperPaginationFractionProjects(swiperInstance, elementId, totalPagesMobile, totalPagesDesktop) {
        let totalPagesToDisplay;
        // Check current breakpoint to decide total pages
        if (window.innerWidth < 768) { // Mobile breakpoint
            totalPagesToDisplay = totalPagesMobile;
        } else if (window.innerWidth >= 1024) { // Desktop breakpoint
            totalPagesToDisplay = totalPagesDesktop;
        } else { // Tablet breakpoint, let's assume it still follows mobile's total pages or adjust as needed
             totalPagesToDisplay = totalPagesMobile; // Or totalPagesDesktop if preferred for tablet
        }

        const slidesPerGroup = swiperInstance.params.slidesPerGroup;
        const currentSlideIndex = swiperInstance.realIndex;
        const currentPage = Math.floor(currentSlideIndex / slidesPerGroup) + 1;

        // Ensure current page doesn't exceed the custom total pages
        const displayCurrent = Math.min(currentPage, totalPagesToDisplay);

        document.getElementById(elementId).textContent = `${displayCurrent} / ${totalPagesToDisplay}`;
    }
});

// Fungsi untuk menampilkan sertifikat menggunakan SweetAlert2
function showCertificate(title, imageUrl) {
    Swal.fire({
        title: title,
        html: `<img src="${imageUrl}" alt="${title}" class="swal2-image">`, // Menggunakan class swal2-image
        showCloseButton: true,
        showConfirmButton: false,
        background: '#fff',
        customClass: {
            popup: 'rounded-lg shadow-xl animate__animated animate__fadeIn',
            closeButton: 'text-gray-800 hover:text-gray-600 text-2xl font-bold'
        },
        // Hapus width dan padding di sini karena sudah diatur di CSS media query
        allowOutsideClick: true,
        allowEscapeKey: true
    });
}

// Script Kirim ke FormSubmit.co pakai JS (Pastikan ini ada di bagian bawah body)
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/muhamadikhsan.dev@gmail.com", {
        method: "POST",
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Pesan Terkirim!',
                text: 'Terima kasih, pesan kamu sudah saya terima 😄',
                confirmButtonColor: '#facc15'
            });
            form.reset();
        } else {
            throw new Error("Gagal");
        }
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Gagal Mengirim',
            text: 'Coba lagi nanti ya ',
            confirmButtonColor: '#ef4444'
        })
    });
});