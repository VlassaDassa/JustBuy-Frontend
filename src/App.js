import React, { useState, useLayoutEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import CriticalErrorMessage from './components/General/criticalErrorMessage'
import ErrorMessage from './components/General/errorMessage';

import AppRouter from './components/AppRouter';
import Footer from './components/General/footer';
import Header from './components/General/header';
import Menu from './components/General/menu';
import Overlay from './components/General/overlay';
import ToUp from './components/General/toUp';
import Auth from './components/General/auth';
import MobileSearchBar from './components/General/mobileSearchBar';
import MenuMobile from './components/General/menuMobile';
import noScroll from './store/noScroll';
import GlobalLoader from './components/General/globalLoader';
import DemoBanner from './components/General/demoBanner';

import critical_error from './store/critical_error';
import { updateLocalStorage } from './services/services';

import menu from './store/menu';
import overlay from './store/overlay';
import auth from './store/authForm';

import './../src/assets/styles/_reset.scss'
import './../src/assets/styles/index.scss'




const App = observer(() => {
  const [hiddenGlobalLoader, setHiddenGlobalLoader] = useState(false)

  if (noScroll.scroll) {
    document.body.classList.remove('no-scroll')
  }
  else {
      document.body.classList.add('no-scroll')
  }

  const location = useLocation();

  

  useLayoutEffect(() => {
    setHiddenGlobalLoader(false)

    // Определение авторизации
    updateLocalStorage()
  
    window.scrollTo(0, 0);
    noScroll.toggleScroll(false)
    
    setTimeout(() => {
      noScroll.toggleScroll(true)
      setHiddenGlobalLoader(true)
    }, 1000)

    return () => { setHiddenGlobalLoader(false) }
  }, [location])



  // Critical error
  if (critical_error.show) {
    return <CriticalErrorMessage message="Ошибка. Скорее всего проблемы с сервером" />
  }


  return (
    <div className="App">
      <GlobalLoader hiddenGlobalLoader={hiddenGlobalLoader}/>

      <ErrorMessage message={'Ошибка'} />

      <CSSTransition
        in={menu.show}
        unmountOnExit
        key={'transmenu'}
        timeout={500}
        classNames="transmenu"
      >
        <Menu />
      </CSSTransition>

      <Header />
      <DemoBanner />
      

      <MobileSearchBar />

      <MenuMobile />

      <CSSTransition
        in={auth.show}
        unmountOnExit
        key={'AuthTransh'}
        timeout={300}
        classNames="overlaytrans"
      >
        <Auth />
      </CSSTransition>

      
      <CSSTransition
        in={overlay.show}
        unmountOnExit
        key={'overlaytrans'}
        timeout={300}
        classNames="overlaytrans"
      >
        <Overlay />
      </CSSTransition>
        
      <AppRouter/>
        
      <ToUp />

      <Footer />
    </div>
  );
})

export default App;