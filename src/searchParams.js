import {useState,useEffect} from 'react';
import Result from './Result';
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
import useBreedList from './useBreedList';
const SearchParams = () => {
  const [location,setLocation]=useState("");
  const [animal, updateAnimal] = useState("");
  const [breed, updateBreed] = useState("");
  const [breeds] =useBreedList(animal);
  const [pets, setPets] = useState([]);
  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
  
    setPets(json.pets);
  }  
  
  return (
  <div className="search-params">
     <form
       onSubmit={(e)=>{
         e.preventDefault();
         requestPets();
       }
          
       }
     >
        <label htmlFor="location">
          Location
          <input id="location" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Location" />
        </label>
        <label htmlFor="animal">
  Animal
  <select
    id="animal"
    value={animal}
    onChange={(e) => updateAnimal(e.target.value)}
    onBlur={(e) => updateAnimal(e.target.value)}
  >
    <option />
    {ANIMALS.map((animal) => (
      <option key={animal} value={animal}>
        {animal}
      </option>
    ))}
  </select>
</label>
<label htmlFor="breed">
  Breed
  <select
    disabled={!breeds.length}
    id="breed"
    value={breed}
    onChange={(e) => updateBreed(e.target.value)}
    onBlur={(e) => updateBreed(e.target.value)}
  >
    <option />
    {breeds.map((breed) => (
      <option key={breed} value={breed}>
        {breed}
      </option>
    ))}
  </select>
</label>
<button>Submit</button>
  </form>
     <Result pets={pets}/>
   </div>

  );
};

export default SearchParams;