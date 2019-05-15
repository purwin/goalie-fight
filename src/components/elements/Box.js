import styled from 'styled-components'
import React from 'react'

const Box = styled.div`
  min-height: 50vh;
	width: 100%;
	background: #E5F1FF;
  color: #001F4C;

  @media screen and (max-width: 767.98px) {

    &:nth-of-type(1) {
      order: 1;
    }
  }
`;

const Head = styled.div`
  background: #021926;
  color: #dfe6e9;
  margin: 0;
  padding: 1rem;
  border-bottom: 2px solid #021926;
`;

const HeadTitle = styled.h3`
  margin: 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 1rem;
  align-items: center;
  font-size: 1.5rem;

  &:before,
  &:after {
    display: block;
    content: "";
    height: 8px;
    border-top: 3px solid #dfe6e9;
    border-bottom: 3px solid #dfe6e9;
  }

`;

export default ({title, children, className}) => (
  <Box className={className}>
    {title && <Head><HeadTitle>{title}</HeadTitle></Head>}
    {children}
  </Box>
)