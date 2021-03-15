import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet';

interface Props {
    children: ReactNode
    title: string
    className: any
}

const Page = forwardRef(({
  children,
  title = '',
  className,
}: Props, ref: any) => {
  return (
    <div
      ref={ref}
      className={className}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
