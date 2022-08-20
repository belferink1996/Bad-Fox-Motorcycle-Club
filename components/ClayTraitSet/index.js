import Image from 'next/image'
import React, { useState } from 'react'
import Loader from '../Loader'

const LoadingImage = ({ size, src }) => {
  const [loading, setLoading] = useState(true)

  return (
    <div style={{ position: 'relative' }}>
      <Image
        style={{ borderRadius: '100%' }}
        src={src}
        alt=''
        width={size}
        height={size}
        onLoadingComplete={() => setLoading(false)}
      />
      {loading ? (
        <Loader
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          color='var(--black)'
        />
      ) : null}
    </div>
  )
}

const setItemTextStyle = {
  margin: '0.2rem 0 0 0',
  padding: '0.2rem 0.5rem',
  backgroundColor: 'var(--apex-charcoal)',
  borderRadius: '0.3rem',
  fontSize: '0.8rem',
  textAlign: 'center',
}

const ClayTraitSet = ({ title = '', textRows = [], set = [] }) => {
  return (
    <div
      style={{
        margin: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--charcoal)',
        borderRadius: '1rem',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ margin: '0', textAlign: 'center', fontSize: '1.4rem' }}>{title}</h4>
        {textRows.map((str) => (
          <p key={`${title}-${str}`} style={{ margin: '0', textAlign: 'center' }}>
            {str}
          </p>
        ))}
      </div>

      <div className='flex-row' style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {set
          .sort((a, b) => a.traitCount - b.traitCount)
          .map(({ traitCategory, traitLabel, traitImage, traitPercent, ownedTraitCount }) => (
            <div
              key={`${title}-${traitCategory}-${traitLabel}`}
              className='flex-col'
              style={{
                width: 200,
                height: 200,
                margin: '0.5rem',
                backgroundColor: 'rgba(250,250,250,0.2)',
                borderRadius: '100%',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <LoadingImage src={traitImage} size={170} />
              {ownedTraitCount ? (
                <p
                  style={{
                    ...setItemTextStyle,
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '-1rem',
                  }}
                >
                  In wallet: {ownedTraitCount}
                </p>
              ) : null}
              <p
                style={{
                  ...setItemTextStyle,
                  position: 'absolute',
                  top: '-0.5rem',
                }}
              >
                {traitPercent}
              </p>
              <p
                style={{
                  ...setItemTextStyle,
                  position: 'absolute',
                  bottom: '-0.5rem',
                }}
              >
                {traitCategory}: {traitLabel}
              </p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ClayTraitSet