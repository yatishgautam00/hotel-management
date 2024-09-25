import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function CheckRooms() {
    const rooms = [
        { id: 1, name: 'Single Room', imageUrl: '/SingleRoom.png' ,url:'/rooms/single-room', },
        { id: 2, name: 'Family Room', imageUrl: '/FamilyRoom.png',url:'/rooms/family-room',  },
        { id: 3, name: 'Double Room', imageUrl: '/DoubleRoom.png' ,url:'/rooms/double-room', },
        { id: 4, name: 'Triple Room', imageUrl: '/TripleRoom.png',url:'/rooms/triple-room', },
        { id: 5, name: 'Exclusive Room', imageUrl: '/ExclusiveRoom.png' ,url:'/rooms/exclusive-room',},
        { id: 6, name: 'Deluxe Room', imageUrl: '/DeluxeRoom.png' ,url:'/rooms/deluxe-room',},
      ];
  return (
    <div className="py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-8">CHECK ROOMS</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 px-4 md:px-20  lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white flex items-center justify-center rounded-lg overflow-hidden ">
            <div className=''>
                <Link href={room.url}>
            <Image
              src={room.imageUrl}
              alt={room.name}
              width={250}
              height={175}
              className="w-full "
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{room.name}</h3>
            </div>
            </Link>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckRooms