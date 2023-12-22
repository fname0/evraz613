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
    </div>
  )
}
