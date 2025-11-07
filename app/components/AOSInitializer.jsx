"use client"
import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css'
export default function AOSInitializer({children}) {

    useEffect (() => {
            Aos.init({
                duration: 1000,
                once: false,
                offset: 120,
            })
    }, [])

  return <>{children}</>
}
