import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type EventProps = {
    addEvent: (newEvent: { name: string; location: string; description: string; imageUrl: string }) => void;
};

export default function EventForm({ addEvent }: EventProps) {
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

    const searchParams = useSearchParams();
    const nameParam = searchParams.get("name");
    const locationParam = searchParams.get("address");
    const descriptionParam = searchParams.get("venue");

    useEffect(() => {
        if (nameParam || locationParam || descriptionParam) {
            setFormData(prev => ({
                ...prev,
                name: nameParam ?? prev.name,
                location: locationParam ?? prev.location,
                description: descriptionParam ?? prev.description,
            }));
        }
    }, [nameParam, locationParam, descriptionParam]);    

    return (
        <div className="flex justify-center items-start min-h-screen py-2 mt-8">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-6 text-center">Create an Event</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Name</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
                            name="name"
                            type="text"
                            placeholder="Enter the name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Location</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
                            name="location"
                            type="text"
                            placeholder="Enter the location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Description</label>
                        <textarea
                            className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
                            name="description"
                            placeholder="Enter a description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Image Link</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
                            name="imageUrl"
                            type="url"
                            placeholder="Enter image URL"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}