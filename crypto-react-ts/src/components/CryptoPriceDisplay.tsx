import React, { useMemo } from 'react'
import { useCryptoStore } from '../store'

export default function CryptoPriceDisplay() {
    const result = useCryptoStore((state) => state.result)
    const hasResult = useMemo(() => !Object.values(result).includes(''), [result])
    return (
        <div className='result-wrapper'>
            {hasResult && (
                <>
                    <h2>Cotizacion</h2>
                    <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="Imagen cryptomoneda" />
                    <div className="result">
                        <div><p>El precio es de <span>{result.PRICE}</span></p></div>
                        <div><p>El precio mas alto del dia  <span>{result.HIGHDAY}</span></p></div>
                        <div><p>El precio mas bajo del dia <span>{result.LOWDAY}</span></p></div>
                        <div><p>Variavicion ultimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></p></div>
                        <div><p>Última actualizacion: <span>{result.LASTUPDATE}</span></p></div>
                    </div>
                </>
            )}

        </div>
    )
}
