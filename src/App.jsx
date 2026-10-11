import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Loader } from "@react-three/drei"
import { Suspense } from "react"
// import LoadModel from "./components/LoadModel"
// import LoadTexture from "./components/LoadTexture"
import AnimateBox from "./components/AnimateBox"

export default function App() {
  return (
    <div>
      <div className="h-screen w-screen">
        <Canvas>
          <Suspense fallback={null}>
            {/* <LoadModel /> */}
            <OrbitControls />
            {/* <Environment preset="sunset" background /> */}
            {/* <LoadTexture /> */}
            <AnimateBox />
            <ambientLight intensity={0.1} />
            <directionalLight />
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </div>
  )
}
