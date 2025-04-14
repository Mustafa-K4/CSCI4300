import EventCard from "./EventCard";
import dummyData from "../data/DummyEventData.json"

export default function CardGrid() {
    const GridItem = ({ children }) => (
        <div>
          {children}
        </div>
    );

    return (     
        <div>
            {dummyData.map((item, index) => (
                <GridItem key={index}>
                    <EventCard 
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