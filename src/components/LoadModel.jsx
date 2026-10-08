import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

export default function LoadModel() {
  const gltf = useLoader(GLTFLoader, "/Poimandres.gltf")
  return <primitive object={gltf.scene} scale={0.4} />
}
