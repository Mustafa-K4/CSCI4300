'use client'
import CardGrid from "../../components/CardGrid"

export default function BrowsePage() {
    return ( 
        <div className="min-h-[1000px]">
            <div className="flex justify-center text-[#C85250] rounded-xl mt-10 mb-10">
                <p className="z-10 text-center text-4xl font-bold">
                    Explore Events Near You!
                </p>
            </div>
            <CardGrid></CardGrid>
        </div>
    );
}; 