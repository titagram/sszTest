/*
 * Studio Odontoiatrico San Zeno
 * Script principale
 */

// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function () {
    // Riferimenti agli elementi del DOM
    const menuIcon = document.getElementById('menu-icon');
    const closeMenu = document.getElementById('close-menu');
    const navLinks = document.getElementById('navLinks');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const contactFloatLink = document.getElementById('contact-float-link');
    const whatsappIcon = document.getElementById('whatsapp-icon');
    const emailIcon = document.getElementById('email-icon');
    const appointmentForm = document.getElementById('appointment-form');
    const newsSection = document.getElementById('news-section');
    const faqItems = document.querySelectorAll('.faq-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');

    // Funzione per controllare se il dispositivo è mobile
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Menu mobile: apri
    if (menuIcon) {
        menuIcon.addEventListener('click', function () {
            navLinks.classList.add('active');
        });
    }

    // Menu mobile: chiudi
    if (closeMenu) {
        closeMenu.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    }

    // Pulsante di contatto floating
    if (contactFloatLink && whatsappIcon && emailIcon) {
        // Imposta il link corretto in base al dispositivo
        if (isMobile()) {
            contactFloatLink.href = "https://wa.me/390451234567"; // Numero WhatsApp dello studio
            whatsappIcon.style.display = 'block';
            emailIcon.style.display = 'none';
        } else {
            contactFloatLink.href = "mailto:info@studiodentisticosanzeno.it";
            whatsappIcon.style.display = 'none';
            emailIcon.style.display = 'block';
        }
    }

    // Gestione dei tab nella sezione servizi
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Rimuovi la classe active da tutti i tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                // Aggiungi la classe active al tab button cliccato
                this.classList.add('active');

                // Nascondi tutti i contenuti dei tab
                tabContents.forEach(content => content.classList.remove('active'));

                // Mostra il contenuto del tab selezionato
                const tabId = this.getAttribute('data-id');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Gestione del form di appuntamento
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Previeni l'invio del form

            // Raccogli i dati del form
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            // In futuro, qui andrà il codice per inviare i dati a Firebase
            console.log('Form data:', formData);

            // Feedback all'utente
            alert('Grazie per la tua richiesta! Ti contatteremo al più presto.');

            // Reset del form
            appointmentForm.reset();
        });
    }

    // Controlla se mostrare la sezione news (da implementare con Firestore)
    function checkNewsVisibility() {
        // In futuro, questa funzione preleverà il valore da Firestore
        // Per ora, simuliamo il comportamento con una variabile locale
        const showNews = true; // Placeholder, in futuro sarà da Firestore

        if (showNews && newsSection) {
            newsSection.style.display = 'block';
            // In futuro, popolare anche il testo della news da Firestore
            document.getElementById('news-message').textContent = 'Promozione speciale: visita di controllo gratuita per tutti i nuovi pazienti fino al 30 giugno!';
            document.getElementById('news-link').href = '#footer';
        }
    }

    // Esegui il controllo all'avvio
    checkNewsVisibility();

    // FAQ accordion
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', function () {
                // Toggle della classe active per l'elemento corrente
                item.classList.toggle('active');

                // Chiudi tutti gli altri elementi
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }

    // Galleria immagini con modal
    if (galleryItems.length > 0 && modal && modalImg && modalCaption) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function () {
                modal.style.display = 'block';

                // Prendi l'immagine cliccata e mostrala nel modal
                const imgSrc = this.querySelector('img').src;
                const imgCaption = this.querySelector('.gallery-text').textContent;

                modalImg.src = imgSrc;
                modalCaption.textContent = imgCaption;
            });
        });

        // Chiudi il modal quando si clicca sulla X
        if (closeModal) {
            closeModal.addEventListener('click', function () {
                modal.style.display = 'none';
            });
        }

        // Chiudi il modal quando si clicca fuori dall'immagine
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Animazione di scroll fluido per i link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignora link vuoti

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calcola l'offset per tenere conto della navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Chiudi il menu mobile se aperto
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Funzione per caricare i dati da Firestore (placeholder per ora)
    async function loadDataFromFirestore() {
        try {
            // Qui in futuro ci sarà il codice per connettersi a Firestore
            // e caricare i dati dinamici

            // Esempio di come verrà implementato:
            // 
            // // Importa i moduli necessari di Firebase
            // import { initializeApp } from 'firebase/app';
            // import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
            //
            // // Configurazione di Firebase
            // const firebaseConfig = {
            //     apiKey: "...",
            //     authDomain: "...",
            //     projectId: "...",
            //     storageBucket: "...",
            //     messagingSenderId: "...",
            //     appId: "..."
            // };
            //
            // // Inizializza Firebase
            // const app = initializeApp(firebaseConfig);
            // const db = getFirestore(app);
            //
            // // Carica i dati dello studio
            // const studioDoc = await getDoc(doc(db, "settings", "studio"));
            // if (studioDoc.exists()) {
            //     const studioData = studioDoc.data();
            //     // Usa i dati per popolare i contenuti del sito
            //     updateStudioContent(studioData);
            // }
            //
            // // Carica le recensioni
            // const reviewsSnapshot = await getDocs(collection(db, "reviews"));
            // const reviewsData = [];
            // reviewsSnapshot.forEach((doc) => {
            //     reviewsData.push({ id: doc.id, ...doc.data() });
            // });
            // updateReviewsContent(reviewsData);

            console.log('Dati caricati correttamente da Firestore (simulazione)');
        } catch (error) {
            console.error('Errore nel caricamento dei dati:', error);
        }
    }

    // Funzione per aggiornare i contenuti del sito con i dati di Firestore (placeholder)
    function updateStudioContent(data) {
        // Questa funzione popolerà gli elementi HTML con i dati ricevuti da Firestore
        // Ad esempio:
        // if (data.showNews) {
        //     newsSection.style.display = 'block';
        //     document.getElementById('news-message').textContent = data.newsMessage;
        // }
        //
        // if (data.address) {
        //     const addressElements = document.querySelectorAll('.studio-address');
        //     addressElements.forEach(el => {
        //         el.textContent = data.address;
        //     });
        // }
    }

    // Funzione per aggiornare le recensioni con i dati di Firestore (placeholder)
    function updateReviewsContent(reviews) {
        // Questa funzione creerà dinamicamente le recensioni
        // Ad esempio:
        // const reviewsContainer = document.querySelector('.reviews-grid');
        // if (reviewsContainer && reviews.length > 0) {
        //     reviewsContainer.innerHTML = '';
        //     
        //     reviews.forEach(review => {
        //         const reviewCard = document.createElement('div');
        //         reviewCard.className = 'review-card';
        //         
        //         // Crea il contenuto della recensione
        //         reviewCard.innerHTML = `
        //             <div class="review-header">
        //                 <img src="assets/img/google-icon.png" alt="Google Icon" class="google-icon">
        //                 <div class="review-stars">
        //                     ${getStarsHTML(review.rating)}
        //                 </div>
        //             </div>
        //             <p class="review-text">${review.text}</p>
        //             <p class="reviewer">- ${review.name}</p>
        //         `;
        //         
        //         reviewsContainer.appendChild(reviewCard);
        //     });
        // }
    }

    // Funzione per generare il codice HTML delle stelle in base al rating (placeholder)
    function getStarsHTML(rating) {
        // Questa funzione genererà il codice HTML per visualizzare le stelle
        // Ad esempio:
        // let starsHTML = '';
        // const fullStars = Math.floor(rating);
        // const hasHalfStar = rating % 1 >= 0.5;
        // 
        // for (let i = 1; i <= 5; i++) {
        //     if (i <= fullStars) {
        //         starsHTML += '<i class="fas fa-star"></i>';
        //     } else if (i === fullStars + 1 && hasHalfStar) {
        //         starsHTML += '<i class="fas fa-star-half-alt"></i>';
        //     } else {
        //         starsHTML += '<i class="far fa-star"></i>';
        //     }
        // }
        // 
        // return starsHTML;
    }

    // Effetto di animazione per gli elementi quando entrano nel viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    // Esegui l'animazione solo se supportata dal browser
    if ('IntersectionObserver' in window) {
        animateOnScroll();
    }

    // Aggiungi la classe 'scrolled' alla navbar quando si scorre la pagina
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    handleNavbarScroll();

    // Inizializza il sito
    function initSite() {
        // Attiva il primo tab nella sezione servizi
        if (tabBtns.length > 0 && tabContents.length > 0) {
            tabBtns[0].click();
        }

        // In futuro, qui chiameremo la funzione per caricare i dati da Firestore
        // loadDataFromFirestore();
    }

    // Esegui l'inizializzazione
    initSite();

    // Aggiungiamo questa funzione nel file main.js
    function checkAndShowPromotionModal() {
        // In futuro, il valore sarà prelevato da Firestore
        const showPromotion = true; // Simulazione
        const promotionId = "ortodonzia-apr2025"; // Identificativo univoco per la promozione

        // Controlla se la promozione è attiva e se l'utente non l'ha già vista
        if (showPromotion && !sessionStorage.getItem('promo_' + promotionId)) {
            // Mostra il modal dopo 2 secondi dall'apertura della pagina
            setTimeout(() => {
                document.getElementById('promotion-modal').style.display = 'block';
                // Memorizza che l'utente ha visto la promozione in questa sessione
                sessionStorage.setItem('promo_' + promotionId, 'true');
            }, 2000);
        }
    }
});