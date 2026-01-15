// script.js
document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const dropdowns = document.querySelectorAll('.dropdown');
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-list a');
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');

    // 1. تبديل القائمة المتنقلة
    mobileMenuBtn.addEventListener('click', function() {
        // تبديل حالة زر الهامبرجر
        this.classList.toggle('active');
        this.setAttribute('aria-expanded', this.classList.contains('active'));
        
        // تبديل القائمة
        nav.classList.toggle('active');
        
        // إغلاق جميع القوائم المنسدلة عند فتح/إغلاق القائمة الرئيسية
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // 2. إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // إغلاق القائمة المتنقلة فقط إذا لم يكن الرابط من القائمة المنسدلة
                if (!this.closest('.dropdown-menu')) {
                    mobileMenuBtn.classList.remove('active');
                    nav.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    
                    // إغلاق القوائم المنسدلة
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            }
        });
    });

    // 3. التحكم في القوائم المنسدلة للموبايل
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // إغلاق القوائم الأخرى
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // تبديل القائمة الحالية
                dropdown.classList.toggle('active');
            }
        });
    });

    // 4. إغلاق القوائم المنسدلة عند النقر على روابطها
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // إغلاق جميع القوائم
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    // 5. إغلاق القائمة عند النقر خارجها (للموبايل)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            nav.classList.contains('active') &&
            !e.target.closest('nav') && 
            !e.target.closest('.mobile-menu-btn')) {
            
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // 6. إزالة تأثير الهوفر على الموبايل
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth <= 768) {
                this.classList.remove('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth <= 768) {
                this.classList.remove('active');
            }
        });
    });

    // 7. تغيير الهيدر عند التمرير
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 8. إغلاق القوائم المنسدلة عند تغيير حجم الشاشة
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // إعادة تعيين القائمة للديسكتوب
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // 9. تحسين إمكانية الوصول
    mobileMenuBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // 10. إرسال النموذج
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // جمع البيانات من النموذج
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // هنا يمكنك إضافة كود إرسال النموذج (AJAX)
            console.log('Form submitted:', { name, email, message });
            
            // عرض رسالة نجاح
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    }
});