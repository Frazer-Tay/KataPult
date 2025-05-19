// src/pages/SuratResmiPage.js
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import styles from './SuratResmiPage.module.css';
import { suratResmiGuide } from '../data/suratResmiContent'; // Ensure this path is correct

const SuratResmiPage = () => {
  const pageRef = useRef(null);
  const location = useLocation(); // Get current location object
  const navigate = useNavigate(); // For programmatic navigation (updating hash)

  useEffect(() => {
    // This effect handles the actual scrolling once the hash is set
    const hash = location.hash;
    if (hash) {
      const id = hash.substring(1); // Remove the '#'
      const element = document.getElementById(id);
      if (element) {
        // Slight delay to ensure the element is fully ready, especially after navigation
        const scrollTimer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50); // A small delay
        return () => clearTimeout(scrollTimer);
      } else {
        console.warn(`Element with ID '${id}' not found for scrolling.`);
        // Fallback to top if element not found after hash change
        // (e.g. if hash is manually typed and invalid)
        window.scrollTo(0, 0);
      }
    } else {
      // No hash, scroll to top (e.g., on initial page load without a hash)
      window.scrollTo(0, 0);
    }
  }, [location.hash]); // IMPORTANT: Only re-run when location.hash changes

  const handleTocLinkClick = (event, sectionId) => {
    event.preventDefault(); // Prevent default <a> tag behavior which might cause full navigation

    // Check if we are already on the correct page (should always be true here)
    // and if the target hash is different from the current hash
    const targetHash = `#${sectionId}`;
    if (location.pathname.endsWith('/surat-resmi') && location.hash !== targetHash) {
      navigate(`${location.pathname}${targetHash}`, { replace: true }); // Update URL hash without full reload
                                                                      // `replace: true` prevents adding to browser history for in-page jumps
    } else if (location.pathname.endsWith('/surat-resmi') && location.hash === targetHash) {
      // If already at the hash, still try to scroll (e.g., user clicked again)
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // If not on /surat-resmi (shouldn't happen with this component structure),
    // you might need a more complex navigate('/surat-resmi' + targetHash)
  };


  // Helper function to render different element types (same as before)
  const renderElement = (element, key) => {
    const createMarkup = (htmlContent) => {
      const sanitizedContent = typeof htmlContent === 'string'
        ? htmlContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        : '';
      return { __html: sanitizedContent };
    };

    switch (element.type) {
      case 'paragraph':
        if (element.isQuote) {
          return <blockquote key={key} className={styles.quote} dangerouslySetInnerHTML={createMarkup(element.content)} />;
        }
        return <p key={key} dangerouslySetInnerHTML={createMarkup(element.content)} />;
      case 'subheading':
        if (element.level === 3) return <h3 key={key} className={styles.subSectionTitle} dangerouslySetInnerHTML={createMarkup(element.content)} />;
        if (element.level === 4) return <h4 key={key} className={styles.subSubSectionTitle} dangerouslySetInnerHTML={createMarkup(element.content)} />;
        return <h3 key={key} className={styles.subSectionTitle} dangerouslySetInnerHTML={createMarkup(element.content)} />;
      case 'example':
        return <p key={key} className={styles.example} dangerouslySetInnerHTML={createMarkup(element.content)} />;
      case 'list':
        return (
          <ul key={key}>
            {element.items && element.items.map((item, i) => <li key={`${key}-item-${i}`} dangerouslySetInnerHTML={createMarkup(item)} />)}
          </ul>
        );
      case 'preformatted':
        return <pre key={key} className={styles.codeBlock}>{element.content}</pre>;
      case 'important':
        return <p key={key} className={styles.important} dangerouslySetInnerHTML={createMarkup(element.content)} />;
      case 'exampleLetter':
        return (
          <div key={key} className={styles.exampleLetter}>
            <h4 dangerouslySetInnerHTML={createMarkup(element.title)} />
            <pre className={styles.letterContent}>{element.content}</pre>
          </div>
        );
      default:
        if (typeof element.content === 'string') {
          return <p key={key} dangerouslySetInnerHTML={createMarkup(element.content)} />;
        }
        console.warn(`Unknown element type or missing content for key: ${key}`, element);
        return null;
    }
  };

  if (!suratResmiGuide || !suratResmiGuide.sections) {
    return (
      <div className={styles.container} ref={pageRef} tabIndex={-1}>
        <h1 className={styles.mainTitle}>Panduan Surat Resmi</h1>
        <p className={styles.intro}>Konten panduan tidak dapat dimuat. Mohon periksa file data `suratResmiContent.js`.</p>
      </div>
    );
  }

  // Function to generate URL-friendly IDs (ensure this is used consistently)
  const generateSectionId = (idString) => {
    return String(idString).replace(/\s+/g, '-').toLowerCase();
  }

  return (
    <div className={styles.container} ref={pageRef} tabIndex={-1}>
      <h1 className={styles.mainTitle}>{suratResmiGuide.mainTitle}</h1>
      {suratResmiGuide.introduction && <p className={styles.intro}>{suratResmiGuide.introduction}</p>}

      {suratResmiGuide.tableOfContents && suratResmiGuide.tableOfContents.length > 0 && (
        <nav className={styles.toc}>
          <h2>Daftar Isi</h2>
          <ul>
            {suratResmiGuide.tableOfContents.map(item => {
              const sectionId = generateSectionId(item.id);
              return (
                <li key={item.id}>
                  <a
                    href={`#${sectionId}`}
                    onClick={(e) => handleTocLinkClick(e, sectionId)}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {suratResmiGuide.sections.map(section => {
        const sectionId = generateSectionId(section.id);
        return (
          <section key={section.id} id={sectionId} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.elements && section.elements.map((el, index) => renderElement(el, `${section.id}-el-${index}`))}
          </section>
        );
      })}
    </div>
  );
};

export default SuratResmiPage;