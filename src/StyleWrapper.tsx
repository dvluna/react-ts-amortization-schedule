import React from 'react';

import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

const BaselineStyleWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Global styles={css`
        body {
          background-color: #111;
          color: #FFF;
          height: 100vh;
          margin: 0;
          padding: 0;
          max-width: 100vw;
        }`} />
      {children}
    </>
  );
};

const PageStyleWrapper = styled.div`
  padding: 1em 2em;
`;

export { BaselineStyleWrapper, PageStyleWrapper };
