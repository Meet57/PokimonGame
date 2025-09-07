import React from 'react'

const Layout = ({ children, sidebar }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-6">{children}</main>
      <aside className="w-1/3 bg-gray-800 p-6">{sidebar}</aside>
    </div>
  );
}

export default Layout;