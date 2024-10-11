import { useRef, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';
import PrivacyPolicy from './About/PrivacyPolicy';
import TermsOfService from './About/TermsOfService';
import ContactForm from './About/ContactForm';

const About = () => {
    const { privacy, terms } = useLoaderData() as any;
    const privacyRef = useRef<HTMLDivElement>(null);
    const tosRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    const sections = [
        { label: 'Privacy Policy', ref: privacyRef, name: 'privacy' },
        { label: 'Terms of Service', ref: tosRef, name: 'terms' },
        { label: 'Contact', ref: contactRef, name: 'contact' },
    ];

    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isScrollingComplete, setIsScrollingComplete] = useState(false);

    useEffect(() => {
        const sectionToScrollTo = sections.find((section) =>
            location.search.includes(section.name)
        );
        if (sectionToScrollTo && sectionToScrollTo.ref.current) {
            sectionToScrollTo.ref.current.scrollIntoView({ behavior: 'smooth' });
        }
        const scrollTimeout = setTimeout(() => {
            console.log('Scrolling complete');
            setIsScrollingComplete(true);
        }, 500);

        return () => clearTimeout(scrollTimeout);
    }, [location.search, sections]);

    useEffect(() => {
        if (!isScrollingComplete) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionName = entry.target.getAttribute('id');
                        if (sectionName && sectionName !== activeSection) {
                            setActiveSection(sectionName);
                            navigate(`?section=${sectionName}`, { replace: true });
                        }
                    }
                });
            },
            { threshold: 0.6 }
        );


        sections.forEach((section) => {
            if (section.ref.current) {
                observer.observe(section.ref.current);
            }
        });


        return () => {
            sections.forEach((section) => {
                if (section.ref.current) {
                    observer.unobserve(section.ref.current);
                }
            });
        };
    }, [activeSection, navigate, isScrollingComplete, sections]);

    return (
        <div className='about'>
            <div className="about-section" ref={privacyRef} id="privacy">
                <PrivacyPolicy data={privacy} />
            </div>
            <div className="about-section" ref={tosRef} id="terms">
                <TermsOfService data={terms} />
            </div>
            <div className="about-section" ref={contactRef} id="contact">
                <ContactForm />
            </div>
        </div>
    );
};

export default About;