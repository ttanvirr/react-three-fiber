import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function AnimateBox() {
  const myMesh = useRef()

  useFrame(({ clock }) => {
    myMesh.current.rotation.x = Math.sin(clock.elapsedTime)
  })

  return (
    <mesh ref={myMesh}>
      <boxGeometry />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  )
}
