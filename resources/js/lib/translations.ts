// Language/Translation Configuration for Portfolio
// Supports English (en) and Indonesian (id)

export type Language = 'en' | 'id';

export interface Translations {
    // Navigation
    nav: {
        home: string;
        projects: string;
        about: string;
        expertise: string;
        experience: string;
        contact: string;
    };

    // Hero Section
    hero: {
        availableForWork: string;
        greeting: string;
        description: string;
        viewProjects: string;
        contactMe: string;
        scrollDown: string;
        resume: string;
    };

    // About/Bento Section
    about: {
        strategicMission: string;
        title1: string;
        title2: string;
        title3: string;
        description: string;
        impactMeasurement: string;
        reduction: string;
        calculationErrors: string;
        systemsMastery: string;
        enterpriseReadiness: string;
        competitiveEdge: string;
        achievementRegion: string;
        funding: string;
        fundingDesc: string;
        case: string;
        tags: string[];
        skills: {
            sap: string;
            zahir: string;
            sql: string;
        };
    };

    // Expertise Section
    expertise: {
        sectionLabel: string;
        title1: string;
        title2: string;
        description: string;
    };

    // Timeline/Experience Section
    experience: {
        sectionLabel: string;
        title1: string;
        title2: string;
        description: string;
        viewCV: string;
    };

    // Process Section
    process: {
        sectionLabel: string;
        title1: string;
        title2: string;
        steps: {
            title: string;
            desc: string;
        }[];
    };

    // Education Section
    education: {
        sectionLabel: string;
        title1: string;
        title2: string;
        degree: string;
        period: string;
        degreeDesc: string;
        achievement: string;
        achievementTitle: string;
        achievementDesc: string;
        certifications: string;
    };

    // Testimonials Section
    testimonials: {
        sectionLabel: string;
        title1: string;
        title2: string;
        description: string;
    };

    // Projects Section
    projects: {
        sectionLabel: string;
        title1: string;
        title2: string;
        description: string;
        filterAll: string;
        viewProject: string;
    };

    // Contact Section
    contact: {
        title1: string;
        title2: string;
        title3: string;
        description: string;
        formName: string;
        formEmail: string;
        formSubject: string;
        formMessage: string;
        formSend: string;
        formSuccess: string;
    };

    // Footer
    footer: {
        copyright: string;
        portfolio: string;
    };

    // Project Detail Page
    projectDetail: {
        backToHub: string;
        meta: {
            year: string;
            client: string;
            role: string;
            duration: string;
        };
        narrative: string;
        coreImplementation: string;
        challenge: string;
        solution: string;
        techStack: string;
        liveSite: string;
        sourceCode: string;
        impact: string;
        visualDeepDive: {
            title1: string;
            title2: string;
        };
        nextProject: {
            label: string;
            link: string;
        };
    };

    // Resume Page
    resume: {
        backToWork: string;
        downloadCV: string;
        roleSubtitle: string;
        sections: {
            workExperience: string;
            featuredProjects: string;
            education: string;
            technicalSkills: string;
            certifications: string;
        };
        experiences: {
            company: string;
            location: string;
            role: string;
            period: string;
            desc: string;
        }[];
        projects: {
            name: string;
            role: string;
            period: string;
            desc: string;
        }[];
        education: {
            school: string;
            degree: string;
            period: string;
            desc: string;
        }[];
        skills: {
            category: string;
            items: string[];
        }[];
        certificationsList: {
            name: string;
            meta: string;
        }[];
        footer: string;
    };
}

