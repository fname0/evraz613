import Image from 'next/image';
import Seo from '../components/Seo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Cookies from 'universal-cookie';

export default function Index() {
  const [cookie, setCookie] = useState();

  useEffect(() => {
    const cookie = new Cookies();
    setCookie(cookie);
  }, [])

  return (
    <div className="App" id="app">
        <Seo title="ЕВРАЗ" description="ЕВРАЗ" keywords="ЕВРАЗ"/>

        <div className='main'>
        <form>
          <div className='logo'>
            <img src="/logo.svg"/>
            <div className='title'>
              <img src="/slash.svg"/>
              <p>АРМ диспетчера ЖД станции</p>
            </div>
          </div>
          <div className='auth'>Авторизация</div>
          <div className='sep'></div>
          <div className='inputs'>
            <div>
              <p>Станция</p>
              <select>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
              </select>
            </div>
            <div>
              <p>Логин<span style={{color: '#BB2532'}}>*</span></p>
              <input className='inpLogin'/>
            </div>
            <div>
              <p>Пароль<span style={{color: '#BB2532'}}>*</span></p>
              <input type='password' className='inpPassword'/>
              <img className='glaz' width={24} src="/glaz.svg"/>
            </div>
          </div>
          <div className='sep'></div>
          <div className='submit'>Войти</div>
        </form>
      </div>
    </div>
  )
}
