import React, { useEffect, useRef, useState } from 'react'
import { FaCopy } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa6";


export const Copy = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<number | null>(null)
    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(text);

            setCopied(true);

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = window.setTimeout(() => {
                setCopied(false)
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        return () => {
            if(timerRef.current){
                clearTimeout(timerRef.current)
            }
        }
    }, [])
    return (
        <>
            {
                copied 
                ? <FaCopy onClick={handleCopy} className="cursor-pointer text-blue-400"/> 
                : <FaRegCopy onClick={handleCopy}  className="cursor-pointer"/>
                }
        </>
    )
}
