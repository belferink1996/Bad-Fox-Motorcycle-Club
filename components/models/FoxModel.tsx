import { Environment, OrbitControls, SpotLight } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import ModelChild from './ModelChild'

export interface FoxModelProps {
  src: string
  withSpotlight?: boolean
}

const FoxModel = (props: FoxModelProps) => {
  const { src, withSpotlight = false } = props
  const [rotated, setRotated] = useState(false)

  return (
    <Canvas camera={{ position: [0, 0, 1], fov: 45 }}>
      <Environment path={'/media/3d/'} files={'env.hdr'} />
      {withSpotlight ? <SpotLight opacity={0.15} /> : null}
      <pointLight position={[-1, 1, 0]} intensity={0.5} />
      <OrbitControls />

      <ModelChild
        src={src}
        scale={2}
        positionY={-0.35}
        animationName='All Animations'
        animateScene={(scene) => {
          if (!rotated) {
            // @ts-ignore
            scene.rotateY(-0.2)
            setRotated(true)
          }
        }}
      />
    </Canvas>
  )
}

export default FoxModel
