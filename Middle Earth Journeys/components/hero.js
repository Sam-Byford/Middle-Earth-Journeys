import React from 'react';
import styled from 'styled-components/native';
const Hero = props => (
 <Container>
    <Cover>
        <Image source={props.src} />
    </Cover>
    <Content>
        <Title>{props.title}</Title>
    </Content>
 </Container>
);
export default Hero;

const Container = styled.View`
 height: 150px;
 width: 100%;
 margin-right:50px;
 margin-bottom:5px;
 margin-top:50px;
 border:5px solid black;
`;
const Cover = styled.View`
 width: 100%;
 height:100%;
 overflow: hidden;
`;
    const Image = styled.Image`
    width: 100%;
    height: 100%;
    `;

const Content = styled.View`
 padding-top: 10px;
 flex-direction: column;
 align-items: center;
 height: 1px;
`;
    const Title = styled.Text`
    color: white;
    font-size: 22px;
    font-weight: 600;
    width:100%;
    text-align:center;
    font-family: 'LOTR';
    `;

