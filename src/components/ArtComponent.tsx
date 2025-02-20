import styled from "styled-components";
import { Art } from "../interface/w";
const ArtAsTableDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: bisque;
    border-radius: 5px;
    padding: 5%
`;

const SingleArtDiv=styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    padding: 2%;
    max-width: 40%;
    margin: 1%;
    border: 3px darkred solid;
    font: italic small-caps bold calc(4px + 1vw) Papyrus;
    text-align: center;
    color: black;
    text-wrap: wrap;
    border-radius: 15px;
`;
const StyledImg = styled.img`
    display: block;
    margin: 0 auto;
    max-width: 60%;
`

export default function ArtComponent(props : { data:Art[] } ){
  return (
      <ArtAsTableDiv >
          {
              props.data.map((char: Art) =>
                  <SingleArtDiv key={char.objectID} >
                      <h1>{char.title}</h1>
                      <StyledImg src={char.primaryImage} alt={`${char.title} has no image`} />
                      <p>{char.creditLine}</p>
                  </SingleArtDiv>
              )
          }
      </ArtAsTableDiv>
  );
}