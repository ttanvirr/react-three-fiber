import { useState } from "react"

export default function CreateScene() {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      rotation={[0.4, 0.6, 0]}
      position={[2, 0, 0]}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "lightblue" : "royalblue"} />
    </mesh>
  )
}
