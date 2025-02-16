'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

const PenModel = () => {
  const { scene } = useGLTF('/pen.glb')
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 45
      }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} />
      <primitive
        object={scene}
        scale={2}
        rotation={[Math.PI, 0, Math.PI*2.8 / 4 ]}  // Added Math.PI (180 degrees) rotation on X-axis
        position={[0, 0, 0]}
      />
      <OrbitControls
        enableZoom={false}
        enableRotate={true}
        enablePan={false}
      />
    </Canvas>
  )
}

export default PenModel
