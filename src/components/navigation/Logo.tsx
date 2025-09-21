

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logo.module.css';

/**
 * Neon & Retro logo for ALKAL navigation bar.
 * Features flickering neon text effect for 'A', 'L', 'K', 'A', 'L'.
 */
const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      title="ALKAL"
      onClick={() => navigate('/')}
      className="cursor-pointer font-mono text-4xl font-bold"
    >
      <span className={styles.flickerL + ' text-white'}>A</span>
      <span className={styles.flickerS + ' text-white'} style={{ marginLeft: '-0.1em' }}>L</span>
      <span className={styles.flickerL + ' text-white'} style={{ marginLeft: '-0.1em' }}>K</span>
      <span className={styles.flickerS + ' text-white'} style={{ marginLeft: '-0.1em' }}>A</span>
      <span className={styles.flickerL + ' text-white'} style={{ marginLeft: '-0.1em' }}>L</span>
    </div>
  );
}

export default Logo;
