import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Loader } from "@react-three/drei"
import { Suspense } from "react"
// import LoadModel from "./components/LoadModel"
import LoadTexture from "./components/LoadTexture"

export default function App() {
  return (
    <div>
      <div className="h-screen w-screen">
        <Canvas>
          <Suspense fallback={null}>
            {/* <LoadModel /> */}
            <OrbitControls />
            {/* <Environment preset="sunset" background /> */}
            <LoadTexture />
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </div>
  )
}
