'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

const PenModel = () => {

  const {scene} = useGLTF('/pen.glb')

  return (
    <Canvas>
      <ambientLight intensity={0.5}/>
      <spotLight position={[10,10,10]} angle={0.15} penumbra={1}/>
      <primitive object={scene} scale={1} position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  )
}

export default PenModel
