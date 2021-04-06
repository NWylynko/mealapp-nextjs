import Image from "next/image";
import styled from "styled-components";

interface ListItems {
  id?: string;
  name: string;
}

interface ListProps extends ListItems{  
  thumbnail: string;
  onClick: (listItems: ListItems) => void;
}

export const List = (props: ListProps) => {
  return (
    <Container onClick={() => props.onClick({ name: props.name, id: props.id })} >
      <Image
        src={props.thumbnail}
        width="100%"
        height={50}
        objectFit="cover"
      />
      <Title>{props.name}</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 8px;
  padding: 8px;

  &:hover{
    
  }
`;

const Title = styled.h3`
  margin: 8px;
  padding: 8px;
  width: 70%;
`;
