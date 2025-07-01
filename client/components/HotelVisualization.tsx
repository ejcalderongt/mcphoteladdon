import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Box, Html } from "@react-three/drei";
import * as THREE from "three";
import type { Room } from "@shared/api";

interface RoomBoxProps {
  room: Room;
  position: [number, number, number];
  onRoomClick: (room: Room) => void;
}

function RoomBox({ room, position, onRoomClick }: RoomBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.01 : 0;
    }
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "occupied":
        return "#ef4444"; // Red
      case "available":
        return "#22c55e"; // Green
      case "checkout":
        return "#f59e0b"; // Orange
      case "maintenance":
        return "#6b7280"; // Gray
      default:
        return "#3b82f6"; // Blue
    }
  };

  const getRoomTypeSize = (type: string): [number, number, number] => {
    switch (type) {
      case "suite":
        return [1.8, 1.2, 1.5];
      case "familiar":
        return [1.6, 1.2, 1.4];
      case "doble":
        return [1.4, 1.2, 1.2];
      case "simple":
      default:
        return [1.0, 1.2, 1.0];
    }
  };

  const roomSize = getRoomTypeSize(room.type);
  const statusColor = getStatusColor(room.status);

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={roomSize}
        onClick={() => onRoomClick(room)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={statusColor}
          transparent
          opacity={hovered ? 0.8 : 0.6}
          emissive={hovered ? statusColor : "#000000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Box>

      {/* Room Number Label */}
      <Text
        position={[0, roomSize[1] / 2 + 0.3, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {room.number}
      </Text>

      {/* Guest Count Indicator */}
      {room.guest && (
        <Text
          position={[0, -roomSize[1] / 2 - 0.2, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          👥 {room.guest.name.split(" ")[0]}
        </Text>
      )}

      {/* Amenities Indicators */}
      {room.type === "suite" && (
        <Box args={[0.2, 0.2, 0.2]} position={[roomSize[0] / 2 + 0.2, 0, 0]}>
          <meshBasicMaterial color="#ffd700" />
        </Box>
      )}
    </group>
  );
}

interface FloorProps {
  floorNumber: number;
  rooms: Room[];
  onRoomClick: (room: Room) => void;
}

function Floor({ floorNumber, rooms, onRoomClick }: FloorProps) {
  const floorRooms = rooms.filter((room) => room.floor === floorNumber);
  const yPosition = (floorNumber - 1) * 3;

  return (
    <group position={[0, yPosition, 0]}>
      {/* Floor Base */}
      <Box args={[12, 0.1, 8]} position={[0, -0.8, 0]}>
        <meshStandardMaterial color="#e5e7eb" />
      </Box>

      {/* Floor Number */}
      <Text
        position={[-6, 0, 0]}
        fontSize={0.5}
        color="#374151"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
      >
        Piso {floorNumber}
      </Text>

      {/* Rooms */}
      {floorRooms.map((room, index) => {
        const roomsPerRow = 6;
        const row = Math.floor(index / roomsPerRow);
        const col = index % roomsPerRow;
        const xPos = (col - roomsPerRow / 2 + 0.5) * 2;
        const zPos = (row - 1) * 2.5;

        return (
          <RoomBox
            key={room.id}
            room={room}
            position={[xPos, 0, zPos]}
            onRoomClick={onRoomClick}
          />
        );
      })}
    </group>
  );
}

interface HotelVisualizationProps {
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
}

export function HotelVisualization({
  rooms,
  onRoomSelect,
}: HotelVisualizationProps) {
  const floors = useMemo(() => {
    return Array.from(new Set(rooms.map((room) => room.floor))).sort(
      (a, b) => a - b,
    );
  }, [rooms]);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [15, 8, 15],
          fov: 60,
        }}
        style={{ background: "linear-gradient(to bottom, #87CEEB, #E0F6FF)" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Hotel Building */}
        <group position={[0, 0, 0]}>
          {floors.map((floorNumber) => (
            <Floor
              key={floorNumber}
              floorNumber={floorNumber}
              rooms={rooms}
              onRoomClick={onRoomSelect}
            />
          ))}

          {/* Hotel Exterior */}
          <Box
            args={[12.5, floors.length * 3, 8.5]}
            position={[0, (floors.length * 3) / 2 - 0.8, 0]}
          >
            <meshStandardMaterial
              color="#f3f4f6"
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </Box>
        </group>

        {/* Legend */}
        <Html position={[-8, floors.length * 3 + 1, 0]}>
          <div className="bg-white/90 p-3 rounded-lg shadow-lg text-xs">
            <h4 className="font-semibold mb-2">Leyenda</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Ocupada</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>Check-out</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded"></div>
                <span>Mantenimiento</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-200">
              <div className="text-xs text-gray-600">
                <div>🏠 Simple</div>
                <div>🏡 Doble</div>
                <div>🏨 Familiar</div>
                <div>🏛️ Suite</div>
                <div>🟡 = Comodidades premium</div>
              </div>
            </div>
          </div>
        </Html>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
