import { useState } from 'react';

type EventProps = {
    addEvent: (newEvent: { name: string; location: string; description: string; imageUrl: string }) => void;
  };
  
export default function EventForm({addEvent}: EventProps) {
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    imageUrl: '',
  });

  const handleChange = (x) => {
    const { name, value } = x.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (x) => {
    x.preventDefault();
    
    addEvent(formData); 
    console.log(formData);

    setFormData({
      name: '',
      location: '',
      description: '',
      imageUrl: '',
    }); 
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
      <h1 className="text-4xl font-bold mb-6 text-center">Create and Event</h1>
      <form onSubmit = {handleSubmit} >
        <label>Name</label>
        <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
          name="name"
          type="text"
          placeholder="Enter ther name"
          value = {formData.name}
          onChange={handleChange}
        />
        <label >Location</label>
        <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
          name="location"
          type="text"
          placeholder="Enter the location"
          value = {formData.location}
          onChange={handleChange}
        />
        <label >Description</label>
        <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
          name="description"
          type="text"
          placeholder="Enter a Description"
          value = {formData.description}
          onChange={handleChange}
        />
        <label >Image Link</label>
        <input className="border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
          name="imageUrl"
          type="url"
          placeholder="Enter image URL"
          value = {formData.imageUrl}
          onChange={handleChange}
        />
        <button  type="submit">Create Event</button>
      </form>
    </div>
  );
}
  