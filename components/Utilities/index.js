import dynamic from 'next/dynamic'
import useScreenSize from '../../hooks/useScreenSize'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { MinusCircleIcon } from '@heroicons/react/24/outline'
import Tokens from './Tokens'
import ListItem from './LisItem'
import MediaWrapper from './MediaWrapper'
import styles from './Utilities.module.css'

const Fox = dynamic(() => import('./Model/Fox'), { suspense: true })
const Key = dynamic(() => import('./Model/Key'), { suspense: true })

const data = [
  {
    complete: false,
    chapter: 'Fund Redistribution',
    events: [
      {
        complete: true,
        title: 'ADA',
        description: '80% royalties to 100% holders (foxes, motorcycles, keys)',
      },
      {
        complete: true,
        title: 'Clay Token',
        description: 'Exclusive Airdrop to collectors of certain trait sets. Airdrop occurred Christmas 2022.',
      },
      {
        complete: true,
        title: 'Hexonium Token',
        description: 'Non custodial staking with Cardano Lands',
      },
      {
        complete: true,
        title: 'Society Token',
        description: 'Non custodial staking with The Ape Society',
      },
      {
        complete: true,
        title: 'MD Token',
        description: 'Non custodial staking with Mad Dog Cur Club',
      },
      {
        complete: false,
        title: 'C4 Token',
        description: 'Non custodial staking with Cardano Crocs Club',
      },
    ],
    renderMedia: (isLeft) => (
      <MediaWrapper isLeft={isLeft} size={150} posTop='150px'>
        <Tokens
          size={150}
          srcs={[
            '/media/tokens/ada.webp',
            '/media/tokens/clay.png',
            '/media/tokens/hexonium.png',
            '/media/tokens/society.png',
            '/media/tokens/md.png',
            '/media/tokens/c4.png',
          ]}
        />
      </MediaWrapper>
    ),
  },
  {
    complete: false,
    chapter: 'Airdrops',
    events: [
      {
        complete: true,
        title: '42 Chain',
        description:
          "Limited supply of 150, exclusive airdrop (occurred Sept. 2022) to owners of Bad Fox #4042's famous traits. Grants membership access to exclusive/early content produced by 4042.",
      },
      {
        complete: false,
        title: 'Music Album',
        description:
          'Airdrop to holders of the 42 Chain. Produced in collaboration with 4042 and Awesomeisjayell.',
      },
      {
        complete: false,
        title: '3D Fox Avatar',
        description:
          'Supply of 6,000 3D metaverse compatible avatars. To be used in the OGVerse and other metaverses that support this standard.',
      },
      {
        complete: false,
        title: '3D Motorcycle',
        description: 'Coming soon™️',
      },
      {
        complete: false,
        title: 'Vox Fox Avatar',
        description:
          'Supply of 6,000 Vox metaverse compatible avatars. To be used in the Boss Planet and other metaverses that support this standard.',
      },
    ],
    renderMedia: (isLeft) => (
      <MediaWrapper isLeft={isLeft} size={300} posTop='0px'>
        <Key />
      </MediaWrapper>
    ),
  },
  {
    complete: false,
    chapter: 'Games & Metaverses',
    events: [
      {
        complete: false,
        title: 'MetaView Tower',
        description:
          'CardaStacks made us a custom interior design for your studio in the residential tower, and gave us an entire floor in their collaboration tower (floor #69). We will develop a motorcycle club with different gaming elements!',
      },
      {
        complete: false,
        title: 'OGVerse',
        description:
          "OGBears are developing a Bear vs. Fox Motorcycle Racing mini-game for both our communities. It will be a restricted P2E mini-game, with NFTs as prizes. In addition to the mini-game, we're going to enter the OGVerse and have our own world integrated.",
      },
      {
        complete: false,
        title: 'Cornucopias',
        description: 'Coming soon™️',
      },
      {
        complete: false,
        title: 'Unbounded Earth',
        description: 'Coming soon™️',
      },
      {
        complete: false,
        title: 'Boss Planet',
        description: 'Coming soon™️',
      },
    ],
    renderMedia: (isLeft) => (
      <MediaWrapper isLeft={isLeft} size={450} posTop='0px'>
        <Fox />
      </MediaWrapper>
    ),
  },
]

const Utilities = () => {
  const { isMobile } = useScreenSize()

  return (
    <div className={`${styles.root} mt-10 text-gray-500`}>
      <h1 className='mb-5 text-3xl'>Utilities</h1>

      {data.map((phase, idx) => {
        const isLeft = idx % 2 !== 0

        return (
          <div
            key={phase.chapter}
            className={`relative ${styles.chapter} ${
              !isMobile ? (isLeft ? styles.leftChapter : styles.rightChapter) : styles.mobileChapter
            }`}
          >
            <h2 className='text-xl'>
              {phase.complete ? <CheckCircleIcon className='w-6 h-6' /> : <MinusCircleIcon className='w-6 h-6' />}
              {phase.chapter}
            </h2>

            {phase.events.map((event) => (
              <ListItem
                key={event.title}
                complete={event.complete}
                title={event.title}
                description={event.description}
                media={event.media}
                isLeft={isLeft}
              />
            ))}

            {phase.renderMedia(isLeft)}
          </div>
        )
      })}
    </div>
  )
}

export default Utilities