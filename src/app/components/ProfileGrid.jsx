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
                        title={item.title}
                        location={item.location}
                        date={item.date}
                        description={item.description}
                        img={item.img}
                    />
                </GridItem>
            ))}
        </div>
    )
}