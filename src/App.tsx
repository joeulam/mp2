import ArtApiData from "./components/artComponent.tsx";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Art } from "./interface/artData.tsx";
const ParentDiv = styled.div`
  width: 80vw;
	margin-left: 10vw;
  border: 5px darkgoldenrod solid;
`;

export default function App() {
  const [artData, setArtData] = useState<Art[]>([]);
  useEffect(() => {
    const listOfNumbers: number[] = [];
    for (let i = 0; i < 5; i++) {
      listOfNumbers.push(Math.floor(Math.random() * 1000));
    }

    const fetchData = async () => {
      const fetchedData: Art[] = [];
      for (let i = 0; i < listOfNumbers.length; i++) {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${listOfNumbers[i]}`
        );
        const data: Art = await response.json();
        fetchedData.push(data);
      }
      setArtData(fetchedData);
    };
    fetchData();
  }, []);

  return (
    <>
      <ParentDiv>
        <h1>Random Art for the day</h1>
        <ArtApiData data={artData} />
      </ParentDiv>
    </>
  );
}
