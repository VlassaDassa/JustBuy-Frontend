import React, { useState } from 'react';

import './index.scss';

const STORAGE_KEY = 'justbuy_demo_notice_hidden';

const DemoBanner = () => {
    const [hidden, setHidden] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) === 'true';
    });

    const hideBanner = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setHidden(true);
    };

    if (hidden) {
        return null;
    }

    return (
        <aside className="demo-notice">
            <button
                className="demo-notice__close"
                type="button"
                aria-label="Close"
                onClick={hideBanner}
            >
                &#215;
            </button>

            <div className="demo-notice__label">
                DEMO
            </div>

            <div className="demo-notice__title">
                {'\u0414\u0435\u043c\u043e\u0432\u0435\u0440\u0441\u0438\u044f'}
            </div>

            <div className="demo-notice__text">
                {'\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044e\u0442\u0441\u044f \u0442\u0435\u0441\u0442\u043e\u0432\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435. \u0427\u0430\u0441\u0442\u044c \u0444\u0443\u043d\u043a\u0446\u0438\u0439 \u0438 \u0441\u0442\u0440\u0430\u043d\u0438\u0446 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430.'}
            </div>
        </aside>
    );
};

export default DemoBanner;