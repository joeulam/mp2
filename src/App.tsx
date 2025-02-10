import ArtApiData from "./components/artComponent.tsx";
import styled from "styled-components";
import {useEffect, useState} from "react";
import { Art } from "./interface/artData.tsx";
const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 5px darkgoldenrod solid;
`;

export default function App(){

    // useState Hook to store Data.
    const [data, setData] = useState<Art[]>([]);

    // useEffect Hook for error handling and re-rendering.
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const rawData = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/100");
            const {results} : {results: Art[]} = await rawData.json();
            setData(results);
        }
        fetchData()
            .then(() => console.log("Data fetched successfully"))
            .catch((e: Error) => console.log("There was the error: " + e));
    }, []);

    return(
        <ParentDiv>
            <h1>Random Art for the day</h1>
            <ArtApiData data={data}/>
        </ParentDiv>
    )
}
