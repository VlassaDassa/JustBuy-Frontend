import './index.scss';

const DemoBanner = () => {
    return (
        <div className="demo-banner" role="status">
            <strong>Демоверсия</strong>
            <span>Используются тестовые данные. Часть задуманных страниц и пользовательских сценариев недоступна.</span>
        </div>
    );
};

export default DemoBanner;