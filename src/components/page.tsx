/* eslint-disable react/display-name */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  children: ReactNode;
  title: string;
  className: any;
}

const Page = forwardRef(({ children, title, className }: Props, ref: any) => {
  return (
    <div ref={ref} className={className}>
      <Helmet>
        <title>{title} | Dashboard</title>
        <link
          rel='icon'
          href='https://res.cloudinary.com/cici/image/upload/v1617738023/util/logo-cici_trmlbe.jpg'
        />
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