export const translations: Record<Language, Translations> = {
    en: {
        nav: {
            home: 'Home',
            projects: 'Projects',
            about: 'About',
            expertise: 'Expertise',
            experience: 'Experience',
            contact: 'Contact',
        },
        hero: {
            availableForWork: 'Available for projects',
            greeting: 'Hello, I\'m',
            description: 'Bridging the gap between accounting logic and modern technology. I build intelligent financial systems that transform how businesses operate.',
            viewProjects: 'View Projects',
            contactMe: 'Contact Me',
            scrollDown: 'Scroll to explore',
            resume: 'Resume',
        },
        about: {
            strategicMission: 'Strategic Mission',
            title1: 'Simplifying',
            title2: 'Complexity.',
            title3: 'Digitizing Trust.',
            description: 'As an Accounting Information Systems student with a 3.82 GPA, I dedicate myself to bridging the gap between traditional accounting and modern technology. My focus is building intuitive financial dashboards and ERP systems that significantly increase business efficiency.',
            impactMeasurement: 'Impact Measurement',
            reduction: 'Reduction in',
            calculationErrors: 'Calculation Errors',
            systemsMastery: 'Systems Mastery',
            enterpriseReadiness: 'Enterprise Readiness',
            competitiveEdge: 'Competitive Edge',
            achievementRegion: 'Nation',
            funding: 'Funding',
            fundingDesc: 'Strategic funding of Rp14,000,000 for research and implementation of DuckCost in Indonesia\'s MSME ecosystem.',
            case: 'Case: DuckCost Algorithm',
            tags: ['ERP Specialist', 'Fullstack Systems', 'AIS Telkom University', 'UI/UX Strategist'],
            skills: {
                sap: 'SAP FI/CO',
                zahir: 'Zahir Certified',
                sql: 'Database SQL',
            },
        },
        expertise: {
            sectionLabel: 'Expertise Stack',
            title1: 'Technical',
            title2: 'DNA',
            description: 'A rare combination of accounting audit precision and software engineering technical expertise.',
        },
        experience: {
            sectionLabel: 'Professional Path',
            title1: 'Career',
            title2: 'Timeline',
            description: 'A professional journey that started from curiosity to becoming a Fullstack Engineer focused on real results.',
            viewCV: 'View Detailed CV',
        },
        process: {
            sectionLabel: 'Execution Blueprint',
            title1: 'Service',
            title2: 'Methodology',
            steps: [
                { title: 'Analysis', desc: 'Identify business inefficiencies & deconstruct financial audit requirements.' },
                { title: 'Architecture', desc: 'SQL database blueprint & legally compliant accounting business rules integration.' },
                { title: 'Engineering', desc: 'Development with clean architecture, frontend optimization, & API integration.' },
                { title: 'Deployment', desc: 'UAT (User Acceptance Testing) & deployment to secure cloud infrastructure.' },
            ],
        },
        education: {
            sectionLabel: 'Background',
            title1: 'Academic &',
            title2: 'Awards',
            degree: 'Accounting IS',
            period: '2021 - 2025 (Expected)',
            degreeDesc: 'Top University. GPA: 3.98/4.00 (Summa Cum Laude Candidate).',
            achievement: 'Main Achievement',
            achievementTitle: 'Best Developer Award',
            achievementDesc: 'Winner of "Best Digital Innovation" category at national level 2023.',
            certifications: 'Professional Certifications',
        },
        testimonials: {
            sectionLabel: 'Social Proof',
            title1: 'Trusted',
            title2: 'Impact',
            description: 'Trusted by industry leaders.',
        },
        projects: {
            sectionLabel: 'Portfolio Archive',
            title1: 'Selected',
            title2: 'Works',
            description: 'A curation of intelligent systems that combine algorithmic precision with top-class visual aesthetics.',
            filterAll: 'All',
            viewProject: 'View Project',
        },
        contact: {
            title1: 'Let\'s',
            title2: 'Start',
            title3: 'Something Big',
            description: 'I\'m currently available for freelance projects and full-time opportunities. Let\'s build the future together.',
            formName: 'Your Name',
            formEmail: 'Your Email',
            formSubject: 'Subject',
            formMessage: 'Your Message',
            formSend: 'Send Message',
            formSuccess: 'Message sent successfully!',
        },
        footer: {
            copyright: '© 2024 - Portfolio',
            portfolio: 'Portfolio',
        },
        projectDetail: {
            backToHub: 'Back to Hub',
            meta: {
                year: 'Year',
                client: 'Client',
                role: 'My Role',
                duration: 'Duration',
            },
            narrative: 'The Narrative',
            coreImplementation: 'Core Implementation',
            challenge: 'The Challenge',
            solution: 'The Solution',
            techStack: 'Technology Stack',
            liveSite: 'Live Site',
            sourceCode: 'Source Code',
            impact: 'Project Impact',
            visualDeepDive: {
                title1: 'Visual',
                title2: 'Deep-Dive',
            },
            nextProject: {
                label: 'Ready for the next one?',
                link: 'Next Evolution',
            },
        },
        resume: {
            backToWork: 'Back to Work',
            downloadCV: 'Download CV',
            roleSubtitle: 'Accounting Info Systems & Fullstack Developer',
            sections: {
                workExperience: 'Work Experience',
                featuredProjects: 'Featured Projects',
                education: 'Education',
                technicalSkills: 'Technical Skills',
                certifications: 'Certifications',
            },
            experiences: [
                {
                    company: "Bank Mandiri Regional Collection Office",
                    location: "Bandung, Indonesia",
                    role: "Archive Staff Intern",
                    period: "Jul 2025",
                    desc: "Performed digitalization and data entry of banking archive documents. Managed and organized document filing according to bank operational standards."
                }
            ],
            projects: [
                {
                    name: "AgriDuck",
                    role: "Full-stack Developer & Team Leader",
                    period: "Jul 2025 - Sept 2025",
                    desc: "Digital Financial Recording for Small-Scale Farmers. Finalist from 30+ universities nationwide. Built web-based cash recording with interactive dashboard and PDF export."
                },
                {
                    name: "DuckCost",
                    role: "Business Analyst & Developer",
                    period: "Nov 2024 - Feb 2025",
                    desc: "COGS Calculator for SMEs. Secured Rp14M funding from Innovillage 2024. Reduced errors by 57% through automated calculation algorithms."
                }
            ],
            education: [
                {
                    school: "Telkom University",
                    degree: "Diploma 3 in Accounting Information Systems",
                    period: "September 2023 - Present",
                    desc: "GPA: 3.82/4.00. Focus on Financial Accounting, Taxation, Database Design (SQL), and Business Process Analysis."
                }
            ],
            skills: [
                { category: "Accounting & ERP", items: ["SAP FI/CO", "Zahir Accounting", "Accurate", "Financial Reporting", "Tax Compliance"] },
                { category: "Web Development", items: ["PHP", "Laravel", "Python", "HTML/CSS", "Bootstrap", "SQL/MySQL", "RESTful API"] },
                { category: "Soft Skills", items: ["Team Leadership", "Project Management", "Analytical Thinking", "Detail-Oriented", "Communication"] }
            ],
            certificationsList: [
                { name: "Zahir Accounting", meta: "Feb 2025 | Score: 89/100" },
                { name: "SAP Overview (SAP01)", meta: "May 2025 | ERP Specialist" },
                { name: "Google UX Design", meta: "Jul 2024 | Coursera" }
            ],
            footer: 'Generated by Maulana Muhammad Ikhsan • 2024 Editorial Resume',
        },
    },
    id: {
        nav: {
            home: 'Beranda',
            projects: 'Proyek',
            about: 'Tentang',
            expertise: 'Keahlian',
            experience: 'Pengalaman',
            contact: 'Kontak',
        },
        hero: {
            availableForWork: 'Tersedia untuk proyek',
            greeting: 'Halo, saya',
            description: 'Menjembatani kesenjangan antara logika akuntansi dan teknologi modern. Saya membangun sistem keuangan cerdas yang mengubah cara bisnis beroperasi.',
            viewProjects: 'Lihat Proyek',
            contactMe: 'Hubungi Saya',
            scrollDown: 'Scroll untuk menjelajah',
            resume: 'Resume',
        },
        about: {
            strategicMission: 'Misi Strategis',
            title1: 'Menyederhanakan',
            title2: 'Kompleksitas.',
            title3: 'Mendigitalisasi Kepercayaan.',
            description: 'Sebagai mahasiswa Sistem Informasi Akuntansi dengan IPK 3.82, saya mendedikasikan diri untuk menjembatani gap antara akuntansi tradisional dan teknologi modern. Fokus saya adalah membangun dashboard finansial yang intuitif dan sistem ERP yang meningkatkan efisiensi bisnis secara signifikan.',
            impactMeasurement: 'Pengukuran Dampak',
            reduction: 'Pengurangan',
            calculationErrors: 'Kesalahan Kalkulasi',
            systemsMastery: 'Penguasaan Sistem',
            enterpriseReadiness: 'Kesiapan Enterprise',
            competitiveEdge: 'Keunggulan Kompetitif',
            achievementRegion: 'Nasional',
            funding: 'Pendanaan',
            fundingDesc: 'Pendanaan strategis sebesar Rp14.000.000 untuk riset dan implementasi DuckCost di ekosistem UMKM Indonesia.',
            case: 'Kasus: Algoritma DuckCost',
            tags: ['Spesialis ERP', 'Sistem Fullstack', 'AIS Telkom University', 'Strategi UI/UX'],
            skills: {
                sap: 'SAP FI/CO',
                zahir: 'Sertifikasi Zahir',
                sql: 'Database SQL',
            },
        },
        expertise: {
            sectionLabel: 'Stack Keahlian',
            title1: 'DNA',
            title2: 'Teknis',
            description: 'Kombinasi langka antara ketajaman audit akuntansi dan kecakapan teknis rekayasa perangkat lunak.',
        },
        experience: {
            sectionLabel: 'Jalur Profesional',
            title1: 'Timeline',
            title2: 'Karir',
            description: 'Perjalanan profesional yang dimulai dari rasa penasaran hingga menjadi Fullstack Engineer yang berfokus pada hasil nyata.',
            viewCV: 'Lihat CV Lengkap',
        },
        process: {
            sectionLabel: 'Blueprint Eksekusi',
            title1: 'Metodologi',
            title2: 'Layanan',
            steps: [
                { title: 'Analisis', desc: 'Identifikasi inefisiensi bisnis & dekonstruksi kebutuhan audit finansial.' },
                { title: 'Arsitektur', desc: 'Blueprint database SQL & integrasi business rules akuntansi yang patuh hukum.' },
                { title: 'Rekayasa', desc: 'Pengembangan dengan clean architecture, optimasi frontend, & integrasi API.' },
                { title: 'Deployment', desc: 'UAT (User Acceptance Testing) & deployment ke infrastructure cloud yang aman.' },
            ],
        },
        education: {
            sectionLabel: 'Latar Belakang',
            title1: 'Akademik &',
            title2: 'Penghargaan',
            degree: 'SI Akuntansi',
            period: '2021 - 2025 (Harapan)',
            degreeDesc: 'Universitas Pilihan Utama. IPK: 3.98/4.00 (Kandidat Summa Cum Laude).',
            achievement: 'Prestasi Utama',
            achievementTitle: 'Best Developer Award',
            achievementDesc: 'Pemenang kategori "Inovasi Digital Terbaik" tingkat nasional 2023.',
            certifications: 'Sertifikasi Profesional',
        },
        testimonials: {
            sectionLabel: 'Bukti Sosial',
            title1: 'Dampak',
            title2: 'Terpercaya',
            description: 'Dipercaya oleh pemimpin industri.',
        },
        projects: {
            sectionLabel: 'Arsip Portfolio',
            title1: 'Karya',
            title2: 'Pilihan',
            description: 'Sebuah kurasi sistem cerdas yang menggabungkan presisi algoritma dengan estetika visual kelas atas.',
            filterAll: 'Semua',
            viewProject: 'Lihat Proyek',
        },
        contact: {
            title1: 'Mari',
            title2: 'Mulai',
            title3: 'Sesuatu yang Besar',
            description: 'Saya saat ini tersedia untuk proyek freelance dan peluang full-time. Mari bangun masa depan bersama.',
            formName: 'Nama Anda',
            formEmail: 'Email Anda',
            formSubject: 'Subjek',
            formMessage: 'Pesan Anda',
            formSend: 'Kirim Pesan',
            formSuccess: 'Pesan berhasil terkirim!',
        },
        footer: {
            copyright: '© 2024 - Portofolio',
            portfolio: 'Portofolio',
        },
        projectDetail: {
            backToHub: 'Kembali ke Hub',
            meta: {
                year: 'Tahun',
                client: 'Klien',
                role: 'Peran Saya',
                duration: 'Durasi',
            },
            narrative: 'Narasi',
            coreImplementation: 'Implementasi Inti',
            challenge: 'Tantangan',
            solution: 'Solusi',
            techStack: 'Stack Teknologi',
            liveSite: 'Situs Langsung',
            sourceCode: 'Kode Sumber',
            impact: 'Dampak Proyek',
            visualDeepDive: {
                title1: 'Eksplorasi',
                title2: 'Visual',
            },
            nextProject: {
                label: 'Siap untuk selanjutnya?',
                link: 'Evolusi Berikutnya',
            },
        },
        resume: {
            backToWork: 'Kembali Bekerja',
            downloadCV: 'Unduh CV',
            roleSubtitle: 'Sistem Informasi Akuntansi & Fullstack Developer',
            sections: {
                workExperience: 'Pengalaman Kerja',
                featuredProjects: 'Proyek Unggulan',
                education: 'Pendidikan',
                technicalSkills: 'Kemampuan Teknis',
                certifications: 'Sertifikasi',
            },
            experiences: [
                {
                    company: "Bank Mandiri Regional Collection Office",
                    location: "Bandung, Indonesia",
                    role: "Magang Staf Arsip",
                    period: "Jul 2025",
                    desc: "Melakukan digitalisasi dan entry data dokumen arsip perbankan. Mengelola dan mengorganisir pengarsipan dokumen sesuai standar operasional bank."
                }
            ],
            projects: [
                {
                    name: "AgriDuck",
                    role: "Full-stack Developer & Team Leader",
                    period: "Jul 2025 - Sept 2025",
                    desc: "Pencatatan Keuangan Digital untuk Petani Kecil. Finalis dari 30+ universitas nasional. Membangun pencatatan kas berbasis web dengan dashboard interaktif dan ekspor PDF."
                },
                {
                    name: "DuckCost",
                    role: "Business Analyst & Developer",
                    period: "Nov 2024 - Feb 2025",
                    desc: "Kalkulator HPP untuk UMKM. Mendapatkan pendanaan Rp14 Juta dari Innovillage 2024. Mengurangi error hingga 57% melalui algoritma perhitungan otomatis."
                }
            ],
            education: [
                {
                    school: "Telkom University",
                    degree: "Diploma 3 Sistem Informasi Akuntansi",
                    period: "September 2023 - Sekarang",
                    desc: "IPK: 3.82/4.00. Fokus pada Akuntansi Keuangan, Perpajakan, Desain Database (SQL), dan Analisis Proses Bisnis."
                }
            ],
            skills: [
                { category: "Akuntansi & ERP", items: ["SAP FI/CO", "Zahir Accounting", "Accurate", "Financial Reporting", "Tax Compliance"] },
                { category: "Web Development", items: ["PHP", "Laravel", "Python", "HTML/CSS", "Bootstrap", "SQL/MySQL", "RESTful API"] },
                { category: "Soft Skills", items: ["Team Leadership", "Project Management", "Analytical Thinking", "Detail-Oriented", "Communication"] }
            ],
            certificationsList: [
                { name: "Zahir Accounting", meta: "Feb 2025 | Skor: 89/100" },
                { name: "SAP Overview (SAP01)", meta: "Mei 2025 | Spesialis ERP" },
                { name: "Google UX Design", meta: "Jul 2024 | Coursera" }
            ],
            footer: 'Dibuat oleh Maulana Muhammad Ikhsan • 2024 Resume Editorial',
        },
    },
};

export function getTranslation(lang: Language): Translations {
    return translations[lang];
}
