import React, {useState} from "react";
import Link from '@docusaurus/Link';


const HeroButtons = () => {
    const [showModal, setShowModal] = useState(false);

    const handleVideoClick = () => {
        if (window.innerWidth > 768) {
            setShowModal(true);
        } else {
            window.location.href = 'https://eitaa.com/eitaa_developer_app'
        }
    };

    return (

                <div className="hero-buttons">
                    <button
                        className="video-tutorial"
                        onClick={handleVideoClick}
                    >
                        آموزش ویدئویی
                    </button>

                    <Link className="technical-docs" to="/docs/Introduction">
                        مستندات فنی
                    </Link>

                    {showModal && (
                        <div className="modal-overlay" dir='ltr'>
                            <div className="modal-content">
                                <button onClick={() => setShowModal(false)} aria-label="بستن" className="modal-close">&times;</button>
                                <div className="modal-warning">
                                    <span className="modal-warning-icon" aria-label="هشدار" role="img">⚠️</span>
                                    <p className="modal-warning-text">
                                        این آموزش در حال حاضر فقط از طریق برنامک مستندات ایتا در نسخه اندروید قابل دسترسی است، لطفا با موبایل اقدام کنید
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
    );
}

export default HeroButtons;