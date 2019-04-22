import styled from 'styled-components'
import React from 'react'

const Box = styled.div`
  height: 50vh;
	width: 100%;
	background: #021926;
	color: #dfe6e9;
`;

const Head = styled.h3`
`;

export default ({title, children, className}) => (
  <Box className={className}>
    {title && <Head>{title}</Head>}
    {children}
  </Box>
)