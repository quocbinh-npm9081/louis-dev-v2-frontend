import React, { FC } from 'react';
import { Link } from 'react-router-dom';
interface ILink {
  to: string;
  children: any;
  className?: string;
}
const LinkRoute: FC<ILink> = ({ to, children, className }) => {
  return (
    <Link className={className} to={to} style={{ color: 'inherit' }}>
      {children}
    </Link>
  );
};

export default LinkRoute;
