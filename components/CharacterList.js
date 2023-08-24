"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image';

const CharacterList = () => {
  const [character, setCharacter] = useState([]);
  const [location, setLocation] = useState([]);
  const [loading, setLoading ] = useState(true)
  
      useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://localhost:3001/api/characters');
          if (!response.ok) {
            throw new Error('Network response F$3&d up bruh...')
          }
          const data = await response.json();
          setCharacter(data.data)
        } catch (error) {
          console.error('Somthin F#!3d up with the fetch...')
        } 

        try {
          const response = await fetch('http://localhost:3001/api/locations');
          if (!response.ok) {
            throw new Error('Network response F$3&d up bruh...')
          }
          const data = await response.json();
          setLocation(data.data)
        } catch (error) {
          console.error('Somthin F#!3d up with the fetch...')
        } finally {
          setLoading(false)
        }

      }
      fetchData();
    }, [])

    if (loading) return <div>Loading...</div>;

    return(
      <div className="">
        <div className="">
          <h1 className="mb-4">List of characters</h1>
          <div className="flex flex-row flex-wrap justify-center gap-4">
            {character.map(char => (
              <div key={char.id} className="w-1/4 box-border">
                <h2 className="mb-2">{char.name}</h2>
                <Image
                  src={char.image}
                  width={100}
                  height={100}
                  alt="char pic"
                />
                </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1>List of Places Outside (including other dimensions)</h1>
          <div className="flex flex-row flex-wrap justify-center gap-4">
            {location.map(location => (
               <div key={location.id} className="w-1/4 box-border">
               <h2 className="mb-2">{location.name}</h2>
               </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  export default CharacterList;
