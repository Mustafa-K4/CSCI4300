import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function EventForm() {
    const [formData, setFormData] = useState({
        owner: '',
        name: '',
        date: '',
        location: '',
        description: '',
        imageUrl: '',
        startTime: '',
        endTime: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Something went wrong!");
            }

            alert("Event created successfully!");
            console.log(formData);

            setFormData({
                owner: "",
                name: "",
                date: "",
                location: "",
                description: "",
                imageUrl: "",
                startTime: "",
                endTime: "",
            });
        } catch (err) {
            console.error("Failed to create event:", err);
            alert("Failed to create event.");
        }
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

                    {/* Owner */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Owner</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            name="owner"
                            type="text"
                            placeholder="Event owner"
                            value={formData.owner}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Name</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            name="name"
                            type="text"
                            placeholder="Event name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Date */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Date</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Start Time */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Start Time (hh:mm AM/PM) </label>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            name="startTime"
                            type="text"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* End Time */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">End Time (hh:mm AM/PM) (Optional)</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            name="endTime"
                            type="text"
                            value={formData.endTime}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Location */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Location</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            name="location"
                            type="text"
                            placeholder="Event location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Description</label>
                        <textarea
                            className="p-2 border border-gray-300 rounded-md"
                            name="description"
                            placeholder="Describe your event"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Image URL (Optional)</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            name="imageUrl"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
