// Source protection and anti-debugging utilities
export class SourceProtection {
  private static instance: SourceProtection;
  private debugDetected = false;

  static getInstance(): SourceProtection {
    if (!SourceProtection.instance) {
      SourceProtection.instance = new SourceProtection();
    }
    return SourceProtection.instance;
  }

  init() {
    if (import.meta.env.PROD) {
      this.disableDevTools();
      this.preventCopyPaste();
      this.obfuscateConsole();
      this.detectDebugger();
    }
  }

  private disableDevTools() {
    // Disable context menu except on form inputs
    document.addEventListener('contextmenu', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true; // Allow context menu on form inputs
      }
      e.preventDefault();
      return false;
    });

    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      const target = e.target as HTMLElement;
      
      // Allow normal operations in form inputs
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true;
      }

      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && ['I', 'C'].includes(e.key.toUpperCase())) ||
          (e.ctrlKey && ['u', 's'].includes(e.key.toLowerCase()))) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });

    // Disable text selection except in form inputs and content areas
    document.addEventListener('selectstart', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || 
          target.tagName === 'TEXTAREA' || 
          target.contentEditable === 'true' ||
          target.classList.contains('selectable')) {
        return true;
      }
      e.preventDefault();
      return false;
    });

    // Disable drag operations except for form inputs
    document.addEventListener('dragstart', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true;
      }
      e.preventDefault();
      return false;
    });
  }

  private preventCopyPaste() {
    document.addEventListener('copy', (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener('paste', (e) => {
      e.preventDefault();
      return false;
    });

    document.addEventListener('cut', (e) => {
      e.preventDefault();
      return false;
    });
  }

  private obfuscateConsole() {
    const noop = () => {};
    const consoleMethods = ['log', 'warn', 'error', 'info', 'debug', 'trace', 'table', 'group', 'groupEnd'];
    
    consoleMethods.forEach(method => {
      (console as any)[method] = noop;
    });

    // Clear existing console content
    console.clear();

    // Override console object
    (window as any).console = {
      ...Object.fromEntries(consoleMethods.map(method => [method, noop])),
      clear: noop
    };
  }

  private detectDebugger() {
    // Detect if developer tools are open
    let devtools = { open: false };
    
    setInterval(() => {
      const threshold = 160;
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          this.handleDebugDetection();
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Debugger detection with try-catch to prevent TypeScript issues
    setInterval(() => {
      try {
        const start = performance.now();
        // eslint-disable-next-line no-debugger
        debugger;
        const end = performance.now();
        if (end - start > 100) {
          this.handleDebugDetection();
        }
      } catch (e) {
        // Ignore debugger detection errors
      }
    }, 1000);
  }

  private handleDebugDetection() {
    if (!this.debugDetected) {
      this.debugDetected = true;
      // Silent redirect without any user notification
      setTimeout(() => {
        window.location.replace('/');
      }, 100);
    }
  }

  // Remove all Replit traces
  static removeReplitTraces() {
    // Remove Replit-specific elements
    const replitSelectors = [
      '[class*="replit"]',
      '[id*="replit"]',
      '[data-replit]',
      '.replit-banner',
      '.repl-banner',
      '[class*="dev-banner"]'
    ];

    replitSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // Remove Replit scripts
    const scripts = document.querySelectorAll('script[src*="replit"]');
    scripts.forEach(script => script.remove());

    // Clean up meta tags
    const metaTags = document.querySelectorAll('meta[content*="replit" i]');
    metaTags.forEach(meta => meta.remove());
  }

  // Obfuscate source in production
  static obfuscateSource() {
    if (import.meta.env.PROD) {
      // Remove comments from DOM
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_COMMENT,
        null
      );

      const comments: Node[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        comments.push(node);
      }
      comments.forEach(comment => {
        if (comment.parentNode) {
          comment.parentNode.removeChild(comment);
        }
      });

      // Remove data attributes that might reveal framework info
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        const attributesToRemove: string[] = [];
        for (let i = 0; i < el.attributes.length; i++) {
          const attr = el.attributes[i];
          if (attr.name.startsWith('data-') && 
              (attr.name.includes('react') || 
               attr.name.includes('vite') || 
               attr.name.includes('dev'))) {
            attributesToRemove.push(attr.name);
          }
        }
        attributesToRemove.forEach(attrName => {
          el.removeAttribute(attrName);
        });
      });
    }
  }
}

// Auto-initialize in production
if (import.meta.env.PROD) {
  document.addEventListener('DOMContentLoaded', () => {
    SourceProtection.getInstance().init();
    SourceProtection.removeReplitTraces();
    SourceProtection.obfuscateSource();
  });
}