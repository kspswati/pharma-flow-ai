
import React from 'react';
import Logo from '../icons/Logo';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40 py-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Data-driven optimization for pharmaceutical manufacturing and distribution.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Case Studies', 'Documentation'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-pharma-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Careers', 'Press', 'Blog'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-pharma-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-4">Connect</h4>
            <ul className="space-y-3">
              {['Twitter', 'LinkedIn', 'GitHub', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-pharma-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 PharmaFlow AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
