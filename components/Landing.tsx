import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import useScreenSize from '../hooks/useScreenSize'

const About = () => {
  return (
    <div className='my-4 mx-2 md:mx-10 max-w-2xl lg:max-w-lg text-gray-300'>
      <h1 className='text-xl mb-4'>About The Club:</h1>
      <p className='text-xs'>
        Bad Fox Motorcycle Club is a large collective of NFT fans who are working to innovate on what is possible
        with a PFP project. We do diverse forms of fund redistribution, integrations into various metaverses, and
        we develop tools that benefit everyone on Cardano.
      </p>
    </div>
  )
}

const Landing = () => {
  const { screenWidth } = useScreenSize()

  const [showFemale, setShowFemale] = useState(false)
  const [logoSize, setLogoSize] = useState(1)
  const [foxSize, setFoxSize] = useState(1)
  const [bikeSize, setBikeSize] = useState(1)

  useEffect(() => {
    setShowFemale(!!Math.round(Math.random()))
  }, [])

  useEffect(() => {
    setLogoSize((screenWidth / 100) * 30.5)
    setFoxSize((screenWidth / 100) * 42)
    setBikeSize((screenWidth / 100) * 50)
  }, [screenWidth])

  return (
    <Fragment>
      <div id='home' className='relative w-screen h-[75vh] md:h-[90vh]'>
        <div className='hidden lg:block animate__animated animate__fadeInRight'>
          <About />
        </div>

        <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10'>
          <div className='animate__animated animate__infinite animate__slower animate__pulse'>
            <Image
              src='/media/logo/white_alpha.png'
              alt='logo'
              priority
              width={logoSize}
              height={logoSize}
              className='drop-shadow-landinglogo'
            />
          </div>
        </div>

        <div className='absolute bottom-0 right-0'>
          <div className='animate__animated animate__fadeInDown'>
            <Image
              src={`/media/landing/${showFemale ? 'f_fox.png' : 'm_fox.png'}`}
              alt='fox'
              priority
              width={foxSize}
              height={foxSize}
            />
          </div>
        </div>

        <div className='absolute bottom-0 left-0'>
          <div className='animate__animated animate__fadeInDown'>
            <Image
              src={`/media/landing/${showFemale ? 'f_bike.png' : 'm_bike.png'}`}
              alt='motorcycle'
              priority
              width={bikeSize}
              height={bikeSize / 1.7647}
            />
          </div>
        </div>
      </div>

      <div className='lg:hidden animate__animated animate__fadeInRight'>
        <About />
      </div>
    </Fragment>
  )
}

export default Landing
