<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            // Projects
        \App\Models\Project::updateOrCreate(
            ['slug' => 'agriduck'],
            [
            'title' => 'AgriDuck',
            'category' => 'FinTech Systems',
            'year' => '2025',
            'duration' => '6 Months',
            'client' => 'Agricultural Cooperatives (SMEs)',
            'role' => 'Lead System Architect',
            'description' => 'A high-integrity financial recording platform designed to digitize accounting workflows for small-scale farmers.',
            'long_description' => "AgriDuck was engineered to bridge the digital divide in the agricultural sector. As a finalist among 30+ universities nationwide, the system focuses on real-time ledger management, automated trial balances, and simplified financial reporting for non-accountants.\n\nThe platform integrates a robust audit trail and multi-user authentication, ensuring data integrity across decentralized farming groups while providing clear fiscal visibility for stakeholders.",
            'image' => '/brain/22bddd10-3ba2-4988-ab6b-b4a5b437d8fd/agriduck_mockup_1770176461876.png',
            'tech' => ['PHP', 'SQL', 'Inertia.js', 'Tailwind CSS', 'Vite'],
            'features' => [
                'Automated Financial Ledger Synchronization',
                'Real-time P&L (Profit and Loss) Generation',
                'Agricultural Inventory Tracking Logic',
                'Multi-user Cooperative Access Control'
            ],
            'screenshots' => [
                '/brain/22bddd10-3ba2-4988-ab6b-b4a5b437d8fd/agriduck_mockup_1770176461876.png'
            ],
            'challenges' => 'The primary challenge was designing a UX that non-tech-savvy farmers could navigate while maintaining the strict requirements of double-entry bookkeeping.',
            'solution' => 'I implemented a "Smarter Entry" algorithm that automates journalizing based on simple activity inputs (e.g., selling crops), hiding the complexity of debits and credits from the end-user.',
            'featured' => true,
            'status' => 'published'
        ]);

        \App\Models\Project::updateOrCreate(
            ['slug' => 'duckcost'],
            [
            'title' => 'DuckCost',
            'category' => 'ERP Analytics',
            'year' => '2025',
            'duration' => '4 Months',
            'client' => 'Manufacturing SMEs',
            'role' => 'Fullstack Developer & Analyst',
            'description' => 'An AI-enhanced COGS (Cost of Goods Sold) optimization engine that secured Rp14M in national funding.',
            'long_description' => "DuckCost is a specialized ERP module focused on production cost optimization. By analyzing raw material price fluctuations and overhead allocation, the system provides SMEs with precise pricing strategies.\n\nThe project ranked in the Top 165 nationally during the Innovillage 2024 competition, receiving a strategic grant for its potential to stabilize SME profit margins through data-driven decision making.",
            'image' => 'https://images.unsplash.com/photo-1551288049-bbda38a5f85d?q=80&w=2070&auto=format&fit=crop',
            'tech' => ['Laravel', 'MySQL', 'Chart.js', 'Redis', 'Bootstrap'],
            'features' => [
                'Dynamic COGS Calculation Algorithm',
                'Predictive Profit Margin Modeling',
                'Overhead Cost Allocation Engine',
                'Visual Financial Analytics Dashboard'
            ],
            'screenshots' => [
                'https://images.unsplash.com/photo-1551288049-bbda38a5f85d?q=80&w=2070&auto=format&fit=crop'
            ],
            'challenges' => 'Inconsistent raw material pricing and manual tracking led to a 15% discrepancy in profit reporting for pilot SMEs.',
            'solution' => 'I developed an automated indexing system that syncs with inventory costs, reducing calculation errors by 57% and ensuring accurate margin analysis.',
            'featured' => true,
            'status' => 'published'
        ]);

        \App\Models\Project::updateOrCreate(
            ['slug' => 'r-juice'],
            [
            'title' => 'R Juice',
            'category' => 'Consumer App',
            'year' => '2024',
            'duration' => '3 Months',
            'client' => 'Fresh Retail Startup',
            'role' => 'UX / UI Engineer',
            'description' => 'A vibrant mobile commerce platform for organic juice subscriptions with real-time delivery tracking.',
            'long_description' => "R Juice focuses on premium health-conscious consumers. The app features a subscription management system, seasonal fruit availability logic, and a gamified loyalty program. \n\nThe objective was to create a frictionless ordering experience that reflects the brand's freshness through high-fidelity visual design and smooth micro-interactions.",
            'image' => 'https://images.unsplash.com/photo-1622060822165-30bc3d46b53b?q=80&w=2072&auto=format&fit=crop',
            'tech' => ['React Native', 'Firebase', 'Framer Motion', 'Stripe'],
            'features' => [
                'Subscription Life-cycle Management',
                'Real-time GPS Delivery Tracking',
                'Seasonal Inventory Sync',
                'Gamified Loyalty System'
            ],
            'screenshots' => [
                'https://images.unsplash.com/photo-1622060822165-30bc3d46b53b?q=80&w=2072&auto=format&fit=crop'
            ],
            'challenges' => 'Maintaining a "fresh" brand image while handling complex subscription logic and real-time logistics was a significant UX challenge.',
            'solution' => 'I implemented a state-driven UI that adapts its palette based on the chosen fruit subscription, creating a sensory-aligned digital experience.',
            'featured' => true,
            'status' => 'published'
        ]);

        \App\Models\Project::updateOrCreate(
            ['slug' => 'cellupay'],
            [
            'title' => 'CelluPay',
            'category' => 'Financial Security',
            'year' => '2024',
            'duration' => '5 Months',
            'client' => 'Digital Security Firm',
            'role' => 'Backend Architect',
            'description' => 'A secure biometric-linked payment gateway designed for high-risk transaction environments.',
            'long_description' => "CelluPay provides an additional layer of security for digital transactions. By utilizing biometric hashes and advanced SQL-level encryption, the system ensures that high-value transfers are authorized only by verified biology.\n\nThe system was stress-tested against common injection and spoofing vectors, achieving a 99.9% fraud prevention rate during the pilot phase.",
            'image' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
            'tech' => ['Node.js', 'PostgreSQL', 'Biometric API', 'JWT', 'Redis'],
            'features' => [
                'Biometric Authentication Integration',
                'Advanced Transaction Encryption',
                'Real-time Fraud Detection Heuristics',
                'Compliance-ready Audit Logs'
            ],
            'screenshots' => [
                'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop'
            ],
            'challenges' => 'The system needed to process biometric data within milliseconds without compromising on the depth of the security audit.',
            'solution' => 'I architected a Redis-backed caching layer for session-hashes, allowing for lightning-fast verification while persistent logs were handled asynchronously.',
            'featured' => true,
            'status' => 'published'
        ]);

        // Experiences
        \App\Models\Experience::create([
            'company' => 'Bank Mandiri',
            'role' => 'Backoffice & Support (Intern)',
            'period' => 'Sept 2023 - Jan 2024',
            'desc' => 'Optimized administrative workflows within one of Indonesia\'s largest financial institutions, focusing on data reconciliation and digital archival accuracy.',
            'achievements' => [
                'Streamlined document processing workflows by 20% through digital categorization.',
                'Maintained 100% accuracy in financial data reconciliation for branch operations.',
                'Collaborated with the back-office team to ensure compliance with banking regulations.'
            ]
        ]);

        // Skills
        \App\Models\Skill::create([
            'title' => 'Accounting Info Systems',
            'description' => 'Specialization in bridging traditional accounting processes with modern software automation & ERP.',
            'items' => ['SAP FI/CO', 'Zahir', 'Accurate', 'SQL Auditor'],
            'icon' => 'Settings'
        ]);

        \App\Models\Skill::create([
            'title' => 'Fullstack Systems',
            'description' => 'Building robust web architectures with Laravel, SQL, and modern React interfaces.',
            'items' => ['Laravel 12', 'React', 'Inertia', 'PostgreSQL'],
            'icon' => 'Code2'
        ]);

        \App\Models\Skill::create([
            'title' => 'System Analysis',
            'description' => 'Designing system blueprints using BPMN & UML for precise technical specifications.',
            'items' => ['BPMN 2.0', 'UML', 'SDLC', 'User Flow'],
            'icon' => 'PenTool'
        ]);

        \App\Models\Skill::create([
            'title' => 'Business Logic',
            'description' => 'Translation of accounting regulations & Indonesian taxation into efficient system algorithms.',
            'items' => ['Tax Compliance', 'IFRS', 'Cost Accounting'],
            'icon' => 'Database'
        ]);

        // Certifications
        \App\Models\Certification::create([
            'name' => 'SAP Certified Associate (SAP01)',
            'org' => 'SAP SE',
            'period' => 'May 2025',
            'score' => 'ERP Specialist'
        ]);

        \App\Models\Certification::create([
            'name' => 'Zahir Professional Certification',
            'org' => 'Zahir Accounting',
            'period' => 'Feb 2025',
            'score' => '89/100'
        ]);

        \App\Models\Certification::create([
            'name' => 'Google UX Design Professional',
            'org' => 'Coursera',
            'period' => 'Jul 2024',
            'score' => 'Professional Certificate'
        ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Seeder Error: " . $e->getMessage());
            throw $e;
        }
    }
}
