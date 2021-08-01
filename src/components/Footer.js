import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
    return (
        <footer className="copyright">
            <div className="copyrightColumn">
                <div className="copyrightRow">
                    <p>
                        Sitemap
                    </p>
                    <p>
                        Privacy Policy
                    </p>
                    <p>
                        &copy; 2021 mySocial.
                    </p>
                </div>
                <p>
                    All rights reserved. Powered by mySocial
                </p>
            </div>
        </footer>
    )
}

export default Footer
