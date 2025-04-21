import ProfileCard from "./ProfileCard";
import dummyData from "../data/DummyEventData.json"

export default function ProfileGrid() {
    const GridItem = ({ children }) => (
        <div>
          {children}
        </div>
    );

    return (     
        <div>
            {dummyData.map((item, index) => (
                <GridItem key={index}>
                    <ProfileCard 
                        owner={item.owner}
                        name={item.name}
                        location={item.location}
                        date={item.date}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        startTime={item.startTime}
                        endTime={item.endTime}
                    />
            </GridItem>
            ))}
        </div>
    )
}