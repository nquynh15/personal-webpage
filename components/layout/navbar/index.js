// Import the navbar component
import './navbar.js';

// Import navbar styles
import './navbar.css';

// Export the NavbarComponent class for ES6 modules
export { NavbarComponent } from './navbar.js';

// Default export for convenience
export default window.NavbarComponent;

// Additional utilities that might be useful
export const navbarUtils = {
    // Initialize navbar manually
    init: () => {
        if (window.navbarComponent) {
            console.warn('Navbar already initialized');
            return window.navbarComponent;
        }
        return new window.NavbarComponent();
    },
    
    // Destroy current navbar instance
    destroy: () => {
        if (window.navbarComponent) {
            window.navbarComponent.destroy();
            window.navbarComponent = null;
        }
    },
    
    // Reinitialize navbar
    reinit: () => {
        navbarUtils.destroy();
        return navbarUtils.init();
    },
    
    // Get current navbar instance
    getInstance: () => {
        return window.navbarComponent || null;
    }
};

console.log('📦 Navbar component module loaded'); 